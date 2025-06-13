import Image from 'next/image'
import { Button } from "@/app/utilisateurs/utilisateurscomponents/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/connexion/connexioncomponents/components/ui/card"
import { Input } from "@/app/utilisateurs/utilisateurscomponents/ui/input"
import { Label } from "@/app/connexion/connexioncomponents/components/ui/label"

export default function Connexion() {
  return (
    <main className="grid grid-cols-2 h-screen">
      <div className="flex items-center justify-center bg-gray-400 w-full h-full">
        <Image
        src="/QRCodes.png"
        alt="womanphone"
        
        width={350}
        height={350}
        className='w-full h-full'
      />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm grid gap-2">
        <CardHeader>
          <CardTitle>Connectez-vous à votre compte</CardTitle>
          <CardDescription>
          </CardDescription>
          <CardAction>
            <Button variant="link">S'inscrire</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Mot de passeor oublié ?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full  bg-blue-500  text-white hover:bg-blue-500 hover:text-white">
            Se connecter
          </Button>
          <Button variant="outline" className="w-full">
            Connectez-vous avec Google
          </Button>
        </CardFooter>
      </Card>
      </div>
     </main>
  )
}
