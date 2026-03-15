import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-worktools';

const db = new Database('data.db');
db.pragma('journal_mode = WAL');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password_hash TEXT,
    name TEXT,
    role TEXT
  );

  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT,
    description TEXT,
    icon TEXT,
    color TEXT,
    status TEXT
  );

  CREATE TABLE IF NOT EXISTS tools (
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
  );
`);

// Seed default admin if not exists
const adminUser = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
if (!adminUser) {
  const hash = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO users (username, password_hash, name, role) VALUES (?, ?, ?, ?)').run('admin', hash, '管理员', 'admin');
}

// Seed default categories if empty
const catCount = db.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number };
if (catCount.count === 0) {
  const insertCat = db.prepare('INSERT INTO categories (id, name, description, icon, color, status) VALUES (?, ?, ?, ?, ?, ?)');
  insertCat.run('1', '文本处理', '提供一键去重、清洗、排版、大小写转换等功能。', 'text_fields', 'bg-blue-500', '活跃');
  insertCat.run('2', '开发辅助', 'JSON格式化、Base64编解码、正则表达式测试等。', 'code', 'bg-brand-500', '活跃');
  insertCat.run('3', '图片优化', '无损压缩、格式转换、尺寸裁剪、水印添加等。', 'image', 'bg-emerald-500', '活跃');
}

// Seed default tools if empty
const toolCount = db.prepare('SELECT COUNT(*) as count FROM tools').get() as { count: number };
if (toolCount.count === 0) {
  const insertTool = db.prepare('INSERT INTO tools (id, name, category, url, description, isActive, icon, color, version, size, dateAdded, status, users) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  insertTool.run('1', '超级文本格式化', '文本处理', '#', '提供一键去重、清洗、排版、大小写转换。纯前端处理，绝不上传您的任何私密数据，安全无忧。', 1, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOlVCP9lk4zzttDgyUZpcRPxPQuKfPEd1Ijp-HZOQIWRr-xmepKOygl2x-n2lG5mTmyLD3xCz9NZnZ21V-XV2sRIlZ3-ndR0f5CJzOl1wn_FS9KW0w3E3h3BTGePs9FmhYqwPgyP-rb_APu9JTgo3HurVu85cdMiUVmhYLAPx4x4AZrMyMR7amAuy6ltzPS4PzvaHGlcBxG-hCVMZh6W1dHVUXqqQfZTI8Zv3MgJh_O21ERwPzJW4chkcL04J_SIpQTmgWHcedmLA', 'bg-blue-500', 'v2.4.0', '12.4 MB', '2023-10-12', '活跃', '1.2k+ 人正在使用');
  insertTool.run('2', '极客 JSON 美化', '开发辅助', '#', '支持 JSON 校验、美化、压缩、转义。极致的渲染速度，支持处理数万行的超大型 JSON 文件。', 1, 'https://lh3.googleusercontent.com/aida-public/AB6AXuACjAeDPtkOvNG6RynDdxxcvz5c1JQupwfqpSFHkdIgVSdTyMgtlZpl4au0xPaSu1PUgSCHqMj2ZI0ASs_s0_QBPS7uYBu3eYHRLwerK3E7NR7tbz3vM20FiEtOFs-QF6yHGTYzMfDe0p9MdG3DQy2Z6sjhnmG-UfARrqKDC2uFNw8oR0txO5xJqsVeZBrvaRsioGvSufRwXqt1TjmqXMXhVvY-ig9HZL6RG0Ih3j5V1oROdXHraz6laYJ0-uhNekJ9HrOQVSez7fI', 'bg-brand-500', 'v1.0.2', '8.1 MB', '2023-11-03', '活跃', '800+ 本周活跃');
  insertTool.run('3', '无损图片压缩', '图片优化', '#', '在保持画质的前提下，将图片体积缩小 70% 以上。支持批量上传，秒级完成转换。', 1, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ09OL-M_VLWujhWyst0b5GXIW6cigis2H8BI71MqBiOoIw1Y4jlQ88kSV1zy2EOnr6Ew9ndyIJuVzxfAWGcu6uPEQi1-_luTSXSXxZIT38h5YKQc6-rHdS6fJ6q0e-2dCoo2Ii_xuYxQtd2pQvaWTR1Jr8-EFkC5qn1R6cRvDnyMk6cAfbjjtghG8dKmTpQWCvw5atIIeDlLv8kDsJ60y-FU7e7B2T-8ywwQ29C7KtX49nooDBiPajh9JSBodSIDeVQIbJlQZ-LE', 'bg-emerald-500', 'v3.1.5', '45.9 MB', '2023-10-28', '活跃', '刚刚更新');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Middleware to verify JWT
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  // Auth API
  app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;
    
    if (user && bcrypt.compareSync(password, user.password_hash)) {
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ token, user: { username: user.username, name: user.name } });
    } else {
      res.status(401).json({ error: '用户名或密码错误' });
    }
  });

  app.get('/api/auth/me', authenticateToken, (req: any, res) => {
    const user = db.prepare('SELECT username, name, role FROM users WHERE id = ?').get(req.user.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  });

  // Tools API
  app.get('/api/tools', (req, res) => {
    const tools = db.prepare('SELECT * FROM tools').all().map((t: any) => ({
      ...t,
      isActive: t.isActive === 1
    }));
    res.json(tools);
  });

  app.post('/api/tools', authenticateToken, (req, res) => {
    const t = req.body;
    const id = Date.now().toString();
    const dateAdded = new Date().toISOString().split('T')[0];
    const insert = db.prepare('INSERT INTO tools (id, name, category, url, description, isActive, icon, color, version, size, dateAdded, status, users) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    insert.run(id, t.name, t.category, t.url, t.description, t.isActive ? 1 : 0, t.icon, t.color || '', t.version || '', t.size || '', dateAdded, t.status || '活跃', t.users || '');
    res.json({ id, ...t, dateAdded });
  });

  app.put('/api/tools/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    const t = req.body;
    
    const updates: string[] = [];
    const values: any[] = [];
    
    for (const [key, value] of Object.entries(t)) {
      if (key !== 'id') {
        updates.push(`${key} = ?`);
        values.push(key === 'isActive' ? (value ? 1 : 0) : value);
      }
    }
    
    if (updates.length > 0) {
      values.push(id);
      db.prepare(`UPDATE tools SET ${updates.join(', ')} WHERE id = ?`).run(...values);
    }
    
    res.json({ success: true });
  });

  app.delete('/api/tools/:id', authenticateToken, (req, res) => {
    db.prepare('DELETE FROM tools WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  // Categories API
  app.get('/api/categories', (req, res) => {
    const categories = db.prepare('SELECT * FROM categories').all();
    res.json(categories);
  });

  app.post('/api/categories', authenticateToken, (req, res) => {
    const c = req.body;
    const id = Date.now().toString();
    const insert = db.prepare('INSERT INTO categories (id, name, description, icon, color, status) VALUES (?, ?, ?, ?, ?, ?)');
    insert.run(id, c.name, c.description, c.icon, c.color, c.status || '活跃');
    res.json({ id, ...c });
  });

  app.put('/api/categories/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    const c = req.body;
    
    const updates: string[] = [];
    const values: any[] = [];
    
    for (const [key, value] of Object.entries(c)) {
      if (key !== 'id') {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }
    
    if (updates.length > 0) {
      values.push(id);
      db.prepare(`UPDATE categories SET ${updates.join(', ')} WHERE id = ?`).run(...values);
    }
    
    res.json({ success: true });
  });

  app.delete('/api/categories/:id', authenticateToken, (req, res) => {
    db.prepare('DELETE FROM categories WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
