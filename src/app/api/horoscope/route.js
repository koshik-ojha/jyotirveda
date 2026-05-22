import { computeHoroscope } from "@/lib/astro/horoscope";
import { RASHIS } from "@/lib/astro/constants";

export const runtime = "nodejs";

const VALID_PERIODS = new Set(["today","tomorrow","weekly","monthly","yearly"]);

function resolveSignIdx(input) {
  if (input == null) return null;
  if (!isNaN(+input)) {
    const i = parseInt(input, 10);
    return i >= 0 && i < 12 ? i : null;
  }
  const lower = String(input).toLowerCase();
  return RASHIS.findIndex(
    (r) => r.en.toLowerCase() === lower || r.sa.toLowerCase() === lower || r.hi === input
  );
}

export async function GET(request) {
  const u = new URL(request.url);
  const period = u.searchParams.get("period") || "today";
  if (!VALID_PERIODS.has(period)) {
    return Response.json({ error: `period must be one of ${[...VALID_PERIODS].join(", ")}` }, { status: 400 });
  }

  const dateParam = u.searchParams.get("date");
  const dateUTC = dateParam ? new Date(dateParam) : new Date();
  if (isNaN(dateUTC)) {
    return Response.json({ error: "Invalid date" }, { status: 400 });
  }

  const signParam = u.searchParams.get("sign");
  if (signParam !== null) {
    const idx = resolveSignIdx(signParam);
    if (idx == null || idx < 0) {
      return Response.json({ error: `Unknown sign: ${signParam}` }, { status: 400 });
    }
    return Response.json({ horoscope: computeHoroscope({ signIdx: idx, dateUTC, period }) });
  }

  // No sign → return all 12 (useful for index pages).
  const horoscopes = RASHIS.map((_, idx) => computeHoroscope({ signIdx: idx, dateUTC, period }));
  return Response.json({ horoscopes });
}
