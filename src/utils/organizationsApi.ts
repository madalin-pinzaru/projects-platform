import { aiLabsAxiosInstance } from "./apiAxiosInstance.tsx";
import type { Organization, PaginatedOrganizations } from "./types.ts";

export async function getOrganizations(
  page?: number,
  pageSize?: number,
  embed?: string,
): Promise<PaginatedOrganizations> {
  const res = await aiLabsAxiosInstance.get("/organizations", {
    params: {
      _page: page || 0,
      _per_page: pageSize,
      _embed: embed,
    },
  });
  return res.data;
}

export async function createOrganization(
  data: Omit<Organization, "id">,
): Promise<Organization> {
  const res = await aiLabsAxiosInstance.post("/organizations", data);
  return res.data;
}

export async function updateOrganization(
  id: string,
  data: Omit<Organization, "id">,
): Promise<Organization> {
  const res = await aiLabsAxiosInstance.put(`/organizations/${id}`, data);
  return res.data;
}

export async function deleteOrganization(id: string): Promise<Organization> {
  const res = await aiLabsAxiosInstance.delete(`/organizations/${id}`);
  return res.data;
}
