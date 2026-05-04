import { requireAuth } from "../../_lib/auth";
import { ensureInitialized } from "../../_lib/db";
import { error, json } from "../../_lib/response";
import type { FunctionHandler } from "../../_lib/cf";
import type { Env } from "../../_lib/types";

export const onRequestGet: FunctionHandler<Env> = async (context) => {
  const { env } = context;
  await ensureInitialized(env);

  const { results } = await env.DB.prepare("SELECT * FROM categories").all();
  return json(results);
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

  const category = {
    id: crypto.randomUUID(),
    name: String(body.name || ""),
    description: String(body.description || ""),
    icon: String(body.icon || "category"),
    color: String(body.color || "bg-brand-500"),
    status: String(body.status || "活跃"),
  };

  if (!category.name) {
    return error("分类名称不能为空", 400);
  }

  await env.DB.prepare(
    "INSERT INTO categories (id, name, description, icon, color, status) VALUES (?, ?, ?, ?, ?, ?)"
  )
    .bind(
      category.id,
      category.name,
      category.description,
      category.icon,
      category.color,
      category.status
    )
    .run();

  return json(category, { status: 201 });
};
