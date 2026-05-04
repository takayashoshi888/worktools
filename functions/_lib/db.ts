import bcrypt from "bcryptjs";
import type { Env } from "./types";

export async function ensureInitialized(env: Env) {
  await env.DB.batch([
    env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password_hash TEXT,
        name TEXT,
        role TEXT
      )`
    ),
    env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT,
        description TEXT,
        icon TEXT,
        color TEXT,
        status TEXT
      )`
    ),
    env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS tools (
        id TEXT PRIMARY KEY,
        name TEXT,
        category TEXT,
        url TEXT,
        description TEXT,
        isActive INTEGER,
        icon TEXT,
        color TEXT,
        version TEXT,
        size TEXT,
        dateAdded TEXT,
        status TEXT,
        users TEXT
      )`
    ),
  ]);

  const admin = await env.DB.prepare("SELECT id FROM users WHERE username = ?")
    .bind("admin")
    .first();
  if (!admin) {
    const hash = bcrypt.hashSync("admin123", 10);
    await env.DB.prepare(
      "INSERT INTO users (username, password_hash, name, role) VALUES (?, ?, ?, ?)"
    )
      .bind("admin", hash, "管理员", "admin")
      .run();
  }

  const catCountRow = await env.DB.prepare("SELECT COUNT(*) as count FROM categories").first<{
    count: number;
  }>();
  if (!catCountRow || catCountRow.count === 0) {
    await env.DB.batch([
      env.DB.prepare(
        "INSERT INTO categories (id, name, description, icon, color, status) VALUES (?, ?, ?, ?, ?, ?)"
      ).bind("1", "文本处理", "提供一键去重、清洗、排版、大小写转换等功能。", "text_fields", "bg-blue-500", "活跃"),
      env.DB.prepare(
        "INSERT INTO categories (id, name, description, icon, color, status) VALUES (?, ?, ?, ?, ?, ?)"
      ).bind("2", "开发辅助", "JSON格式化、Base64编解码、正则表达式测试等。", "code", "bg-brand-500", "活跃"),
      env.DB.prepare(
        "INSERT INTO categories (id, name, description, icon, color, status) VALUES (?, ?, ?, ?, ?, ?)"
      ).bind("3", "图片优化", "无损压缩、格式转换、尺寸裁剪、水印添加等。", "image", "bg-emerald-500", "活跃"),
    ]);
  }

  const toolCountRow = await env.DB.prepare("SELECT COUNT(*) as count FROM tools").first<{
    count: number;
  }>();
  if (!toolCountRow || toolCountRow.count === 0) {
    await env.DB.batch([
      env.DB.prepare(
        "INSERT INTO tools (id, name, category, url, description, isActive, icon, color, version, size, dateAdded, status, users) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      ).bind(
        "1",
        "超级文本格式化",
        "文本处理",
        "#",
        "提供一键去重、清洗、排版、大小写转换。纯前端处理，绝不上传您的任何私密数据，安全无忧。",
        1,
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCOlVCP9lk4zzttDgyUZpcRPxPQuKfPEd1Ijp-HZOQIWRr-xmepKOygl2x-n2lG5mTmyLD3xCz9NZnZ21V-XV2sRIlZ3-ndR0f5CJzOl1wn_FS9KW0w3E3h3BTGePs9FmhYqwPgyP-rb_APu9JTgo3HurVu85cdMiUVmhYLAPx4x4AZrMyMR7amAuy6ltzPS4PzvaHGlcBxG-hCVMZh6W1dHVUXqqQfZTI8Zv3MgJh_O21ERwPzJW4chkcL04J_SIpQTmgWHcedmLA",
        "bg-blue-500",
        "v2.4.0",
        "12.4 MB",
        "2023-10-12",
        "活跃",
        "1.2k+ 人正在使用"
      ),
      env.DB.prepare(
        "INSERT INTO tools (id, name, category, url, description, isActive, icon, color, version, size, dateAdded, status, users) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      ).bind(
        "2",
        "极客 JSON 美化",
        "开发辅助",
        "#",
        "支持 JSON 校验、美化、压缩、转义。极致的渲染速度，支持处理数万行的超大型 JSON 文件。",
        1,
        "https://lh3.googleusercontent.com/aida-public/AB6AXuACjAeDPtkOvNG6RynDdxxcvz5c1JQupwfqpSFHkdIgVSdTyMgtlZpl4au0xPaSu1PUgSCHqMj2ZI0ASs_s0_QBPS7uYBu3eYHRLwerK3E7NR7tbz3vM20FiEtOFs-QF6yHGTYzMfDe0p9MdG3DQy2Z6sjhnmG-UfARrqKDC2uFNw8oR0txO5xJqsVeZBrvaRsioGvSufRwXqt1TjmqXMXhVvY-ig9HZL6RG0Ih3j5V1oROdXHraz6laYJ0-uhNekJ9HrOQVSez7fI",
        "bg-brand-500",
        "v1.0.2",
        "8.1 MB",
        "2023-11-03",
        "活跃",
        "800+ 本周活跃"
      ),
      env.DB.prepare(
        "INSERT INTO tools (id, name, category, url, description, isActive, icon, color, version, size, dateAdded, status, users) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      ).bind(
        "3",
        "无损图片压缩",
        "图片优化",
        "#",
        "在保持画质的前提下，将图片体积缩小 70% 以上。支持批量上传，秒级完成转换。",
        1,
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ09OL-M_VLWujhWyst0b5GXIW6cigis2H8BI71MqBiOoIw1Y4jlQ88kSV1zy2EOnr6Ew9ndyIJuVzxfAWGcu6uPEQi1-_luTSXSXxZIT38h5YKQc6-rHdS6fJ6q0e-2dCoo2Ii_xuYxQtd2pQvaWTR1Jr8-EFkC5qn1R6cRvDnyMk6cAfbjjtghG8dKmTpQWCvw5atIIeDlLv8kDsJ60y-FU7e7B2T-8ywwQ29C7KtX49nooDBiPajh9JSBodSIDeVQIbJlQZ-LE",
        "bg-emerald-500",
        "v3.1.5",
        "45.9 MB",
        "2023-10-28",
        "活跃",
        "刚刚更新"
      ),
    ]);
  }
}

export function rowToTool<T extends Record<string, unknown>>(row: T) {
  return {
    ...row,
    isActive: Number(row.isActive) === 1,
  };
}
