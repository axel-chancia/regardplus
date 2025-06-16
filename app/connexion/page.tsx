"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { QRScanner } from "@/components/ui/qr-scanner"
import { useAppStore } from "@/store/useAppStore"
import { 
  Mail, 
  Lock, 
  QrCode, 
  Building2,
  Shield,
  Users,
  Eye,
  EyeOff
} from "lucide-react"
import { toast } from "sonner"

export default function PageConnexion() {
  const [modeConnexion, setModeConnexion] = useState<'admin' | 'employe'>('employe')
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false)
  const [afficherScanQR, setAfficherScanQR] = useState(false)
  const [donneesFormulaire, setDonneesFormulaire] = useState({
    email: '',
    motDePasse: ''
  })
  const [enCours, setEnCours] = useState(false)

  const { admins, employees } = useAppStore()

  console.log('Page de connexion chargée');

  const gererConnexionAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Tentative de connexion admin:', donneesFormulaire.email);
    setEnCours(true)

    // Simulation d'une vérification
    await new Promise(resolve => setTimeout(resolve, 1500))

    const adminTrouve = admins.find(admin => 
      admin.email === donneesFormulaire.email && admin.statut === 'actif'
    )

    if (adminTrouve) {
      console.log('Connexion admin réussie:', adminTrouve);
      toast.success(`Bienvenue ${adminTrouve.prenom} ${adminTrouve.nom}!`)
      window.location.href = '/bienvenue-admin'
    } else {
      console.log('Échec connexion admin');
      toast.error('Email ou mot de passe incorrect')
      window.location.href = '/erreur-connexion?type=admin'
    }

    setEnCours(false)
  }

  const gererScanQREmploye = (codeQR: string) => {
    console.log('QR Code employé scanné:', codeQR);
    
    const employeTrouve = employees.find(emp => emp.qrCode === codeQR)
    
    if (employeTrouve) {
      console.log('Scan employé réussi:', employeTrouve);
      toast.success(`Bienvenue ${employeTrouve.prenom} ${employeTrouve.nom}!`)
      window.location.href = '/bienvenue-employe'
    } else {
      console.log('Échec scan employé');
      toast.error('Code QR non reconnu')
      window.location.href = '/erreur-connexion?type=employe'
    }
    
    setAfficherScanQR(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Section Gauche - Image et Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="flex flex-col justify-center items-center p-12 text-white">
          <div className="max-w-md text-center space-y-6">
            <Building2 className="w-20 h-20 mx-auto text-blue-200" />
            <h1 className="text-4xl font-bold">
              Contrôle QR Gabon
            </h1>
            <p className="text-xl text-blue-100">
              Système moderne de gestion et contrôle des employés
            </p>
            <div className="space-y-4 pt-6">
              <div className="flex items-center space-x-3 text-blue-100">
                <Shield className="w-5 h-5" />
                <span>Sécurisé et fiable</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-100">
                <Users className="w-5 h-5" />
                <span>Gestion complète des équipes</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-100">
                <QrCode className="w-5 h-5" />
                <span>Technologie QR avancée</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Droite - Formulaires de Connexion */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Connexion
            </h2>
            <p className="mt-2 text-gray-600">
              Accédez à votre espace de travail
            </p>
          </div>

          {/* Sélecteur de Mode */}
          <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
            <button
              onClick={() => setModeConnexion('employe')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                modeConnexion === 'employe'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Employé
            </button>
            <button
              onClick={() => setModeConnexion('admin')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                modeConnexion === 'admin'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Shield className="w-4 h-4 inline mr-2" />
              Administrateur
            </button>
          </div>

          {/* Connexion Employé - QR Code */}
          {modeConnexion === 'employe' && (
            <div className="space-y-6">
              <div className="text-center">
                <QrCode className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Scan QR Code
                </h3>
                <p className="text-gray-600 mb-6">
                  Utilisez votre code QR personnel pour vous connecter
                </p>
                <Button
                  onClick={() => setAfficherScanQR(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Scanner mon QR Code
                </Button>
              </div>
              
              <div className="text-center">
                <a 
                  href="/demande-assistance" 
                  className="text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  Problème avec votre QR Code ?
                </a>
              </div>
            </div>
          )}

          {/* Connexion Administrateur - Formulaire */}
          {modeConnexion === 'admin' && (
            <form onSubmit={gererConnexionAdmin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email administrateur
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    value={donneesFormulaire.email}
                    onChange={(e) => setDonneesFormulaire({
                      ...donneesFormulaire, 
                      email: e.target.value
                    })}
                    className="pl-10 py-3"
                    placeholder="admin@entreprise.ga"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type={afficherMotDePasse ? "text" : "password"}
                    value={donneesFormulaire.motDePasse}
                    onChange={(e) => setDonneesFormulaire({
                      ...donneesFormulaire, 
                      motDePasse: e.target.value
                    })}
                    className="pl-10 pr-10 py-3"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setAfficherMotDePasse(!afficherMotDePasse)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {afficherMotDePasse ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={enCours}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                {enCours ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Connexion...
                  </div>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Se connecter
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Liens utiles */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <div className="space-y-2">
              <div>
                <a href="/demande-assistance" className="text-blue-600 hover:text-blue-700 underline">
                  Signaler un problème
                </a>
              </div>
              <div className="text-xs">
                © 2024 Contrôle QR Gabon - Tous droits réservés
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Scanner QR */}
      {afficherScanQR && (
        <QRScanner
          onClose={() => setAfficherScanQR(false)}
          onScanSuccess={gererScanQREmploye}
        />
      )}
    </div>
  )
}