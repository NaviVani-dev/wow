import Link from "next/link"
import { ArrowLeft, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function AnfitrionLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <section className="w-full max-w-md">
        <Link href="/" className="mb-7 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
          <ArrowLeft className="size-4" />
          Volver al inicio
        </Link>

        <Card>
          <CardHeader>
            <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" />
            </div>
            <CardTitle className="text-2xl font-bold">Acceso de administrador</CardTitle>
            <CardDescription>Ingresa tus credenciales para administrar el torneo.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action="/anfitrion" className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="admin-email" className="text-sm font-medium">Correo electrónico</label>
                <Input id="admin-email" name="email" type="email" placeholder="admin@torneo.com" autoComplete="email" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Contraseña</label>
                <Input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" required />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" name="remember" className="size-4 rounded border-input accent-primary" />
                  Recordarme
                </label>
                <button type="button" className="text-primary hover:underline">¿Olvidaste tu contraseña?</button>
              </div>
              <Button type="submit" className="w-full">Iniciar sesión</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
