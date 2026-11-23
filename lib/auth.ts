import { createHmac, timingSafeEqual } from "node:crypto"

export const ADMIN_COOKIE = "crystal_admin_session"
export const SESSION_MAX_AGE = 8 * 60 * 60

function sessionSecret() {
  return process.env.ADMIN_SESSION_TOKEN || process.env.ADMIN_PASSWORD || ""
}

function sign(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("hex")
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)

  return left.length === right.length && timingSafeEqual(left, right)
}

export function createSessionToken(now = Date.now()) {
  if (!sessionSecret()) {
    throw new Error("ADMIN_PASSWORD is not configured.")
  }

  const expiresAt = String(now + SESSION_MAX_AGE * 1000)

  return `${expiresAt}.${sign(expiresAt)}`
}

export function verifySessionToken(token: string | undefined | null) {
  if (!token || !sessionSecret()) {
    return false
  }

  const [expiresAt, signature] = token.split(".")

  if (!expiresAt || !signature) {
    return false
  }

  const expiry = Number(expiresAt)

  if (!Number.isFinite(expiry) || expiry < Date.now()) {
    return false
  }

  return safeEqual(signature, sign(expiresAt))
}

export function verifyPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD

  if (!expected) {
    return false
  }

  return safeEqual(
    createHmac("sha256", "compare").update(password).digest("hex"),
    createHmac("sha256", "compare").update(expected).digest("hex")
  )
}

function readCookie(request: Request, name: string) {
  const header = request.headers.get("cookie")

  if (!header) {
    return undefined
  }

  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=")

    if (key === name) {
      return decodeURIComponent(rest.join("="))
    }
  }

  return undefined
}

export function isAdminAuthenticated(request: Request) {
  return verifySessionToken(readCookie(request, ADMIN_COOKIE))
}
