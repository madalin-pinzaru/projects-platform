import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import Projects from "./Projects";
import * as useProjectMutations from "../../utils/useProjectMutations";
import { MemoryRouter } from "react-router-dom";

// Types for CustomTableRow mock
type CustomTableRowProps = {
  cells: React.ReactNode[];
  actions: React.ReactNode;
};

// Mock dependencies
vi.mock("../../utils/useProjectMutations");
vi.mock("../../hooks/usePagination", () => ({
  usePagination: () => ({
    currentPage: 1,
    handleNextPage: vi.fn(),
    handlePreviousPage: vi.fn(),
  }),
}));
vi.mock("../common/PaginationControls/PaginationControls", () => ({
  default: () => <div data-testid="pagination-controls" />,
}));
vi.mock("../common/TableActionButtons/TableActionButtons.tsx", () => ({
  default: () => <div data-testid="table-action-buttons" />,
}));
vi.mock("../common/CustomTableRow/CustomTableRow", () => ({
  default: ({ cells, actions }: CustomTableRowProps) => (
    <tr>
      {cells.map((cell, i) => (
        <td key={i}>{cell}</td>
      ))}
      <td>{actions}</td>
    </tr>
  ),
}));

describe("Projects", () => {
  it("shows loading spinner when loading", () => {
    (
      useProjectMutations as unknown as { useGetProjects: () => unknown }
    ).useGetProjects = () => ({ isLoading: true });
    render(<Projects />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("shows error page on error", () => {
    (
      useProjectMutations as unknown as { useGetProjects: () => unknown }
    ).useGetProjects = () => ({ isLoading: false, isError: true });
    render(<Projects />);
    expect(screen.getByText(/errorPage.title/i)).toBeInTheDocument();
  });

  it("renders projects table and create button", async () => {
    (
      useProjectMutations as unknown as { useGetProjects: () => unknown }
    ).useGetProjects = () => ({
      isLoading: false,
      isError: false,
      data: {
        data: [
          {
            id: 1,
            name: "Test Project",
            acronym: "TP",
            description: "A test project",
            organizations: [{}, {}],
          },
        ],
        pages: 1,
      },
    });
    (
      useProjectMutations as unknown as { useDeleteProject: () => unknown }
    ).useDeleteProject = () => ({ mutate: vi.fn() });

    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>,
    );

    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByTestId("create-project-btn")).toBeInTheDocument();
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("TP")).toBeInTheDocument();
    expect(screen.getByText("A test project")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-controls")).toBeInTheDocument();
    expect(screen.getByTestId("table-action-buttons")).toBeInTheDocument();
  });
});
