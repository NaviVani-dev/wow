export type TournamentGame = {
  id: string;
  name: string;
  genre: string;
  format: string;
  status: string;
};

export type PlayerGame = {
  id: string;
  name: string;
  role: string;
  status: string;
  scores: number[];
};

export type Player = {
  id: string;
  name: string;
  gametag: string;
  region: string;
  elo: string;
  games: PlayerGame[];
};

export const TOURNAMENT_STORAGE_KEY = "wow-tournament-data";

export const defaultGames: TournamentGame[] = [
  { id: "fc26", name: "EA SPORTS FC 26", genre: "Fútbol", format: "1v1", status: "Abierto" },
  { id: "rl", name: "Rocket League", genre: "Carreras", format: "3v3", status: "Clasificación" },
  { id: "valorant", name: "Valorant", genre: "Shooter", format: "5v5", status: "Semifinales" },
  { id: "tekken", name: "Tekken 8", genre: "Pelea", format: "1v1", status: "Final" },
];

export const defaultPlayers: Player[] = [
  {
    id: "p1",
    name: "Mateo Ruiz",
    gametag: "M4T30_R",
    region: "Bogotá",
    elo: "Platino III",
    games: [
      { id: "fc26", name: "EA SPORTS FC 26", role: "Delantero", status: "Activo", scores: [2, 4, 1] },
      { id: "rl", name: "Rocket League", role: "Driver", status: "Activo", scores: [110, 95] },
    ],
  },
  {
    id: "p2",
    name: "Sofía Álvarez",
    gametag: "SoFiA_88",
    region: "Medellín",
    elo: "Diamante",
    games: [
      { id: "valorant", name: "Valorant", role: "Duelista", status: "Activo", scores: [13, 16, 18] },
      { id: "tekken", name: "Tekken 8", role: "Control", status: "Pendiente", scores: [5] },
    ],
  },
  {
    id: "p3",
    name: "Nicolás Gómez",
    gametag: "G0M3Z_NC",
    region: "Cali",
    elo: "Oro II",
    games: [
      { id: "fc26", name: "EA SPORTS FC 26", role: "Centrocampista", status: "Activo", scores: [3, 2] },
    ],
  },
  {
    id: "p4",
    name: "Andrea Torres",
    gametag: "A.Torres",
    region: "Barranquilla",
    elo: "Platino I",
    games: [
      { id: "rl", name: "Rocket League", role: "Acelerador", status: "Activo", scores: [150, 126, 140] },
      { id: "valorant", name: "Valorant", role: "Controladora", status: "Activo", scores: [9, 12] },
    ],
  },
];

export function getStoredTournamentData() {
  if (typeof window === "undefined") {
    return { games: defaultGames, players: defaultPlayers };
  }

  try {
    const raw = window.localStorage.getItem(TOURNAMENT_STORAGE_KEY);
    if (!raw) {
      return { games: defaultGames, players: defaultPlayers };
    }

    const parsed = JSON.parse(raw) as { games?: TournamentGame[]; players?: Player[] };
    return {
      games: Array.isArray(parsed.games) && parsed.games.length ? parsed.games : defaultGames,
      players: Array.isArray(parsed.players) && parsed.players.length ? parsed.players : defaultPlayers,
    };
  } catch {
    return { games: defaultGames, players: defaultPlayers };
  }
}

export function saveTournamentData(games: TournamentGame[], players: Player[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    TOURNAMENT_STORAGE_KEY,
    JSON.stringify({ games, players })
  );
}
