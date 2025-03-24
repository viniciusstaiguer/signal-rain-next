import { DashboardHeader } from "@/components/dashboard-header"
import { AlertsList } from "@/components/alerts-list"

export default function AlertsPage() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <DashboardHeader />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Alertas Climáticos</h1>
        <AlertsList />
      </div>
    </div>
  )
}

