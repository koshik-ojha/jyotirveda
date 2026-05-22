// Vedic report engines: Kaalsarp, Mangal Dosha, Sade Sati, Gemstones, Varshphal.

import { julianDayUT, planetPosition, houses } from "./ephemeris.js";
import { RASHIS, PLANETS } from "./constants.js";

const RAHU = "Rahu";
const SEVEN_PLANETS = ["Sun","Moon","Mars","Mercury","Jupiter","Venus","Saturn"];

function signOf(lng) { return Math.floor(lng / 30); }
function houseFromSign(planetSign, refSign) { return ((planetSign - refSign + 12) % 12) + 1; }
function houseFromLong(planetLong, refLong) { return houseFromSign(signOf(planetLong), signOf(refLong)); }

// ─── Kaalsarp Yoga ──────────────────────────────────────────────────────────
const KAALSARP_TYPES = [
  null, // 1-indexed
  { name: "Anant Kaalsarp",       theme: "Identity & destiny challenges from past karma" },
  { name: "Kulik Kaalsarp",       theme: "Family tensions, speech-related obstacles" },
  { name: "Vasuki Kaalsarp",      theme: "Sibling conflicts, courage tested through struggle" },
  { name: "Shankhpal Kaalsarp",   theme: "Domestic restlessness, mother-related issues" },
  { name: "Padma Kaalsarp",       theme: "Delays in children and creative output" },
  { name: "Mahapadma Kaalsarp",   theme: "Hidden enemies, health concerns, debt" },
  { name: "Takshak Kaalsarp",     theme: "Marital obstacles, partnership delays" },
  { name: "Karkotak Kaalsarp",    theme: "Sudden upheavals, transformation through loss" },
  { name: "Shankhachuda Kaalsarp",theme: "Father-figure or guru-related blocks; fortune is earned slowly" },
  { name: "Ghatak Kaalsarp",      theme: "Career obstructions; public reputation tested" },
  { name: "Vishadhar Kaalsarp",   theme: "Income delays, fluctuating friendships" },
  { name: "Sheshnag Kaalsarp",    theme: "Foreign travel, hidden expenses, spiritual leanings" },
];

export function computeKaalsarp(jd, latitude, longitude) {
  const { ascendant } = houses(jd, latitude, longitude);
  const rahu = planetPosition(jd, RAHU).longitude;
  const ketu = (rahu + 180) % 360;

  // Arc from Rahu to Ketu walking forward (clockwise in sidereal lng).
  const arc = (p) => (p - rahu + 360) % 360;
  const sevenLongs = SEVEN_PLANETS.map((k) => planetPosition(jd, k).longitude);
  const inFront = sevenLongs.filter((p) => {
    const a = arc(p);
    return a > 0 && a < 180;
  });
  const inBack = sevenLongs.length - inFront.length;
  const isYoga = inFront.length === 7 || inBack === 7;
  const partial = (inFront.length >= 5 && inFront.length < 7) || (inBack >= 5 && inBack < 7);

  const rahuHouse = houseFromLong(rahu, ascendant);
  const type = KAALSARP_TYPES[rahuHouse];

  return {
    isYoga,
    partial: !isYoga && partial,
    type: isYoga ? type : null,
    rahuHouse,
    ketuHouse: houseFromLong(ketu, ascendant),
    planetsInFrontArc: inFront.length,
    planetsInBackArc: inBack,
    summary: isYoga
      ? `Full Kaalsarp Yoga — ${type.name}. ${type.theme}.`
      : partial
        ? "Partial Kaalsarp influence — at least one planet sits outside the Rahu-Ketu axis. Effects are diluted."
        : "No Kaalsarp Yoga — planets distributed on both sides of the Rahu-Ketu axis.",
  };
}

// ─── Mangal Dosha (Manglik) ─────────────────────────────────────────────────
const MANGAL_HOUSES = new Set([1, 4, 7, 8, 12]);
const MARS_OWN_OR_EXALTED = new Set([0, 7, 9]); // Aries, Scorpio, Capricorn

