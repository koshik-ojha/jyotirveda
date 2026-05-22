import { geocode } from "@/lib/geocode";

export const runtime = "nodejs";

export async function GET(request) {
  const q = new URL(request.url).searchParams.get("q");
  if (!q) return Response.json({ results: [] });
  try {
    const results = await geocode(q);
    return Response.json({ results });
  } catch (err) {
    console.error("[/api/geocode]", err);
    return Response.json({ error: "Geocoding failed" }, { status: 502 });
  }
}
