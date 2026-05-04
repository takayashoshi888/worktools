import { jwtVerify, SignJWT } from "jose";
import type { AuthUser, Env } from "./types";

const encoder = new TextEncoder();

function getSecret(env: Env) {
  return encoder.encode(env.JWT_SECRET || "replace-this-secret-in-production");
}

export async function signToken(user: AuthUser, env: Env) {
  return new SignJWT({
    id: user.id,
    username: user.username,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecret(env));
}

export async function verifyToken(token: string, env: Env): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(env));
    return {
      id: Number(payload.id),
      username: String(payload.username),
      role: String(payload.role),
    };
  } catch {
    return null;
  }
}

export async function requireAuth(request: Request, env: Env): Promise<AuthUser | null> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.slice("Bearer ".length);
  return verifyToken(token, env);
}
