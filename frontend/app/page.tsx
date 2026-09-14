"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Activity, Gamepad2, Home, ShieldCheck, Target, Trophy, UserPlus, Users } from "lucide-react";
import { usePathname } from "next/navigation";

import { obtenerEstadisticas, obtenerRanking, type Estadisticas, type PuntuacionRanking } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Inicio", href: "/", icon: Home },
  { title: "Jugadores", href: "/anfitrion/jugadores", icon: UserPlus },
  { title: "Juegos", href: "/anfitrion/juegos", icon: Gamepad2 },
];

export default function HomePage() {
  const pathname = usePathname();
  const [stats, setStats] = useState<Estadisticas | null>(null);
  const [ranking, setRanking] = useState<PuntuacionRanking[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    void Promise.all([obtenerEstadisticas(), obtenerRanking()])
      .then(([statsResponse, rankingResponse]) => {
        setStats(statsResponse.estadisticas);
        setRanking(rankingResponse.ranking);
      })
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : "No se pudieron cargar las estadísticas."));
  }, []);

  const metrics = [
    { label: "Jugadores", value: stats?.total_jugadores, icon: Users },
    { label: "Videojuegos", value: stats?.total_videojuegos, icon: Gamepad2 },
    { label: "Puntuaciones", value: stats?.total_puntuaciones, icon: Target },
    { label: "Promedio", value: stats ? Number(stats.puntuacion_promedio).toFixed(2) : undefined, icon: Trophy },
  ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4"><Link href="/" className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><ShieldCheck className="size-4" /></span><span className="font-semibold">Torneo Gamer</span></Link></SidebarHeader>
        <SidebarContent><SidebarGroup><SidebarGroupLabel>Navegación</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>{navigation.map((item) => <SidebarMenuItem key={item.href}><SidebarMenuButton render={<Link href={item.href} />} isActive={pathname === item.href} tooltip={item.title}><item.icon /><span>{item.title}</span></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroupContent></SidebarGroup></SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center gap-3 border-b px-4 sm:px-6"><SidebarTrigger /><span className="flex items-center gap-2 text-sm text-muted-foreground"><Activity className="size-4 text-primary" />Dashboard</span></header>
        <main className="flex-1 p-4 sm:p-6"><div className="mx-auto max-w-6xl space-y-6">
          <div><p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Resumen</p><h1 className="text-3xl font-bold tracking-tight">Estadísticas del torneo</h1></div>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{metrics.map((metric) => <Card key={metric.label}><CardHeader className="pb-3"><div className="flex items-center justify-between"><CardDescription>{metric.label}</CardDescription><metric.icon className="size-4 text-primary" /></div></CardHeader><CardContent><div className="text-3xl font-bold">{metric.value ?? "—"}</div></CardContent></Card>)}</div>
          <Card><CardHeader><CardTitle>Clasificación</CardTitle><CardDescription>Los mejores estan en la cima.</CardDescription></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b text-muted-foreground"><tr><th className="p-2">POSICIÓN</th><th className="p-2">JUGADOR</th><th className="p-2">VIDEOJUEGO</th><th className="p-2 text-right">PUNTUACIÓN</th></tr></thead><tbody>{ranking.length ? ranking.map((entry) => <tr key={`${entry.posicion}-${entry.jugador}-${entry.videojuego}`} className="border-b"><td className="p-2"><Badge variant={entry.posicion === 1 ? "default" : "secondary"}>#{entry.posicion}</Badge></td><td className="p-2 font-medium">{entry.jugador}</td><td className="p-2">{entry.videojuego}</td><td className="p-2 text-right font-semibold">{entry.puntuacion}</td></tr>) : <tr><td className="p-3 text-muted-foreground" colSpan={4}>Aún no hay puntuaciones registradas.</td></tr>}</tbody></table></div></CardContent></Card>
        </div></main>
      </SidebarInset>
    </SidebarProvider>
  );
}
