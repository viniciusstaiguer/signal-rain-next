import { DashboardHeader } from "@/components/dashboard-header"
import { CityList } from "@/components/city-list"

export default function CitiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Cidades Monitoradas</h1>
        <CityList />
      </div>
    </div>
  )
}

