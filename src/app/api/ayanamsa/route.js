import sweph from "sweph";
import { julianDayUT, AYANAMSAS } from "@/lib/astro/ephemeris";

export const runtime = "nodejs";

export async function GET(request) {
  const u = new URL(request.url);
  const dateStr = u.searchParams.get("date");
  const date = dateStr ? new Date(dateStr) : new Date();
  if (isNaN(date)) return Response.json({ error: "Invalid date" }, { status: 400 });
  const jd = julianDayUT(date);

  // Compute ayanamsa for ALL supported modes by switching sid_mode each time.
  const results = {};
  for (const [key, meta] of Object.entries(AYANAMSAS)) {
    sweph.set_sid_mode(meta.id, 0, 0);
    const r = sweph.get_ayanamsa_ut(jd);
    const value = typeof r === "number" ? r : r.data;
    results[key] = {
      key,
      label: meta.label,
      note: meta.note,
      degrees: value,
      formatted: formatDeg(value),
    };
  }

  return Response.json({
    date: date.toISOString(),
    julianDay: jd,
    ayanamsas: results,
  });
}

function formatDeg(deg) {
  const d = Math.floor(deg);
  const m = Math.floor((deg - d) * 60);
  const s = Math.round(((deg - d) * 60 - m) * 60);
  return `${d}°${String(m).padStart(2,"0")}'${String(s).padStart(2,"0")}"`;
}
