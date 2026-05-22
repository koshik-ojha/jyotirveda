// Tamil 10-fold Porutham (marriage compatibility, southern tradition).
// Inputs: boy's and girl's birth Moon longitude — same engine as Ashtakoot.

import { julianDayUT, planetPosition } from "./ephemeris.js";
import { RASHIS, NAKSHATRAS } from "./constants.js";

const NAK_SIZE = 360 / 27;

const GANA = [
  "Deva","Manushya","Rakshasa","Manushya","Deva","Manushya","Deva","Deva","Rakshasa",
  "Rakshasa","Manushya","Manushya","Deva","Rakshasa","Deva","Rakshasa","Deva","Rakshasa",
  "Rakshasa","Manushya","Manushya","Deva","Rakshasa","Rakshasa","Manushya","Manushya","Deva",
];

const YONI = [
  "Horse","Elephant","Sheep","Serpent","Serpent","Dog","Cat","Sheep","Cat",
  "Rat","Rat","Cow","Buffalo","Tiger","Buffalo","Tiger","Deer","Deer",
  "Dog","Monkey","Mongoose","Monkey","Lion","Horse","Lion","Cow","Elephant",
];
const YONI_ENEMY = {
  "Horse|Buffalo": true, "Buffalo|Horse": true,
  "Elephant|Lion": true, "Lion|Elephant": true,
  "Sheep|Monkey": true, "Monkey|Sheep": true,
  "Serpent|Mongoose": true, "Mongoose|Serpent": true,
  "Dog|Deer": true, "Deer|Dog": true,
  "Cat|Rat": true, "Rat|Cat": true,
  "Cow|Tiger": true, "Tiger|Cow": true,
};

// 5 rajjus (cords) of 27 nakshatras. Same rajju = Rajju dosha.
const RAJJU = [
  "Pada","Janu","Nabhi","Kanta","Sira","Sira","Kanta","Nabhi","Janu",   // 0-8
  "Pada","Pada","Janu","Nabhi","Kanta","Sira","Sira","Kanta","Nabhi",   // 9-17
  "Janu","Pada","Pada","Janu","Nabhi","Kanta","Sira","Sira","Kanta",    // 18-26
];

const VASHYA = [
  "Chatushpada","Chatushpada","Manava","Jalachara",
  "Vanachara","Manava","Manava","Keeta",
  "Chatushpada","Jalachara","Manava","Jalachara",
];
const VASHYA_FRIEND = {
  Manava_Chatushpada: true, Chatushpada_Manava: true,
  Manava_Vanachara: true, Vanachara_Manava: true,
  Manava_Jalachara: true, Jalachara_Manava: true,
  Manava_Keeta: true, Keeta_Manava: true,
  Chatushpada_Vanachara: true, Vanachara_Chatushpada: true,
};

// Vedha pairs (nakshatras that obstruct each other) — bidirectional
const VEDHA_PAIRS = [
  [0, 17], [1, 16], [2, 15], [3, 14], [4, 13], [5, 12], [6, 11],
  [7, 10], [8, 9], [18, 24], [19, 23], [20, 22], [21, 26], [25, 25],
];
function hasVedha(a, b) {
  return VEDHA_PAIRS.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}

// Sign lord friendships
const LORD_FRIENDS = {
  Sun:     ["Moon","Mars","Jupiter"],
  Moon:    ["Sun","Mercury"],
  Mars:    ["Sun","Moon","Jupiter"],
  Mercury: ["Sun","Venus"],
  Jupiter: ["Sun","Moon","Mars"],
  Venus:   ["Mercury","Saturn"],
  Saturn:  ["Mercury","Venus"],
};

export function moonLongitudeAt(birthUTC) {
  return planetPosition(julianDayUT(new Date(birthUTC)), "Moon").longitude;
}

function signOf(lng) { return Math.floor(lng / 30); }
function nakshatraOf(lng) { return Math.floor(lng / NAK_SIZE); }

// ── 10 Poruthams ────────────────────────────────────────────────────────────

function dinaPorutham(boyNak, girlNak) {
  const diff = ((girlNak - boyNak + 27) % 27) + 1; // count inclusive
  const rem = diff % 9;
  const good = [2, 4, 6, 8, 0]; // 0 represents 9 (full cycle)
  return { pass: good.includes(rem), detail: `${diff}-th nakshatra · remainder ${rem || 9}` };
}

function ganaPorutham(boyNak, girlNak) {
  const b = GANA[boyNak], g = GANA[girlNak];
  const pass = b === g || ((b === "Deva" && g === "Manushya") || (b === "Manushya" && g === "Deva"));
  return { pass, detail: `${b} / ${g}` };
}

