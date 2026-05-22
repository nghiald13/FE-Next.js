'use server'

import { signIn } from "@/auth"
import { message } from "antd"



export async function authenticate(email: string, password: string) {
  try {
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false
    })
    return res
  } catch (err) {
    let errorName, errorMsg

    // Case invalid signin credentials
    if ((err as any).name === "InvalidSignInError") {
      errorName = "Incorrect email/password"
      errorMsg = "You have entered an incorrect email or password. Please try again!"

      // Case inactivate account
    } else if ((err as any).name === "InactivateAccountError") {
      errorName = "Inactivated account"
      errorMsg = "Your account has not been verified yet. You will be redirect to verification process page in 5 seconds."

      // Whatever else
    } else {
      errorName = "Internal server error"
      errorMsg = "Oops! Looks like we're having troubles right now. Please try again later"
    }

    return {
      error: (err as any).name,
      errorName: errorName,
      errorMsg: errorMsg,
    }
  }
}

export async function verifyAccount(userId: string, otpCode: string) {
  return true
}