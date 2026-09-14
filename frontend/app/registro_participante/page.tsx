import Link from "next/link"
import { ArrowLeft, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function RegistroPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <section className="w-full max-w-lg">
        <Link href="/" className="mb-7 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
          <ArrowLeft className="size-4" />
          Volver al inicio
        </Link>

        <Card>
          <CardHeader>
            <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Trophy className="size-5" />
            </div>
            <CardTitle className="text-2xl font-bold">Registro de participante</CardTitle>
            <CardDescription>Completa tus datos para solicitar un lugar en el torneo.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="nombre" className="text-sm font-medium">Nombre completo</label>
                <Input id="nombre" name="nombre" placeholder="Tu nombre" autoComplete="name" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="gamertag" className="text-sm font-medium">Gamertag</label>
                <Input id="gamertag" name="gamertag" placeholder="Tu nombre de jugador" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Correo electrónico</label>
                <Input id="email" name="email" type="email" placeholder="nombre@correo.com" autoComplete="email" required />
              </div>
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input type="checkbox" required className="mt-1 size-4 rounded border-input accent-primary" />
                Acepto las reglas y condiciones del torneo.
              </label>
              <Button type="submit" className="w-full">Enviar registro</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
