import { computePorutham } from "@/lib/astro/porutham";
import { localToUTC } from "@/lib/geocode";

export const runtime = "nodejs";

function personUTC(p) {
  const [y, mo, d] = p.date.split("-").map(Number);
  const [h, mi]    = p.time.split(":").map(Number);
  return localToUTC({ year: y, month: mo, day: d, hour: h, minute: mi, timezone: p.timezone });
}

export async function POST(request) {
  try {
    const { boy, girl } = await request.json();
    if (!boy || !girl) return Response.json({ error: "boy and girl required" }, { status: 400 });
    if (!boy.date || !boy.time || !boy.timezone || !girl.date || !girl.time || !girl.timezone) {
      return Response.json({ error: "Each side needs date, time, timezone" }, { status: 400 });
    }
    const result = computePorutham(personUTC(boy).toISOString(), personUTC(girl).toISOString());
    return Response.json({ result, names: { boy: boy.name || null, girl: girl.name || null } });
  } catch (err) {
    console.error("[/api/porutham]", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
