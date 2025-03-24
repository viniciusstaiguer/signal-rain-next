"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, Loader2, Cloud } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchAlerts } from "@/lib/api-client"

export function AlertsList() {
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadAlerts() {
      try {
        setLoading(true)
        const data = await fetchAlerts()
        setAlerts(data)
      } catch (err) {
        console.error("Failed to fetch alerts:", err)
        setError("Falha ao carregar alertas")
      } finally {
        setLoading(false)
      }
    }

    loadAlerts()
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

  // Group alerts by type
  const alertsByType = {
    critical: alerts.filter(
      (alert) =>
        alert.alertMessage.includes("Tempestade") ||
        alert.alertMessage.includes("Tornado") ||
        alert.alertMessage.includes("inundações"),
    ),
    warning: alerts.filter(
      (alert) =>
        !alert.alertMessage.includes("Céu limpo") &&
        !alert.alertMessage.includes("Nublado") &&
        !alert.alertMessage.includes("Tempestade") &&
        !alert.alertMessage.includes("Tornado") &&
        !alert.alertMessage.includes("inundações"),
    ),
    info: alerts.filter((alert) => alert.alertMessage.includes("Céu limpo") || alert.alertMessage.includes("Nublado")),
  }

  return (
    <div className="space-y-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {alertsByType.critical.length > 0 && (
        <Card className="border-red-500">
          <CardHeader className="bg-red-50 dark:bg-red-950/20">
            <CardTitle className="text-red-700 dark:text-red-400">Alertas Críticos</CardTitle>
            <CardDescription>Condições climáticas severas que requerem atenção imediata</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {alertsByType.critical.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/20"
                >
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium">{alert.cityName}</p>
                    <p className="text-sm text-muted-foreground">{alert.alertMessage}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(alert.timestamp).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {alertsByType.warning.length > 0 && (
        <Card className="border-amber-500">
          <CardHeader className="bg-amber-50 dark:bg-amber-950/20">
            <CardTitle className="text-amber-700 dark:text-amber-400">Avisos</CardTitle>
            <CardDescription>Condições climáticas que requerem atenção</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {alertsByType.warning.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/20"
                >
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium">{alert.cityName}</p>
                    <p className="text-sm text-muted-foreground">{alert.alertMessage}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(alert.timestamp).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {alertsByType.info.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Informações</CardTitle>
            <CardDescription>Condições climáticas normais</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {alertsByType.info.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg border p-4">
                  <Cloud className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{alert.cityName}</p>
                    <p className="text-sm text-muted-foreground">{alert.alertMessage}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(alert.timestamp).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

