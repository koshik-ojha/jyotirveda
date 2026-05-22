// Quick love percentage from two names. Algorithm:
//   - Letter score: pair off characters from both names, scoring shared letters higher
//   - Numerology destiny match (destiny digits friendship/challenge)
//   - Deterministic — same names always produce the same %
//
// This is the playful "love calculator" of countless astrology sites, but
// grounded in real numerology underneath.

import { destinyNumber, soulUrgeNumber } from "@/lib/numerology";

export const runtime = "nodejs";

const FRIENDS = {
  1: [1,3,5,7], 2: [2,4,6,8], 3: [1,3,5,9], 4: [2,4,6,8], 5: [1,3,5,7],
  6: [2,3,6,9], 7: [1,5,7],   8: [2,4,6,8], 9: [3,6,9],
};
const CHALLENGES = {
  1: [4,6,8], 2: [1,5,7], 3: [4,8], 4: [1,3,5], 5: [2,4,6],
  6: [5,7], 7: [2,8], 8: [1,3,5,7], 9: [4,7,8],
};

function letterScore(a, b) {
  const la = a.toUpperCase().replace(/[^A-Z]/g, "");
  const lb = b.toUpperCase().replace(/[^A-Z]/g, "");
  if (!la || !lb) return 0;
  const setA = new Set(la), setB = new Set(lb);
  const common = [...setA].filter((c) => setB.has(c)).length;
  return Math.min(40, Math.round((common * 80) / Math.max(setA.size, setB.size)));
}

function numerologyScore(a, b) {
  const dA = destinyNumber(a), dB = destinyNumber(b);
  const sA = soulUrgeNumber(a), sB = soulUrgeNumber(b);
  let bonus = 0;
  if (FRIENDS[dA]?.includes(dB)) bonus += 25;
  else if (CHALLENGES[dA]?.includes(dB)) bonus -= 15;
  else bonus += 10;
  if (FRIENDS[sA]?.includes(sB)) bonus += 15;
  else if (CHALLENGES[sA]?.includes(sB)) bonus -= 10;
  else bonus += 5;
  if (dA === dB) bonus += 10;
  if (sA === sB) bonus += 5;
  return { destiny: { a: dA, b: dB }, soulUrge: { a: sA, b: sB }, bonus };
}

export async function POST(request) {
  try {
    const { nameA, nameB } = await request.json();
    if (!nameA?.trim() || !nameB?.trim()) {
      return Response.json({ error: "nameA and nameB are required" }, { status: 400 });
    }

    const ls = letterScore(nameA, nameB);
    const ns = numerologyScore(nameA, nameB);
    const raw = 30 + ls + ns.bonus;          // baseline 30, climbs with shared letters + numerology bonus
    const score = Math.max(15, Math.min(99, raw));

    return Response.json({
      score,
      verdict:
        score >= 85 ? "A soulmate-level resonance — rare and protected."
        : score >= 70 ? "Strong romantic compatibility — flow comes easily."
        : score >= 55 ? "Workable love — different but able to learn from each other."
        : score >= 40 ? "Mixed signals — requires conscious choice on both sides."
        : "Limited natural resonance — the spark will need real fuel.",
      breakdown: {
        sharedLetters: ls,
        numerology: ns,
      },
      tips: tipsFor(score),
    });
  } catch (err) {
    console.error("[/api/love-calc]", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

function tipsFor(score) {
  if (score >= 85) return ["Honour the gift — connection like this asks for presence, not assumptions."];
  if (score >= 70) return ["Lean into shared activities — your numbers harmonise on play and growth.", "Communicate appreciations, not just requests."];
  if (score >= 55) return ["Find one ritual you share weekly — shared rhythm bridges different styles.", "Be explicit about expectations rather than hint at them."];
  if (score >= 40) return ["Take love slow; let actions prove what words can't.", "Therapy or a frank conversation about needs helps a lot."];
  return ["Some bonds are teachers, not partners. Be honest with yourself about which this is.", "If the spark is real, your friendship must do the heavy lifting."];
}
