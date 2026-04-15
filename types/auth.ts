import { Role } from '@prisma/client';

export type AuthRole = Role;

export interface SessionUser {
  id: string;
  name: string;
  role: AuthRole;
  familyId: string;
}

export interface LoginResult {
  success: boolean;
  user?: SessionUser;
  error?: string;
}

export interface ParentCredentials {
  name: string;
  password: string;
}

export interface ChildCredentials {
  name: string;
  pin: string;
}

export interface JWTPayload {
  userId: string;
  role: AuthRole;
  familyId: string;
}

export interface AuthContext {
  user: SessionUser;
}
