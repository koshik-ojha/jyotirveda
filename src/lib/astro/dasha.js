import { NAKSHATRAS, DASHA_YEARS, DASHA_ORDER } from "./constants.js";

const YEAR_DAYS = 365.25;
const NAK_SIZE = 360 / 27;

function addYears(date, years) {
  const ms = years * YEAR_DAYS * 24 * 3600 * 1000;
  return new Date(date.getTime() + ms);
}

/**
 * Vimshottari Mahadasha + Antardasha sequence from birth.
 * Returns an array of mahadashas; each contains its antardasha sub-periods.
 */
export function computeDasha(moonLongitude, birthUTC) {
  const nakIdx = Math.floor(moonLongitude / NAK_SIZE);
  const within = moonLongitude - nakIdx * NAK_SIZE;
  const fractionElapsed = within / NAK_SIZE;

  const birthLord = NAKSHATRAS[nakIdx].lord;
  const startIdx = DASHA_ORDER.indexOf(birthLord);

  // The mahadasha that was running at birth — only the remaining part counts.
  const balanceYears = (1 - fractionElapsed) * DASHA_YEARS[birthLord];

  const mahadashas = [];
  let cursor = new Date(birthUTC.getTime());

  for (let i = 0; i < DASHA_ORDER.length; i++) {
    const lord = DASHA_ORDER[(startIdx + i) % DASHA_ORDER.length];
    const totalYears = i === 0 ? balanceYears : DASHA_YEARS[lord];
    const end = addYears(cursor, totalYears);

    const antardashas = [];
    let antarCursor = new Date(cursor.getTime());
    for (let j = 0; j < DASHA_ORDER.length; j++) {
      const subLord = DASHA_ORDER[(DASHA_ORDER.indexOf(lord) + j) % DASHA_ORDER.length];
      const fullSubYears = (DASHA_YEARS[lord] * DASHA_YEARS[subLord]) / 120;
      const subYears = i === 0 ? fullSubYears * (totalYears / DASHA_YEARS[lord]) : fullSubYears;
      const antarEnd = addYears(antarCursor, subYears);
      antardashas.push({
        lord: subLord,
        years: subYears,
        start: antarCursor.toISOString(),
        end: antarEnd.toISOString(),
      });
      antarCursor = antarEnd;
    }

    mahadashas.push({
      lord,
      years: totalYears,
      start: cursor.toISOString(),
      end: end.toISOString(),
      antardashas,
    });
    cursor = end;
  }

  return {
    birthLord,
    balanceYears,
    fractionElapsed,
    mahadashas,
  };
}

/** Return the mahadasha + antardasha active at a given date. */
export function currentDasha(dasha, atDate = new Date()) {
  const t = atDate.getTime();
  const maha = dasha.mahadashas.find(
    (m) => new Date(m.start).getTime() <= t && t < new Date(m.end).getTime()
  );
  if (!maha) return null;
  const antar = maha.antardashas.find(
    (a) => new Date(a.start).getTime() <= t && t < new Date(a.end).getTime()
  );
  return { mahadasha: maha.lord, antardasha: antar?.lord ?? null };
}
