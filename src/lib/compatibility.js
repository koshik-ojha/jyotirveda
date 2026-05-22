// Lightweight compatibility scoring: moon-sign, sun-sign, numerology name/date.

import { RASHIS } from "./astro/constants.js";
import {
  lifePathNumber, destinyNumber, soulUrgeNumber, personalityNumber, describe,
} from "./numerology.js";

// Western tropical sun-sign element groupings (same names as Vedic rashis).
const ELEMENT_GROUP = {
  Aries: "Fire", Leo: "Fire", Sagittarius: "Fire",
  Taurus: "Earth", Virgo: "Earth", Capricorn: "Earth",
  Gemini: "Air", Libra: "Air", Aquarius: "Air",
  Cancer: "Water", Scorpio: "Water", Pisces: "Water",
};
const SIGN_QUALITY = {
  Aries: "Cardinal", Cancer: "Cardinal", Libra: "Cardinal", Capricorn: "Cardinal",
  Taurus: "Fixed", Leo: "Fixed", Scorpio: "Fixed", Aquarius: "Fixed",
  Gemini: "Mutable", Virgo: "Mutable", Sagittarius: "Mutable", Pisces: "Mutable",
};
// Friend-element pairs (Vedic & Western share this principle)
const FRIEND_ELEMENT = { Fire: "Air", Air: "Fire", Earth: "Water", Water: "Earth" };

const LORD_FRIENDS = {
  Sun: ["Moon","Mars","Jupiter"],
  Moon: ["Sun","Mercury"],
  Mars: ["Sun","Moon","Jupiter"],
  Mercury: ["Sun","Venus"],
  Jupiter: ["Sun","Moon","Mars"],
  Venus: ["Mercury","Saturn"],
  Saturn: ["Mercury","Venus"],
};

const BHAKOOT_BAD = new Set(["6_8","8_6","9_5","5_9","12_2","2_12"]);

// ── Sign compatibility (works for both moon & sun sign indices 0..11) ──────
export function signCompatibility(aIdx, bIdx, { lang = "en" } = {}) {
  const a = RASHIS[aIdx], b = RASHIS[bIdx];
  const elementA = a.element, elementB = b.element;
  const sameElement = elementA === elementB;
  const friendElement = FRIEND_ELEMENT[elementA] === elementB;
  const lordsFriend = a.lord === b.lord ||
    (LORD_FRIENDS[a.lord] || []).includes(b.lord) ||
    (LORD_FRIENDS[b.lord] || []).includes(a.lord);
  const diff1 = ((bIdx - aIdx + 12) % 12) + 1;
  const diff2 = ((aIdx - bIdx + 12) % 12) + 1;
  const bhakootDosha = BHAKOOT_BAD.has(`${diff1}_${diff2}`);

  let score = 50;
  if (sameElement)   score += 25;
  if (friendElement) score += 15;
  if (lordsFriend)   score += 10;
  if (bhakootDosha)  score -= 30;
  if (aIdx === bIdx) score += 5; // same sign — bonus from familiarity
  score = Math.max(10, Math.min(98, score));

  return {
    a, b,
    sameElement, friendElement, lordsFriend, bhakootDosha,
    score,
    rating:
      score >= 80 ? "Excellent"
      : score >= 65 ? "Good"
      : score >= 50 ? "Workable"
      : score >= 35 ? "Challenging"
      : "Difficult",
    summary: buildSignSummary({ a, b, sameElement, friendElement, lordsFriend, bhakootDosha }, lang),
  };
}

function buildSignSummary({ a, b, sameElement, friendElement, lordsFriend, bhakootDosha }, lang) {
  if (sameElement) return `Both are ${a.element} signs — shared temperament, instant rapport.`;
  if (friendElement) return `${a.element} and ${b.element} are complementary — different but mutually supportive.`;
  if (bhakootDosha) return `Bhakoot dosha — classically inauspicious rashi pairing. Remedies advised before marriage.`;
  if (lordsFriend) return `Sign lords ${a.lord} and ${b.lord} are friendly — basic harmony.`;
  return `Different elements with no special friendship — workable with effort.`;
}

