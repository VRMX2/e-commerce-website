"use server"

import { hashPassword, comparePassword, createSession, destroySession } from "@/lib/auth"

/* --------------------------------------------------------------------------
 * In-memory user “database” – replace with a real DB in production
 * ----------------------------------------------------------------------- */
interface User {
  id: string
  email: string
  passwordHash: string
  name: string
  phone: string
  isAdmin: boolean
}

const users: User[] = [
  {
    id: "admin-123",
    email: "lehcengrissi@gmail.com",
    // hash for the string ‘admin123’
    passwordHash: "$2a$10$WvMXxgcE1c8LyQv5LqW9l.pEGRf6eVUBW6lQQsvfPXR3x1l9zOxbS",
    name: "لحسن الجريسي",
    phone: "0774525109",
    isAdmin: true,
  },
]

/* --------------------------------------------------------------------------
 * Helper – find user by e-mail
 * ----------------------------------------------------------------------- */
function findUserByEmail(email: string) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase())
}

/* --------------------------------------------------------------------------
 *  SERVER ACTIONS
 * ----------------------------------------------------------------------- */
export async function signup(_prevState: unknown, formData: FormData): Promise<{ success?: true; error?: string }> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const name = String(formData.get("name") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()

  if (!email || !password || !name) {
    return { error: "جميع الحقول مطلوبة" }
  }
  if (findUserByEmail(email)) {
    return { error: "البريد الإلكتروني مسجل مسبقاً" }
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    passwordHash: await hashPassword(password),
    name,
    phone,
    isAdmin: false,
  }

  users.push(newUser)
  await createSession({ id: newUser.id, email: newUser.email, isAdmin: false })

  return { success: true }
}

export async function login(
  _prevState: unknown,
  formData: FormData,
): Promise<{ success?: true; error?: string; isAdmin?: boolean }> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  const user = findUserByEmail(email)
  if (!user || !(await comparePassword(password, user.passwordHash))) {
    return { error: "بيانات الاعتماد غير صحيحة" }
  }

  await createSession({ id: user.id, email: user.email, isAdmin: user.isAdmin })
  return { success: true, isAdmin: user.isAdmin }
}

export async function logout() {
  await destroySession()
}
