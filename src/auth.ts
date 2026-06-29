import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { InactivateAccountError, InvalidSignInError } from "./utils/customErrors"
import { setCookie } from "cookies-next"
import { cookies } from "next/headers"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => { // this should return a user
        const responseJson = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/signin`, {
          method: 'POST',
          body: JSON.stringify({
            ...credentials
          }),
          headers: new Headers({
            'content-type': 'application/json'
          }),
          credentials: 'include'
        })

        const setCookieHeader = responseJson.headers.get('set-cookie');
        if (setCookieHeader) {
          const tokenMatch = setCookieHeader.match(/refresh_token=([^;]+)/);
          if (tokenMatch && tokenMatch[1]) {
            const tokenValue = tokenMatch[1];
            await setCookie('refresh_token', tokenValue, {
              cookies,
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
              path: '/',
              maxAge: 24 * 60 * 60
            });
          }
        }

        const res = await responseJson.json()

        //api call success
        if (res.statusCode === 201) {
          return res.data
        } else if (+res.statusCode === 401) { // Unauthorized (means wrong password)
          throw new InvalidSignInError()
        } else if (+res.statusCode === 400) { // BadRequestException (means Inactive Account)
          throw new InactivateAccountError()
        } else {
          throw new Error('Internal Server Error')
        }
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  pages: {
    signIn: '/auth/signin'
  },

  callbacks: {
    // Receive callback from providers will go here
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const responseJson = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/google`, {
            method: 'POST',
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              avatar: user.image,
            }),
            headers: new Headers({ 'content-type': 'application/json' })
          })

          const setCookieHeader = responseJson.headers.get('set-cookie');
          if (setCookieHeader) {
            const tokenMatch = setCookieHeader.match(/refresh_token=([^;]+)/)
            if (tokenMatch && tokenMatch[1]) {
              const tokenValue = tokenMatch[1];
              await setCookie('refresh_token', tokenValue, {
                cookies,
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/',
                maxAge: 24 * 60 * 60
              });
            }
          }

          const res = await responseJson.json()

          if (res.statusCode === 201 || res.statusCode === 200) {
            (user as any).fromProviders = res.data;
            return true
          }
          return false
        } catch (error) {
          console.error("Lỗi đồng bộ Backend NestJS:", error)
          return false
        }
      }
      return true;
    },

    async jwt({ token, user }) {

      if (user) { // user here means response from successful signin, which is now contains { user: {...}, access_token: ...}
        const data = user as any

        // If signs in with Credentials
        if (data.access_token) {
          token.user = data.user as any
          token.access_token = data.access_token
        }
        // If signs in with Providers (Google, Facebook, Twitter,...)
        else if (data.fromProviders) {
          token.user = data.fromProviders.user;
          token.access_token = data.fromProviders.access_token;
        }
        token.accessTokenExpiresIn = Date.now() + 29 * 60 * 1000 // 14mins in ms
        return token
      }

      // Future requests
      // If access_token still useable (not expired)
      if (Date.now() < (token.accessTokenExpiresIn as number)) {
        return token;
      }
      // if access_token expired
      try {
        const cookieStore = await cookies();

        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/refresh`, {
          method: 'POST',
          headers: {
            'Cookie': cookieStore.toString()
          }
        });

        if (!response.ok) {
          throw new Error("Refresh token expired")
        }

        const resData = await response.json().then(r => r.data)

        return {
          ...token,
          access_token: resData.access_token, // replace expired access_token
          accessTokenExpires: Date.now() + 29 * 60 * 1000,
        };
      } catch (error) {
        return { ...token, error: "RefreshAccessTokenError" }
      }
    },
    session({ session, token }) {
      (session.user as any) = token.user
      session.access_token = token.access_token as string
      (session as any).error = token.error
      return session
    },

    authorized: async ({ auth, request: { nextUrl } }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth

    },
  },

})