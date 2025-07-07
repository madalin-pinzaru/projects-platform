import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Menu from "./index";

describe("Menu", () => {
  it("renders all navigation buttons", () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("menu-projects")).toBeInTheDocument();
    expect(screen.getByTestId("menu-organizations")).toBeInTheDocument();
    expect(screen.getByTestId("menu-users")).toBeInTheDocument();
    expect(screen.getByTestId("menu-statistics")).toBeInTheDocument();
    expect(screen.getByTestId("menu-exercise")).toBeInTheDocument();
  });

  it("buttons link to the correct routes", () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("menu-projects").closest("a")).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(
      screen.getByTestId("menu-organizations").closest("a"),
    ).toHaveAttribute("href", "/organizations");
    expect(screen.getByTestId("menu-users").closest("a")).toHaveAttribute(
      "href",
      "/users",
    );
    expect(screen.getByTestId("menu-statistics").closest("a")).toHaveAttribute(
      "href",
      "/statistics",
    );
    expect(screen.getByTestId("menu-exercise").closest("a")).toHaveAttribute(
      "href",
      "/exercise",
    );
  });
});
