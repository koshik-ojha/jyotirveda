import {
  signCompatibility, dateCompatibility, nameCompatibility, nameProfile,
} from "@/lib/compatibility";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { type } = body;
    if (!type) return Response.json({ error: "type required" }, { status: 400 });

    switch (type) {
      case "moon-sign":
      case "sun-sign": {
        const a = parseInt(body.aIdx, 10);
        const b = parseInt(body.bIdx, 10);
        if (Number.isNaN(a) || Number.isNaN(b) || a < 0 || a > 11 || b < 0 || b > 11) {
          return Response.json({ error: "aIdx and bIdx must be 0..11" }, { status: 400 });
        }
        return Response.json({ result: signCompatibility(a, b) });
      }
      case "birth-date": {
        if (!body.dobA || !body.dobB) return Response.json({ error: "dobA and dobB required (YYYY-MM-DD)" }, { status: 400 });
        return Response.json({ result: dateCompatibility(body.dobA, body.dobB) });
      }
      case "name": {
        if (!body.nameA || !body.nameB) return Response.json({ error: "nameA and nameB required" }, { status: 400 });
        return Response.json({ result: nameCompatibility(body.nameA, body.nameB) });
      }
      case "name-profile": {
        if (!body.name) return Response.json({ error: "name required" }, { status: 400 });
        return Response.json({ result: nameProfile(body.name) });
      }
      default:
        return Response.json({ error: `Unknown type: ${type}` }, { status: 400 });
    }
  } catch (err) {
    console.error("[/api/compatibility]", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
