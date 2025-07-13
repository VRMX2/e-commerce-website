import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Define the secret key for JWTs. It should be a strong, randomly generated string.
// In a real application, this would be loaded from environment variables.
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-super-secret-jwt-key-that-is-at-least-32-bytes-long",
)

const COOKIE_NAME = "session"

interface UserSession {
  id: string
  email: string
  isAdmin: boolean
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createSession(user: UserSession) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  const session = await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(JWT_SECRET)

  cookies().set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure in production
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
}

export async function getSession(): Promise<UserSession | null> {
  const session = cookies().get(COOKIE_NAME)?.value
  if (!session) return null

  try {
    const { payload } = await jwtVerify(session, JWT_SECRET, {
      algorithms: ["HS256"],
    })
    return payload as UserSession
  } catch (error) {
    console.error("Failed to verify session:", error)
    return null
  }
}

export async function destroySession() {
  cookies().delete(COOKIE_NAME)
}

export async function protectRoute(requiredAdmin = false) {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }
  if (requiredAdmin && !session.isAdmin) {
    redirect("/") // Redirect non-admins to homepage or a forbidden page
  }
  return session
}
