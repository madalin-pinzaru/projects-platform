import { aiLabsAxiosInstance } from "./apiAxiosInstance.tsx";
import type { PaginatedProjects, Project } from "./types.ts";

export async function getProjects(
  page?: number,
  pageSize?: number,
  embed?: string,
): Promise<PaginatedProjects> {
  const res = await aiLabsAxiosInstance.get("/projects", {
    params: {
      _page: page || 0,
      _per_page: pageSize,
      _embed: embed,
    },
  });
  return res.data;
}

export async function createProject(
  data: Omit<Project, "id">,
): Promise<Project> {
  const res = await aiLabsAxiosInstance.post("/projects", data);
  return res.data;
}

export async function updateProject(
  id: string,
  data: Omit<Project, "id">,
): Promise<Project> {
  const res = await aiLabsAxiosInstance.put(`/projects/${id}`, data);
  return res.data;
}

export async function deleteProject(id: string): Promise<Project> {
  const res = await aiLabsAxiosInstance.delete(`/projects/${id}`);
  return res.data;
}
