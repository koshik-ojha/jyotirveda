import { monthlyPanchang } from "@/lib/astro/panchangExtra";

export const runtime = "nodejs";

export async function GET(request) {
  const u = new URL(request.url);
  const year  = parseInt(u.searchParams.get("year"), 10);
  const month = parseInt(u.searchParams.get("month"), 10);
  const lat   = parseFloat(u.searchParams.get("lat"));
  const lng   = parseFloat(u.searchParams.get("lng"));
  if (!year || !month || Number.isNaN(lat) || Number.isNaN(lng)) {
    return Response.json({ error: "year, month, lat, lng required" }, { status: 400 });
  }
  try {
    return Response.json({ month: monthlyPanchang({ year, month, latitude: lat, longitude: lng }) });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
