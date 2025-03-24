import { NextResponse } from "next/server"

// This would typically come from a database
const MONITORED_CITIES = ["Rio Branco", "Maceió", "Sorocaba", "Maringá","Curitiba" , "Budapeste"]

export async function GET() {
  try {
    return NextResponse.json(MONITORED_CITIES)
  } catch (error) {
    console.error("Error fetching cities:", error)
    return NextResponse.json({ error: "Error fetching cities" }, { status: 500 })
  }
}

