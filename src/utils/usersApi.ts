import { aiLabsAxiosInstance } from "./apiAxiosInstance.tsx";
import type { PaginatedUsers, User } from "./types.ts";

export async function getUsers(
  page?: number,
  pageSize?: number,
  embed?: string,
): Promise<PaginatedUsers> {
  const res = await aiLabsAxiosInstance.get("/users", {
    params: {
      _page: page || 0,
      _per_page: pageSize,
      _embed: embed,
    },
  });
  return res.data;
}

export async function createUser(data: Omit<User, "id">): Promise<User> {
  const res = await aiLabsAxiosInstance.post("/users", data);
  return res.data;
}

export async function updateUser(
  id: string,
  data: Omit<User, "id">,
): Promise<User> {
  const res = await aiLabsAxiosInstance.put(`/users/${id}`, data);
  return res.data;
}

export async function deleteUser(id: string): Promise<User> {
  const res = await aiLabsAxiosInstance.delete(`/users/${id}`);
  return res.data;
}
