// Shiva Swarodaya — predicting the active nadi (breath flow) at any moment.
//
// Classical rule:
//   - On Surya-vara days (Sun/Mars/Saturn day) breath begins in the RIGHT (Pingala / Surya) nadi at sunrise.
//   - On Chandra-vara days (Moon/Mercury/Jupiter/Venus) it begins in the LEFT (Ida / Chandra) nadi.
//   - The active nadi alternates roughly every 60 minutes (1 ghatika ≈ 24 min in some texts; this
//     implementation uses 1 hour for practical guidance).
//
// Activity recommendations:
//   - Surya/right nadi → strong, decisive actions: fight, exercise, important meetings, eating
//   - Chandra/left nadi → gentle, receptive actions: study, sleep, devotion, planning, eating

import { sunrise, julianDayUT, jdToDate } from "./astro/ephemeris.js";

const SURYA_DAYS = new Set([0, 2, 6]); // Sun, Tue, Sat
const CHANDRA_DAYS = new Set([1, 3, 4, 5]); // Mon, Wed, Thu, Fri

export function activeNadi({ dateUTC, latitude, longitude }) {
  const jdNoon = julianDayUT(dateUTC);
  const srJd = sunrise(jdNoon - 1, latitude, longitude);
  const sunriseDate = jdToDate(srJd);

  // Local weekday at sunrise (shift by longitude for local day).
  const localMs = sunriseDate.getTime() + (longitude / 15) * 3600 * 1000;
  const dow = new Date(localMs).getUTCDay();
  const startNadi = SURYA_DAYS.has(dow) ? "Surya" : "Chandra";

  const hoursSinceSunrise = (dateUTC.getTime() - sunriseDate.getTime()) / 3600000;
  const flips = Math.floor(Math.max(0, hoursSinceSunrise));
  const current = (flips % 2 === 0) ? startNadi : (startNadi === "Surya" ? "Chandra" : "Surya");

  const nextFlipAt = new Date(sunriseDate.getTime() + (flips + 1) * 3600000);

  return {
    weekday: dow,
    sunriseUTC: sunriseDate.toISOString(),
    startNadi,
    currentNadi: current,
    side: current === "Surya" ? "Right (Pingala)" : "Left (Ida)",
    quality: current === "Surya" ? "Active / decisive" : "Receptive / gentle",
    nextFlipAt: nextFlipAt.toISOString(),
    advice: current === "Surya"
      ? "Now favours physical effort, important meetings, eating, and outgoing action."
      : "Now favours study, devotion, healing, planning, and inward work.",
  };
}
