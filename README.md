# Worktools（Cloudflare 持久化版）

这个项目已经接入：
- Cloudflare Pages Functions（后端 API）
- Cloudflare D1（云端 SQLite，永久存储）
- JWT 管理员鉴权（`/api/auth/login`）

部署后，数据保存在 D1 中，不再依赖本地 `data.db`，可跨设备和跨平台同步读取。

## 1. 本地准备

```bash
npm install
```

## 2. 创建 D1 数据库

```bash
npm run cf:d1:create
```

执行后会拿到 `database_id`，填入 `wrangler.toml`：

```toml
[[d1_databases]]
binding = "DB"
database_name = "worktools-db"
database_id = "这里替换为你的 database_id"
migrations_dir = "migrations"
```

## 3. 初始化数据库结构

本地测试库迁移：

```bash
npm run cf:d1:migrate:local
```

线上 D1 迁移：

```bash
npm run cf:d1:migrate:remote
```

## 4. 配置 JWT 密钥（生产必做）

GitHub 自动部署到 Cloudflare Pages 时，建议在 Cloudflare 控制台配置：
- 进入你的 Pages 项目
- `Settings` -> `Environment variables`
- 新增变量：`JWT_SECRET`（建议 32+ 随机字符串）

如果你使用 Wrangler CLI 手动部署，也可以执行：

```bash
wrangler pages secret put JWT_SECRET
```

## 5. 部署到 Cloudflare Pages

先构建：

```bash
npm run build
```

本地用 Pages Runtime 预览（会加载 `functions/`）：

```bash
npm run cf:dev
```

CLI 手动发布：

```bash
npm run cf:deploy
```

## 6. 默认管理员账号

首次运行会自动写入默认管理员（如果数据库中不存在）：
- 用户名：`admin`
- 密码：`admin123`

请在上线后第一时间改密（建议通过 SQL 或后台改密功能扩展）。

## 7. API 概览

- 公开接口：
  - `GET /api/tools`
  - `GET /api/categories`
- 管理接口（需 Bearer Token）：
  - `POST /api/tools`
  - `PUT /api/tools/:id`
  - `DELETE /api/tools/:id`
  - `POST /api/categories`
  - `PUT /api/categories/:id`
  - `DELETE /api/categories/:id`
  - `GET /api/auth/me`
