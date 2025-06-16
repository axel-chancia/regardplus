"use client"

import { useEffect } from "react"
import DashboardHeader from "@/components/ui/DashboardHeader"
import StatCard from "@/components/ui/StatCard"
import { CustomPieChart } from "@/components/ui/pie-chart"
import RecentEmployees from "@/components/ui/RecentEmployees"
import { useAppStore } from "@/store/useAppStore"

import {
  Users,
  CalendarDays,
  TrendingUp,
  UserPlus,
} from "lucide-react"

export default function TableauDeBordAdmin() {
  const { companyStats, initializeData } = useAppStore()

  console.log('Tableau de bord admin en cours de chargement');

  useEffect(() => {
    console.log('Initialisation des données du tableau de bord');
    initializeData()
  }, [initializeData])

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen w-full">
      <DashboardHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <StatCard 
          label="Total Employés" 
          value={companyStats.totalEmployees.toString()} 
          icon={<Users className="w-6 h-6 text-blue-600" />} 
        />
        <StatCard 
          label="Nouveaux ce mois" 
          value={companyStats.newThisMonth.toString()} 
          icon={<UserPlus className="w-6 h-6 text-green-600" />} 
        />
        <StatCard 
          label="Événements" 
          value={companyStats.upcomingEvents.toString()} 
          icon={<CalendarDays className="w-6 h-6 text-purple-600" />} 
        />
        <StatCard 
          label="Croissance" 
          value={companyStats.growthRate} 
          icon={<TrendingUp className="w-6 h-6 text-pink-600" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomPieChart 
          data={companyStats.departmentDistribution}
          title="Répartition par Département"
        />
        <RecentEmployees />
      </div>
    </div>
  )
}