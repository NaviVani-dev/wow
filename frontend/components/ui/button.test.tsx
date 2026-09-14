import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renderiza el texto y aplica la variante por defecto", () => {
    render(<Button>Guardar</Button>);

    const button = screen.getByRole("button", { name: /guardar/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary");
  });

  it("llama al evento onClick cuando se hace clic", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Enviar</Button>);

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
