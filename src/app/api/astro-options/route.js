import { AYANAMSAS, HOUSE_SYSTEMS, NODE_TYPES } from "@/lib/astro/ephemeris";

export const runtime = "nodejs";

// Tiny endpoint so the client can list available choices without duplicating
// the catalogue. GET it once on mount.
export async function GET() {
  const pick = (obj) =>
    Object.entries(obj).map(([key, v]) => ({ key, label: v.label, note: v.note }));
  return Response.json({
    ayanamsas: pick(AYANAMSAS),
    houseSystems: pick(HOUSE_SYSTEMS),
    nodeTypes: pick(NODE_TYPES),
  });
}
