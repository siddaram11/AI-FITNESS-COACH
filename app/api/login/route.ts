import { NextResponse } from "next/server";
import { readDB, writeDB } from "../../../backend/users";// <-- IMPORTANT: .js extension

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const db = await readDB();

    if (!db.users) {
      return NextResponse.json({ error: "Database corrupt" }, { status: 500 });
    }

    const user = db.users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    console.error("LOGIN API ERROR:", err);
    return NextResponse.json(
      { error: "Server error", message: err.message },
      { status: 500 }
    );
  }
}
