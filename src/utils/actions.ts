'use server'

import { signIn } from "@/auth"



export async function authenticate(email: string, password: string) {
  try {
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false
    })
    return res
  } catch (err) {
    return {
      error: (err as any).type,
    }
  }
}

export async function verifyAccount(userId: string, otpCode: string) {
  return true
}