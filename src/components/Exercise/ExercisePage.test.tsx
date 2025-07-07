import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import ExercisePage from "./ExercisePage";

describe("ExercisePage", () => {
  it("renders input, button, and no result initially", () => {
    render(<ExercisePage />);
    expect(screen.getByLabelText(/enter parentheses/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /show result/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/result:/i)).not.toBeInTheDocument();
  });

  it("filters out non-parenthesis characters from input", async () => {
    render(<ExercisePage />);
    const input = screen.getByLabelText(/enter parentheses/i);
    await userEvent.type(input, "abc(())123");
    expect((input as HTMLInputElement).value).toBe("(())");
  });

  it("shows correct result after clicking the button", async () => {
    render(<ExercisePage />);
    const input = screen.getByLabelText(/enter parentheses/i);
    const button = screen.getByRole("button", { name: /show result/i });

    await userEvent.type(input, "(()())");
    await userEvent.click(button);

    expect(screen.getByText(/result: 6/i)).toBeInTheDocument();
  });

  it("shows 0 for no valid parentheses", async () => {
    render(<ExercisePage />);
    const input = screen.getByLabelText(/enter parentheses/i);
    const button = screen.getByRole("button", { name: /show result/i });

    await userEvent.type(input, ")))(((");
    await userEvent.click(button);

    expect(screen.getByText(/result: 0/i)).toBeInTheDocument();
  });
});
