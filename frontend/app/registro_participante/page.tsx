"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { ArrowLeft, Trophy } from "lucide-react"

import { registrarJugador } from "@/lib/api"
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
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus(null)
    setIsSubmitting(true)
    const formElement = event.currentTarget
    const form = new FormData(formElement)

    try {
      await registrarJugador({
        nombre: String(form.get("nombre") ?? "").trim(),
        gamertag: String(form.get("gamertag") ?? "").trim(),
        correo: String(form.get("email") ?? "").trim(),
      })
      formElement.reset()
      setStatus({ type: "success", message: "Tu registro fue enviado correctamente." })
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Ocurrió un error al enviar el registro." })
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <form className="space-y-5" onSubmit={handleSubmit}>
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
              {status && <p role="status" className={status.type === "success" ? "text-sm text-green-700" : "text-sm text-destructive"}>{status.message}</p>}
              <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Enviando..." : "Enviar registro"}</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
