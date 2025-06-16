"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Building2, 
  Shield, 
  Users, 
  QrCode,
  ArrowRight,
  CheckCircle
} from "lucide-react"

export default function PageAccueil() {
  console.log('Page d\'accueil chargée');

  useEffect(() => {
    // Redirection automatique après 3 secondes
    const timer = setTimeout(() => {
      window.location.href = '/connexion'
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const allerVersConnexion = () => {
    console.log('Redirection manuelle vers la connexion');
    window.location.href = '/connexion'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <Building2 className="w-24 h-24 mx-auto mb-6 text-blue-200" />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Contrôle QR Gabon
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Système moderne de gestion et contrôle des employés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6">
              <QrCode className="w-12 h-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">Scan QR Avancé</h3>
              <p className="text-blue-100 text-sm">
                Technologie de scan QR rapide et fiable pour un contrôle efficace
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">Gestion Complète</h3>
              <p className="text-blue-100 text-sm">
                Gérez vos équipes, horaires et performances en temps réel
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6">
              <Shield className="w-12 h-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">Sécurisé</h3>
              <p className="text-blue-100 text-sm">
                Protection avancée des données et accès sécurisé
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-4 text-blue-100">
              <CheckCircle className="w-5 h-5" />
              <span>Interface intuitive et moderne</span>
            </div>
            <div className="flex items-center justify-center space-x-4 text-blue-100">
              <CheckCircle className="w-5 h-5" />
              <span>Rapports et statistiques en temps réel</span>
            </div>
            <div className="flex items-center justify-center space-x-4 text-blue-100">
              <CheckCircle className="w-5 h-5" />
              <span>Support technique 24/7</span>
            </div>
          </div>

          <div className="mt-12">
            <Button
              onClick={allerVersConnexion}
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Accéder à la plateforme
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <div className="mt-6 text-blue-200 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-200"></div>
                <span>Redirection automatique dans quelques secondes...</span>
              </div>
              <p className="mt-2">
                Ou cliquez sur le bouton ci-dessus pour accéder immédiatement
              </p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-blue-500 border-opacity-30">
            <p className="text-blue-200 text-sm">
              © 2024 Regardplus Gabon - Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}