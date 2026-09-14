"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Gamepad2, Home, ShieldCheck, UserPlus } from "lucide-react";
import { usePathname } from "next/navigation";

import { crearVideojuego } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Inicio", href: "/", icon: Home },
  { title: "Jugadores", href: "/anfitrion/jugadores", icon: UserPlus },
  { title: "Juegos", href: "/anfitrion/juegos", icon: Gamepad2 },
];

export default function AnfitrionJuegosPage() {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      await crearVideojuego({
        nombre: String(form.get("nombre") ?? "").trim(),
        genero: String(form.get("genero") ?? "").trim(),
      });
      formElement.reset();
      setStatus({ type: "success", message: "El juego fue creado correctamente." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Ocurrió un error al crear el juego.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="size-4" />
            </div>
            <span className="truncate font-semibold">Torneo Gamer</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton render={<Link href={item.href} />} isActive={pathname === item.href} tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4 text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
          <Link href="/" className="flex items-center gap-2"><Home className="size-4" />Volver al inicio</Link>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 items-center gap-3 border-b px-4 sm:px-6">
          <SidebarTrigger />
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Gamepad2 className="size-4 text-primary" />Juegos</div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Crear juego</CardTitle>
                <CardDescription>Agrega una nueva categoría al torneo.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="nombre" className="text-sm font-medium">Nombre del juego</label>
                    <Input id="nombre" name="nombre" placeholder="Ej. Rocket League" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="genero" className="text-sm font-medium">Género</label>
                    <Input id="genero" name="genero" placeholder="Ej. Deportes" required />
                  </div>
                  {status && (
                    <p role="status" className={status.type === "success" ? "text-sm text-green-700" : "text-sm text-destructive"}>
                      {status.message}
                    </p>
                  )}
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Creando..." : "Crear juego"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
