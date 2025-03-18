import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Check if user exists
    // 2. Verify password
    // 3. Create a session or JWT token

    // For demo purposes, we'll just return a success response
    // In a real app, you would check credentials against your database
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: "user_" + Math.random().toString(36).substr(2, 9),
          name: "Demo User",
          email,
          role: "startup",
        },
        token: "demo_jwt_token_" + Math.random().toString(36).substr(2, 9),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

