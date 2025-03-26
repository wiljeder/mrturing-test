export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: number;
  name: string;
  description: string;
  ownerId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateOrganizationRequest {
  name: string;
  description?: string;
}

export interface UpdateOrganizationRequest {
  name?: string;
  description?: string;
}

export interface LoginResponse {
  token: string;
  user: User & { activeOrganizationId: number | null };
}

export interface PaginationResponse {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginatedUsers {
  users: User[];
  pagination: PaginationResponse;
}

export interface PaginatedOrganizations {
  organizations: Organization[];
  pagination: PaginationResponse;
}
