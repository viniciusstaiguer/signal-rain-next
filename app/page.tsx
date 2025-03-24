import { DashboardHeader } from "@/components/dashboard-header"
import { WeatherOverview } from "@/components/weather-overview"
import { AlertsOverview } from "@/components/alerts-overview"
import { CitiesMonitored } from "@/components/cities-monitored"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <WeatherOverview />
          <AlertsOverview />
          <CitiesMonitored />
        </div>
      </div>
    </div>
  )
}