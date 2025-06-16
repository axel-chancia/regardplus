"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  AlertTriangle, 
  RefreshCw, 
  ArrowLeft, 
  Mail,
  Phone,
  MessageCircle,
  Shield,
  QrCode
} from "lucide-react"

export default function PageErreurConnexion() {
  const [typeErreur, setTypeErreur] = useState<'admin' | 'employe' | 'general'>('general')
  const [tentativesRestantes, setTentativesRestantes] = useState(3)

  console.log('Page erreur de connexion chargée');

  useEffect(() => {
    // Récupérer le type d'erreur depuis l'URL
    const urlParams = new URLSearchParams(window.location.search)
    const type = urlParams.get('type') as 'admin' | 'employe' | null
    if (type) {
      setTypeErreur(type)
      console.log('Type d\'erreur détecté:', type);
    }
  }, [])

  const retourConnexion = () => {
    console.log('Retour vers la page de connexion');
    window.location.href = '/connexion'
  }

  const contacterSupport = () => {
    console.log('Redirection vers le support');
    window.location.href = '/demande-assistance'
  }

  const obtenirMessageErreur = () => {
    switch (typeErreur) {
      case 'admin':
        return {
          titre: "Erreur de Connexion Administrateur",
          description: "L'email ou le mot de passe que vous avez saisi est incorrect. Vérifiez vos informations d'identification.",
          icone: <Shield className="w-16 h-16 text-red-500" />,
          conseils: [
            "Vérifiez que votre email est correct",
            "Assurez-vous que le Caps Lock n'est pas activé",
            "Contactez le super administrateur si nécessaire"
          ]
        }
      case 'employe':
        return {
          titre: "Erreur de Scan QR Code",
          description: "Le code QR scanné n'est pas reconnu ou n'est plus valide. Vérifiez votre code QR personnel.",
          icone: <QrCode className="w-16 h-16 text-red-500" />,
          conseils: [
            "Nettoyez l'écran de votre téléphone/tablette",
            "Assurez-vous d'utiliser votre code QR personnel",
            "Vérifiez que votre code QR n'est pas endommagé"
          ]
        }
      default:
        return {
          titre: "Erreur de Connexion",
          description: "Une erreur inattendue s'est produite lors de la connexion. Veuillez réessayer.",
          icone: <AlertTriangle className="w-16 h-16 text-red-500" />,
          conseils: [
            "Vérifiez votre connexion internet",
            "Actualisez la page et réessayez",
            "Contactez le support si le problème persiste"
          ]
        }
    }
  }

  const { titre, description, icone, conseils } = obtenirMessageErreur()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Icône et titre principal */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {icone}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {titre}
          </h1>
          <p className="text-gray-600">
            {description}
          </p>
        </div>

        {/* Carte principale */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg border border-gray-200">
          {/* Compteur de tentatives */}
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-sm font-medium text-yellow-800">
                Tentatives restantes : {tentativesRestantes}
              </span>
            </div>
          </div>

          {/* Conseils de dépannage */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Conseils pour résoudre le problème :
            </h3>
            <ul className="space-y-2">
              {conseils.map((conseil, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{conseil}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            <Button
              onClick={retourConnexion}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Réessayer la Connexion
            </Button>
            
            <Button
              onClick={contacterSupport}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contacter le Support
            </Button>
          </div>
        </div>

        {/* Informations de contact d'urgence */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Besoin d'aide immédiate ?
          </h3>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Phone className="w-5 h-5 mr-3 text-green-600" />
              <div>
                <div className="font-medium">Support Technique</div>
                <div className="text-sm">+241 01 23 45 67</div>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="w-5 h-5 mr-3 text-blue-600" />
              <div>
                <div className="font-medium">Email Support</div>
                <div className="text-sm">support@entreprise.ga</div>
              </div>
            </div>
          </div>
        </div>

        {/* Codes d'erreur pour le support */}
        <div className="mt-6 text-center">
          <div className="text-xs text-gray-500">
            Code d'erreur : {typeErreur.toUpperCase()}_LOGIN_FAILED_{Date.now().toString().slice(-6)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Communiquez ce code au support pour un dépannage plus rapide
          </div>
        </div>

        {/* Lien de retour */}
        <div className="mt-8 text-center">
          <a 
            href="/connexion" 
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Retour à la page de connexion
          </a>
        </div>
      </div>
    </div>
  )
}