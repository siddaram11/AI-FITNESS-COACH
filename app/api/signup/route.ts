import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // 1️⃣ Create user using Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user?.id;

    // 2️⃣ Insert extra details into "users" table (NO RLS so it works)
    const { error: dbError } = await supabase.from("users").insert({
      id: userId,
      name,
      email,
    });

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Signup successful!",
    });
  } catch (err: any) {
    console.error("Signup Error:", err);
    return NextResponse.json(
      { error: "Server error", details: err.toString() },
      { status: 500 }
    );
  }
}
