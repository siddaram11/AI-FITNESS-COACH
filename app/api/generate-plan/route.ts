import { NextResponse } from "next/server";
import { callGroq } from "@/lib/groqClient";
import { readDB, writeDB } from "@/../backend/users.js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
You are an expert AI Fitness & Nutrition Coach.

Generate a COMPLETE 7-day personalized fitness plan for this user.

User Information:
- Age: ${body.age}
- Gender: ${body.gender}
- Height: ${body.height}
- Weight: ${body.weight}
- Goal: ${body.goal}
- Fitness Level: ${body.level}
- Workout Location: ${body.location}
- Diet Preference: ${body.diet}

IMPORTANT RULES:
1. ALWAYS return exactly **7 workout days**
2. ALWAYS return exactly **7 diet days**
3. NO missing fields
4. Output MUST BE VALID JSON ONLY (no markdown, no commentary)

OUTPUT FORMAT (STRICT):

{
  "workout": [
    {
      "day": "Day 1",
      "focus": "",
      "exercises": [
        { "name": "", "sets": "", "reps": "", "rest": "" }
      ]
    }
  ],
  "diet": [
    {
      "day": "Day 1",
      "Breakfast": "",
      "Lunch": "",
      "Dinner": "",
      "Snacks": ""
    }
  ],
  "tips": [
    "tip 1",
    "tip 2",
    "tip 3"
  ],
  "motivation": [
    "motivational line 1",
    "motivational line 2"
  ]
}

Ensure JSON is CLEAN and PARSABLE.
`;

    const output = await callGroq([
      { role: "system", content: "You are an AI fitness planner. Return ONLY JSON." },
      { role: "user", content: prompt }
    ]);

    // 🧹 Remove code fences if Groq adds them
    const cleaned = output
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const json = JSON.parse(cleaned);

    return NextResponse.json({ plan: json });
  } catch (err: any) {
    console.error("Plan generation error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
