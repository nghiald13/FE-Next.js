import { auth } from "@/auth"

export const proxy = auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/auth/signin") {
    const newUrl = new URL("/auth/signin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: [
    // '/((?!auth).*)(.+)|/verify',
    // "/((?!api|_next/static|_next/image|favicon.ico|/|/auth).*)",
    '/((?!api|_next/static|_next/image|favicon.ico|auth|products|brand-logo|$).*)',
  ],
}