export function computeMangalDosha(jd, latitude, longitude) {
  const { ascendant } = houses(jd, latitude, longitude);
  const mars = planetPosition(jd, "Mars").longitude;
  const moon = planetPosition(jd, "Moon").longitude;
  const venus = planetPosition(jd, "Venus").longitude;

  const fromLagna = houseFromLong(mars, ascendant);
  const fromMoon  = houseFromLong(mars, moon);
  const fromVenus = houseFromLong(mars, venus);
  const marsSign  = signOf(mars);

  const flags = {
    lagna: MANGAL_HOUSES.has(fromLagna),
    moon:  MANGAL_HOUSES.has(fromMoon),
    venus: MANGAL_HOUSES.has(fromVenus),
  };
  const count = (flags.lagna ? 1 : 0) + (flags.moon ? 1 : 0) + (flags.venus ? 1 : 0);
  const cancelled = MARS_OWN_OR_EXALTED.has(marsSign);

  let severity = "none";
  if (count >= 3) severity = "high";
  else if (count === 2) severity = "moderate";
  else if (count === 1) severity = "mild";
  if (cancelled && severity !== "none") severity = "cancelled";

  return {
    isManglik: count > 0 && !cancelled,
    severity,
    marsHouseFromLagna: fromLagna,
    marsHouseFromMoon: fromMoon,
    marsHouseFromVenus: fromVenus,
    marsSign: { index: marsSign, ...RASHIS[marsSign] },
    cancellation: cancelled
      ? `Mars in ${RASHIS[marsSign].en} (own/exalted) cancels the dosha.`
      : null,
    summary:
      severity === "high" ? "High Mangal Dosha — caution in marriage; remedies advised."
      : severity === "moderate" ? "Moderate Mangal Dosha — matched with another Manglik or remedy-equivalent partner."
      : severity === "mild" ? "Mild Mangal Dosha — typically nullified by age 28 or via partner's matching planets."
      : severity === "cancelled" ? "Mangal Dosha cancelled — Mars in dignity neutralises the dosha."
      : "No Mangal Dosha — Mars placement is benign for marriage.",
    remedies: count > 0 && !cancelled
      ? ["Tuesday fast & Hanuman Chalisa recitation", "Donate red lentils/sweets on Tuesdays", "Worship at Hanuman or Kartikeya temples", "Wear red coral (after consulting an astrologer)"]
      : [],
  };
}

// ─── Sade Sati (Saturn's 7.5-year transit) ──────────────────────────────────
const PHASE = {
  RISING:  { name: "Rising Phase (Setu)",   months: 30, theme: "Saturn in 12th from natal Moon — loss, restructure, hidden tests" },
  PEAK:    { name: "Peak Phase (Madhya)",  months: 30, theme: "Saturn in natal Moon sign — internal pressure, identity reshape" },
  SETTING: { name: "Setting Phase (Asetu)",months: 30, theme: "Saturn in 2nd from Moon — financial and family reorganisation" },
};

export function computeSadeSati(birthMoonLong, atDate = new Date()) {
  const moonSignIdx = signOf(birthMoonLong);
  const jd = julianDayUT(atDate);
  const saturn = planetPosition(jd, "Saturn").longitude;
  const satSign = signOf(saturn);

  const house = ((satSign - moonSignIdx + 12) % 12) + 1; // 1..12

  let phase = null;
  let active = false;
  if (house === 12) { phase = PHASE.RISING;  active = true; }
  if (house === 1)  { phase = PHASE.PEAK;    active = true; }
  if (house === 2)  { phase = PHASE.SETTING; active = true; }

  // Saturn dhaiya (small panoti) — 4th or 8th from Moon
  const isDhaiya = house === 4 || house === 8;
  const dhaiyaType = house === 4 ? "Kantaka Shani (4th from Moon)" : house === 8 ? "Ashtama Shani (8th from Moon)" : null;

  // Estimate progress: Saturn moves ~30° in ~2.5 years (1° in ~30.5 days).
  let progressPct = null;
  if (active) {
    const degInSign = saturn - satSign * 30;
    progressPct = Math.round((degInSign / 30) * 100);
  }

  return {
    active,
    phase,
    house,
    progressPct,
    saturnSign: { index: satSign, ...RASHIS[satSign] },
    natalMoonSign: { index: moonSignIdx, ...RASHIS[moonSignIdx] },
    isDhaiya,
    dhaiyaType,
    summary: active
      ? `${phase.name} active — ${phase.theme}. ~${progressPct}% through this 2.5-year sub-phase.`
      : isDhaiya
        ? `${dhaiyaType} — a related Saturn pressure phase (~2.5 years).`
        : "No Sade Sati or Dhaiya at this time. Saturn is in a neutral house from your Moon.",
    remedies: active || isDhaiya
      ? ["Hanuman Chalisa daily", "Saturday: light sesame oil lamp, donate iron/black sesame", "Avoid major risks during peak phase", "Visit Shani temples on Saturdays"]
      : [],
  };
}

