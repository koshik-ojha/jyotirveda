// Pythagorean numerology engine.
// All reductions preserve master numbers 11, 22, 33 unless explicitly reduced.

const PYTHAGOREAN = {
  A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
  J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
  S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8,
};
const VOWELS = new Set(["A","E","I","O","U"]);
const MASTER = new Set([11, 22, 33]);

function letters(str) {
  return String(str).toUpperCase().split("").filter((c) => /[A-Z]/.test(c));
}

function digitSum(n) {
  let s = 0;
  for (const d of String(n)) if (d >= "0" && d <= "9") s += +d;
  return s;
}

function reduce(n, keepMaster = true) {
  let x = Math.abs(Number(n));
  while (x > 9 && !(keepMaster && MASTER.has(x))) {
    x = digitSum(x);
  }
  return x;
}

function sumLetters(name, selector = () => true) {
  return letters(name).filter(selector).reduce((s, c) => s + (PYTHAGOREAN[c] ?? 0), 0);
}

// ── Numbers ─────────────────────────────────────────────────────────────────
export function lifePathNumber(dobISO) {
  const [y, m, d] = dobISO.split("-").map(Number);
  // Reduce each segment with master preserved, then sum.
  const a = reduce(d), b = reduce(m), c = reduce(y);
  return reduce(a + b + c);
}

export function destinyNumber(fullName) {
  return reduce(sumLetters(fullName));
}

export function soulUrgeNumber(fullName) {
  return reduce(sumLetters(fullName, (c) => VOWELS.has(c)));
}

export function personalityNumber(fullName) {
  return reduce(sumLetters(fullName, (c) => !VOWELS.has(c)));
}

export function birthdayNumber(dobISO) {
  const [, , d] = dobISO.split("-").map(Number);
  return reduce(d);
}

export function maturityNumber(dobISO, fullName) {
  return reduce(lifePathNumber(dobISO) + destinyNumber(fullName));
}

export function personalYearNumber(dobISO, atDate = new Date()) {
  const [, m, d] = dobISO.split("-").map(Number);
  return reduce(reduce(m) + reduce(d) + reduce(atDate.getFullYear()));
}

export function personalMonthNumber(dobISO, atDate = new Date()) {
  return reduce(personalYearNumber(dobISO, atDate) + reduce(atDate.getMonth() + 1));
}

export function personalDayNumber(dobISO, atDate = new Date()) {
  return reduce(personalMonthNumber(dobISO, atDate) + reduce(atDate.getDate()));
}

// Karmic debts: 13, 14, 16, 19 appearing during reduction (before final reduction)
export function karmicDebts(dobISO, fullName) {
  const debts = new Set();
  const [y, m, d] = dobISO.split("-").map(Number);
  for (const n of [d, m, y, sumLetters(fullName)]) {
    let x = Math.abs(n);
    while (x > 33) {
      if ([13,14,16,19].includes(x)) { debts.add(x); break; }
      x = digitSum(x);
      if ([13,14,16,19].includes(x)) { debts.add(x); break; }
    }
  }
  return [...debts];
}

// Karmic lessons: digits 1–9 missing from name spelling
export function karmicLessons(fullName) {
  const present = new Set();
  for (const c of letters(fullName)) {
    if (PYTHAGOREAN[c]) present.add(PYTHAGOREAN[c]);
  }
  const lessons = [];
  for (let i = 1; i <= 9; i++) if (!present.has(i)) lessons.push(i);
  return lessons;
}

