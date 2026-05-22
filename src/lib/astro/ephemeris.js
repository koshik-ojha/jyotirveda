import sweph from "sweph";

const { constants: C } = sweph;

// Supported ayanamsas (sidereal modes). The key is what /api accepts.
export const AYANAMSAS = {
  LAHIRI:        { id: C.SE_SIDM_LAHIRI,        label: "Lahiri (Chitra Paksha)", note: "Official Indian government standard" },
  RAMAN:         { id: C.SE_SIDM_RAMAN,         label: "B. V. Raman",            note: "Used in classical predictive astrology" },
  KRISHNAMURTI:  { id: C.SE_SIDM_KRISHNAMURTI,  label: "Krishnamurti (KP)",      note: "KP system; small ~0.01° offset from Lahiri" },
  YUKTESHWAR:    { id: C.SE_SIDM_YUKTESHWAR,    label: "Yukteshwar",             note: "Yukteshwar's 'Holy Science' ayanamsa" },
  TRUE_CITRA:    { id: C.SE_SIDM_TRUE_CITRA,    label: "True Citra",             note: "Anchored to fixed star Spica/Chitra" },
  DELUCE:        { id: C.SE_SIDM_DELUCE,        label: "DeLuce",                 note: "DeLuce's ayanamsa" },
  SURYASIDDHANTA:{ id: C.SE_SIDM_SURYASIDDHANTA,label: "Surya Siddhanta",        note: "Traditional Surya Siddhanta" },
};

// Supported house systems. Whole-sign is the most authentic Vedic choice.
export const HOUSE_SYSTEMS = {
  WHOLE_SIGN: { code: "W", label: "Whole Sign",  note: "Each sign = one house from Lagna (most traditional Vedic)" },
  PLACIDUS:   { code: "P", label: "Placidus",    note: "Time-based; popular in Western charts" },
  EQUAL:      { code: "E", label: "Equal House", note: "30° from ascendant each" },
  KOCH:       { code: "K", label: "Koch",        note: "Birthplace house system" },
  SRIPATI:    { code: "B", label: "Sripati",     note: "Alternative Vedic Bhava system" },
};

export const NODE_TYPES = {
  TRUE: { id: C.SE_TRUE_NODE, label: "True Node", note: "Oscillating instantaneous node (default)" },
  MEAN: { id: C.SE_MEAN_NODE, label: "Mean Node", note: "Smoothed mean motion of Rahu" },
};

const DEFAULTS = {
  ayanamsa: "LAHIRI",
  houseSystem: "WHOLE_SIGN",
  nodeType: "TRUE",
};

export function resolveOptions(opts = {}) {
  const ayanamsa = AYANAMSAS[opts.ayanamsa] ? opts.ayanamsa : DEFAULTS.ayanamsa;
  const houseSystem = HOUSE_SYSTEMS[opts.houseSystem] ? opts.houseSystem : DEFAULTS.houseSystem;
  const nodeType = NODE_TYPES[opts.nodeType] ? opts.nodeType : DEFAULTS.nodeType;
  return { ayanamsa, houseSystem, nodeType };
}

// SEFLG_MOSEPH = built-in Moshier model (no .se1 data files needed). Accurate to
// ~0.1 arcsec for the Sun, ~3 arcsec for the Moon, ~1 arcsec for planets — well
// within Vedic precision needs.
const FLAGS = C.SEFLG_MOSEPH | C.SEFLG_SIDEREAL | C.SEFLG_SPEED;

const SWE_PLANETS = {
  Sun:     C.SE_SUN,
  Moon:    C.SE_MOON,
  Mars:    C.SE_MARS,
  Mercury: C.SE_MERCURY,
  Jupiter: C.SE_JUPITER,
  Venus:   C.SE_VENUS,
  Saturn:  C.SE_SATURN,
};

// Apply ayanamsa for the current request. sweph holds this as global state, so
// every entry point must call this before reading planet positions.
function applyAyanamsa(ayanamsaKey) {
  sweph.set_sid_mode(AYANAMSAS[ayanamsaKey].id, 0, 0);
}

