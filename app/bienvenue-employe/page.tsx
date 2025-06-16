"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  User, 
  Clock, 
  Calendar, 
  CheckCircle,
  ArrowRight,
  MapPin,
  Coffee,
  Target,
  Smile
} from "lucide-react"

export default function PageBienvenueEmploye() {
  const [animationTerminee, setAnimationTerminee] = useState(false)
  const [heureActuelle, setHeureActuelle] = useState(new Date())

  console.log('Page bienvenue employé chargée');

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationTerminee(true)
    }, 1000)

    const intervalleHeure = setInterval(() => {
      setHeureActuelle(new Date())
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(intervalleHeure)
    }
  }, [])

  const continuerVersTableauDeBord = () => {
    console.log('Redirection vers le tableau de bord employé');
    window.location.href = '/employe-dashboard'
  }

  const obtenirSalutation = () => {
    const heure = heureActuelle.getHours()
    if (heure < 12) return "Bonjour"
    if (heure < 18) return "Bon après-midi"
    return "Bonsoir"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* En-tête de bienvenue */}
          <div className="text-center mb-12">
            <div className={`transition-all duration-1000 ${animationTerminee ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
                <User className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {obtenirSalutation()}, Jean !
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connexion réussie ! Vous êtes maintenant enregistré(e) dans le système. 
                Bonne journée de travail !
              </p>
            </div>
          </div>

          {/* Informations de connexion */}
          <div className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8 transition-all duration-700 delay-200 ${animationTerminee ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                Connexion Enregistrée
              </h3>
              <div className="text-sm text-gray-500">
                {heureActuelle.toLocaleTimeString('fr-FR')}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Heure d'arrivée</div>
                  <div className="font-semibold">{heureActuelle.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Date</div>
                  <div className="font-semibold">{heureActuelle.toLocaleDateString('fr-FR')}</div>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-red-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Localisation</div>
                  <div className="font-semibold">Bureau Principal</div>
                </div>
              </div>
            </div>
          </div>

          {/* Cartes d'informations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 transition-all duration-700 delay-300 ${animationTerminee ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 ml-3">
                  Vos Objectifs Aujourd'hui
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Compléter 3 tâches prioritaires</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Participer à la réunion équipe (14h)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Finaliser le rapport mensuel</span>
                </div>
              </div>
            </div>

            <div className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 transition-all duration-700 delay-400 ${animationTerminee ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 ml-3">
                  Votre Planning
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                  <span className="font-medium">Horaires</span>
                  <span className="text-gray-600">08:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                  <span className="font-medium">Groupe</span>
                  <span className="text-blue-600 font-medium">Groupe 1</span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                  <span className="font-medium">Pause déjeuner</span>
                  <span className="text-gray-600">12:00 - 13:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message motivant */}
          <div className={`bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white mb-8 transition-all duration-700 delay-500 ${animationTerminee ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Smile className="w-6 h-6 mr-2" />
                  Excellente Performance !
                </h3>
                <p className="text-green-100">
                  Votre taux de présence ce mois : 95% • Continue comme ça ! 🎯
                </p>
              </div>
              <div className="hidden md:block">
                <Coffee className="w-12 h-12 text-green-200" />
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8 transition-all duration-700 delay-600 ${animationTerminee ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Actions Rapides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="p-4 h-auto flex flex-col items-center space-y-2 hover:bg-blue-50 border-blue-200"
              >
                <Clock className="w-6 h-6 text-blue-600" />
                <span className="text-sm">Marquer Pause</span>
              </Button>
              <Button
                variant="outline"
                className="p-4 h-auto flex flex-col items-center space-y-2 hover:bg-green-50 border-green-200"
              >
                <Calendar className="w-6 h-6 text-green-600" />
                <span className="text-sm">Voir Planning</span>
              </Button>
              <Button
                variant="outline"
                className="p-4 h-auto flex flex-col items-center space-y-2 hover:bg-orange-50 border-orange-200"
                onClick={() => window.location.href = '/demande-assistance'}
              >
                <User className="w-6 h-6 text-orange-600" />
                <span className="text-sm">Aide/Support</span>
              </Button>
            </div>
          </div>

          {/* Bouton de continuation */}
          <div className={`text-center transition-all duration-700 delay-700 ${animationTerminee ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <Button
              onClick={continuerVersTableauDeBord}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Voir Mon Espace
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-gray-500 text-sm mt-4">
              N'oubliez pas de scanner à la sortie en fin de journée !
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Un problème ? Contactez l'{" "}
              <a href="/demande-assistance" className="text-green-600 hover:text-green-700 underline">
                support technique
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}