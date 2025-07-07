import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from "./organizationsApi";
import type { Organization, PaginatedOrganizations } from "./types.ts";

export function useGetOrganizations(
  page: number = 1,
  pageSize?: number,
  embed?: string,
) {
  return useQuery<PaginatedOrganizations>({
    queryKey: ["organizations", page, pageSize, embed],
    queryFn: () => getOrganizations(page, pageSize, embed),
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrganization,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Omit<Organization, "id">;
    }) => updateOrganization(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}

export function useDeleteOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteOrganization(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}
