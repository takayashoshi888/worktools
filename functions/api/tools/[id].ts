import { requireAuth } from "../../_lib/auth";
import { ensureInitialized } from "../../_lib/db";
import { error, json } from "../../_lib/response";
import type { FunctionHandler } from "../../_lib/cf";
import type { Env } from "../../_lib/types";

const updatableFields = [
  "name",
  "category",
  "url",
  "description",
  "isActive",
  "icon",
  "color",
  "version",
  "size",
  "dateAdded",
  "status",
  "users",
] as const;

export const onRequestPut: FunctionHandler<Env> = async (context) => {
  const { request, env, params } = context;
  await ensureInitialized(env);

  const authUser = await requireAuth(request, env);
  if (!authUser || authUser.role !== "admin") {
    return error("未授权", 401);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return error("请求体不是有效 JSON", 400);
  }

  const id = String(params.id);
  const updates: string[] = [];
  const values: unknown[] = [];

  for (const field of updatableFields) {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      updates.push(`${field} = ?`);
      const value = field === "isActive" ? (body[field] ? 1 : 0) : body[field];
      values.push(value);
    }
  }

  if (updates.length === 0) {
    return error("没有可更新的字段", 400);
  }

  values.push(id);
  await env.DB.prepare(`UPDATE tools SET ${updates.join(", ")} WHERE id = ?`)
    .bind(...values)
    .run();

  return json({ success: true });
};

export const onRequestDelete: FunctionHandler<Env> = async (context) => {
  const { request, env, params } = context;
  await ensureInitialized(env);

  const authUser = await requireAuth(request, env);
  if (!authUser || authUser.role !== "admin") {
    return error("未授权", 401);
  }

  await env.DB.prepare("DELETE FROM tools WHERE id = ?").bind(String(params.id)).run();
  return json({ success: true });
};
