import { render, screen, fireEvent } from "@testing-library/react";
import Slideshow from "../src/components/Slideshow";

const pictures = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
];

describe("Slideshow component", () => {
  test("affiche la première image par défaut", () => {
    render(<Slideshow pictures={pictures} />);

    const image = screen.getByAltText("Logement");

    expect(image).toHaveAttribute("src", "image1.jpg");
  });

  test("change d'image quand on clique sur suivant", () => {
    render(<Slideshow pictures={pictures} />);

    const nextButton = screen.getByText("Suivant");

    fireEvent.click(nextButton);

    const image = screen.getByAltText("Logement");

    expect(image).toHaveAttribute("src", "image2.jpg");
  });

  test("revient à la dernière image quand on clique sur précédent depuis la première image", () => {
    render(<Slideshow pictures={pictures} />);

    const prevButton = screen.getByText("Précédent");

    fireEvent.click(prevButton);

    const image = screen.getByAltText("Logement");

    expect(image).toHaveAttribute("src", "image3.jpg");
  });

  test("revient à l'image précédente quand on n'est pas sur la première image", () => {
    render(<Slideshow pictures={pictures} />);

    const nextButton = screen.getByText("Suivant");
    const prevButton = screen.getByText("Précédent");

    // Önce ikinci resme geç
    fireEvent.click(nextButton);

    // Sonra geri dön
    fireEvent.click(prevButton);

    const image = screen.getByAltText("Logement");

    expect(image).toHaveAttribute("src", "image1.jpg");
  });

  test("cache les contrôles si une seule image est présente", () => {
    render(<Slideshow pictures={["unique.jpg"]} />);

    expect(screen.queryByText("Suivant")).not.toBeInTheDocument();
    expect(screen.queryByText("Précédent")).not.toBeInTheDocument();
  });

  test("affiche un message si aucune image n'est fournie", () => { 
  render(<Slideshow pictures={[]} />);

  expect(screen.getByText("Aucune image.")).toBeInTheDocument();
});

test("revient à la première image après la dernière image", () => {
  render(<Slideshow pictures={pictures} />);

  const nextButton = screen.getByText("Suivant");

  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  fireEvent.click(nextButton);

  const image = screen.getByAltText("Logement");

  expect(image).toHaveAttribute("src", "image1.jpg");
});
});