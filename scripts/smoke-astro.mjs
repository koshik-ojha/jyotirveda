// Run with: node scripts/smoke-astro.mjs
// Uses full .js paths so it works under bare Node ESM.
import { computeKundli } from "../src/lib/astro/kundli.js";
import { computePanchang } from "../src/lib/astro/panchang.js";
import { computeMuhurat } from "../src/lib/astro/muhurat.js";

console.log("=== Kundli: 15 Jan 1990, 11:00 IST, Mumbai ===");
const k = computeKundli({
  birthUTC: new Date(Date.UTC(1990, 0, 15, 5, 30)),
  latitude: 19.0760,
  longitude: 72.8777,
});
console.log("Ascendant:", k.ascendant.sign.en, k.ascendant.degInSignFormatted);
console.log("Sun rashi:", k.sunRashi.en, "| Moon rashi:", k.moonRashi.en);
console.log("Janma nakshatra:", k.janmaNakshatra.en, "pada", k.janmaNakshatra.pada);
console.log("Ayanamsa:", k.ayanamsa.toFixed(4));
console.log("Planets:");
for (const p of k.planets) {
  console.log("  ", p.key.padEnd(8), p.sign.en.padEnd(12), p.degInSignFormatted, "H" + p.house, p.retrograde ? "(R)" : "");
}
console.log("Birth Mahadasha:", k.dasha.birthLord, "balance", k.dasha.balanceYears.toFixed(2), "yrs");

console.log("\n=== Panchang: today, Mumbai ===");
const p = computePanchang({
  dateUTC: new Date(),
  latitude: 19.0760,
  longitude: 72.8777,
});
console.log("Sunrise:", p.sunrise, "Sunset:", p.sunset);
console.log("Vara:", p.vara.en, "(", p.vara.lord, "day)");
console.log("Tithi:", p.tithi.name, p.tithi.paksha, p.tithi.completion.toFixed(1) + "%");
console.log("Nakshatra:", p.nakshatra.en, "pada", p.nakshatra.pada);
console.log("Yoga:", p.yoga.name, "| Karana:", p.karana.name);

console.log("\n=== Muhurat: today, Mumbai ===");
const m = computeMuhurat({
  dateUTC: new Date(),
  latitude: 19.0760,
  longitude: 72.8777,
});
console.log("Rahu kaal:", m.rahuKaal.start.slice(11, 16), "→", m.rahuKaal.end.slice(11, 16), "UTC");
console.log("Abhijit:  ", m.abhijit.start.slice(11, 16), "→", m.abhijit.end.slice(11, 16), m.abhijit.quality);
console.log("Day choghadiyas:");
for (const c of m.dayChoghadiyas) {
  console.log("  ", c.start.slice(11, 16), "-", c.end.slice(11, 16), c.name.padEnd(7), c.quality);
}
