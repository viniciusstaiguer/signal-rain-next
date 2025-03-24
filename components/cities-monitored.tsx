"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MapPin, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchCities } from "@/lib/api-client"

export function CitiesMonitored() {
  const [cities, setCities] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCities() {
      try {
        setLoading(true)
        const data = await fetchCities()
        setCities(data)
      } catch (err) {
        console.error("Failed to fetch cities:", err)
        setError("Falha ao carregar cidades")
      } finally {
        setLoading(false)
      }
    }

    loadCities()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cidades Monitoradas</CardTitle>
          <CardDescription>Carregando cidades...</CardDescription>
        </CardHeader>
        <CardContent className="flex h-40 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cidades Monitoradas</CardTitle>
          <CardDescription>Erro ao carregar cidades</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cidades Monitoradas</CardTitle>
        <CardDescription>Lista de cidades sob monitoramento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {cities.map((city) => (
            <Link
              key={city}
              href={`/cidades/${encodeURIComponent(city)}`}
              className="flex items-center gap-2 rounded-lg border p-3 hover:bg-muted transition-colors"
            >
              <MapPin className="h-5 w-5 text-primary" />
              <span>{city}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

