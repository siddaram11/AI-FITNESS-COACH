import { promises as fs } from "fs";
import path from "path";

// ALWAYS use backend/db.json
const dbPath = path.join(process.cwd(), "backend", "db.json");

// ======================================================
// WRITE DB FIRST (so it exists before readDB uses it)
// ======================================================
export async function writeDB(db) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error("DB Write Error:", err);
  }
}

// ======================================================
// READ DB
// ======================================================
export async function readDB() {
  try {
    const data = await fs.readFile(dbPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("DB Read Error:", err);

    // Auto-create correct structure if missing
    const initial = { users: [] };
    await writeDB(initial);
    return initial;
  }
}