// ── Interpretations ─────────────────────────────────────────────────────────
const NUMBER_TRAITS = {
  1:  { title: "The Leader",    traits: "Independent, pioneering, original. Forge new paths and lead with conviction.", colors: ["Red","Yellow"], lucky: [1, 10, 19, 28], day: "Sunday" },
  2:  { title: "The Diplomat",  traits: "Cooperative, sensitive, peace-loving. Excel through partnership and intuition.", colors: ["White","Cream"], lucky: [2, 11, 20, 29], day: "Monday" },
  3:  { title: "The Creator",   traits: "Expressive, joyful, artistic. Communication and imagination are your wings.", colors: ["Yellow","Orange"], lucky: [3, 12, 21, 30], day: "Thursday" },
  4:  { title: "The Builder",   traits: "Practical, disciplined, hardworking. You build foundations that endure.", colors: ["Blue","Green"], lucky: [4, 13, 22, 31], day: "Sunday" },
  5:  { title: "The Adventurer",traits: "Curious, freedom-loving, versatile. Change is your medium; routine your prison.", colors: ["Silver","Grey"], lucky: [5, 14, 23], day: "Wednesday" },
  6:  { title: "The Nurturer",  traits: "Caring, responsible, harmonious. You hold the family, the community, the cause.", colors: ["Pink","Light Blue"], lucky: [6, 15, 24], day: "Friday" },
  7:  { title: "The Seeker",    traits: "Introspective, analytical, spiritual. You find truth in solitude and study.", colors: ["Violet","Indigo"], lucky: [7, 16, 25], day: "Monday" },
  8:  { title: "The Achiever",  traits: "Ambitious, authoritative, materially gifted. Power and abundance are your karma.", colors: ["Black","Dark Blue"], lucky: [8, 17, 26], day: "Saturday" },
  9:  { title: "The Humanitarian", traits: "Compassionate, idealistic, universal. You serve the larger world.", colors: ["Crimson","Maroon"], lucky: [9, 18, 27], day: "Tuesday" },
  11: { title: "The Visionary (Master)", traits: "Master intuitive. Carry the 2 energy at a higher octave — illuminate, inspire.", colors: ["Silver","White"], lucky: [11, 29], day: "Monday" },
  22: { title: "The Master Builder", traits: "Master constructor. Turn vision into permanent form on a grand scale.", colors: ["Gold","White"], lucky: [22], day: "Sunday" },
  33: { title: "The Master Teacher", traits: "Master healer. The 6 energy elevated — selfless service for the awakening of others.", colors: ["Gold","Violet"], lucky: [33], day: "Friday" },
};

const KARMIC_DEBT_MEANINGS = {
  13: "Hard work without immediate reward — discipline is the medicine. Avoid laziness and shortcuts.",
  14: "Liberation through self-control — abuse of freedom is the karmic trap. Build healthy boundaries.",
  16: "Ego dissolution — old self must die for the new. A romantic or spiritual upheaval is foretold.",
  19: "Independence learned through humility — past abuse of power must be balanced through service.",
};

const KARMIC_LESSON_MEANINGS = {
  1: "Learn to stand alone and lead — initiative is the gift to cultivate.",
  2: "Learn cooperation and sensitivity — soften the edges of self-direction.",
  3: "Learn self-expression and joy — let creativity flow without judgement.",
  4: "Learn discipline and order — finish what you begin.",
  5: "Learn adaptability — embrace change rather than resist it.",
  6: "Learn responsibility for those you love — show up consistently.",
  7: "Learn introspection and trust in the unseen — solitude is a teacher.",
  8: "Learn right use of power and money — balance ambition with ethics.",
  9: "Learn compassion and letting go — serve something larger than self.",
};

export function describe(n) {
  return NUMBER_TRAITS[n] ?? NUMBER_TRAITS[reduce(n, false)];
}

export function computeNumerology({ name, dob, atDate }) {
  if (!name || !dob) throw new Error("name and dob (YYYY-MM-DD) are required");
  const at = atDate ? new Date(atDate) : new Date();

  const lp  = lifePathNumber(dob);
  const ds  = destinyNumber(name);
  const su  = soulUrgeNumber(name);
  const ps  = personalityNumber(name);
  const bd  = birthdayNumber(dob);
  const mt  = maturityNumber(dob, name);
  const py  = personalYearNumber(dob, at);
  const pm  = personalMonthNumber(dob, at);
  const pd  = personalDayNumber(dob, at);

  const debts   = karmicDebts(dob, name);
  const lessons = karmicLessons(name);

  return {
    input: { name, dob, at: at.toISOString().slice(0, 10) },
    coreNumbers: {
      lifePath:    { value: lp, meaning: describe(lp) },
      destiny:     { value: ds, meaning: describe(ds) },
      soulUrge:    { value: su, meaning: describe(su) },
      personality: { value: ps, meaning: describe(ps) },
      birthday:    { value: bd, meaning: describe(bd) },
      maturity:    { value: mt, meaning: describe(mt) },
    },
    cycles: {
      personalYear:  { value: py, meaning: describe(py) },
      personalMonth: { value: pm, meaning: describe(pm) },
      personalDay:   { value: pd, meaning: describe(pd) },
    },
    karmic: {
      debts:   debts.map((d) => ({ number: d, meaning: KARMIC_DEBT_MEANINGS[d] })),
      lessons: lessons.map((l) => ({ number: l, meaning: KARMIC_LESSON_MEANINGS[l] })),
    },
    sums: {
      letters:   letters(name).length,
      vowels:    letters(name).filter((c) => VOWELS.has(c)).length,
      consonants:letters(name).filter((c) => !VOWELS.has(c)).length,
      destinySum:  sumLetters(name),
      soulUrgeSum: sumLetters(name, (c) => VOWELS.has(c)),
    },
  };
}
