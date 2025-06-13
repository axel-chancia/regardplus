"use client"

import { Calendar, Home, Users, Settings, LogOut, LayoutDashboard } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import clsx from "clsx"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Gestion des employés",
    url: "/employes",
    icon: Users,
  },
  {
    title: "Calendrier",
    url: "/calendrier",
    icon: Calendar,
  },
  {
    title: "Paramètres",
    url: "/parametres",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="bg-gray-50 border-r border-gray-200 min-h-screen flex flex-col gap-1 justify-between">
      <SidebarContent>
        <SidebarGroup>
          {/* Titre du menu principal avec icône et mise en forme */}
          <SidebarGroupLabel className="flex items-center gap-2 text-gray-700 text-base font-semibold px-4 pt-6 pb-10">
            <LayoutDashboard className="w-5 h-5 text-blue-600" />
            Menu Principal
          </SidebarGroupLabel>

          {/* Espacement entre le label et les éléments */}
          <SidebarGroupContent className="mt-2 space-y-1">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={clsx(
                        "flex items-center gap-2 px-4 py-2 rounded-md transition-all",
                        "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Bouton Déconnexion */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => {
            // Déconnexion ici
            console.log("Déconnexion")
          }}
          className="w-full flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-100 px-3 py-2 rounded-md transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Déconnexion</span>
        </button>
      </div>
    </Sidebar>
  )
}
