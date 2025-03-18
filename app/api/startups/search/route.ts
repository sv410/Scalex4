import { NextResponse } from "next/server"
import { searchStartups } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""

    if (!query) {
      return NextResponse.json({
        success: true,
        data: [],
      })
    }

    const startups = await searchStartups(query)

    return NextResponse.json({
      success: true,
      data: startups,
    })
  } catch (error) {
    console.error("Error searching startups:", error)
    return NextResponse.json({ error: "Failed to search startups" }, { status: 500 })
  }
}

