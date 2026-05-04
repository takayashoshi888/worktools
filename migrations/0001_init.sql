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
