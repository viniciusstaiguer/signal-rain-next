"use client"

import { useEffect, useState } from "react"
import { Cloud, Droplets, Loader2, Thermometer, Wind, Compass, Gauge, Sun, Sunset, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { fetchWeatherForCity } from "@/lib/api-client"
import { checkForAlerts } from "@/lib/services/checkForAlerts"

export function CityWeatherDetail({ cityName }: { cityName: string }) {
  const [weather, setWeather] = useState<any>(null)
  const [alert, setAlert] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadWeatherData() {
      try {
        setLoading(true)
        const data = await fetchWeatherForCity(cityName)
        setWeather(data)

        const alertMessage = checkForAlerts(data)
        setAlert(alertMessage)
      } catch (err) {
        console.error("Failed to fetch weather data:", err)
        setError("Falha ao carregar dados climáticos")
      } finally {
        setLoading(false)
      }
    }

    loadWeatherData()
  }, [cityName])

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

  if (!weather) {
    return (
      <div className="p-4">
        <p>Nenhum dado disponível para {cityName}</p>
      </div>
    )
  }

  const temp = Math.round(weather.main.temp - 273.15)
  const feelsLike = Math.round(weather.main.feels_like - 273.15)
  const humidity = weather.main.humidity
  const windSpeed = Math.round(weather.wind.speed * 3.6) // Convert m/s to km/h
  const windDirection = weather.wind.deg
  const pressure = weather.main.pressure

  // Convert Unix timestamp to readable time
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  }

  const sunrise = formatTime(weather.sys.sunrise)
  const sunset = formatTime(weather.sys.sunset)

  // Determine if alert is a warning
  const isWarning = alert && !alert.includes("Céu limpo") && !alert.includes("Nublado") && !alert.includes("Unknown")

  return (
    <div className="space-y-6">
      {isWarning && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Alerta</AlertTitle>
          <AlertDescription>{alert}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Condições Atuais</CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <Cloud className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold">{temp}°C</h3>
                  <p className="text-lg text-muted-foreground">{weather.weather[0].description}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 md:mt-0 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Sensação</p>
                    <p className="font-medium">{feelsLike}°C</p>
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Compass className="h-5 w-5 text-indigo-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Direção do Vento</p>
                  <p className="font-medium">{windDirection}°</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-violet-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Pressão</p>
                  <p className="font-medium">{pressure} hPa</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Nascer do Sol</p>
                  <p className="font-medium">{sunrise}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sunset className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Pôr do Sol</p>
                  <p className="font-medium">{sunset}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coordenadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Latitude</p>
                <p className="font-medium">{weather.coord.lat}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Longitude</p>
                <p className="font-medium">{weather.coord.lon}</p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">País</p>
                <p className="font-medium">{weather.sys.country}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

