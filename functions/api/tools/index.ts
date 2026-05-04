import { requireAuth } from "../../_lib/auth";
import { ensureInitialized, rowToTool } from "../../_lib/db";
import { error, json } from "../../_lib/response";
import type { FunctionHandler } from "../../_lib/cf";
import type { Env } from "../../_lib/types";

export const onRequestGet: FunctionHandler<Env> = async (context) => {
  const { env } = context;
  await ensureInitialized(env);

  const { results } = await env.DB.prepare("SELECT * FROM tools").all();
  return json(results.map((row) => rowToTool(row as Record<string, unknown>)));
};

export const onRequestPost: FunctionHandler<Env> = async (context) => {
  const { request, env } = context;
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

  const id = crypto.randomUUID();
  const dateAdded = new Date().toISOString().slice(0, 10);
  const tool = {
    id,
    name: String(body.name || ""),
    category: String(body.category || ""),
    url: String(body.url || ""),
    description: String(body.description || ""),
    isActive: Boolean(body.isActive),
    icon: String(body.icon || "extension"),
    color: String(body.color || ""),
    version: String(body.version || ""),
    size: String(body.size || ""),
    dateAdded,
    status: String(body.status || "活跃"),
    users: String(body.users || ""),
  };

  if (!tool.name || !tool.category || !tool.url) {
    return error("name/category/url 为必填项", 400);
  }

  await env.DB.prepare(
    "INSERT INTO tools (id, name, category, url, description, isActive, icon, color, version, size, dateAdded, status, users) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  )
    .bind(
      tool.id,
      tool.name,
      tool.category,
      tool.url,
      tool.description,
      tool.isActive ? 1 : 0,
      tool.icon,
      tool.color,
      tool.version,
      tool.size,
      tool.dateAdded,
      tool.status,
      tool.users
    )
    .run();

  return json(tool, { status: 201 });
};
