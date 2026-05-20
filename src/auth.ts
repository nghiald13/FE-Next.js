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
        const res = await fetch('http://localhost:8080/api/v1/auth/signin', {
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
          return {
            _id: res.data?.user?._id,
            email: res.data?.user?.email,
            name: res.data?.user?.name,
            access_token: res.data?.access_token,
          }
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
      if (user) { // user available during sign-in
        token.user = user as IUser
      }
      return token
    },
    session({ session, token }) {
      (session.user as IUser) = token.user
      return session
    },

    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },

})