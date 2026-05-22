import { computePanchang } from "@/lib/astro/panchang";

export const runtime = "nodejs";

export async function GET(request) {
  const u = new URL(request.url);
  const date = u.searchParams.get("date"); // YYYY-MM-DD
  const lat = parseFloat(u.searchParams.get("lat"));
  const lng = parseFloat(u.searchParams.get("lng"));

  if (!date || Number.isNaN(lat) || Number.isNaN(lng)) {
    return Response.json(
      { error: "date, lat and lng query params are required" },
      { status: 400 }
    );
  }

  try {
    // Anchor at local noon-ish; the panchang module finds the actual sunrise.
    const [y, m, d] = date.split("-").map(Number);
    const dateUTC = new Date(Date.UTC(y, m - 1, d, 6, 0, 0));
    const panchang = computePanchang({ dateUTC, latitude: lat, longitude: lng });
    return Response.json({ panchang });
  } catch (err) {
    console.error("[/api/panchang]", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
