import { julianDayUT, planetPosition } from "./ephemeris.js";
import { RASHIS, PLANETS, NAKSHATRAS } from "./constants.js";

const TRANSIT_PLANETS = ["Sun","Moon","Mars","Mercury","Jupiter","Venus","Saturn","Rahu","Ketu"];

const BENEFIC = { Jupiter: 3, Venus: 2, Mercury: 1, Moon: 1 };
const MALEFIC = { Saturn: -2, Mars: -2, Rahu: -1, Ketu: -1 };

const KENDRA = [1, 4, 7, 10];
const TRIKONA = [1, 5, 9];
const UPACHAYA = [3, 6, 10, 11];
const DUSTHANA = [6, 8, 12];

const LUCKY_COLOR = ["Red","White","Green","Silver","Gold","Green","Pink","Red","Yellow","Blue","Blue","Yellow"];
const LUCKY_NUMBER = [9, 6, 5, 2, 1, 5, 6, 9, 3, 8, 8, 3];

function signOf(lng) { return Math.floor(lng / 30); }

/** House number of a transiting planet, counted from a given rashi as 1st. */
function houseFromRashi(planetSign, rashiIdx) {
  return ((planetSign - rashiIdx + 12) % 12) + 1;
}

function transitsForRashi(jd, rashiIdx) {
  return TRANSIT_PLANETS.map((key) => {
    const p = planetPosition(jd, key);
    const planetSign = signOf(p.longitude);
    return {
      key,
      meta: PLANETS.find((x) => x.key === key),
      longitude: p.longitude,
      sign: { index: planetSign, ...RASHIS[planetSign] },
      house: houseFromRashi(planetSign, rashiIdx),
      retrograde: p.retrograde,
    };
  });
}

/** Crude but principled scoring (10..95) based on classical placement rules. */
function scoreTransits(transits) {
  let score = 55;
  for (const t of transits) {
    const b = BENEFIC[t.key] ?? 0;
    const m = MALEFIC[t.key] ?? 0;
    if (b > 0) {
      if (KENDRA.includes(t.house) || TRIKONA.includes(t.house)) score += b * 1.5;
      else if (DUSTHANA.includes(t.house)) score -= b * 0.8;
    }
    if (m < 0) {
      // Malefics tolerate or even benefit in upachaya/dusthana (6/8/12 for them is "natural home")
      if (UPACHAYA.includes(t.house)) score -= m * 0.5; // becomes +ve
      else if (KENDRA.includes(t.house) || TRIKONA.includes(t.house)) score += m * 1.2;
    }
    if (t.retrograde) score -= 1;
  }
  return Math.max(10, Math.min(95, Math.round(score)));
}

const ASPECT_LINE = (t) => {
  const lord = RASHIS[t.sign.index].lord;
  const r = t.retrograde ? " (retrograde)" : "";
  return `${t.meta.en} is transiting your ${ordinal(t.house)} house through ${t.sign.en}${r}.`;
};

function ordinal(n) {
  const s = ["th","st","nd","rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function loveOutlook(t) {
  const venus = t.find((x) => x.key === "Venus");
  const mars = t.find((x) => x.key === "Mars");
  const v = venus.house;
  const m = mars.house;
  if ([5,7,11].includes(v)) return "Romantic energy is supportive — connection feels easier today.";
  if (DUSTHANA.includes(v)) return "Hold back from heated conversations in love; misunderstandings may flare.";
  if ([5,7].includes(m)) return "Passion is high but channel it gently to avoid friction.";
  return "Steady, ordinary day for relationships — small gestures will mean more than grand ones.";
}

function careerOutlook(t) {
  const saturn = t.find((x) => x.key === "Saturn");
  const jupiter = t.find((x) => x.key === "Jupiter");
  if ([10, 6, 11].includes(saturn.house)) return "Discipline pays off; a long-running task moves a step forward.";
  if ([10, 11, 2, 5].includes(jupiter.house)) return "Favourable hour for new commitments and big-picture decisions.";
  if (DUSTHANA.includes(saturn.house) && KENDRA.includes(saturn.house)) return "Mixed signal at work — finish before you start anything new.";
  return "Routine workday — stay practical, no major initiatives needed.";
}

function healthOutlook(t) {
  const mars = t.find((x) => x.key === "Mars");
  const sun = t.find((x) => x.key === "Sun");
  if ([6, 8].includes(mars.house)) return "Watch out for minor strain or impulsive injury — slow down.";
  if (KENDRA.includes(sun.house)) return "Vitality is strong; a brisk walk will reset your day.";
  return "Stable energy — listen to your body and rest if needed.";
}

function financeOutlook(t) {
  const jupiter = t.find((x) => x.key === "Jupiter");
  const venus   = t.find((x) => x.key === "Venus");
  if ([2,11].includes(jupiter.house) || [2,11].includes(venus.house)) return "Income flow is favoured; small gains are possible.";
  if (DUSTHANA.includes(jupiter.house)) return "Defer large purchases; expenses may overshoot estimates.";
  return "Neutral financial day — keep to your budget.";
}

const FAVOURABLE_TIME = ["Morning","Late morning","Afternoon","Late afternoon","Early evening","Evening"];

/**
 * @param {Object} opts
 * @param {number} opts.signIdx       Moon sign index 0..11 (rashi)
 * @param {Date}   opts.dateUTC       Anchor date
 * @param {"today"|"tomorrow"|"weekly"|"monthly"|"yearly"} opts.period
 */
export function computeHoroscope({ signIdx, dateUTC, period = "today" }) {
  if (typeof signIdx !== "number" || signIdx < 0 || signIdx > 11) {
    throw new Error("signIdx must be 0..11");
  }
  const anchor = new Date(dateUTC);
  if (period === "tomorrow") anchor.setUTCDate(anchor.getUTCDate() + 1);

  const jd = julianDayUT(anchor);
  const transits = transitsForRashi(jd, signIdx);

  // Score: for longer periods, sample mid-window for a representative read.
  let scoreJd = jd;
  if (period === "weekly")   scoreJd = jd + 3.5;
  if (period === "monthly")  scoreJd = jd + 15;
  if (period === "yearly")   scoreJd = jd + 182.5;
  const scoreTransitsArr = transits;
  const score = scoreTransits(scoreTransitsArr);

  const rashi = RASHIS[signIdx];
  const lord = rashi.lord;
  const favTime = FAVOURABLE_TIME[(signIdx * 7) % FAVOURABLE_TIME.length];

  return {
    sign: { index: signIdx, ...rashi },
    period,
    date: anchor.toISOString(),
    score,
    rating: score >= 75 ? "Excellent" : score >= 60 ? "Good" : score >= 45 ? "Average" : score >= 30 ? "Challenging" : "Difficult",
    lucky: {
      color:  LUCKY_COLOR[signIdx],
      number: LUCKY_NUMBER[signIdx],
      time:   favTime,
      direction: ["East","South","West","North"][signIdx % 4],
    },
    signLord: lord,
    transits,
    aspects: transits.map((t) => ({ planet: t.key, house: t.house, signEn: t.sign.en, line: ASPECT_LINE(t) })),
    readings: {
      general: `${rashi.en} natives feel a ${score >= 60 ? "supportive" : score >= 45 ? "mixed" : "strained"} astrological tone for this ${period}.`,
      love:    loveOutlook(transits),
      career:  careerOutlook(transits),
      health:  healthOutlook(transits),
      finance: financeOutlook(transits),
    },
  };
}
