import { requireAuth } from "../../_lib/auth";
import { ensureInitialized } from "../../_lib/db";
import { error, json } from "../../_lib/response";
import type { FunctionHandler } from "../../_lib/cf";
import type { Env } from "../../_lib/types";

export const onRequestGet: FunctionHandler<Env> = async (context) => {
  const { request, env } = context;
  await ensureInitialized(env);

  const authUser = await requireAuth(request, env);
  if (!authUser) {
    return error("未授权", 401);
  }

  const user = await env.DB.prepare(
    "SELECT username, name, role FROM users WHERE id = ?"
  )
    .bind(authUser.id)
    .first();

  if (!user) {
    return error("用户不存在", 404);
  }

  return json(user);
};
