"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  MessageCircle, 
  User, 
  Mail, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Send,
  ArrowLeft,
  Phone,
  Calendar,
  QrCode
} from "lucide-react"
import { toast } from "sonner"

type TypeDemande = 'qr_perdu' | 'scan_oublie' | 'probleme_technique' | 'horaire_modification' | 'autre'

export default function PageDemandeAssistance() {
  const [etapeActuelle, setEtapeActuelle] = useState<'selection' | 'formulaire' | 'confirmation'>('selection')
  const [typeDemande, setTypeDemande] = useState<TypeDemande | null>(null)
  const [envoiEnCours, setEnvoiEnCours] = useState(false)
  const [donneesFormulaire, setDonneesFormulaire] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    dateIncident: '',
    heureIncident: '',
    description: '',
    urgence: 'normale' as 'faible' | 'normale' | 'elevee'
  })

  console.log('Page demande d\'assistance chargée');

  const typesDemandes = [
    {
      id: 'qr_perdu' as TypeDemande,
      titre: 'QR Code Perdu/Endommagé',
      description: 'Mon code QR personnel est perdu, endommagé ou illisible',
      icone: <QrCode className="w-8 h-8 text-red-600" />,
      couleur: 'border-red-200 hover:bg-red-50'
    },
    {
      id: 'scan_oublie' as TypeDemande,
      titre: 'Oubli de Scan',
      description: 'J\'ai oublié de scanner à l\'arrivée ou à la sortie',
      icone: <Clock className="w-8 h-8 text-orange-600" />,
      couleur: 'border-orange-200 hover:bg-orange-50'
    },
    {
      id: 'probleme_technique' as TypeDemande,
      titre: 'Problème Technique',
      description: 'Dysfonctionnement du système ou erreur technique',
      icone: <AlertTriangle className="w-8 h-8 text-yellow-600" />,
      couleur: 'border-yellow-200 hover:bg-yellow-50'
    },
    {
      id: 'horaire_modification' as TypeDemande,
      titre: 'Modification d\'Horaires',
      description: 'Demande de changement d\'horaires ou de groupe',
      icone: <Calendar className="w-8 h-8 text-blue-600" />,
      couleur: 'border-blue-200 hover:bg-blue-50'
    },
    {
      id: 'autre' as TypeDemande,
      titre: 'Autre Demande',
      description: 'Autre type de demande ou question',
      icone: <MessageCircle className="w-8 h-8 text-purple-600" />,
      couleur: 'border-purple-200 hover:bg-purple-50'
    }
  ]

  const selectionnerType = (type: TypeDemande) => {
    console.log('Type de demande sélectionné:', type);
    setTypeDemande(type)
    setEtapeActuelle('formulaire')
  }

  const soumettreFormulaire = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Soumission du formulaire d\'assistance:', { typeDemande, donneesFormulaire });
    
    setEnvoiEnCours(true)
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.success('Votre demande d\'assistance a été envoyée avec succès !')
    setEtapeActuelle('confirmation')
    setEnvoiEnCours(false)
  }

  const obtenirTitrePage = () => {
    switch (etapeActuelle) {
      case 'selection':
        return 'Demande d\'Assistance'
      case 'formulaire':
        return typesDemandes.find(t => t.id === typeDemande)?.titre || 'Formulaire'
      case 'confirmation':
        return 'Demande Envoyée'
      default:
        return 'Assistance'
    }
  }

  const genererNumeroTicket = () => {
    return `AST${Date.now().toString().slice(-6)}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* En-tête avec navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {obtenirTitrePage()}
              </h1>
              <p className="mt-2 text-gray-600">
                Nous sommes là pour vous aider à résoudre vos problèmes
              </p>
            </div>
            {etapeActuelle !== 'selection' && (
              <Button
                variant="outline"
                onClick={() => {
                  if (etapeActuelle === 'formulaire') {
                    setEtapeActuelle('selection')
                    setTypeDemande(null)
                  } else {
                    window.location.href = '/connexion'
                  }
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            )}
          </div>
          
          {/* Indicateur d'étapes */}
          <div className="mt-6 flex items-center space-x-4">
            <div className={`flex items-center ${etapeActuelle === 'selection' ? 'text-blue-600' : 'text-green-600'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                etapeActuelle === 'selection' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
              }`}>
                {etapeActuelle === 'selection' ? '1' : '✓'}
              </div>
              <span className="ml-2 text-sm font-medium">Sélection</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center ${
              etapeActuelle === 'formulaire' ? 'text-blue-600' : 
              etapeActuelle === 'confirmation' ? 'text-green-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                etapeActuelle === 'formulaire' ? 'bg-blue-100 text-blue-600' : 
                etapeActuelle === 'confirmation' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {etapeActuelle === 'confirmation' ? '✓' : '2'}
              </div>
              <span className="ml-2 text-sm font-medium">Formulaire</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center ${etapeActuelle === 'confirmation' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                etapeActuelle === 'confirmation' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {etapeActuelle === 'confirmation' ? '✓' : '3'}
              </div>
              <span className="ml-2 text-sm font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Étape 1: Sélection du type de demande */}
        {etapeActuelle === 'selection' && (
          <div className="space-y-4">
            <p className="text-gray-600 mb-6">
              Sélectionnez le type de problème ou de demande qui correspond à votre situation :
            </p>
            
            {typesDemandes.map((type) => (
              <div
                key={type.id}
                onClick={() => selectionnerType(type.id)}
                className={`bg-white p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${type.couleur}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {type.icone}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {type.titre}
                    </h3>
                    <p className="text-gray-600">
                      {type.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Étape 2: Formulaire de demande */}
        {etapeActuelle === 'formulaire' && typeDemande && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                {typesDemandes.find(t => t.id === typeDemande)?.icone}
                <h2 className="text-xl font-semibold text-gray-900">
                  {typesDemandes.find(t => t.id === typeDemande)?.titre}
                </h2>
              </div>
            </div>

            <form onSubmit={soumettreFormulaire} className="space-y-6">
              {/* Informations personnelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      value={donneesFormulaire.prenom}
                      onChange={(e) => setDonneesFormulaire({...donneesFormulaire, prenom: e.target.value})}
                      className="pl-10"
                      placeholder="Votre prénom"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom *
                  </label>
                  <Input
                    type="text"
                    value={donneesFormulaire.nom}
                    onChange={(e) => setDonneesFormulaire({...donneesFormulaire, nom: e.target.value})}
                    placeholder="Votre nom"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      value={donneesFormulaire.email}
                      onChange={(e) => setDonneesFormulaire({...donneesFormulaire, email: e.target.value})}
                      className="pl-10"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="tel"
                      value={donneesFormulaire.telephone}
                      onChange={(e) => setDonneesFormulaire({...donneesFormulaire, telephone: e.target.value})}
                      className="pl-10"
                      placeholder="+241 01 23 45 67"
                    />
                  </div>
                </div>
              </div>

              {/* Détails de l'incident */}
              {(typeDemande === 'scan_oublie' || typeDemande === 'probleme_technique') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de l'incident *
                    </label>
                    <Input
                      type="date"
                      value={donneesFormulaire.dateIncident}
                      onChange={(e) => setDonneesFormulaire({...donneesFormulaire, dateIncident: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heure approximative
                    </label>
                    <Input
                      type="time"
                      value={donneesFormulaire.heureIncident}
                      onChange={(e) => setDonneesFormulaire({...donneesFormulaire, heureIncident: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {/* Niveau d'urgence */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau d'urgence
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'faible', label: 'Faible', couleur: 'border-green-200 text-green-700' },
                    { value: 'normale', label: 'Normale', couleur: 'border-blue-200 text-blue-700' },
                    { value: 'elevee', label: 'Élevée', couleur: 'border-red-200 text-red-700' }
                  ].map(urgence => (
                    <label key={urgence.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="urgence"
                        value={urgence.value}
                        checked={donneesFormulaire.urgence === urgence.value}
                        onChange={(e) => setDonneesFormulaire({...donneesFormulaire, urgence: e.target.value as any})}
                        className="sr-only"
                      />
                      <div className={`border-2 rounded-lg p-3 text-center transition-all ${
                        donneesFormulaire.urgence === urgence.value 
                          ? `${urgence.couleur} bg-opacity-10` 
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}>
                        {urgence.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description détaillée */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description détaillée *
                </label>
                <textarea
                  value={donneesFormulaire.description}
                  onChange={(e) => setDonneesFormulaire({...donneesFormulaire, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Décrivez votre problème ou demande en détail..."
                  required
                />
              </div>

              {/* Boutons d'action */}
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEtapeActuelle('selection')}
                  className="flex-1"
                >
                  Retour
                </Button>
                <Button
                  type="submit"
                  disabled={envoiEnCours}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {envoiEnCours ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Envoi...
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer la Demande
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Étape 3: Confirmation */}
        {etapeActuelle === 'confirmation' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Demande Envoyée avec Succès !
              </h2>
              <p className="text-gray-600">
                Votre demande d'assistance a été transmise à notre équipe support.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Détails de votre demande
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Numéro de ticket :</span>
                  <span className="font-mono font-medium text-blue-600">{genererNumeroTicket()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type :</span>
                  <span className="font-medium">{typesDemandes.find(t => t.id === typeDemande)?.titre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Priorité :</span>
                  <span className={`font-medium capitalize ${
                    donneesFormulaire.urgence === 'elevee' ? 'text-red-600' :
                    donneesFormulaire.urgence === 'normale' ? 'text-blue-600' : 'text-green-600'
                  }`}>
                    {donneesFormulaire.urgence === 'elevee' ? 'Élevée' : 
                     donneesFormulaire.urgence === 'normale' ? 'Normale' : 'Faible'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date de soumission :</span>
                  <span className="font-medium">{new Date().toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Prochaines étapes :</h4>
              <ul className="text-sm text-blue-800 space-y-1 text-left">
                <li>• Vous recevrez un email de confirmation dans les prochaines minutes</li>
                <li>• Notre équipe traitera votre demande sous 24-48h ouvrables</li>
                <li>• Vous serez contacté(e) par email ou téléphone selon l'urgence</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => window.location.href = '/connexion'}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Retour à la page de connexion
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setEtapeActuelle('selection')
                  setTypeDemande(null)
                  setDonneesFormulaire({
                    nom: '', prenom: '', email: '', telephone: '',
                    dateIncident: '', heureIncident: '', description: '', urgence: 'normale'
                  })
                }}
                className="w-full"
              >
                Faire une nouvelle demande
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}