export function julianDayUT(utcDate) {
  const y = utcDate.getUTCFullYear();
  const m = utcDate.getUTCMonth() + 1;
  const d = utcDate.getUTCDate();
  const h =
    utcDate.getUTCHours() +
    utcDate.getUTCMinutes() / 60 +
    utcDate.getUTCSeconds() / 3600;
  return sweph.julday(y, m, d, h, C.SE_GREG_CAL);
}

export function planetPosition(jd, planetKey, opts = {}) {
  const { ayanamsa, nodeType } = resolveOptions(opts);
  applyAyanamsa(ayanamsa);

  if (planetKey === "Ketu") {
    const rahu = planetPosition(jd, "Rahu", opts);
    return { ...rahu, longitude: (rahu.longitude + 180) % 360, speed: -rahu.speed };
  }
  const id = planetKey === "Rahu" ? NODE_TYPES[nodeType].id : SWE_PLANETS[planetKey];
  if (id === undefined) throw new Error(`Unknown planet: ${planetKey}`);
  const r = sweph.calc_ut(jd, id, FLAGS);
  if (!r.data) throw new Error(`sweph.calc_ut failed for ${planetKey}: ${r.error}`);
  return {
    longitude: r.data[0],
    latitude: r.data[1],
    distance: r.data[2],
    speed: r.data[3],
    retrograde: r.data[3] < 0,
  };
}

export function houses(jd, latitude, longitude, opts = {}) {
  const { ayanamsa, houseSystem } = resolveOptions(opts);
  applyAyanamsa(ayanamsa);
  const code = HOUSE_SYSTEMS[houseSystem].code;
  const r = sweph.houses_ex2(jd, C.SEFLG_SIDEREAL, latitude, longitude, code);
  if (r.error) throw new Error(`sweph.houses_ex2 failed: ${r.error}`);
  return {
    ascendant: r.data.points[0],
    mc: r.data.points[1],
    cusps: r.data.houses,
  };
}

export function ayanamsa(jd, opts = {}) {
  const { ayanamsa: ayanamsaKey } = resolveOptions(opts);
  applyAyanamsa(ayanamsaKey);
  const r = sweph.get_ayanamsa_ut(jd);
  return typeof r === "number" ? r : r.data;
}

export function sunrise(jd, latitude, longitude) {
  const r = sweph.rise_trans(
    jd, C.SE_SUN, "", C.SEFLG_MOSEPH,
    C.SE_CALC_RISE | C.SE_BIT_DISC_CENTER,
    [longitude, latitude, 0], 1013.25, 15
  );
  if (r.flag < 0) throw new Error(`sunrise failed: ${r.error}`);
  return r.data;
}

export function moonrise(jd, latitude, longitude) {
  const r = sweph.rise_trans(
    jd, C.SE_MOON, "", C.SEFLG_MOSEPH,
    C.SE_CALC_RISE | C.SE_BIT_DISC_CENTER,
    [longitude, latitude, 0], 1013.25, 15
  );
  if (r.flag < 0) return null; // moonrise can skip a day
  return r.data;
}

export function moonset(jd, latitude, longitude) {
  const r = sweph.rise_trans(
    jd, C.SE_MOON, "", C.SEFLG_MOSEPH,
    C.SE_CALC_SET | C.SE_BIT_DISC_CENTER,
    [longitude, latitude, 0], 1013.25, 15
  );
  if (r.flag < 0) return null;
  return r.data;
}

export function sunset(jd, latitude, longitude) {
  const r = sweph.rise_trans(
    jd, C.SE_SUN, "", C.SEFLG_MOSEPH,
    C.SE_CALC_SET | C.SE_BIT_DISC_CENTER,
    [longitude, latitude, 0], 1013.25, 15
  );
  if (r.flag < 0) throw new Error(`sunset failed: ${r.error}`);
  return r.data;
}

export function jdToDate(jd) {
  const r = sweph.revjul(jd, C.SE_GREG_CAL);
  const { year, month, day, hour } = r;
  const h = Math.floor(hour);
  const minF = (hour - h) * 60;
  const m = Math.floor(minF);
  const s = Math.round((minF - m) * 60);
  return new Date(Date.UTC(year, month - 1, day, h, m, s));
}