// ─── Gemstones (based on Lagna + planetary strengths) ───────────────────────
const PLANET_GEMS = {
  Sun:     { gem: "Ruby (Manik)",            metal: "Gold",       finger: "Ring",   day: "Sunday",    weight: "3–5 ratti" },
  Moon:    { gem: "Pearl (Moti)",            metal: "Silver",     finger: "Little", day: "Monday",    weight: "4–6 ratti" },
  Mars:    { gem: "Red Coral (Moonga)",      metal: "Gold/Copper",finger: "Ring",   day: "Tuesday",   weight: "5–7 ratti" },
  Mercury: { gem: "Emerald (Panna)",         metal: "Gold",       finger: "Little", day: "Wednesday", weight: "4–6 ratti" },
  Jupiter: { gem: "Yellow Sapphire (Pukhraj)",metal: "Gold",      finger: "Index",  day: "Thursday",  weight: "5–7 ratti" },
  Venus:   { gem: "Diamond (Heera)",         metal: "Platinum/White Gold", finger: "Ring", day: "Friday", weight: "0.5–1 carat" },
  Saturn:  { gem: "Blue Sapphire (Neelam)",  metal: "Silver",     finger: "Middle", day: "Saturday",  weight: "4–6 ratti" },
  Rahu:    { gem: "Hessonite (Gomed)",       metal: "Silver",     finger: "Middle", day: "Saturday",  weight: "5–7 ratti" },
  Ketu:    { gem: "Cat's Eye (Lehsuniya)",   metal: "Silver",     finger: "Middle", day: "Tuesday",   weight: "5–7 ratti" },
};

// Friendly planets for each ascendant (classical Parashara) — recommend gems for friendly+lagna lord
const ASC_FRIENDS = {
  0:  ["Mars","Sun","Jupiter"],         // Aries
  1:  ["Venus","Mercury","Saturn"],     // Taurus
  2:  ["Mercury","Venus","Saturn"],     // Gemini
  3:  ["Moon","Mars","Jupiter"],        // Cancer
  4:  ["Sun","Mars","Jupiter"],         // Leo
  5:  ["Mercury","Venus","Saturn"],     // Virgo
  6:  ["Venus","Mercury","Saturn"],     // Libra
  7:  ["Mars","Sun","Jupiter","Moon"],  // Scorpio
  8:  ["Jupiter","Sun","Mars"],         // Sagittarius
  9:  ["Saturn","Venus","Mercury"],     // Capricorn
  10: ["Saturn","Venus","Mercury"],     // Aquarius
  11: ["Jupiter","Moon","Mars"],        // Pisces
};

