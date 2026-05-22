import { drawSpread, SPREAD_KEYS } from "@/lib/tarot";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { spread = "three", question = "", seed } = await request.json();
    if (!SPREAD_KEYS.includes(spread)) {
      return Response.json({ error: `spread must be one of ${SPREAD_KEYS.join(", ")}` }, { status: 400 });
    }
    const result = drawSpread({ spread, question, seed });
    return Response.json({ result });
  } catch (err) {
    console.error("[/api/tarot]", err);
    return Response.json({ error: err.message || "Tarot draw failed" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ spreads: SPREAD_KEYS });
}
