import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "./page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("@/lib/api", () => {
  const mockStats = {
    estadisticas: {
      total_jugadores: 12,
      total_videojuegos: 4,
      total_puntuaciones: 20,
      puntuacion_promedio: 8.5,
    },
  };

  const mockRanking = {
    ranking: [
      { posicion: 1, jugador: "Astra", videojuego: "Valorant", puntuacion: 1500 },
      { posicion: 2, jugador: "Beto", videojuego: "Rocket League", puntuacion: 1400 },
    ],
  };

  return {
    obtenerEstadisticas: vi.fn().mockResolvedValue(mockStats),
    obtenerRanking: vi.fn().mockResolvedValue(mockRanking),
  };
});

describe("HomePage", () => {
  it("muestra el resumen del torneo y la clasificación", async () => {
    render(<HomePage />);

    expect(screen.getByText("Estadísticas del torneo")).toBeInTheDocument();
    expect(screen.getByText("Resumen")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("12")).toBeInTheDocument();
      expect(screen.getByText("4")).toBeInTheDocument();
      expect(screen.getByText("8.50")).toBeInTheDocument();
    });

    expect(screen.getByText("Clasificación")).toBeInTheDocument();
    expect(screen.getByText("Astra")).toBeInTheDocument();
    expect(screen.getByText("Valorant")).toBeInTheDocument();
    expect(screen.getByText("1500")).toBeInTheDocument();
  });
});
