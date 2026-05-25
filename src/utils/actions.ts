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
  const fetchURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify`
  const result = await fetch(fetchURL, {
    method: 'POST',
    body: JSON.stringify({
      "email": userId,
      "codeId": otpCode
    }),
    headers: new Headers({
      "content-type": "application/json"
    })
  }).then(data => data.json())

  return result.data
}

export async function sendVerificationEmail(email: string) {
  const fetchURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/sendEmail`
  const result = await fetch(fetchURL, {
    method: 'POST',
    body: JSON.stringify({
      "email": email,
    }),
    headers: new Headers({
      "content-type": "application/json"
    })
  }).then(data => data.json())

  return result.data
}