import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AnfitrionJuegosPage from "./page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/anfitrion/juegos",
}));

vi.mock("@/lib/api", () => ({
  crearVideojuego: vi.fn().mockResolvedValue({ ok: true, id: 33 }),
}));

describe("AnfitrionJuegosPage", () => {
  it("crea un videojuego con nombre y género", async () => {
    const { crearVideojuego } = await import("@/lib/api");

    render(<AnfitrionJuegosPage />);

    fireEvent.change(screen.getByLabelText("Nombre del juego"), {
      target: { value: "Rocket League" },
    });

    fireEvent.change(screen.getByLabelText("Género"), {
      target: { value: "Deportes" },
    });

    fireEvent.click(screen.getByRole("button", { name: /crear juego/i }));

    await waitFor(() => {
      expect(crearVideojuego).toHaveBeenCalledWith({
        nombre: "Rocket League",
        genero: "Deportes",
      });
      expect(screen.getByText("El juego fue creado correctamente.")).toBeInTheDocument();
    });
  });
});
