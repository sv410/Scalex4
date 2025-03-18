import { NextResponse } from "next/server"
import { getAllStartups } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const startups = await getAllStartups(page, limit)

    return NextResponse.json({
      success: true,
      data: startups,
      pagination: {
        page,
        limit,
        total: startups.length, // In a real app, you would return the total count from the database
      },
    })
  } catch (error) {
    console.error("Error fetching startups:", error)
    return NextResponse.json({ error: "Failed to fetch startups" }, { status: 500 })
  }
}

