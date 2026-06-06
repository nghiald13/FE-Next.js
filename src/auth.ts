import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { InactivateAccountError, InvalidSignInError } from "./utils/customErrors"
import { sendRequest } from "./utils/api"
import { IUser } from "./types/next-auth"

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
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/signin`, {
          method: 'POST',
          body: JSON.stringify({
            ...credentials
          }),
          headers: new Headers({
            'content-type': 'application/json'
          })
        }).then(r => r.json())

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
  ],

  pages: {
    signIn: '/auth/signin'
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) { // user here means response from successful signin, which is now contains { user: {...}, access_token: ...}
        const data = user as any
        token.user = data.user as any
        token.access_token = data.access_token
      }
      return token
    },
    session({ session, token }) {
      (session.user as any) = token.user
      session.access_token = token.access_token as string
      return session
    },

    authorized: async ({ auth, request: { nextUrl } }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth

    },
  },

})