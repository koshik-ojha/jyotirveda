import { activeNadi } from "@/lib/swarodaya";

export const runtime = "nodejs";

export async function GET(request) {
  const u = new URL(request.url);
  const lat = parseFloat(u.searchParams.get("lat"));
  const lng = parseFloat(u.searchParams.get("lng"));
  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return Response.json({ error: "lat and lng are required" }, { status: 400 });
  }
  const dateUTC = u.searchParams.get("date") ? new Date(u.searchParams.get("date")) : new Date();
  try {
    return Response.json({ nadi: activeNadi({ dateUTC, latitude: lat, longitude: lng }) });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
