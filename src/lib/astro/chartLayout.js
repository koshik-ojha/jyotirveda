// Layout helpers for Vedic chart rendering.

import { RASHIS, PLANETS } from "./constants.js";

const PLANET_SHORT = {
  Sun: "Su", Moon: "Mo", Mars: "Ma", Mercury: "Me",
  Jupiter: "Ju", Venus: "Ve", Saturn: "Sa", Rahu: "Ra", Ketu: "Ke",
};

/**
 * Group a kundli's planets by sign index (0..11). Each slot is an array of
 * planet display blobs ready to drop into chart cells.
 */
export function planetsBySign(planets) {
  const buckets = Array.from({ length: 12 }, () => []);
  for (const p of planets) {
    buckets[p.sign.index].push({
      key: p.key,
      short: PLANET_SHORT[p.key] ?? p.key.slice(0, 2),
      retrograde: p.retrograde,
      symbol: p.meta?.symbol ?? "",
      degInSign: p.degInSign,
    });
  }
  return buckets;
}

/**
 * Compute D9 (Navamsa) sign for a sidereal longitude.
 * Movable signs start D9 from same sign; fixed start from 9th; dual from 5th.
 * Inside the sign, 9 padas of 3°20' map sequentially.
 */
export function navamsaOfLongitude(longitude) {
  const signIdx = Math.floor(longitude / 30);
  const degInSign = longitude - signIdx * 30;
  const pada = Math.floor(degInSign / (30 / 9)); // 0..8
  const mod3 = signIdx % 3;
  const offset = mod3 === 0 ? 0 : mod3 === 1 ? 8 : 4;
  return (signIdx + offset + pada) % 12;
}

/**
 * Build a Navamsa (D9) view: planets and ascendant remapped to their D9 signs.
 * Returns { ascSignIdx, planetsBySign }.
 */
export function navamsaChart(kundli) {
  const ascSignIdx = navamsaOfLongitude(kundli.ascendant.longitude);
  const buckets = Array.from({ length: 12 }, () => []);
  for (const p of kundli.planets) {
    const d9Sign = navamsaOfLongitude(p.longitude);
    buckets[d9Sign].push({
      key: p.key,
      short: PLANET_SHORT[p.key] ?? p.key.slice(0, 2),
      retrograde: p.retrograde,
      symbol: p.meta?.symbol ?? "",
      degInSign: p.degInSign, // original degree in D1 sign — for reference
    });
  }
  return { ascSignIdx, planetsBySign: buckets };
}

/**
 * For each house (1..12), which sign index it covers, given the ascendant.
 * Whole-sign houses: house n contains sign (ascSignIdx + n - 1) mod 12.
 */
export function signOfHouse(ascSignIdx, houseNum) {
  return (ascSignIdx + houseNum - 1) % 12;
}

export function rashiShort(signIdx) {
  return RASHIS[signIdx].en.slice(0, 3);
}
