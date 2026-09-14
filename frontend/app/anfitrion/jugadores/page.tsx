"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Gamepad2, Home, Search, ShieldCheck, UserPlus, Users } from "lucide-react";
import { usePathname } from "next/navigation";

import { obtenerJugadores, obtenerVideojuegos, registrarPuntuacion, type Jugador, type Videojuego } from "@/lib/api";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Inicio", href: "/", icon: Home },
  { title: "Jugadores", href: "/anfitrion/jugadores", icon: UserPlus },
  { title: "Juegos", href: "/anfitrion/juegos", icon: Gamepad2 },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-MX", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(value));
}

export default function AnfitrionJugadoresPage() {
  const pathname = usePathname();
  const [players, setPlayers] = useState<Jugador[]>([]);
  const [allPlayers, setAllPlayers] = useState<Jugador[]>([]);
  const [games, setGames] = useState<Videojuego[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [score, setScore] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadPlayers = async (query = "") => {
    setLoading(true);
    try {
      const response = await obtenerJugadores(query);
      setPlayers(response.jugadores);
      if (!query.trim()) setAllPlayers(response.jugadores);
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "No se pudieron cargar los jugadores." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void Promise.resolve().then(() => loadPlayers());
    void obtenerVideojuegos()
      .then((response) => setGames(response.videojuegos))
      .catch((error) => setMessage({ type: "error", text: error instanceof Error ? error.message : "No se pudieron cargar los videojuegos." }));
  }, []);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void loadPlayers(search);
  };

  const handleScore = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setSubmitting(true);
    try {
      await registrarPuntuacion({ jugador: Number(selectedPlayer), videojuego: Number(selectedGame), puntuacion: Number(score) });
      setScore("");
      setMessage({ type: "success", text: "La puntuación fue registrada correctamente." });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "No se pudo registrar la puntuación." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4"><Link href="/" className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><ShieldCheck className="size-4" /></span><span className="font-semibold">Torneo Gamer</span></Link></SidebarHeader>
        <SidebarContent><SidebarGroup><SidebarGroupLabel>Navegación</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>{navigation.map((item) => <SidebarMenuItem key={item.href}><SidebarMenuButton render={<Link href={item.href} />} isActive={pathname === item.href} tooltip={item.title}><item.icon /><span>{item.title}</span></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroupContent></SidebarGroup></SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center gap-3 border-b px-4 sm:px-6"><SidebarTrigger /><span className="flex items-center gap-2 text-sm text-muted-foreground"><Users className="size-4 text-primary" />Jugadores y puntuaciones</span></header>
        <main className="flex-1 p-4 sm:p-6"><div className="mx-auto max-w-6xl space-y-6">
          {message && <p role="status" className={message.type === "success" ? "text-sm text-green-700" : "text-sm text-destructive"}>{message.text}</p>}
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
            <Card><CardHeader className="flex flex-row items-center justify-between gap-2"><CardTitle>Jugadores registrados</CardTitle><Link href="/registro_participante" className={buttonVariants({ size: "sm" })}><UserPlus />Registrar jugador</Link></CardHeader><CardContent className="space-y-4">
              <form className="flex gap-2" onSubmit={handleSearch}><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nombre o gamertag" /><Button type="submit" variant="outline" aria-label="Buscar"><Search /></Button></form>
              <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b text-muted-foreground"><tr><th className="p-2">GAMERTAG</th><th className="p-2">CORREO</th><th className="p-2">FECHA DE REGISTRO</th></tr></thead><tbody>{loading ? <tr><td className="p-3" colSpan={3}>Cargando jugadores…</td></tr> : players.length ? players.map((player) => <tr className="border-b" key={player.id}><td className="p-2 font-medium">{player.gamertag}<span className="block text-xs text-muted-foreground">{player.nombre}</span></td><td className="p-2">{player.correo}</td><td className="p-2">{formatDate(player.fecha_registro)}</td></tr>) : <tr><td className="p-3 text-muted-foreground" colSpan={3}>No se encontraron jugadores.</td></tr>}</tbody></table></div>
            </CardContent></Card>
            <Card><CardHeader><CardTitle>Registrar puntuación</CardTitle><CardDescription>Selecciona un jugador y un videojuego existentes.</CardDescription></CardHeader><CardContent>
              <form className="space-y-4" onSubmit={handleScore}>
                <select className="h-9 w-full rounded-lg border bg-background px-3 text-sm" value={selectedPlayer} onChange={(event) => setSelectedPlayer(event.target.value)} required><option value="">Selecciona un jugador</option>{allPlayers.map((player) => <option key={player.id} value={player.id}>{player.gamertag} — {player.nombre}</option>)}</select>
                <select className="h-9 w-full rounded-lg border bg-background px-3 text-sm" value={selectedGame} onChange={(event) => setSelectedGame(event.target.value)} required><option value="">Selecciona un videojuego</option>{games.map((game) => <option key={game.id} value={game.id}>{game.nombre} — {game.genero}</option>)}</select>
                <Input type="number" min="0" step="1" value={score} onChange={(event) => setScore(event.target.value)} placeholder="Puntuación" required />
                <Button type="submit" className="w-full" disabled={submitting || !allPlayers.length || !games.length}>{submitting ? "Guardando…" : "Guardar puntuación"}</Button>
              </form>
            </CardContent></Card>
          </div>
        </div></main>
      </SidebarInset>
    </SidebarProvider>
  );
}
