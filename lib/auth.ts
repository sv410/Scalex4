// This is a mock authentication service for demonstration purposes
// In a real application, you would use a proper authentication system like NextAuth.js

import { cookies } from "next/headers"
import { getUserByEmail } from "./db"

// Mock function to hash passwords
function hashPassword(password: string): string {
  // In a real app, you would use bcrypt or similar
  return `hashed_${password}`
}

// Mock function to verify passwords
function verifyPassword(password: string, hashedPassword: string): boolean {
  // In a real app, you would use bcrypt or similar
  return hashedPassword === `hashed_${password}`
}

// Mock function to generate a JWT token
function generateToken(userId: string): string {
  // In a real app, you would use a proper JWT library
  return `token_${userId}_${Date.now()}`
}

// Mock function to verify a JWT token
export function verifyToken(token: string): { userId: string } | null {
  // In a real app, you would use a proper JWT library
  if (!token.startsWith("token_")) {
    return null
  }

  const parts = token.split("_")
  if (parts.length < 3) {
    return null
  }

  return { userId: parts[1] }
}

// Mock function to set authentication cookie
export function setAuthCookie(userId: string): void {
  const token = generateToken(userId)
  cookies().set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })
}

// Mock function to get current user from cookie
export function getCurrentUser(): { userId: string } | null {
  const token = cookies().get("auth_token")?.value
  if (!token) {
    return null
  }

  return verifyToken(token)
}

// Mock function to sign up a user
export async function signUp(name: string, email: string, password: string, role: string) {
  // Check if user already exists
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    throw new Error("User already exists")
  }

  // In a real app, you would create a user in the database
  const hashedPassword = hashPassword(password)

  // Return mock response
  return {
    success: true,
    message: "User registered successfully",
  }
}

// Mock function to log in a user
export async function logIn(email: string, password: string) {
  // In a real app, you would verify credentials against the database
  const user = await getUserByEmail(email)
  if (!user) {
    throw new Error("Invalid credentials")
  }

  // In a real app, you would verify the password
  // const isValid = verifyPassword(password, user.hashedPassword);
  // if (!isValid) {
  //   throw new Error('Invalid credentials');
  // }

  // Set auth cookie
  setAuthCookie(user.id)

  return {
    success: true,
    message: "Login successful",
  }
}

// Mock function to log out a user
export function logOut() {
  cookies().delete("auth_token")

  return {
    success: true,
    message: "Logout successful",
  }
}

