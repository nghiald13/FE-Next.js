import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { InactivateAccountError } from "./utils/customErrors"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(">>> check credentials: ", credentials) // check credentials
        let user = {
          name: 'sdkjfn',
          email: 'dsjhfbds@gmail.com',
          password: 'dskjfnsdjf',
          isActive: false

        }
 
        // logic to salt and hash password
        // call backend
 
        // logic to verify if the user exists
        // call backend
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        } else if (!user.isActive) {
          throw new InactivateAccountError()
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin'
  }
})