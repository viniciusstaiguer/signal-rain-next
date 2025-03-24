import { DashboardHeader } from "@/components/dashboard-header"
import { CityWeatherDetail } from "@/components/city-weather-detail"

export default function CityDetailPage({ params }: { params: { city: string } }) {
  const cityName = decodeURIComponent(params.city)

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">{cityName}</h1>
        <CityWeatherDetail cityName={cityName} />
      </div>
    </div>
  )
}

