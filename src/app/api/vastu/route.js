import { analyseEntrance, compass } from "@/lib/vastu";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { direction, rashiIdx } = await request.json();
    if (!direction) return Response.json({ error: "direction key required" }, { status: 400 });
    const analysis = analyseEntrance(direction, rashiIdx);
    return Response.json({ analysis, compass: compass() });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ compass: compass() });
}
