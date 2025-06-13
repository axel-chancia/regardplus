import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/Appsidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* conteneur principal en flex, pleine hauteur & largeur */}
      <div className="flex h-full w-full">
        {/* Sidebar (hauteur fixée à 100 vh dans AppSidebar) */}
        <AppSidebar />

        {/* Contenu principal, prend tout l’espace restant */}
        <main className="flex-1 h-full w-full overflow-auto p-6 bg-gray-50">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
