import { describe, it, afterEach, vi, expect } from "vitest";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "./projectsApi";
import { aiLabsAxiosInstance } from "./apiAxiosInstance";
import type { Project, PaginatedProjects } from "./types";

vi.mock("./apiAxiosInstance");

const mockedAxios = aiLabsAxiosInstance as unknown as {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

describe("projectsApi", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("getProjects fetches paginated projects", async () => {
    const mockData: PaginatedProjects = {
      data: [],
      pages: 0,
      first: 1,
      prev: null,
      next: null,
      last: 1,
      items: 0,
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });
    const result = await getProjects(1, 10, "owner");
    expect(mockedAxios.get).toHaveBeenCalledWith("/projects", {
      params: { _page: 1, _per_page: 10, _embed: "owner" },
    });
    expect(result).toBe(mockData);
  });

  it("createProject posts new project", async () => {
    const newProject = { name: "Test" };
    const mockResponse = { id: "1", name: "Test" };
    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });
    const result = await createProject(newProject as Project);
    expect(mockedAxios.post).toHaveBeenCalledWith("/projects", newProject);
    expect(result).toBe(mockResponse);
  });

  it("updateProject puts updated project", async () => {
    const updatedProject = { name: "Updated" };
    const mockResponse = { id: "1", name: "Updated" };
    mockedAxios.put.mockResolvedValueOnce({ data: mockResponse });
    const result = await updateProject("1", updatedProject as Project);
    expect(mockedAxios.put).toHaveBeenCalledWith("/projects/1", updatedProject);
    expect(result).toBe(mockResponse);
  });

  it("deleteProject deletes a project", async () => {
    const mockResponse = { id: "1", name: "Deleted" };
    mockedAxios.delete.mockResolvedValueOnce({ data: mockResponse });
    const result = await deleteProject("1");
    expect(mockedAxios.delete).toHaveBeenCalledWith("/projects/1");
    expect(result).toBe(mockResponse);
  });
});
