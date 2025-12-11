import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    // TEMPORARY LOADING IMAGE (instant display)
    const placeholder = "/loading-placeholder.jpg";

    // REAL Pollinations AI image (slow)
    const pollinationsImage = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}?width=1024&height=1024`;

    return NextResponse.json({
      imageUrl: pollinationsImage, // client still receives real image URL
      placeholder,
    });
  } catch (err: any) {
    console.error("Pollinations Image Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
