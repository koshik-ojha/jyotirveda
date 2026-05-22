// Extra panchang computations: monthly view, planetary horas, do-ghati muhurats, Gowri Nalla Neram.

import { julianDayUT, sunrise, sunset, moonrise, moonset, jdToDate, planetPosition } from "./ephemeris.js";
import { computePanchang } from "./panchang.js";
import { RASHIS, NAKSHATRAS, TITHI_NAMES } from "./constants.js";

// Chaldean planetary order, descending: Saturn → Jupiter → Mars → Sun → Venus → Mercury → Moon → (loop)
const CHALDEAN = ["Saturn","Jupiter","Mars","Sun","Venus","Mercury","Moon"];
const WEEKDAY_LORD = ["Sun","Moon","Mars","Mercury","Jupiter","Venus","Saturn"];

const NATURAL_BENEFIC = { Sun: "Active", Moon: "Calm", Mars: "Aggressive",
  Mercury: "Communicative", Jupiter: "Wise", Venus: "Pleasurable", Saturn: "Disciplined" };

// ─── Planetary Horas ────────────────────────────────────────────────────────
// 24 horas per day (12 day + 12 night), each a 1/12 share of day or night length.
// First hora ruled by weekday lord; then descend Chaldean order.

export function planetaryHoras({ dateUTC, latitude, longitude }) {
  const jdNoon = julianDayUT(dateUTC);
  const srJd = sunrise(jdNoon - 1, latitude, longitude);
  const ssJd = sunset(srJd, latitude, longitude);
  const nextSrJd = sunrise(srJd + 0.5, latitude, longitude);

  const sunriseDate = jdToDate(srJd);
  const localMs = sunriseDate.getTime() + (longitude / 15) * 3600 * 1000;
  const dow = new Date(localMs).getUTCDay();
  const firstLord = WEEKDAY_LORD[dow];
  let chaldeanStart = CHALDEAN.indexOf(firstLord);

  const dayHours   = (ssJd - srJd) * 24;
  const nightHours = (nextSrJd - ssJd) * 24;
  const dayHoraLen = dayHours / 12;
  const nightHoraLen = nightHours / 12;

  const horas = [];
  for (let i = 0; i < 12; i++) {
    const lord = CHALDEAN[(chaldeanStart + i) % 7];
    const start = jdToDate(srJd + (i * dayHoraLen) / 24);
    const end   = jdToDate(srJd + ((i + 1) * dayHoraLen) / 24);
    horas.push({ index: i + 1, lord, phase: "day", trait: NATURAL_BENEFIC[lord], start: start.toISOString(), end: end.toISOString() });
  }
  for (let i = 0; i < 12; i++) {
    const lord = CHALDEAN[(chaldeanStart + 12 + i) % 7];
    const start = jdToDate(ssJd + (i * nightHoraLen) / 24);
    const end   = jdToDate(ssJd + ((i + 1) * nightHoraLen) / 24);
    horas.push({ index: i + 1 + 12, lord, phase: "night", trait: NATURAL_BENEFIC[lord], start: start.toISOString(), end: end.toISOString() });
  }

  // Find current hora
  const now = dateUTC.getTime();
  const current = horas.find((h) => new Date(h.start).getTime() <= now && now < new Date(h.end).getTime()) || null;

  return {
    sunrise: sunriseDate.toISOString(),
    sunset: jdToDate(ssJd).toISOString(),
    weekdayLord: firstLord,
    horas,
    current,
  };
}

// ─── 30 Do-Ghati Muhurats (48-min windows) ──────────────────────────────────
const DAY_MUHURTAS = [
  { name: "Rudra",       nature: "Inauspicious" },
  { name: "Ahi",         nature: "Inauspicious" },
  { name: "Mitra",       nature: "Auspicious" },
  { name: "Pitru",       nature: "Inauspicious" },
  { name: "Vasu",        nature: "Auspicious" },
  { name: "Vara",        nature: "Auspicious" },
  { name: "Vishvedeva",  nature: "Auspicious" },
  { name: "Vidhi (Abhijit)", nature: "Very Auspicious" },
  { name: "Sutamukhi",   nature: "Auspicious" },
  { name: "Puruhuta",    nature: "Inauspicious" },
  { name: "Vahini",      nature: "Inauspicious" },
  { name: "Naktankari",  nature: "Inauspicious" },
  { name: "Varuna",      nature: "Auspicious" },
  { name: "Aryaman",     nature: "Auspicious" },
  { name: "Bhaga",       nature: "Inauspicious" },
];

const NIGHT_MUHURTAS = [
  { name: "Girisha",         nature: "Inauspicious" },
  { name: "Ajapada",         nature: "Inauspicious" },
  { name: "Ahirbudhanya",    nature: "Auspicious" },
  { name: "Pushya",          nature: "Auspicious" },
  { name: "Ashvini",         nature: "Auspicious" },
  { name: "Yama",            nature: "Inauspicious" },
  { name: "Agni",            nature: "Auspicious" },
  { name: "Vidhata",         nature: "Auspicious" },
  { name: "Kanda",           nature: "Auspicious" },
  { name: "Aditi",           nature: "Auspicious" },
  { name: "Jiva (Amrit)",    nature: "Very Auspicious" },
  { name: "Vishnu",          nature: "Auspicious" },
  { name: "Dyumadgadyuti",   nature: "Auspicious" },
  { name: "Brahma",          nature: "Very Auspicious" },
  { name: "Samudram",        nature: "Auspicious" },
];

