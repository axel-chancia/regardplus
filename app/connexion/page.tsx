import { Button } from "@/app/utilisateurs/utilisateurscomponents/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/connexion/connexioncomponents/components/ui/card"
import { Input } from "@/app/utilisateurs/utilisateurscomponents/ui/input"
import { Label } from "@/app/connexion/connexioncomponents/components/ui/label"

export default function Connexion() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full">
      {/* Colonne gauche : Formulaire */}
      <div className="flex items-center justify-center bg-gray-50 px-4 sm:px-6 py-12">
        <Card className="w-full max-w-md p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-md bg-white ring-1 ring-gray-100">
          <CardHeader className="mb-6 text-center">
            <CardTitle className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Connectez-vous
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Entrez vos informations pour accéder à votre compte.
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-sm text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="mt-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="password" className="text-sm text-gray-700">Mot de passe</Label>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="mt-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 mt-6">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg"
            >
              Se connecter
            </Button>

            <Button
              variant="outline"
              className="w-full bg-white text-black border border-gray-300 hover:bg-gray-100 py-2.5 rounded-lg"
            >
              Connectez-vous avec Google
            </Button>

            <p className="text-sm text-center text-gray-600">
              Vous n’avez pas de compte ?{" "}
              <a href="#" className="text-blue-500 hover:underline">S'inscrire</a>
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Colonne droite : Image */}
      <div className="hidden md:block">
        <img
          src="/case.jpeg"
          alt="Illustration de connexion"
          className="w-full h-170 object-cover rounded-l-none rounded-r-2xl"
        />
      </div>
    </main>
  )
}
