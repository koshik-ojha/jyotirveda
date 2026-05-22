import { moonLongitudeAt } from "@/lib/astro/ashtakoot";
import { localToUTC } from "@/lib/geocode";
import { RASHIS, NAKSHATRAS } from "@/lib/astro/constants";

export const runtime = "nodejs";

const NAK_SIZE = 360 / 27;

export async function POST(request) {
  try {
    const { date, time, latitude, longitude, timezone } = await request.json();
    if (!date || !time || !timezone || latitude == null || longitude == null) {
      return Response.json({ error: "date, time, latitude, longitude and timezone are required" }, { status: 400 });
    }
    const [y, mo, d] = date.split("-").map(Number);
    const [h, mi]    = time.split(":").map(Number);
    const utc = localToUTC({ year: y, month: mo, day: d, hour: h, minute: mi, timezone });
    const moonLng = moonLongitudeAt(utc);

    const signIdx = Math.floor(moonLng / 30);
    const nakIdx = Math.floor(moonLng / NAK_SIZE);
    const within = moonLng - nakIdx * NAK_SIZE;
    const pada = Math.floor(within / (NAK_SIZE / 4)) + 1;

    return Response.json({
      moonLongitude: moonLng,
      moonRashi: { index: signIdx, ...RASHIS[signIdx] },
      nakshatra: { index: nakIdx, pada, ...NAKSHATRAS[nakIdx] },
    });
  } catch (err) {
    console.error("[/api/moon-sign]", err);
    return Response.json({ error: err.message || "Moon sign computation failed" }, { status: 500 });
  }
}
