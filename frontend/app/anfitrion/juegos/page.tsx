"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Award,
  Gamepad2,
  Home,
  LogOut,
  LogIn,
  Search,
  ShieldCheck,
  Swords,
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
import { getStoredTournamentData, saveTournamentData, type Player } from "@/lib/tournament-data";

const navigation = [
  { title: "Inicio", href: "/anfitrion", icon: Home },
  { title: "Jugadores", href: "/anfitrion/jugadores", icon: UserPlus },
  { title: "Juegos", href: "/anfitrion/juegos", icon: Gamepad2 },
  { title: "Estadísticas", href: "/anfitrion/estadisticas", icon: Trophy },
];

export default function AnfitrionJugadoresPage() {
  const pathname = usePathname();
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>("");
  const [scoreDraft, setScoreDraft] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = getStoredTournamentData();
    setPlayers(stored.players);
    if (stored.players.length) setSelectedPlayerId(stored.players[0].id);
  }, []);

  useEffect(() => {
    saveTournamentData(getStoredTournamentData().games, players);
  }, [players]);

  const filteredPlayers = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return players;
    return players.filter(
      (player) =>
        player.name.toLowerCase().includes(value) ||
        player.gametag.toLowerCase().includes(value),
    );
  }, [players, search]);

  const selectedPlayer =
    players.find((player) => player.id === selectedPlayerId) ?? filteredPlayers[0] ?? players[0] ?? null;

  const addScore = (playerId: string, gameId: string) => {
    const key = `${playerId}-${gameId}`;
    const raw = scoreDraft[key];
    const value = Number(raw ?? "");

    if (!Number.isFinite(value) || value < 0) return;

    setPlayers((current) =>
      current.map((player) => {
        if (player.id !== playerId) return player;

        return {
          ...player,
          games: player.games.map((game) =>
            game.id === gameId ? { ...game, scores: [...game.scores, value] } : game,
          ),
        };
      }),
    );

    setScoreDraft((current) => ({ ...current, [key]: "" }));
  };

  const removeScore = (playerId: string, gameId: string, scoreIndex: number) => {
    setPlayers((current) =>
      current.map((player) => {
        if (player.id !== playerId) return player;
        return {
          ...player,
          games: player.games.map((game) => {
            if (game.id !== gameId) return game;
            return {
              ...game,
              scores: game.scores.filter((_, index) => index !== scoreIndex),
            };
          }),
        };
      }),
    );
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
            <Users className="size-4 text-primary" />
            Jugadores
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.7fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Buscar jugador</CardTitle>
                  <CardDescription>Busca por nombre o gametag.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Buscar jugador..."
                      className="pl-9"
                    />
                  </div>

                  <div className="space-y-3">
                    {filteredPlayers.map((player) => (
                      <button
                        key={player.id}
                        type="button"
                        onClick={() => setSelectedPlayerId(player.id)}
                        className={`w-full rounded-xl border p-3 text-left transition-colors ${
                          selectedPlayer?.id === player.id
                            ? "border-primary bg-primary/5"
                            : "border-border bg-background hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-medium">{player.name}</p>
                            <p className="text-sm text-muted-foreground">{player.gametag}</p>
                          </div>
                          <Badge variant="outline">{player.elo}</Badge>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                          <span>{player.region}</span>
                          <span>{player.games.length} juegos</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                {selectedPlayer ? (
                  <>
                    <CardHeader>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <CardTitle className="text-2xl">{selectedPlayer.name}</CardTitle>
                          <CardDescription>
                            {selectedPlayer.gametag} · {selectedPlayer.region}
                          </CardDescription>
                        </div>
                        <Badge variant="default" className="flex items-center gap-1">
                          <Award className="size-3.5" />
                          {selectedPlayer.elo}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border bg-muted/30 p-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Swords className="size-4 text-primary" />
                            Juegos inscritos
                          </div>
                          <div className="mt-2 text-2xl font-bold">{selectedPlayer.games.length}</div>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Gamepad2 className="size-4 text-primary" />
                            Puntajes
                          </div>
                          <div className="mt-2 text-2xl font-bold">
                            {selectedPlayer.games.reduce((sum, game) => sum + game.scores.length, 0)}
                          </div>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Award className="size-4 text-primary" />
                            Promedio
                          </div>
                          <div className="mt-2 text-2xl font-bold">
                            {selectedPlayer.games.length
                              ? Math.round(
                                  selectedPlayer.games.reduce(
                                    (sum, game) =>
                                      sum +
                                      game.scores.reduce((gameTotal, score) => gameTotal + score, 0),
                                    0,
                                  ) /
                                    selectedPlayer.games.reduce(
                                      (count, game) => count + (game.scores.length || 1),
                                      0,
                                    ),
                                )
                              : 0}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        {selectedPlayer.games.map((game) => {
                          const key = `${selectedPlayer.id}-${game.id}`;

                          return (
                            <div key={game.id} className="rounded-xl border bg-muted/20 p-4">
                              <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                  <p className="font-semibold">{game.name}</p>
                                  <p className="text-sm text-muted-foreground">{game.role}</p>
                                </div>
                                <Badge variant={game.status === "Activo" ? "default" : "secondary"}>{game.status}</Badge>
                              </div>

                              <div className="mt-3 flex flex-wrap gap-2">
                                {game.scores.length ? (
                                  game.scores.map((score, index) => (
                                    <div
                                      key={`${game.id}-${index}`}
                                      className="flex items-center gap-2 rounded-full border bg-background px-2.5 py-1 text-xs font-medium"
                                    >
                                      <span>{score}</span>
                                      <button
                                        type="button"
                                        onClick={() => removeScore(selectedPlayer.id, game.id, index)}
                                        className="text-muted-foreground transition-colors hover:text-destructive"
                                        aria-label={`Eliminar marcador ${score}`}
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))
                                ) : (
                                  <span className="text-sm text-muted-foreground">Sin puntuaciones registradas</span>
                                )}
                              </div>

                              <div className="mt-4 grid gap-2 md:grid-cols-[1fr_auto]">
                                <Input
                                  type="number"
                                  min="0"
                                  value={scoreDraft[key] ?? ""}
                                  onChange={(event) =>
                                    setScoreDraft((current) => ({
                                      ...current,
                                      [key]: event.target.value,
                                    }))
                                  }
                                  placeholder="Agregar puntuación"
                                />
                                <Button size="sm" onClick={() => addScore(selectedPlayer.id, game.id)}>
                                  Añadir
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="flex min-h-[240px] items-center justify-center text-muted-foreground">
                    No hay jugadores que coincidan con la búsqueda.
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
