import { computeMatch } from "@/lib/astro/ashtakoot";
import { localToUTC } from "@/lib/geocode";

export const runtime = "nodejs";

function buildPersonUTC(p) {
  if (!p?.date || !p?.time || !p?.timezone) return null;
  const [y, mo, d] = p.date.split("-").map(Number);
  const [h, mi]    = p.time.split(":").map(Number);
  if ([y, mo, d, h, mi].some(Number.isNaN)) return null;
  return localToUTC({ year: y, month: mo, day: d, hour: h, minute: mi, timezone: p.timezone });
}

export async function POST(request) {
  try {
    const { boy, girl } = await request.json();
    if (!boy || !girl) {
      return Response.json({ error: "boy and girl details are required" }, { status: 400 });
    }
    const boyUTC  = buildPersonUTC(boy);
    const girlUTC = buildPersonUTC(girl);
    if (!boyUTC || !girlUTC) {
      return Response.json({ error: "Each side needs date, time and timezone" }, { status: 400 });
    }
    if (boy.latitude == null || boy.longitude == null || girl.latitude == null || girl.longitude == null) {
      return Response.json({ error: "Each side needs latitude/longitude" }, { status: 400 });
    }

    const match = computeMatch(
      { birthUTC: boyUTC.toISOString(),  latitude: +boy.latitude,  longitude: +boy.longitude,  name: boy.name  },
      { birthUTC: girlUTC.toISOString(), latitude: +girl.latitude, longitude: +girl.longitude, name: girl.name },
    );
    return Response.json({ match, names: { boy: boy.name || null, girl: girl.name || null } });
  } catch (err) {
    console.error("[/api/match]", err);
    return Response.json({ error: err.message || "Match computation failed" }, { status: 500 });
  }
}
