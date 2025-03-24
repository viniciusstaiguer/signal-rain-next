import { type NextRequest, NextResponse } from "next/server"
import { getWeather } from "@/lib/services/weatherService"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cityName } = body

    if (!cityName) {
      return NextResponse.json({ error: "City name is mandatory" }, { status: 400 })
    }

    const weatherData = await getWeather(cityName)
    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Error getting weather information:", error)
    return NextResponse.json({ error: "Error getting weather information" }, { status: 500 })
  }
}

