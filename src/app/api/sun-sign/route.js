import { julianDayUT, planetPosition, ayanamsa as ayanamsaAt } from "@/lib/astro/ephemeris";
import { localToUTC } from "@/lib/geocode";
import { RASHIS } from "@/lib/astro/constants";

export const runtime = "nodejs";

function signOf(lng) { return Math.floor(lng / 30); }
function degInSign(lng) { return lng - Math.floor(lng / 30) * 30; }

export async function POST(request) {
  try {
    const { date, time, timezone } = await request.json();
    if (!date || !time || !timezone) {
      return Response.json({ error: "date, time, and timezone are required" }, { status: 400 });
    }
    const [y, mo, d] = date.split("-").map(Number);
    const [h, mi]    = time.split(":").map(Number);
    const utc = localToUTC({ year: y, month: mo, day: d, hour: h, minute: mi, timezone });
    const jd = julianDayUT(utc);

    const sun = planetPosition(jd, "Sun");
    const sideIdx  = signOf(sun.longitude);
    const ayan = ayanamsaAt(jd);
    const tropicalLng = (sun.longitude + ayan) % 360;
    const tropIdx  = signOf(tropicalLng);

    return Response.json({
      vedic: {
        sign: { index: sideIdx, ...RASHIS[sideIdx] },
        longitude: sun.longitude,
        degInSign: degInSign(sun.longitude),
      },
      tropical: {
        sign: { index: tropIdx, ...RASHIS[tropIdx] },
        longitude: tropicalLng,
        degInSign: degInSign(tropicalLng),
      },
      ayanamsa: ayan,
    });
  } catch (err) {
    console.error("[/api/sun-sign]", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
