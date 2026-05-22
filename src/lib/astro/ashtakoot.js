// Ashtakoot Guna Milan — 8-fold Vedic compatibility based on Moon nakshatra/rashi.

import { julianDayUT, planetPosition } from "./ephemeris.js";
import { RASHIS, NAKSHATRAS } from "./constants.js";

const NAK_SIZE = 360 / 27;
const VARNA = ["Kshatriya","Vaishya","Shudra","Brahmin","Kshatriya","Vaishya","Shudra","Brahmin","Kshatriya","Vaishya","Shudra","Brahmin"];
const VARNA_RANK = { Brahmin: 4, Kshatriya: 3, Vaishya: 2, Shudra: 1 };

// Vashya class per rashi (Aries..Pisces)
const VASHYA = [
  "Chatushpada","Chatushpada","Manava","Jalachara",
  "Vanachara","Manava","Manava","Keeta",
  "Chatushpada","Jalachara","Manava","Jalachara",
];
// Vashya score lookup based on combination (out of 2)
const VASHYA_SCORE = {
  same: 2,
  // Class pairings that score partially
  Manava_Chatushpada: 1, Chatushpada_Manava: 1,
  Manava_Vanachara: 1,   Vanachara_Manava: 1,
  Manava_Jalachara: 1,   Jalachara_Manava: 1,
  Manava_Keeta: 1,       Keeta_Manava: 1,
  Jalachara_Keeta: 0.5,  Keeta_Jalachara: 0.5,
  Chatushpada_Vanachara: 1, Vanachara_Chatushpada: 1,
};

// Yoni animal per nakshatra (27)
const YONI = [
  "Horse","Elephant","Sheep","Serpent","Serpent","Dog","Cat","Sheep","Cat",
  "Rat","Rat","Cow","Buffalo","Tiger","Buffalo","Tiger","Deer","Deer",
  "Dog","Monkey","Mongoose","Monkey","Lion","Horse","Lion","Cow","Elephant",
];
// Yoni enmities (full enemy = 0). Full friend = 4, friend = 3, neutral = 2, enemy = 1, full-enemy = 0.
const YONI_ENEMY = {
  "Horse|Buffalo": 0, "Buffalo|Horse": 0,
  "Elephant|Lion": 0, "Lion|Elephant": 0,
  "Sheep|Monkey": 0, "Monkey|Sheep": 0,
  "Serpent|Mongoose": 0, "Mongoose|Serpent": 0,
  "Dog|Deer": 0, "Deer|Dog": 0,
  "Cat|Rat": 0, "Rat|Cat": 0,
  "Cow|Tiger": 0, "Tiger|Cow": 0,
};

// Friendship of Moon-sign lords (Vedic standard)
const LORD_FRIENDS = {
  Sun:     { friends: ["Moon","Mars","Jupiter"],          enemies: ["Saturn","Venus"],            neutrals: ["Mercury"] },
  Moon:    { friends: ["Sun","Mercury"],                  enemies: [],                            neutrals: ["Mars","Jupiter","Venus","Saturn"] },
  Mars:    { friends: ["Sun","Moon","Jupiter"],           enemies: ["Mercury"],                   neutrals: ["Venus","Saturn"] },
  Mercury: { friends: ["Sun","Venus"],                    enemies: ["Moon"],                      neutrals: ["Mars","Jupiter","Saturn"] },
  Jupiter: { friends: ["Sun","Moon","Mars"],              enemies: ["Mercury","Venus"],           neutrals: ["Saturn"] },
  Venus:   { friends: ["Mercury","Saturn"],               enemies: ["Sun","Moon"],                neutrals: ["Mars","Jupiter"] },
  Saturn:  { friends: ["Mercury","Venus"],                enemies: ["Sun","Moon","Mars"],         neutrals: ["Jupiter"] },
};

// Gana per nakshatra (Deva / Manushya / Rakshasa)
const GANA = [
  "Deva","Manushya","Rakshasa","Manushya","Deva","Manushya","Deva","Deva","Rakshasa",
  "Rakshasa","Manushya","Manushya","Deva","Rakshasa","Deva","Rakshasa","Deva","Rakshasa",
  "Rakshasa","Manushya","Manushya","Deva","Rakshasa","Rakshasa","Manushya","Manushya","Deva",
];

// Nadi per nakshatra: Aadi / Madhya / Antya
const NADI = [
  "Aadi","Madhya","Antya","Antya","Madhya","Aadi","Aadi","Madhya","Antya",
  "Antya","Madhya","Aadi","Aadi","Madhya","Antya","Antya","Madhya","Aadi",
  "Aadi","Madhya","Antya","Antya","Madhya","Aadi","Aadi","Madhya","Antya",
];

/** Compute Moon longitude (sidereal Lahiri) from birth UTC. */
export function moonLongitudeAt(birthUTC) {
  const jd = julianDayUT(birthUTC);
  return planetPosition(jd, "Moon").longitude;
}

function nakshatraAt(longitude) {
  return Math.floor(longitude / NAK_SIZE);
}
function signOf(lng) { return Math.floor(lng / 30); }

// ── 8 Koots ────────────────────────────────────────────────────────────────
function varnaScore(boyRashi, girlRashi) {
  const b = VARNA_RANK[VARNA[boyRashi]];
  const g = VARNA_RANK[VARNA[girlRashi]];
  return { score: b >= g ? 1 : 0, max: 1, boy: VARNA[boyRashi], girl: VARNA[girlRashi] };
}

function vashyaScore(boyRashi, girlRashi) {
  const b = VASHYA[boyRashi], g = VASHYA[girlRashi];
  let s = 0;
  if (b === g) s = 2;
  else s = VASHYA_SCORE[`${b}_${g}`] ?? 0;
  return { score: s, max: 2, boy: b, girl: g };
}

