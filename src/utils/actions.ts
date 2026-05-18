'use server'

import { signIn } from "@/auth"


 
export async function authenticate(email: string, password: string) {
  try {
    const res = await signIn("credentials", {
        email: email,
        password: password,
        redirectTo: "/dashboard"
    })
    return res
  } catch (error) {
    
  }
}