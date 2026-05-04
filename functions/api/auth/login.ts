import bcrypt from "bcryptjs";
import { ensureInitialized } from "../../_lib/db";
import { error, json } from "../../_lib/response";
import { signToken } from "../../_lib/auth";
import type { FunctionHandler } from "../../_lib/cf";
import type { Env } from "../../_lib/types";

export const onRequestPost: FunctionHandler<Env> = async (context) => {
  const { request, env } = context;
  await ensureInitialized(env);

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return error("请求体不是有效 JSON", 400);
  }

  const username = body.username?.trim();
  const password = body.password ?? "";
  if (!username || !password) {
    return error("用户名和密码不能为空", 400);
  }

  const user = await env.DB.prepare(
    "SELECT id, username, name, role, password_hash FROM users WHERE username = ?"
  )
    .bind(username)
    .first<{
      id: number;
      username: string;
      name: string;
      role: string;
      password_hash: string;
    }>();

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return error("用户名或密码错误", 401);
  }

  const token = await signToken(
    { id: user.id, username: user.username, role: user.role },
    env
  );

  return json({
    token,
    user: {
      username: user.username,
      name: user.name,
    },
  });
};
