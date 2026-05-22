import { julianDayUT, planetPosition, sunrise, sunset, jdToDate } from "./ephemeris.js";
import {
  TITHI_NAMES, YOGA_NAMES, KARANA_NAMES, NAKSHATRAS, WEEKDAYS,
} from "./constants.js";

const NAK_SIZE = 360 / 27;
const TITHI_SIZE = 12;
const YOGA_SIZE = 360 / 27;

function norm360(x) { return ((x % 360) + 360) % 360; }

function tithiAt(jd) {
  const moon = planetPosition(jd, "Moon").longitude;
  const sun = planetPosition(jd, "Sun").longitude;
  const diff = norm360(moon - sun);
  const idx = Math.floor(diff / TITHI_SIZE);
  return {
    index: idx,
    name: TITHI_NAMES[idx],
    paksha: idx < 15 ? "Shukla" : "Krishna",
    completion: ((diff - idx * TITHI_SIZE) / TITHI_SIZE) * 100,
  };
}

function yogaAt(jd) {
  const moon = planetPosition(jd, "Moon").longitude;
  const sun = planetPosition(jd, "Sun").longitude;
  const sum = norm360(moon + sun);
  const idx = Math.floor(sum / YOGA_SIZE);
  return { index: idx, name: YOGA_NAMES[idx] };
}

function karanaAt(jd) {
  const moon = planetPosition(jd, "Moon").longitude;
  const sun = planetPosition(jd, "Sun").longitude;
  const diff = norm360(moon - sun);
  const halfIdx = Math.floor(diff / 6); // 60 half-tithis
  // First half-tithi is always Kimstughna (a fixed karana). Then Bava..Vishti
  // cycle 8 times. Last three (57,58,59) are Shakuni, Chatushpada, Naga.
  let name;
  if (halfIdx === 0) name = "Kimstughna";
  else if (halfIdx >= 57) name = ["Shakuni","Chatushpada","Naga"][halfIdx - 57];
  else name = KARANA_NAMES[(halfIdx - 1) % 7];
  return { index: halfIdx, name };
}

function nakshatraAt(jd) {
  const moon = planetPosition(jd, "Moon").longitude;
  const idx = Math.floor(moon / NAK_SIZE);
  const within = moon - idx * NAK_SIZE;
  const pada = Math.floor(within / (NAK_SIZE / 4)) + 1;
  return { index: idx, pada, ...NAKSHATRAS[idx] };
}

/**
 * Compute Panchang for a given date at a location.
 * Panchang is anchored to sunrise — the day "starts" at sunrise for Vedic
 * reckoning, so we evaluate panchang elements at sunrise JD.
 *
 * @param {Object} input
 * @param {Date}   input.dateUTC      Any UTC moment within the desired local day
 * @param {number} input.latitude
 * @param {number} input.longitude
 */
export function computePanchang({ dateUTC, latitude, longitude }) {
  const jdNoon = julianDayUT(dateUTC);
  // Search backward up to 1 day to ensure we catch the day's sunrise.
  const srJd = sunrise(jdNoon - 1, latitude, longitude);
  const ssJd = sunset(srJd, latitude, longitude);
  const nextSrJd = sunrise(srJd + 0.5, latitude, longitude);

  const sunriseDate = jdToDate(srJd);
  const sunsetDate  = jdToDate(ssJd);
  const nextSunriseDate = jdToDate(nextSrJd);

  // Weekday at sunrise (Vedic vara starts at sunrise). Shift UT by longitude
  // hours so we read the LOCAL weekday rather than the UTC weekday — matters
  // near the antimeridian and for east-Asia sunrise that falls late-UTC the
  // previous day.
  const localSunriseMs = sunriseDate.getTime() + (longitude / 15) * 3600 * 1000;
  const dow = new Date(localSunriseMs).getUTCDay();
  const vara = { index: dow, ...WEEKDAYS[dow] };

  return {
    location: { latitude, longitude },
    sunrise: sunriseDate.toISOString(),
    sunset: sunsetDate.toISOString(),
    nextSunrise: nextSunriseDate.toISOString(),
    dayLengthHours: (ssJd - srJd) * 24,
    nightLengthHours: (nextSrJd - ssJd) * 24,
    tithi:     tithiAt(srJd),
    nakshatra: nakshatraAt(srJd),
    yoga:      yogaAt(srJd),
    karana:    karanaAt(srJd),
    vara,
  };
}
