import { julianDayUT, houses, ayanamsa as ayanamsaAt } from "@/lib/astro/ephemeris";
import { localToUTC } from "@/lib/geocode";
import { RASHIS, NAKSHATRAS } from "@/lib/astro/constants";

export const runtime = "nodejs";

const NAK_SIZE = 360 / 27;
function signOf(lng) { return Math.floor(lng / 30); }
function degInSign(lng) { return lng - Math.floor(lng / 30) * 30; }

export async function POST(request) {
  try {
    const { date, time, latitude, longitude, timezone } = await request.json();
    if (!date || !time || latitude == null || longitude == null || !timezone) {
      return Response.json({ error: "date, time, latitude, longitude and timezone are required" }, { status: 400 });
    }
    const [y, mo, d] = date.split("-").map(Number);
    const [h, mi]    = time.split(":").map(Number);
    const utc = localToUTC({ year: y, month: mo, day: d, hour: h, minute: mi, timezone });
    const jd = julianDayUT(utc);

    const { ascendant, cusps } = houses(jd, Number(latitude), Number(longitude));
    const sIdx = signOf(ascendant);
    const nakIdx = Math.floor(ascendant / NAK_SIZE);
    const within = ascendant - nakIdx * NAK_SIZE;
    const pada = Math.floor(within / (NAK_SIZE / 4)) + 1;

    return Response.json({
      ascendant: {
        longitude: ascendant,
        degInSign: degInSign(ascendant),
        sign: { index: sIdx, ...RASHIS[sIdx] },
        nakshatra: { index: nakIdx, pada, ...NAKSHATRAS[nakIdx] },
      },
      houseCusps: cusps.map((c, i) => ({
        house: i + 1,
        longitude: c,
        sign: { index: signOf(c), ...RASHIS[signOf(c)] },
      })),
      ayanamsa: ayanamsaAt(jd),
    });
  } catch (err) {
    console.error("[/api/ascendant]", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