function mahendraPorutham(boyNak, girlNak) {
  // Girl's nakshatra at 4,7,10,13,16,19,22,25 from boy's (1-indexed) → benefic.
  const diff = ((girlNak - boyNak + 27) % 27) + 1;
  const pass = [4, 7, 10, 13, 16, 19, 22, 25].includes(diff);
  return { pass, detail: `Girl's nakshatra is ${diff}-th from boy's` };
}

function streeDeerghaPorutham(boyNak, girlNak) {
  // Girl's nakshatra should be more than 9 nakshatras ahead of boy's
  const diff = ((girlNak - boyNak + 27) % 27);
  const pass = diff > 9 && diff <= 27;
  return { pass, detail: `Distance ${diff} (need > 9)` };
}

function yoniPorutham(boyNak, girlNak) {
  const b = YONI[boyNak], g = YONI[girlNak];
  const pass = !YONI_ENEMY[`${b}|${g}`];
  return { pass, detail: `${b} / ${g}` };
}

function rashiPorutham(boyRashi, girlRashi) {
  const diff1 = ((girlRashi - boyRashi + 12) % 12) + 1;
  const diff2 = ((boyRashi - girlRashi + 12) % 12) + 1;
  const bad = new Set(["6_8","8_6","9_5","5_9","12_2","2_12"]);
  const pass = !bad.has(`${diff1}_${diff2}`);
  return { pass, detail: `${RASHIS[boyRashi].en} / ${RASHIS[girlRashi].en}` };
}

function rashiAdhipathiPorutham(boyRashi, girlRashi) {
  const lordB = RASHIS[boyRashi].lord;
  const lordG = RASHIS[girlRashi].lord;
  const pass = lordB === lordG ||
    (LORD_FRIENDS[lordB] || []).includes(lordG) ||
    (LORD_FRIENDS[lordG] || []).includes(lordB);
  return { pass, detail: `${lordB} / ${lordG}` };
}

function vashyaPorutham(boyRashi, girlRashi) {
  const b = VASHYA[boyRashi], g = VASHYA[girlRashi];
  const pass = b === g || VASHYA_FRIEND[`${b}_${g}`] || VASHYA_FRIEND[`${g}_${b}`];
  return { pass, detail: `${b} / ${g}` };
}

function rajjuPorutham(boyNak, girlNak) {
  const b = RAJJU[boyNak], g = RAJJU[girlNak];
  const pass = b !== g;
  return { pass, detail: `${b} / ${g}${pass ? "" : " · Rajju dosha"}` };
}

function vedhaPorutham(boyNak, girlNak) {
  const pass = !hasVedha(boyNak, girlNak);
  return { pass, detail: pass ? "No vedha" : "Vedha obstruction present" };
}

// ── Aggregator ──────────────────────────────────────────────────────────────

export function computePorutham(boyBirthUTC, girlBirthUTC) {
  const boyMoon  = moonLongitudeAt(boyBirthUTC);
  const girlMoon = moonLongitudeAt(girlBirthUTC);
  const boyNak   = nakshatraOf(boyMoon);
  const girlNak  = nakshatraOf(girlMoon);
  const boyRashi = signOf(boyMoon);
  const girlRashi= signOf(girlMoon);

  const poruthams = {
    Dina:           dinaPorutham(boyNak, girlNak),
    Gana:           ganaPorutham(boyNak, girlNak),
    Mahendra:       mahendraPorutham(boyNak, girlNak),
    "Stree-Deergha":streeDeerghaPorutham(boyNak, girlNak),
    Yoni:           yoniPorutham(boyNak, girlNak),
    Rashi:          rashiPorutham(boyRashi, girlRashi),
    "Rashi Adhipathi": rashiAdhipathiPorutham(boyRashi, girlRashi),
    Vashya:         vashyaPorutham(boyRashi, girlRashi),
    Rajju:          rajjuPorutham(boyNak, girlNak),
    Vedha:          vedhaPorutham(boyNak, girlNak),
  };

  const passed = Object.values(poruthams).filter((p) => p.pass).length;
  const total = Object.keys(poruthams).length;
  const percentage = (passed / total) * 100;

  return {
    boy:  { rashi: RASHIS[boyRashi], nakshatra: NAKSHATRAS[boyNak] },
    girl: { rashi: RASHIS[girlRashi], nakshatra: NAKSHATRAS[girlNak] },
    poruthams,
    passed,
    total,
    percentage,
    recommended: passed >= 6,
    verdict:
      passed >= 8 ? "Excellent match"
      : passed >= 6 ? "Acceptable match"
      : passed >= 4 ? "Below threshold — remedies advised"
      : "Not recommended without major rectification",
  };
}
