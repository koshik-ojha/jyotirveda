import { doGhatiMuhurats } from "@/lib/astro/panchangExtra";

export const runtime = "nodejs";

export async function GET(request) {
  const u = new URL(request.url);
  const lat = parseFloat(u.searchParams.get("lat"));
  const lng = parseFloat(u.searchParams.get("lng"));
  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return Response.json({ error: "lat and lng required" }, { status: 400 });
  }
  const dateStr = u.searchParams.get("date");
  let date = new Date();
  if (dateStr) {
    const [y, m, d] = dateStr.split("-").map(Number);
    date = new Date(Date.UTC(y, m - 1, d, 6, 0, 0));
  }
  try {
    return Response.json({ muhurta: doGhatiMuhurats({ dateUTC: date, latitude: lat, longitude: lng }) });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