function taraScore(boyNak, girlNak) {
  // Tara = ((girl - boy) mod 9), and ((boy - girl) mod 9). If either remainder is 1,3,5,7 → inauspicious.
  const f1 = ((girlNak - boyNak + 27) % 9);
  const f2 = ((boyNak - girlNak + 27) % 9);
  const bad = [3, 5, 7]; // remainders 3,5,7 → inauspicious; 0 (mod 9) is benefic
  const ok1 = !bad.includes(f1);
  const ok2 = !bad.includes(f2);
  let s = 0;
  if (ok1 && ok2) s = 3;
  else if (ok1 || ok2) s = 1.5;
  return { score: s, max: 3 };
}

function yoniScore(boyNak, girlNak) {
  const b = YONI[boyNak], g = YONI[girlNak];
  const key = `${b}|${g}`;
  let s = 4;
  if (b === g) s = 4;
  else if (YONI_ENEMY[key] === 0) s = 0;
  else s = 2; // simplified: friendly-neutral middle ground
  return { score: s, max: 4, boy: b, girl: g };
}

function grahaMaitriScore(boyRashi, girlRashi) {
  const lordB = RASHIS[boyRashi].lord;
  const lordG = RASHIS[girlRashi].lord;
  if (lordB === lordG) return { score: 5, max: 5, boy: lordB, girl: lordG, relation: "same lord" };
  const rel = (a, b) => {
    if (LORD_FRIENDS[a]?.friends.includes(b)) return "friend";
    if (LORD_FRIENDS[a]?.enemies.includes(b)) return "enemy";
    return "neutral";
  };
  const a = rel(lordB, lordG), b = rel(lordG, lordB);
  // Bidirectional scoring (out of 5)
  const map = { friend_friend: 5, friend_neutral: 4, neutral_friend: 4, neutral_neutral: 3, friend_enemy: 1, enemy_friend: 1, neutral_enemy: 0.5, enemy_neutral: 0.5, enemy_enemy: 0 };
  return { score: map[`${a}_${b}`] ?? 3, max: 5, boy: lordB, girl: lordG, relation: `${a}/${b}` };
}

function ganaScore(boyNak, girlNak) {
  const b = GANA[boyNak], g = GANA[girlNak];
  if (b === g) return { score: 6, max: 6, boy: b, girl: g };
  const friendly = (x, y) => (x === "Deva" && y === "Manushya") || (x === "Manushya" && y === "Deva");
  if (friendly(b, g)) return { score: 5, max: 6, boy: b, girl: g };
  // Manushya–Rakshasa → 1, Deva–Rakshasa → 0
  if ((b === "Manushya" && g === "Rakshasa") || (g === "Manushya" && b === "Rakshasa")) return { score: 1, max: 6, boy: b, girl: g };
  return { score: 0, max: 6, boy: b, girl: g };
}

function bhakootScore(boyRashi, girlRashi) {
  const diff1 = ((girlRashi - boyRashi + 12) % 12) + 1; // 1..12 her-from-him
  const diff2 = ((boyRashi - girlRashi + 12) % 12) + 1;
  const inauspicious = new Set([
    "6_8","8_6","9_5","5_9","12_2","2_12",
  ]);
  const key = `${diff1}_${diff2}`;
  if (inauspicious.has(key)) return { score: 0, max: 7, boy: RASHIS[boyRashi].en, girl: RASHIS[girlRashi].en, dosha: true };
  return { score: 7, max: 7, boy: RASHIS[boyRashi].en, girl: RASHIS[girlRashi].en, dosha: false };
}

function nadiScore(boyNak, girlNak) {
  const b = NADI[boyNak], g = NADI[girlNak];
  return { score: b === g ? 0 : 8, max: 8, boy: b, girl: g, dosha: b === g };
}

/**
 * @param {Object} a  { birthUTC, latitude, longitude }
 * @param {Object} b  same shape
 */
export function computeMatch(boy, girl) {
  const boyMoon  = moonLongitudeAt(new Date(boy.birthUTC));
  const girlMoon = moonLongitudeAt(new Date(girl.birthUTC));
  const boyNak   = nakshatraAt(boyMoon);
  const girlNak  = nakshatraAt(girlMoon);
  const boyRashi = signOf(boyMoon);
  const girlRashi= signOf(girlMoon);

  const koots = {
    varna:       varnaScore(boyRashi, girlRashi),
    vashya:      vashyaScore(boyRashi, girlRashi),
    tara:        taraScore(boyNak, girlNak),
    yoni:        yoniScore(boyNak, girlNak),
    grahaMaitri: grahaMaitriScore(boyRashi, girlRashi),
    gana:        ganaScore(boyNak, girlNak),
    bhakoot:     bhakootScore(boyRashi, girlRashi),
    nadi:        nadiScore(boyNak, girlNak),
  };
  const total = Object.values(koots).reduce((s, k) => s + k.score, 0);
  const max = Object.values(koots).reduce((s, k) => s + k.max, 0);
  const percentage = (total / max) * 100;

  return {
    boy:  { rashi: RASHIS[boyRashi], nakshatra: NAKSHATRAS[boyNak]  },
    girl: { rashi: RASHIS[girlRashi], nakshatra: NAKSHATRAS[girlNak] },
    koots,
    total,
    max,
    percentage,
    recommended: total >= 18,
    verdict:
      total >= 28 ? "Excellent match"
      : total >= 24 ? "Very good match"
      : total >= 18 ? "Acceptable match"
      : "Match below recommended threshold",
    doshas: {
      bhakoot: koots.bhakoot.dosha,
      nadi:    koots.nadi.dosha,
    },
  };
}
