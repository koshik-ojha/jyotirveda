// Single endpoint that dispatches by `type` — keeps the per-page client code
// trivial (POST /api/reports with a type field).

import {
  computeKaalsarp, computeMangalDosha, computeSadeSati,
  computeGemstones, computeVarshphal, computeTransitToday,
} from "@/lib/astro/reports";
import { computeLalKitab } from "@/lib/astro/lalkitab";
import { computeKundli } from "@/lib/astro/kundli";
import { localToUTC } from "@/lib/geocode";
import { moonLongitudeAt } from "@/lib/astro/ashtakoot";
import { julianDayUT, houses } from "@/lib/astro/ephemeris";

export const runtime = "nodejs";

function parseBirth(body) {
  const { date, time, latitude, longitude, timezone } = body;
  if (!date || !time || latitude == null || longitude == null || !timezone) {
    throw new Error("date, time, latitude, longitude and timezone are required");
  }
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi]    = time.split(":").map(Number);
  if ([y, mo, d, h, mi].some(Number.isNaN)) throw new Error("Invalid date/time");
  return localToUTC({ year: y, month: mo, day: d, hour: h, minute: mi, timezone });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { type } = body;
    if (!type) return Response.json({ error: "type required" }, { status: 400 });

    // Transit-today doesn't need birth details for the base reading.
    if (type === "transit-today") {
      const refRashi = body.rashiIdx != null ? parseInt(body.rashiIdx, 10) : null;
      return Response.json({ report: computeTransitToday(new Date(), refRashi) });
    }

    const birthUTC = parseBirth(body);
    const lat = +body.latitude, lng = +body.longitude;
    const jd = julianDayUT(birthUTC);

    switch (type) {
      case "kaalsarp": {
        const report = computeKaalsarp(jd, lat, lng);
        return Response.json({ report });
      }
      case "mangal-dosha": {
        const report = computeMangalDosha(jd, lat, lng);
        return Response.json({ report });
      }
      case "sade-sati": {
        const moonLng = moonLongitudeAt(birthUTC);
        const report = computeSadeSati(moonLng);
        return Response.json({ report });
      }
      case "gemstones": {
        const { ascendant } = houses(jd, lat, lng);
        const ascSignIdx = Math.floor(ascendant / 30);
        const report = computeGemstones(ascSignIdx);
        return Response.json({ report });
      }
      case "lal-kitab": {
        const report = computeLalKitab(birthUTC);
        return Response.json({ report });
      }
      case "varshphal": {
        const targetYear = parseInt(body.year, 10) || new Date().getUTCFullYear();
        const report = computeVarshphal(birthUTC, targetYear, lat, lng);
        return Response.json({ report });
      }
      case "dasha": {
        // Full Vimshottari from a fresh kundli computation.
        const kundli = computeKundli({ birthUTC, latitude: lat, longitude: lng });
        return Response.json({
          report: {
            dasha: kundli.dasha,
            moonRashi: kundli.moonRashi,
            janmaNakshatra: kundli.janmaNakshatra,
          },
        });
      }
      default:
        return Response.json({ error: `Unknown report type: ${type}` }, { status: 400 });
    }
  } catch (err) {
    console.error("[/api/reports]", err);
    return Response.json({ error: err.message || "Report failed" }, { status: 500 });
  }
}
