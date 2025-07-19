import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("Home Page", () => {
  it("should render the main title", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { name: /coluna visto br/i })
    ).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("link", { name: /saiba mais/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /conheça a victoria/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /doar agora/i })
    ).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
