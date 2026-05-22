import { NAMES, RASHI_LETTERS } from "@/lib/babyNames/data";
import { NAKSHATRAS } from "@/lib/astro/constants";

export const runtime = "nodejs";

function startsWithAny(name, prefixes) {
  const lower = name.toLowerCase();
  return prefixes.some((p) => lower.startsWith(p.toLowerCase()));
}

export async function GET(request) {
  const u = new URL(request.url);
  const gender = u.searchParams.get("gender"); // boy | girl | (null = all)
  const letter = u.searchParams.get("letter");
  const nakshatra = u.searchParams.get("nakshatra"); // English name or index
  const rashi = u.searchParams.get("rashi"); // English name
  const q = u.searchParams.get("q");
  const limit = Math.min(parseInt(u.searchParams.get("limit") || "100", 10), 500);

  let list = NAMES;

  if (gender) list = list.filter((n) => n.gender === gender);

  if (nakshatra) {
    const nak = isNaN(+nakshatra)
      ? NAKSHATRAS.find((x) => x.en.toLowerCase() === nakshatra.toLowerCase())
      : NAKSHATRAS[+nakshatra];
    if (nak) list = list.filter((n) => startsWithAny(n.syllable, nak.syllables));
  }

  if (rashi) {
    const letters = RASHI_LETTERS[rashi];
    if (letters) list = list.filter((n) => startsWithAny(n.syllable, letters));
  }

  if (letter) list = list.filter((n) => n.syllable.toLowerCase().startsWith(letter.toLowerCase()));

  if (q) {
    const lq = q.toLowerCase();
    list = list.filter(
      (n) => n.name.toLowerCase().includes(lq) || n.meaning.toLowerCase().includes(lq)
    );
  }

  const total = list.length;
  return Response.json({
    total,
    results: list.slice(0, limit),
  });
}