// ── Numerology Date Compatibility ──────────────────────────────────────────
const LP_PAIRINGS = {
  // life path → compatible list, neutral list, challenging list
  1: { friends: [1,3,5,7], neutral: [9], challenges: [4,6,8] },
  2: { friends: [2,4,6,8], neutral: [9], challenges: [1,5,7] },
  3: { friends: [1,3,5,9], neutral: [6,7], challenges: [4,8] },
  4: { friends: [2,4,6,8], neutral: [], challenges: [1,3,5] },
  5: { friends: [1,3,5,7], neutral: [9], challenges: [2,4,6] },
  6: { friends: [2,3,6,9], neutral: [1], challenges: [5,7] },
  7: { friends: [1,5,7], neutral: [3,4], challenges: [2,8] },
  8: { friends: [2,4,6,8], neutral: [], challenges: [1,3,5,7] },
  9: { friends: [3,6,9], neutral: [1,2,5], challenges: [4,7,8] },
  11: { friends: [2,4,6,11,22,33], neutral: [], challenges: [] },
  22: { friends: [4,8,11,22,33], neutral: [], challenges: [] },
  33: { friends: [6,9,11,22,33], neutral: [], challenges: [] },
};
function pairingCategory(a, b) {
  const rules = LP_PAIRINGS[a];
  if (!rules) return "neutral";
  if (rules.friends.includes(b)) return "friend";
  if (rules.challenges.includes(b)) return "challenge";
  return "neutral";
}

export function dateCompatibility(dobA, dobB) {
  const lpA = lifePathNumber(dobA);
  const lpB = lifePathNumber(dobB);
  const cat = pairingCategory(lpA, lpB);
  let score = 60;
  if (cat === "friend") score = 85;
  if (cat === "challenge") score = 35;
  if (lpA === lpB) score += 5;
  score = Math.max(20, Math.min(95, score));
  return {
    lifePath: { a: { value: lpA, meaning: describe(lpA) }, b: { value: lpB, meaning: describe(lpB) } },
    category: cat,
    score,
    rating: score >= 75 ? "Excellent" : score >= 55 ? "Good" : score >= 40 ? "Workable" : "Challenging",
    summary:
      cat === "friend"   ? `Life paths ${lpA} & ${lpB} naturally complement — easy flow.`
      : cat === "challenge" ? `Life paths ${lpA} & ${lpB} pull different directions — growth through friction.`
      : `Life paths ${lpA} & ${lpB} are neutral — outcome depends more on choices than numbers.`,
  };
}

// ── Numerology Name Compatibility ──────────────────────────────────────────
export function nameCompatibility(nameA, nameB) {
  const dsA = destinyNumber(nameA);
  const dsB = destinyNumber(nameB);
  const suA = soulUrgeNumber(nameA);
  const suB = soulUrgeNumber(nameB);
  const psA = personalityNumber(nameA);
  const psB = personalityNumber(nameB);

  const dsCat = pairingCategory(dsA, dsB);
  const suCat = pairingCategory(suA, suB);

  let score = 50;
  if (dsCat === "friend") score += 20;
  if (dsCat === "challenge") score -= 15;
  if (suCat === "friend") score += 15;
  if (suCat === "challenge") score -= 10;
  if (dsA === dsB) score += 5;
  if (suA === suB) score += 5;
  score = Math.max(20, Math.min(95, score));

  return {
    destiny:     { a: dsA, b: dsB, category: dsCat },
    soulUrge:    { a: suA, b: suB, category: suCat },
    personality: { a: psA, b: psB },
    score,
    rating: score >= 75 ? "Excellent" : score >= 55 ? "Good" : score >= 40 ? "Workable" : "Challenging",
    summary:
      dsCat === "friend" && suCat === "friend"
        ? "Both destiny and soul-urge numbers harmonise — names support the bond."
      : dsCat === "challenge" || suCat === "challenge"
        ? "Some name-number friction — partnership may need conscious effort around contrasting needs."
      : "Names are numerologically neutral — neither helping nor hindering.",
  };
}

// ── Numerology Name (single) ────────────────────────────────────────────────
export function nameProfile(name) {
  const ds = destinyNumber(name);
  const su = soulUrgeNumber(name);
  const ps = personalityNumber(name);
  return {
    name,
    destiny:     { value: ds, meaning: describe(ds) },
    soulUrge:    { value: su, meaning: describe(su) },
    personality: { value: ps, meaning: describe(ps) },
  };
}
