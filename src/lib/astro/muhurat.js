import { julianDayUT, sunrise, sunset, jdToDate } from "./ephemeris.js";
import {
  CHOGHADIYA_DAY, CHOGHADIYA_NIGHT, CHOGHADIYA_QUALITY,
  RAHU_KAAL_PART, YAMAGANDA_PART, GULIKA_PART,
} from "./constants.js";

function addJdHours(jd, hours) { return jd + hours / 24; }

/**
 * Build day/night choghadiya windows, rahu kaal, yamaganda, gulika, abhijit muhurat.
 */
export function computeMuhurat({ dateUTC, latitude, longitude }) {
  const jdNoon = julianDayUT(dateUTC);
  const srJd = sunrise(jdNoon - 1, latitude, longitude);
  const ssJd = sunset(srJd, latitude, longitude);
  const nextSrJd = sunrise(srJd + 0.5, latitude, longitude);

  const dayHours = (ssJd - srJd) * 24;
  const nightHours = (nextSrJd - ssJd) * 24;
  const dayStep = dayHours / 8;
  const nightStep = nightHours / 8;

  const sunriseDate = jdToDate(srJd);
  const localSunriseMs = sunriseDate.getTime() + (longitude / 15) * 3600 * 1000;
  const dow = new Date(localSunriseMs).getUTCDay();

  const dayChoghadiyas = CHOGHADIYA_DAY[dow].map((name, i) => {
    const start = addJdHours(srJd, i * dayStep);
    const end   = addJdHours(srJd, (i + 1) * dayStep);
    return {
      slot: i + 1,
      name,
      quality: CHOGHADIYA_QUALITY[name],
      start: jdToDate(start).toISOString(),
      end: jdToDate(end).toISOString(),
    };
  });

  const nightChoghadiyas = CHOGHADIYA_NIGHT[dow].map((name, i) => {
    const start = addJdHours(ssJd, i * nightStep);
    const end   = addJdHours(ssJd, (i + 1) * nightStep);
    return {
      slot: i + 1,
      name,
      quality: CHOGHADIYA_QUALITY[name],
      start: jdToDate(start).toISOString(),
      end: jdToDate(end).toISOString(),
    };
  });

  const partWindow = (partIdx) => {
    // RAHU_KAAL_PART uses 1-indexed slot (1..8). Convert to JD range.
    const i = partIdx - 1;
    return {
      start: jdToDate(addJdHours(srJd, i * dayStep)).toISOString(),
      end:   jdToDate(addJdHours(srJd, (i + 1) * dayStep)).toISOString(),
    };
  };

  // Abhijit muhurat: ~48 mins around local solar noon. Inauspicious on Wednesdays.
  const middayJd = (srJd + ssJd) / 2;
  const abhijitSpan = dayHours / 15 / 24; // 1/15 of daytime = 1 muhurat = ~48 mins
  const abhijit = {
    start: jdToDate(middayJd - abhijitSpan / 2).toISOString(),
    end:   jdToDate(middayJd + abhijitSpan / 2).toISOString(),
    quality: dow === 3 ? "Inauspicious (Wednesday)" : "Auspicious",
  };

  return {
    sunrise: sunriseDate.toISOString(),
    sunset: jdToDate(ssJd).toISOString(),
    nextSunrise: jdToDate(nextSrJd).toISOString(),
    dayChoghadiyas,
    nightChoghadiyas,
    rahuKaal:  partWindow(RAHU_KAAL_PART[dow]),
    yamaganda: partWindow(YAMAGANDA_PART[dow]),
    gulika:    partWindow(GULIKA_PART[dow]),
    abhijit,
  };
}
