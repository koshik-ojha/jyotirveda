// Friendship percentage — like love-calc but tuned for non-romantic bonds.
// Adds life-path harmony if DOBs are supplied.

import { destinyNumber, soulUrgeNumber, lifePathNumber } from "@/lib/numerology";

export const runtime = "nodejs";

const FRIENDS_PAIR = {
  1: [1,3,5,7,9], 2: [2,4,6,8], 3: [1,3,5,6,9], 4: [2,4,6,7,8],
  5: [1,3,5,7], 6: [2,3,6,8,9], 7: [1,4,5,7], 8: [2,4,6,8], 9: [1,3,6,9],
};

function letterScore(a, b) {
  const la = a.toUpperCase().replace(/[^A-Z]/g, "");
  const lb = b.toUpperCase().replace(/[^A-Z]/g, "");
  if (!la || !lb) return 0;
  const setA = new Set(la), setB = new Set(lb);
  const common = [...setA].filter((c) => setB.has(c)).length;
  return Math.min(35, Math.round((common * 70) / Math.max(setA.size, setB.size)));
}

export async function POST(request) {
  try {
    const { nameA, nameB, dobA, dobB } = await request.json();
    if (!nameA?.trim() || !nameB?.trim()) {
      return Response.json({ error: "nameA and nameB required" }, { status: 400 });
    }

    const ls = letterScore(nameA, nameB);
    const dA = destinyNumber(nameA);
    const dB = destinyNumber(nameB);
    const sA = soulUrgeNumber(nameA);
    const sB = soulUrgeNumber(nameB);

    let bonus = 10;
    if (FRIENDS_PAIR[dA]?.includes(dB)) bonus += 20;
    if (FRIENDS_PAIR[sA]?.includes(sB)) bonus += 10;
    if (dA === dB) bonus += 8;
    if (sA === sB) bonus += 5;

    let life = null;
    if (dobA && dobB) {
      const lA = lifePathNumber(dobA);
      const lB = lifePathNumber(dobB);
      life = { a: lA, b: lB, sameVibe: lA === lB, compatible: FRIENDS_PAIR[lA]?.includes(lB) };
      if (life.sameVibe) bonus += 10;
      if (life.compatible) bonus += 12;
    }

    const raw = 35 + ls + bonus;
    const score = Math.max(20, Math.min(99, raw));

    return Response.json({
      score,
      verdict:
        score >= 85 ? "Lifelong-friend potential — the kind who shows up at 3 a.m."
        : score >= 70 ? "Strong friendship — easy laughter, mutual loyalty."
        : score >= 55 ? "Solid acquaintances who can grow closer with shared time."
        : score >= 40 ? "Casual rapport — pleasant but unlikely to go deep without effort."
        : "Limited resonance — different orbits.",
      breakdown: {
        sharedLetters: ls,
        destiny: { a: dA, b: dB },
        soulUrge: { a: sA, b: sB },
        lifePath: life,
      },
    });
  } catch (err) {
    console.error("[/api/friendship-calc]", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
