import { computeKundli } from "@/lib/astro/kundli";
import { localToUTC } from "@/lib/geocode";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, gender, date, time, latitude, longitude, timezone, options } = body;

    if (!date || !time || latitude == null || longitude == null || !timezone) {
      return Response.json(
        { error: "date, time, latitude, longitude and timezone are required" },
        { status: 400 }
      );
    }

    const [y, mo, d] = date.split("-").map(Number);
    const [h, mi] = time.split(":").map(Number);
    if ([y, mo, d, h, mi].some(Number.isNaN)) {
      return Response.json({ error: "Invalid date or time format" }, { status: 400 });
    }

    const birthUTC = localToUTC({
      year: y, month: mo, day: d, hour: h, minute: mi, timezone,
    });

    const kundli = computeKundli({
      birthUTC,
      latitude: Number(latitude),
      longitude: Number(longitude),
      name,
      gender,
      options,
    });

    return Response.json({ kundli });
  } catch (err) {
    console.error("[/api/kundli]", err);
    return Response.json({ error: err.message || "Computation failed" }, { status: 500 });
  }
}
