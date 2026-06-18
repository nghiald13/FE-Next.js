'use server'

import { signIn } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"

const baseURL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL

export async function authenticate(email: string, password: string, callbackUrl?: string) {
  try {
    let credentials = {
      email: email, password: password, redirectTo: callbackUrl, redirect: true
    }
    if (!callbackUrl || callbackUrl === '') {
      delete credentials.redirectTo
      credentials.redirect = false
    }
    const res = await signIn("credentials", credentials)
    return res
  } catch (err: any) {
    // Upon successfull sign in, if there is an callbackUrl given, Next.js mechanic will throw redirect as an EXCEPTION, so catch it first
    if (isRedirectError(err))
      throw err
    else if (err.type === 'IncorrectCredentials') {
      return {
        ok: false, statusCode: 401, error: "Incorrect sign in credentials", message: "You have entered an incorrect email/password. Please check again"
      }
    } else if (err.type === 'InactivatedAccount') {
      return {
        ok: false, statusCode: 400, error: "Inactivated Account", message: "Your account hasn't been verified yet. You will be redirected for the process."
      }
    } else return {
      ok: false, statusCode: 500, error: "Internal Server Error", message: "Oops! Something is wrong. Try again later!"
    }
  }
}

export async function verifyAccount(email: string, otpCode: string) {
  const fetchURL = `${baseURL}/api/v1/auth/verify`
  const result = await fetch(fetchURL, {
    method: 'POST',
    body: JSON.stringify({
      "email": email,
      "codeId": otpCode
    }),
    headers: new Headers({
      "content-type": "application/json"
    })
  }).then(data => data.json())

  return result.data
}

export async function sendVerificationEmail(email: string) {
  const fetchURL = `${baseURL}/api/v1/auth/sendEmail`
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

export async function getSingleProduct(productId: string) {
  const fetchURL = `${baseURL}/api/v1/products/${productId}`
  const result = await fetch(fetchURL, {
    method: 'GET',
    headers: new Headers({
      "content-type": "application/json"
    })
  }).then(res => res.json())

  return result.data
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
  const fetchURL = `${baseURL}/api/v1/products/meta/manufacturers`
  const result = await fetch(fetchURL, {
    method: 'GET',
    headers: new Headers({
      "content-type": "application/json"
    })
  }).then(res => res.json())

  return result.data
}

export async function getListOrders(userId: string, access_token: string) {
  const fetchURL = `${baseURL}/api/v1/orders`
  const result = await fetch(fetchURL, {
    method: 'POST',
    body: JSON.stringify({
      userId: userId
    }),
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`
    })
  }).then(res => res.json())

  if (result.statusCode === 201) {
    return {
      ok: true,
      statusCode: 201,
      data: result.data
    }
  } else if (result.statusCode === 400) {
    return {
      ok: false,
      statusCode: 400,
      message: "Bad Request"
    }
  } else if (result.statusCode === 401) {
    return {
      ok: false,
      statusCode: 401,
      message: "You must be signed in"
    }
  } else {
    return {
      ok: false,
      statusCode: 500,
      message: "Oops! Something's wrong. Try again later!"
    }
  }
}

export async function getOrderById(_id:string, access_token: string) {
  const fetchURL = `${baseURL}/api/v1/orders/${_id}`
  const result = await fetch(fetchURL, {
    method: 'GET',
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`
    })
  }).then(res => res.json())

  if (result.statusCode === 200) {
    return {
      ok: true,
      statusCode: 200,
      data: result.data
    }
  } else if (result.statusCode === 400) {
    return {
      ok: false,
      statusCode: 400,
      message: "Bad Request"
    }
  } else if (result.statusCode === 401) {
    return {
      ok: false,
      statusCode: 401,
      message: "You must be signed in"
    }
  } else {
    return {
      ok: false,
      statusCode: 500,
      message: "Oops! Something's wrong. Try again later!"
    }
  }
}