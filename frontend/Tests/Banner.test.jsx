import { render, screen } from "@testing-library/react";
import Banner from "../src/components/Banner";

describe("Banner component", () => {
  test("affiche le titre passé en props", () => {
    render(
      <Banner
        title="Chez vous, partout et ailleurs"
        image="test.jpg"
      />
    );

    const title = screen.getByText(
      "Chez vous, partout et ailleurs"
    );

    expect(title).toBeInTheDocument();
  });

  test("affiche une image de fond", () => {
    render(
      <Banner
        title="Test"
        image="banner.jpg"
      />
    );

    const banner = screen.getByText("Test").parentElement;

    expect(banner).toHaveStyle({
      backgroundImage: 'url("banner.jpg")',
    });
  });
});