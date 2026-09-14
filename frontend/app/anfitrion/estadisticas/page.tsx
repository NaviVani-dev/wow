"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Activity,
  ArrowUpRight,
  Gamepad2,
  Home,
  LogOut,
  LogIn,
  ShieldCheck,
  Target,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { getStoredTournamentData, type Player, type TournamentGame } from "@/lib/tournament-data";

const navigation = [
  { title: "Inicio", href: "/anfitrion", icon: Home },
  { title: "Jugadores", href: "/anfitrion/jugadores", icon: UserPlus },
  { title: "Juegos", href: "/anfitrion/juegos", icon: Gamepad2 },
  { title: "Estadísticas", href: "/anfitrion/estadisticas", icon: Trophy },
];

export default function AnfitrionEstadisticasPage() {
  const pathname = usePathname();
  const [games, setGames] = useState<TournamentGame[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const stored = getStoredTournamentData();
    setGames(stored.games);
    setPlayers(stored.players);
  }, []);

  const leaderboard = useMemo(
    () =>
      players
        .map((player) => {
          const total = player.games.reduce(
            (sum, game) => sum + game.scores.reduce((acc, score) => acc + score, 0),
            0,
          );
          const count = player.games.reduce((sum, game) => sum + game.scores.length, 0);
          return {
            ...player,
            total,
            average: count ? Math.round(total / count) : 0,
          };
        })
        .sort((a, b) => b.total - a.total),
    [players],
  );

  const totalScores = players.reduce(
    (sum, player) => sum + player.games.reduce((count, game) => count + game.scores.length, 0),
    0,
  );

  const bestPlayer = leaderboard[0];

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
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={pathname === item.href}
                      tooltip={item.title}
                    >
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
          <Link href="/" className="flex items-center gap-2">
            <LogOut className="size-4" />
            Salir
          </Link>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 items-center gap-3 border-b px-4 sm:px-6">
          <SidebarTrigger />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="size-4 text-primary" />
            Estadísticas
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription>Jugadores</CardDescription>
                    <Users className="size-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{players.length}</div>
                  <p className="mt-2 text-xs text-muted-foreground">Participantes activos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription>Juegos</CardDescription>
                    <Gamepad2 className="size-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{games.length}</div>
                  <p className="mt-2 text-xs text-muted-foreground">Competiciones en curso</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription>Puntuaciones</CardDescription>
                    <Target className="size-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalScores}</div>
                  <p className="mt-2 text-xs text-muted-foreground">Puntos agregados</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription>Líder</CardDescription>
                    <Trophy className="size-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">{bestPlayer ? bestPlayer.name : "Sin lider"}</div>
                  <p className="mt-2 text-xs text-muted-foreground">{bestPlayer ? `${bestPlayer.total} pts` : "Esperando datos"}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Ranking general</CardTitle>
                <CardDescription>Clasificación de rendimiento por jugador.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div key={player.id} className="rounded-xl border bg-muted/20 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{player.name}</p>
                          <p className="text-sm text-muted-foreground">{player.gametag}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant={index === 0 ? "default" : "secondary"}>{player.total} pts</Badge>
                        <Badge variant="outline">{player.average} avg</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Desempeño por juego</CardTitle>
                <CardDescription>Cuántos puntos registró cada juego del torneo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {games.map((game) => {
                  const points = players.reduce(
                    (sum, player) =>
                      sum +
                      (player.games.find((entry) => entry.id === game.id)?.scores.reduce((gameTotal, score) => gameTotal + score, 0) ?? 0),
                    0,
                  );
                  const maxPoints = Math.max(
                    ...games.map((entry) =>
                      players.reduce(
                        (sum, player) =>
                          sum +
                          (player.games.find((gameEntry) => gameEntry.id === entry.id)?.scores.reduce((gameTotal, score) => gameTotal + score, 0) ?? 0),
                        0,
                      ),
                    ),
                    1,
                  );
                  const percentage = (points / maxPoints) * 100;

                  return (
                    <div key={game.id}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium">{game.name}</span>
                        <span className="text-muted-foreground">{points} pts</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(percentage, 10)}%` }} />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
