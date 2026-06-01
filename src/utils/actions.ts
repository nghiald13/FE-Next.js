'use server'

import { signIn } from "@/auth"

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

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
  const fetchURL = `${baseURL}/api/v1/auth/verify`
  const result = await fetch(fetchURL, {
    method: 'POST',
    body: JSON.stringify({
      "_id": userId,
      "codeId": otpCode
    }),
    headers: new Headers({
      "content-type": "application/json"
    })
  }).then(data => data.json())

  return result.data
}

export async function sendVerificationEmail(userId: string) {
  const fetchURL = `${baseURL}/api/v1/auth/sendEmail`
  const result = await fetch(fetchURL, {
    method: 'POST',
    body: JSON.stringify({
      "_id": userId,
    }),
    headers: new Headers({
      "content-type": "application/json"
    })
  }).then(data => data.json())

  return result.data
}

export async function createAccount(name?: string, email?: string, password?: string) {
  const fetchURL = `${baseURL}/api/v1/auth/signup`
  const result = await fetch(fetchURL, {
    method: 'POST',
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": password
    }),
    headers: new Headers({
      "content-type": "application/json"
    })
  }).then(res => res.json())

  if (result.statusCode === 201) {
    return result.data
  } else {
    return {
      error: result.error,
      message: result.message
    }
  }
}

export async function getListUsers(query: string, accessToken: string) {
  const fetchURL = `${baseURL}/api/v1/users?${query}`
  const result = await fetch(fetchURL, {
    method: 'GET',
    headers: new Headers({
      "content-type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    })
  }).then(res => res.json())

  if (result.statusCode === 200) {
    return result.data
  } else {
    return {
      statusCode: result.statusCode,
      message: result.message
    }
  }
}

export async function deleteUser(userId: string, accessToken: string) {
  const fetchURL = `${baseURL}/api/v1/users/${userId}`
  const result = await fetch(fetchURL, {
    method: 'DELETE',
    headers: new Headers({
      "content-type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    })
  }).then(res => res.json())

  if (result.statusCode === 200) {
    return {
      message: "Delete successfully"
    }
  }

  return {
    statusCode: result.statusCode,
    message: "Oops! There's something wrong. Please try again later!",
    error: result.error
  }
}

export async function updateUser(user: any, accessToken: string) {
  const fetchURL = `${baseURL}/api/v1/users`
  const result = await fetch(fetchURL, {
    method: 'PATCH',
    body: JSON.stringify(user),
    headers: new Headers({
      "content-type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    })
  }).then(res => res.json())

  if (result.statusCode === 200) {
    return {
      statusCode: result.statusCode,
      message: "Applied changes"
    }
  }

  return {
    statusCode: result.statusCode,
    error: result.error,
    message: result.message
  }
}

export async function getListProducts(query: string) {
  const fetchURL = `${baseURL}/api/v1/products?${query}`
  const result = await fetch(fetchURL, {
    method: 'GET',
    headers: new Headers({
      "content-type": "application/json"
    })
  }).then(res => res.json())

  return result.data
}

export async function getListManufacturers() {
  const fetchURL = `${baseURL}/api/v1/products/manufacturers`
  const result = await fetch(fetchURL, {
    method: 'GET',
    headers: new Headers({
      "content-type": "application/json"
    })
  }).then(res => res.json())

  return result.data
}