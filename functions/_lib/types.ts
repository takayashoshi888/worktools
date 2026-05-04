import type { D1Database } from "./cf";

export interface Env {
  DB: D1Database;
  JWT_SECRET?: string;
}

export interface AuthUser {
  id: number;
  username: string;
  role: string;
}
