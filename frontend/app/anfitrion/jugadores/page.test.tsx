import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AnfitrionJugadoresPage from "./page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/anfitrion/jugadores",
}));

vi.mock("@/lib/api", () => {
  const mockJugadores = [
    {
      id: 1,
      nombre: "Astra Vega",
      gamertag: "Astra",
      correo: "astra@demo.com",
      fecha_registro: "2025-02-10T00:00:00.000Z",
    },
    {
      id: 2,
      nombre: "Beto Sol",
      gamertag: "Beto",
      correo: "beto@demo.com",
      fecha_registro: "2025-03-05T00:00:00.000Z",
    },
  ];

  const mockVideojuegos = [
    { id: 10, nombre: "Valorant", genero: "FPS" },
    { id: 11, nombre: "Rocket League", genero: "Carrera" },
  ];

  return {
    obtenerJugadores: vi.fn().mockResolvedValue({ jugadores: mockJugadores }),
    obtenerVideojuegos: vi.fn().mockResolvedValue({ videojuegos: mockVideojuegos }),
    registrarPuntuacion: vi.fn().mockResolvedValue({ ok: true, id: 99 }),
  };
});

describe("AnfitrionJugadoresPage", () => {
  it("muestra jugadores y permite registrar una puntuación", async () => {
    const { obtenerJugadores, obtenerVideojuegos, registrarPuntuacion } = await import("@/lib/api");

    render(<AnfitrionJugadoresPage />);

    await waitFor(() => {
      expect(screen.getByText("Jugadores registrados")).toBeInTheDocument();
      expect(screen.getByText("Astra")).toBeInTheDocument();
    });

    expect(await screen.findByRole("option", { name: /Valorant/i })).toBeInTheDocument();
    expect(obtenerJugadores).toHaveBeenCalled();
    expect(obtenerVideojuegos).toHaveBeenCalled();

    const [playerSelect, gameSelect] = screen.getAllByRole("combobox");

    fireEvent.change(playerSelect, {
      target: { value: "1" },
    });

    fireEvent.change(gameSelect, {
      target: { value: "10" },
    });

    fireEvent.change(screen.getByPlaceholderText("Puntuación"), {
      target: { value: "1200" },
    });

    fireEvent.click(screen.getByRole("button", { name: /guardar puntuación/i }));

    await waitFor(() => {
      expect(registrarPuntuacion).toHaveBeenCalledWith({
        jugador: 1,
        videojuego: 10,
        puntuacion: 1200,
      });
      expect(screen.getByText("La puntuación fue registrada correctamente.")).toBeInTheDocument();
    });
  });
});
