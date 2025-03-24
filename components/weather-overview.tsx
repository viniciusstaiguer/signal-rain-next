"use client"

import { useEffect, useState } from "react"
import { Cloud, CloudRain, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchWeatherForAllCities } from "@/lib/api-client"

export function WeatherOverview() {
  const [weatherData, setWeatherData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadWeatherData() {
      try {
        setLoading(true)
        const data = await fetchWeatherForAllCities()
        setWeatherData(data)
      } catch (err) {
        console.error("Failed to fetch weather data:", err)
        setError("Falha ao carregar dados climáticos")
      } finally {
        setLoading(false)
      }
    }

    loadWeatherData()
  }, [])

  if (loading) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Visão Geral do Clima</CardTitle>
          <CardDescription>Carregando dados climáticos...</CardDescription>
        </CardHeader>
        <CardContent className="flex h-40 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Visão Geral do Clima</CardTitle>
          <CardDescription>Erro ao carregar dados</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Visão Geral do Clima</CardTitle>
        <CardDescription>Condições climáticas atuais nas cidades monitoradas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {weatherData.map((city) => (
            <div key={city.cityName} className="flex flex-col items-center p-4 rounded-lg border">
              <h3 className="font-medium">{city.cityName}</h3>
              <div className="mt-2 flex items-center justify-center">
                {city.weatherData.weather[0].main === "Rain" ? (
                  <CloudRain className="h-10 w-10 text-blue-500" />
                ) : (
                  <Cloud className="h-10 w-10 text-gray-500" />
                )}
              </div>
              <div className="mt-2 text-2xl font-bold">{Math.round(city.weatherData.main.temp - 273.15)}°C</div>
              <div className="text-sm text-muted-foreground">{city.weatherData.weather[0].description}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

