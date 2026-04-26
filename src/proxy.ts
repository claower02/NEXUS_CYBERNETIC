import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET || "nexus_cybernetic_default_secret_2025_secure_vault"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Always allow: login page, API auth routes, static assets
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next()
  }

  // Check for a valid token (works with ALL providers including Credentials)
  const token = await getToken({ req: request, secret })

  if (!token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
