import { readPalm } from "@/lib/palmistry";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const features = await request.json();
    return Response.json({ reading: readPalm(features) });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
