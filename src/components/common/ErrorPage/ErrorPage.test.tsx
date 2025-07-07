import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ErrorPage from "./ErrorPage";

describe("ErrorPage", () => {
  it("renders the main error message", () => {
    render(<ErrorPage />);
    expect(screen.getByText(/errorPage.title/i)).toBeInTheDocument();
  });

  it("renders the suggestion message", () => {
    render(<ErrorPage />);
    expect(screen.getByText(/errorPage.retry/i)).toBeInTheDocument();
  });
});
