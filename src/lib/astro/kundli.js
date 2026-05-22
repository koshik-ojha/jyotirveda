import {
  julianDayUT, planetPosition, houses, ayanamsa,
  resolveOptions, AYANAMSAS, HOUSE_SYSTEMS, NODE_TYPES,
} from "./ephemeris.js";
import { computeDasha } from "./dasha.js";
import { RASHIS, NAKSHATRAS, PLANETS } from "./constants.js";

const PLANET_KEYS = ["Sun","Moon","Mars","Mercury","Jupiter","Venus","Saturn","Rahu","Ketu"];

function signOf(longitude) {
  return Math.floor(longitude / 30); // 0..11
}
function degInSign(longitude) {
  return longitude % 30;
}
function nakshatraOf(longitude) {
  const nakSize = 360 / 27; // 13.333...
  const idx = Math.floor(longitude / nakSize);
  const within = longitude - idx * nakSize; // 0..13.333
  const pada = Math.floor(within / (nakSize / 4)) + 1; // 1..4
  return { index: idx, pada, withinDeg: within };
}

function houseOfPlanet(planetLong, ascLong) {
  // Equal-house from Lagna (Vedic convention): each house = 30° from ascendant sign.
  const ascSign = signOf(ascLong);
  const planetSign = signOf(planetLong);
  return ((planetSign - ascSign + 12) % 12) + 1; // 1..12
}

function formatDeg(deg) {
  const d = Math.floor(deg);
  const mF = (deg - d) * 60;
  const m = Math.floor(mF);
  const s = Math.round((mF - m) * 60);
  return `${d}°${String(m).padStart(2,"0")}'${String(s).padStart(2,"0")}"`;
}

/**
 * Compute a full Kundli.
 * @param {Object} input
 * @param {Date}   input.birthUTC   Date object in UTC
 * @param {number} input.latitude   degrees (north positive)
 * @param {number} input.longitude  degrees (east positive)
 * @param {string} [input.name]
 * @param {string} [input.gender]
 */
export function computeKundli({ birthUTC, latitude, longitude, name, gender, options }) {
  if (!(birthUTC instanceof Date) || isNaN(birthUTC)) {
    throw new Error("birthUTC must be a valid Date");
  }
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    throw new Error("latitude and longitude are required numbers");
  }

  const opts = resolveOptions(options);
  const jd = julianDayUT(birthUTC);
  const { ascendant, cusps } = houses(jd, latitude, longitude, opts);
  const ascSignIdx = signOf(ascendant);
  const ascNak = nakshatraOf(ascendant);

  const planets = PLANET_KEYS.map((key) => {
    const p = planetPosition(jd, key, opts);
    const sIdx = signOf(p.longitude);
    const nak = nakshatraOf(p.longitude);
    return {
      key,
      meta: PLANETS.find((pl) => pl.key === key),
      longitude: p.longitude,
      longitudeFormatted: formatDeg(p.longitude),
      degInSign: degInSign(p.longitude),
      degInSignFormatted: formatDeg(degInSign(p.longitude)),
      sign: { index: sIdx, ...RASHIS[sIdx] },
      nakshatra: { index: nak.index, pada: nak.pada, ...NAKSHATRAS[nak.index] },
      house: houseOfPlanet(p.longitude, ascendant),
      retrograde: p.retrograde,
      speed: p.speed,
    };
  });

  const moon = planets.find((p) => p.key === "Moon");
  const dasha = computeDasha(moon.longitude, birthUTC);

  return {
    input: {
      name: name || null,
      gender: gender || null,
      birthUTC: birthUTC.toISOString(),
      latitude,
      longitude,
    },
    options: {
      ayanamsa: { key: opts.ayanamsa, ...AYANAMSAS[opts.ayanamsa] },
      houseSystem: { key: opts.houseSystem, ...HOUSE_SYSTEMS[opts.houseSystem] },
      nodeType: { key: opts.nodeType, ...NODE_TYPES[opts.nodeType] },
    },
    ayanamsa: ayanamsa(jd, opts),
    ascendant: {
      longitude: ascendant,
      longitudeFormatted: formatDeg(ascendant),
      degInSign: degInSign(ascendant),
      degInSignFormatted: formatDeg(degInSign(ascendant)),
      sign: { index: ascSignIdx, ...RASHIS[ascSignIdx] },
      nakshatra: { index: ascNak.index, pada: ascNak.pada, ...NAKSHATRAS[ascNak.index] },
    },
    moonRashi: { index: signOf(moon.longitude), ...RASHIS[signOf(moon.longitude)] },
    sunRashi: (() => {
      const sun = planets.find((p) => p.key === "Sun");
      return { index: signOf(sun.longitude), ...RASHIS[signOf(sun.longitude)] };
    })(),
    janmaNakshatra: moon.nakshatra,
    planets,
    houseCusps: cusps.map((c, i) => ({
      house: i + 1,
      longitude: c,
      sign: { index: signOf(c), ...RASHIS[signOf(c)] },
    })),
    dasha,
  };
}
