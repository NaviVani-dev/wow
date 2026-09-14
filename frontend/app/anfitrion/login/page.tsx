"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import { iniciarSesion } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AnfitrionLoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError("");
    setSubmitting(true);
    try {
      await iniciarSesion({ correo: String(form.get("correo") ?? "").trim(), password: String(form.get("password") ?? "") });
      router.replace("/anfitrion");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo iniciar sesión.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <section className="w-full max-w-md">
        <Link href="/" className="mb-7 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"><ArrowLeft className="size-4" />Volver al inicio</Link>
        <Card><CardHeader><div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground"><ShieldCheck className="size-5" /></div><CardTitle className="text-2xl font-bold">Acceso de administrador</CardTitle><CardDescription>Ingresa tus credenciales para administrar el torneo.</CardDescription></CardHeader>
          <CardContent><form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2"><label htmlFor="admin-email" className="text-sm font-medium">Correo electrónico</label><Input id="admin-email" name="correo" type="email" placeholder="admin@torneo.com" autoComplete="email" required /></div>
            <div className="space-y-2"><label htmlFor="password" className="text-sm font-medium">Contraseña</label><Input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" required /></div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={submitting}>{submitting ? "Verificando…" : "Iniciar sesión"}</Button>
          </form></CardContent>
        </Card>
      </section>
    </main>
  );
}
