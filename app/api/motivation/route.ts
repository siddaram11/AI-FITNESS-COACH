import { NextRequest, NextResponse } from "next/server";
import { callGroq } from "@/lib/groqClient";

export async function GET(_req: NextRequest) {
  try {
    const content = await callGroq([
      {
        role: "system",
        content:
          "You generate very short, punchy fitness motivation quotes (max 18 words).",
      },
      {
        role: "user",
        content:
          "Give me one new motivational quote for fitness, discipline, or healthy habits. Do NOT add quotes or emojis.",
      },
    ]);

    const quote = content.replace(/["“”]/g, "").trim();

    return NextResponse.json({ quote });
  } catch (err: any) {
    console.error("motivation error:", err);
    return NextResponse.json(
      { quote: "Show up today. Your future self is watching." },
      { status: 200 }
    );
  }
}
