"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Shield, 
  Users, 
  Calendar, 
  BarChart3,
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react"

export default function PageBienvenueAdmin() {
  const [animationTerminee, setAnimationTerminee] = useState(false)

  console.log("Page bienvenue admin chargée")

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationTerminee(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const continuerVersTableauDeBord = () => {
    console.log("Redirection vers le tableau de bord admin")
    window.location.href = "/admin"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* En-tête de bienvenue */}
          <div className="text-center mb-12">
            <div className={`transition-all duration-1000 ${animationTerminee ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Bienvenue, Administrateur&nbsp;!
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Vous êtes maintenant connecté à votre espace d&rsquo;administration. 
                Gérez efficacement votre entreprise avec nos outils avancés.
              </p>
            </div>
          </div>

          {/* Cartes des fonctionnalités */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 transition-all duration-700 delay-200 ${animationTerminee ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 ml-3">
                  Tableau de Bord
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Visualisez les statistiques en temps réel de votre entreprise avec des graphiques interactifs.
              </p>
              <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-1" />
                Prêt à utiliser
              </div>
            </div>

            <div className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 transition-all duration-700 delay-300 ${animationTerminee ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 ml-3">
                  Gestion Employés
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Gérez vos équipes, consultez les performances et organisez les horaires de travail.
              </p>
              <div className="mt-4 flex items-center text-green-600 text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-1" />
                Prêt à utiliser
              </div>
            </div>

            <div className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 transition-all duration-700 delay-400 ${animationTerminee ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 ml-3">
                  Planning
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Organisez les calendriers, créez des événements et gérez les planning par groupes.
              </p>
              <div className="mt-4 flex items-center text-purple-600 text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-1" />
                Prêt à utiliser
              </div>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8 transition-all duration-700 delay-500 ${animationTerminee ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
              Aperçu Rapide
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24</div>
                <div className="text-sm text-gray-600">Employés Actifs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-sm text-gray-600">Taux Présence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">6</div>
                <div className="text-sm text-gray-600">Événements</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">+12%</div>
                <div className="text-sm text-gray-600">Croissance</div>
              </div>
            </div>
          </div>

          {/* Nouvelles fonctionnalités */}
          <div className={`bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white mb-8 transition-all duration-700 delay-600 ${animationTerminee ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  🎉 Nouvelles Fonctionnalités
                </h3>
                <p className="text-blue-100">
                  Scan QR amélioré, rapports automatiques et notifications en temps réel
                </p>
              </div>
              <div className="hidden md:block">
                <Clock className="w-12 h-12 text-blue-200" />
              </div>
            </div>
          </div>

          {/* Bouton d'action principal */}
          <div className={`text-center transition-all duration-700 delay-700 ${animationTerminee ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <Button
              onClick={continuerVersTableauDeBord}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Accéder au Tableau de Bord
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-gray-500 text-sm mt-4">
              Vous serez redirigé vers votre espace d&rsquo;administration
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Besoin d&rsquo;aide ? Consultez notre{" "}
              <a href="/aide-admin" className="text-blue-600 hover:text-blue-700 underline">
                guide administrateur
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
