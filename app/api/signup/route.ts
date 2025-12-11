import { NextResponse } from "next/server"; // 💯 Correct import path
import { readDB, writeDB } from "@/../backend/users.js";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const db = await readDB();

    // Check if user exists
    if (db.users.some((u: any) => u.email === email)) {
      return NextResponse.json(
        { error: "Email already exists!" },
        { status: 400 }
      );
    }

    // Add new user
    db.users.push({
      id: Date.now(),
      name,
      email,
      password,
    });

    await writeDB(db);

    return NextResponse.json({
      success: true,
      message: "Signup successful",
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
