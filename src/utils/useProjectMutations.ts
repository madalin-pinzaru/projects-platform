import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { PaginatedProjects, Project } from "./types.ts";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "./projectsApi.ts";

export function useGetProjects(
  page: number = 1,
  pageSize?: number,
  embed?: string,
) {
  return useQuery<PaginatedProjects>({
    queryKey: ["projects", page, embed],
    queryFn: () => getProjects(page, pageSize, embed),
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<Project, "id"> }) =>
      updateProject(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
