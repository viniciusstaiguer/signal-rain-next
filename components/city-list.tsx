"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MapPin, Loader2, Cloud, Thermometer, Droplets, Wind } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { fetchCities, fetchWeatherForCity } from "@/lib/api-client"

export function CityList() {
  const [cities, setCities] = useState<string[]>([])
  const [weatherData, setWeatherData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const citiesData = await fetchCities()
        setCities(citiesData)

        interface WeatherData {
          main: {
            temp: number
            feels_like: number
            humidity: number
          }
          weather: {
            main: string
            description: string
          }[]
          wind: {
            speed: number
          }
        }

        interface CityWeather {
          city: string
          data: WeatherData
        }

        const weatherPromises: Promise<CityWeather>[] = citiesData.map(async (city: string) => {
          const data: WeatherData = await fetchWeatherForCity(city)
          return { city, data }
        })

        const weatherResults = await Promise.all(weatherPromises)
        const weatherMap = weatherResults.reduce(
          (acc, { city, data }) => {
            acc[city] = data
            return acc
          },
          {} as Record<string, any>,
        )

        setWeatherData(weatherMap)
      } catch (err) {
        console.error("Failed to fetch data:", err)
        setError("Falha ao carregar dados")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-destructive">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cities.map((city) => {
        const weather = weatherData[city]
        if (!weather) return null

        const temp = Math.round(weather.main.temp - 273.15)
        const condition = weather.weather[0].main
        const humidity = weather.main.humidity
        const windSpeed = Math.round(weather.wind.speed * 3.6) // Convert m/s to km/h

        return (
          <Link key={city} href={`/cidades/${encodeURIComponent(city)}`}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      {city}
                    </h3>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1">
                      <Cloud className="h-4 w-4" />
                      {weather.weather[0].description}
                    </p>
                  </div>
                  <div className="text-3xl font-bold">{temp}°C</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Sensação</p>
                      <p className="font-medium">{Math.round(weather.main.feels_like - 273.15)}°C</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Umidade</p>
                      <p className="font-medium">{humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-cyan-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Vento</p>
                      <p className="font-medium">{windSpeed} km/h</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

