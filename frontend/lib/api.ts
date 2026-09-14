type ApiSuccess = {
  ok: true;
  id: number;
};

type ApiFailure = {
  ok: false;
  error?: string;
};

const defaultApiUrl =
  typeof window === "undefined"
    ? "http://localhost:3001"
    : `${window.location.protocol}//${window.location.hostname}:3001`;
const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? defaultApiUrl).replace(/\/$/, "");

async function post<T>(path: string, body: T) {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.");
  }

  const data = (await response.json().catch(() => null)) as ApiSuccess | ApiFailure | null;

  if (!response.ok || !data?.ok) {
    throw new Error(data && "error" in data && data.error ? data.error : "No se pudo guardar la información.");
  }

  return data;
}

export function registrarJugador(datos: { nombre: string; gamertag: string; correo: string }) {
  return post("/jugadores", datos);
}

export function crearVideojuego(datos: { nombre: string; genero: string }) {
  return post("/videojuegos", datos);
}
