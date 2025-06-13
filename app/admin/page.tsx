"use client"

import DashboardHeader from "@/components/ui/DashboardHeader"
import StatCard from "@/components/ui/StatCard"
import EmployeeChart from "@/components/ui/EmployeeChart"
import RecentEmployees from "@/components/ui/RecentEmployees"

import {
  Users,
  CalendarDays,
  TrendingUp,
  UserPlus,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen w-full h-full">
      <DashboardHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <StatCard label="Total Employ&eacute;s" value="24" icon={<Users className="w-6 h-6 text-blue-600" />} />
        <StatCard label="Nouveaux ce mois" value="4" icon={<UserPlus className="w-6 h-6 text-green-600" />} />
        <StatCard label="&Eacute;v&eacute;nements" value="6" icon={<CalendarDays className="w-6 h-6 text-purple-600" />} />
        <StatCard label="Croissance" value="+62%" icon={<TrendingUp className="w-6 h-6 text-pink-600" />} />
      </div>

      <EmployeeChart />
      <RecentEmployees />
    </div>
  )
}