export function computeGemstones(ascSignIdx) {
  const ascLord = RASHIS[ascSignIdx].lord;
  const friends = ASC_FRIENDS[ascSignIdx] || [];
  const primary = { planet: ascLord, ...PLANET_GEMS[ascLord], role: "Lagna Lord — primary gem" };
  const secondary = friends
    .filter((p) => p !== ascLord)
    .slice(0, 2)
    .map((p) => ({ planet: p, ...PLANET_GEMS[p], role: "Friendly planet — supportive" }));

  const avoid = Object.keys(PLANET_GEMS).filter((p) => !friends.includes(p) && p !== ascLord && !["Rahu","Ketu"].includes(p)).slice(0, 2);

  return {
    ascendant: { index: ascSignIdx, ...RASHIS[ascSignIdx] },
    ascendantLord: ascLord,
    primaryGem: primary,
    secondaryGems: secondary,
    avoid: avoid.map((p) => ({ planet: p, ...PLANET_GEMS[p] })),
    notes: [
      "Wear after a Sunday/relevant-weekday energising ritual",
      "Test with a small stone (1–2 ratti) for 15 days before committing to a larger gem",
      "Synthetic stones do not carry astrological effect — request a natural untreated stone",
    ],
  };
}

// ─── Varshphal (Tajik annual chart — simplified) ────────────────────────────
// Computes Sun's return to its natal longitude in the target year, then
// returns key annual indicators: Varshpravesh (year-start UTC), Muntha,
// year lord (Varsh-Lord), and a transit summary.

const VARSHA_LORDS = ["Sun","Venus","Mercury","Moon","Saturn","Jupiter","Mars"];

export function computeVarshphal(birthUTC, year, latitude, longitude) {
  const birth = new Date(birthUTC);
  const natalJd = julianDayUT(birth);
  const natalSun = planetPosition(natalJd, "Sun").longitude;

  // Approximate first guess: same calendar moment in target year, then iterate.
  const guess = new Date(Date.UTC(
    year, birth.getUTCMonth(), birth.getUTCDate(),
    birth.getUTCHours(), birth.getUTCMinutes(), birth.getUTCSeconds()
  ));
  let jd = julianDayUT(guess);
  // Newton-ish: refine for 5 iterations.
  for (let i = 0; i < 5; i++) {
    const sun = planetPosition(jd, "Sun");
    let diff = sun.longitude - natalSun;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    jd -= diff / sun.speed;
  }

  const returnDate = new Date(birth.getTime() + (jd - natalJd) * 86400000);
  // ↑ small inaccuracy possible; precise to the minute is overkill for an annual report.

  const yearAge = year - birth.getUTCFullYear();
  const natalAsc = houses(natalJd, latitude, longitude).ascendant;
  const ascSignIdx = signOf(natalAsc);
  // Muntha: starts in Lagna, moves 1 sign each year.
  const munthaSign = (ascSignIdx + yearAge) % 12;
  // Varsha Lord: cycles Sun→Venus→Mercury→Moon→Saturn→Jupiter→Mars (weekday lord at year-start)
  const dow = returnDate.getUTCDay();
  const varshaLord = ["Sun","Moon","Mars","Mercury","Jupiter","Venus","Saturn"][dow];

  return {
    year,
    yearAge,
    varshapravesh: returnDate.toISOString(),
    munthaSign: { index: munthaSign, ...RASHIS[munthaSign] },
    varshaLord,
    natalAscendant: { index: ascSignIdx, ...RASHIS[ascSignIdx] },
    summary: `Year ${year}: Muntha enters ${RASHIS[munthaSign].en}; year-lord ${varshaLord}.`,
  };
}

// ─── Transit Today (sidereal positions of all 9 grahas) ─────────────────────
export function computeTransitToday(atDate = new Date(), refRashiIdx = null) {
  const jd = julianDayUT(atDate);
  const PLANET_KEYS = ["Sun","Moon","Mars","Mercury","Jupiter","Venus","Saturn","Rahu","Ketu"];
  const transits = PLANET_KEYS.map((key) => {
    const p = planetPosition(jd, key);
    const sIdx = signOf(p.longitude);
    return {
      key,
      meta: PLANETS.find((pl) => pl.key === key),
      longitude: p.longitude,
      sign: { index: sIdx, ...RASHIS[sIdx] },
      degInSign: p.longitude - sIdx * 30,
      retrograde: p.retrograde,
      house: refRashiIdx != null ? houseFromSign(sIdx, refRashiIdx) : null,
    };
  });
  return { at: atDate.toISOString(), refRashi: refRashiIdx != null ? RASHIS[refRashiIdx] : null, transits };
}
