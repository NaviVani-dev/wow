export type Jugador = {
  id: number;
  nombre: string;
  gamertag: string;
  correo: string;
  fecha_registro: string;
};

export type Videojuego = { id: number; nombre: string; genero: string };
export type PuntuacionRanking = { posicion: number; jugador: string; videojuego: string; puntuacion: number };
export type Estadisticas = {
  total_jugadores: number;
  total_videojuegos: number;
  total_puntuaciones: number;
  puntuacion_promedio: number;
};

type ApiResponse<T> = { ok: boolean; error?: string } & T;

const defaultApiUrl =
  typeof window === "undefined"
    ? "http://localhost:3001"
    : `${window.location.protocol}//${window.location.hostname}:3001`;
const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? defaultApiUrl).replace(/\/$/, "");

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json", ...options?.headers },
      ...options,
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.");
  }

  const data = (await response.json().catch(() => null)) as ApiResponse<T> | null;
  if (!response.ok || !data?.ok) {
    throw new Error(data?.error ?? "No se pudo procesar la solicitud.");
  }
  return data as T;
}

function post<T, R = { ok: true; id: number }>(path: string, body: T) {
  return request<R>(path, { method: "POST", body: JSON.stringify(body) });
}

export function registrarJugador(datos: { nombre: string; gamertag: string; correo: string }) {
  return post("/jugadores", datos);
}

export function crearVideojuego(datos: { nombre: string; genero: string }) {
  return post("/videojuegos", datos);
}

export function obtenerJugadores(busqueda = "") {
  const query = busqueda.trim();
  const path = query ? `/jugadores/buscar?q=${encodeURIComponent(query)}` : "/jugadores";
  return request<{ ok: true; jugadores: Jugador[] }>(path);
}

export function obtenerVideojuegos() {
  return request<{ ok: true; videojuegos: Videojuego[] }>("/videojuegos");
}

export function registrarPuntuacion(datos: { jugador: number; videojuego: number; puntuacion: number }) {
  return post("/puntuaciones", datos);
}

export function obtenerRanking() {
  return request<{ ok: true; ranking: PuntuacionRanking[] }>("/puntuaciones");
}

export function obtenerEstadisticas() {
  return request<{ ok: true; estadisticas: Estadisticas }>("/estadisticas");
}
