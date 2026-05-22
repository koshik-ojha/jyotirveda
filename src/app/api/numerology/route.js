import { computeNumerology } from "@/lib/numerology";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { name, dob } = await request.json();
    if (!name || !dob) {
      return Response.json({ error: "name and dob (YYYY-MM-DD) are required" }, { status: 400 });
    }
    const report = computeNumerology({ name, dob });
    return Response.json({ report });
  } catch (err) {
    console.error("[/api/numerology]", err);
    return Response.json({ error: err.message || "Numerology computation failed" }, { status: 500 });
  }
}
