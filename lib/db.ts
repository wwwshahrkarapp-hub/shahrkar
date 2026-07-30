import Database from "better-sqlite3";

const db = new Database("jobs.db");

db.exec(`
CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  city TEXT NOT NULL,
  salary TEXT NOT NULL,
  description TEXT NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);
`);

export default db;
