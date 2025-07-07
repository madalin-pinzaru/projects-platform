export type Project = {
  id: string;
  name: string;
  acronym: string;
  description: string;
  organizations?: Organization[];
};

export type PaginatedProjects = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Project[];
};

export type Organization = {
  id: string;
  name: string;
  acronym: string;
  country: string;
  description?: string;
  project?: string;
  users?: User[];
};

export type PaginatedOrganizations = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Organization[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  organizationId: string;
};

export type PaginatedUsers = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: User[];
};
