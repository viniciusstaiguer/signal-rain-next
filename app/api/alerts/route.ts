import { NextResponse } from "next/server"
import { getWeather } from "@/lib/services/weatherService"
import { checkForAlerts } from "@/lib/services/checkForAlerts"

export async function GET() {
  try {
    const allCityNames = ["Rio Branco", "Maceió", "Sorocaba", "Maringá", "Budapeste"]
    const alerts = []

    for (const cityName of allCityNames) {
      try {
        const weatherData = await getWeather(cityName)

        if (!weatherData) {
          console.error(`No weather data found for ${cityName}`)
          continue
        }

        const alertMessage = checkForAlerts(weatherData)
        alerts.push({
          cityName,
          alertMessage,
          timestamp: new Date().toISOString(),
          weatherData,
        })
      } catch (error) {
        console.error(`Error getting weather data for ${cityName}:`, error)
      }
    }

    return NextResponse.json(alerts)
  } catch (error) {
    console.error("Error fetching alerts:", error)
    return NextResponse.json({ error: "Error fetching alerts" }, { status: 500 })
  }
}

