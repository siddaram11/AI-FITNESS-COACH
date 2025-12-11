import { NextResponse } from "next/server";
import { readDB } from "../../../backend/users";

export async function POST(req: Request) {
  const { email } = await req.json();

  const db = readDB();
  const user = db.users.find((u: any) => u.email === email);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}