export function doGhatiMuhurats({ dateUTC, latitude, longitude }) {
  const jdNoon = julianDayUT(dateUTC);
  const srJd = sunrise(jdNoon - 1, latitude, longitude);
  const ssJd = sunset(srJd, latitude, longitude);
  const nextSrJd = sunrise(srJd + 0.5, latitude, longitude);

  const daySlot   = (ssJd - srJd) / 15;
  const nightSlot = (nextSrJd - ssJd) / 15;

  const day = DAY_MUHURTAS.map((m, i) => ({
    index: i + 1, phase: "day", ...m,
    start: jdToDate(srJd + i * daySlot).toISOString(),
    end:   jdToDate(srJd + (i + 1) * daySlot).toISOString(),
  }));
  const night = NIGHT_MUHURTAS.map((m, i) => ({
    index: i + 16, phase: "night", ...m,
    start: jdToDate(ssJd + i * nightSlot).toISOString(),
    end:   jdToDate(ssJd + (i + 1) * nightSlot).toISOString(),
  }));

  return {
    sunrise: jdToDate(srJd).toISOString(),
    sunset:  jdToDate(ssJd).toISOString(),
    day, night,
  };
}

// ─── Gowri Nalla Neram (Tamil) ──────────────────────────────────────────────
// 8 slots per day-phase, 8 per night-phase. Starting slot rotates by weekday.

const GOWRI_NAMES = ["Amritha","Siddhi","Marana","Roga","Labha","Dhana","Sugam","Sool"];
const GOWRI_QUALITY = {
  Amritha: "Excellent", Siddhi: "Excellent", Labha: "Auspicious", Dhana: "Auspicious", Sugam: "Auspicious",
  Marana: "Inauspicious", Roga: "Inauspicious", Sool: "Inauspicious",
};
// Day-start slot index per weekday (Sun=0..Sat=6)
const GOWRI_DAY_START = [3, 0, 5, 2, 7, 4, 1];
// Night-start slot index per weekday
const GOWRI_NIGHT_START = [7, 4, 1, 6, 3, 0, 5];

export function gowriPanchangam({ dateUTC, latitude, longitude }) {
  const jdNoon = julianDayUT(dateUTC);
  const srJd = sunrise(jdNoon - 1, latitude, longitude);
  const ssJd = sunset(srJd, latitude, longitude);
  const nextSrJd = sunrise(srJd + 0.5, latitude, longitude);

  const sunriseDate = jdToDate(srJd);
  const localMs = sunriseDate.getTime() + (longitude / 15) * 3600 * 1000;
  const dow = new Date(localMs).getUTCDay();

  const buildSlots = (startJd, endJd, startIdx) => {
    const step = (endJd - startJd) / 8;
    return Array.from({ length: 8 }, (_, i) => {
      const name = GOWRI_NAMES[(startIdx + i) % 8];
      return {
        slot: i + 1,
        name,
        quality: GOWRI_QUALITY[name],
        start: jdToDate(startJd + i * step).toISOString(),
        end:   jdToDate(startJd + (i + 1) * step).toISOString(),
      };
    });
  };

  return {
    sunrise: sunriseDate.toISOString(),
    sunset:  jdToDate(ssJd).toISOString(),
    daySlots:   buildSlots(srJd, ssJd, GOWRI_DAY_START[dow]),
    nightSlots: buildSlots(ssJd, nextSrJd, GOWRI_NIGHT_START[dow]),
  };
}

// ─── Sun & Moon Times ───────────────────────────────────────────────────────
export function sunMoonTimes({ dateUTC, latitude, longitude }) {
  const jdNoon = julianDayUT(dateUTC);
  const srJd = sunrise(jdNoon - 1, latitude, longitude);
  const ssJd = sunset(srJd, latitude, longitude);
  const nextSrJd = sunrise(srJd + 0.5, latitude, longitude);
  const mrJd = moonrise(jdNoon - 1, latitude, longitude);
  const msJd = moonset(jdNoon - 1, latitude, longitude);

  const dayHours = (ssJd - srJd) * 24;
  const nightHours = (nextSrJd - ssJd) * 24;

  return {
    sunrise: jdToDate(srJd).toISOString(),
    sunset:  jdToDate(ssJd).toISOString(),
    nextSunrise: jdToDate(nextSrJd).toISOString(),
    moonrise: mrJd ? jdToDate(mrJd).toISOString() : null,
    moonset:  msJd ? jdToDate(msJd).toISOString() : null,
    dayLengthHours: dayHours,
    nightLengthHours: nightHours,
  };
}

// ─── Monthly Panchang ───────────────────────────────────────────────────────
export function monthlyPanchang({ year, month, latitude, longitude }) {
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate(); // month is 1-based
  const days = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const dateUTC = new Date(Date.UTC(year, month - 1, d, 6, 0, 0));
    try {
      const p = computePanchang({ dateUTC, latitude, longitude });
      days.push({
        date: `${year}-${String(month).padStart(2,"0")}-${String(d).padStart(2,"0")}`,
        weekday: p.vara.en,
        tithi: { name: p.tithi.name, paksha: p.tithi.paksha },
        nakshatra: p.nakshatra.en,
        yoga: p.yoga.name,
        karana: p.karana.name,
        sunrise: p.sunrise,
        sunset: p.sunset,
      });
    } catch (err) {
      days.push({ date: `${year}-${String(month).padStart(2,"0")}-${String(d).padStart(2,"0")}`, error: err.message });
    }
  }
  return { year, month, days };
}
