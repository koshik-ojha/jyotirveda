// Vedic astrology reference data.
// Order matters: all arrays are zero-indexed and aligned to canonical Vedic order.

export const RASHIS = [
  { en: "Aries",       hi: "मेष",     sa: "Mesha",    lord: "Mars",    element: "Fire"  },
  { en: "Taurus",      hi: "वृषभ",    sa: "Vrishabha",lord: "Venus",   element: "Earth" },
  { en: "Gemini",      hi: "मिथुन",   sa: "Mithuna",  lord: "Mercury", element: "Air"   },
  { en: "Cancer",      hi: "कर्क",    sa: "Karka",    lord: "Moon",    element: "Water" },
  { en: "Leo",         hi: "सिंह",    sa: "Simha",    lord: "Sun",     element: "Fire"  },
  { en: "Virgo",       hi: "कन्या",   sa: "Kanya",    lord: "Mercury", element: "Earth" },
  { en: "Libra",       hi: "तुला",    sa: "Tula",     lord: "Venus",   element: "Air"   },
  { en: "Scorpio",     hi: "वृश्चिक", sa: "Vrischika",lord: "Mars",    element: "Water" },
  { en: "Sagittarius", hi: "धनु",     sa: "Dhanu",    lord: "Jupiter", element: "Fire"  },
  { en: "Capricorn",   hi: "मकर",     sa: "Makara",   lord: "Saturn",  element: "Earth" },
  { en: "Aquarius",    hi: "कुम्भ",   sa: "Kumbha",   lord: "Saturn",  element: "Air"   },
  { en: "Pisces",      hi: "मीन",     sa: "Meena",    lord: "Jupiter", element: "Water" },
];

// 27 nakshatras, each 13°20' (800 arc-min) of the zodiac.
export const NAKSHATRAS = [
  { en: "Ashwini",        hi: "अश्विनी",      lord: "Ketu",    syllables: ["Chu","Che","Cho","La"] },
  { en: "Bharani",        hi: "भरणी",         lord: "Venus",   syllables: ["Li","Lu","Le","Lo"] },
  { en: "Krittika",       hi: "कृत्तिका",     lord: "Sun",     syllables: ["A","I","U","E"] },
  { en: "Rohini",         hi: "रोहिणी",       lord: "Moon",    syllables: ["O","Va","Vi","Vu"] },
  { en: "Mrigashira",     hi: "मृगशिरा",      lord: "Mars",    syllables: ["Ve","Vo","Ka","Ki"] },
  { en: "Ardra",          hi: "आर्द्रा",      lord: "Rahu",    syllables: ["Ku","Gha","Nga","Chha"] },
  { en: "Punarvasu",      hi: "पुनर्वसु",     lord: "Jupiter", syllables: ["Ke","Ko","Ha","Hi"] },
  { en: "Pushya",         hi: "पुष्य",        lord: "Saturn",  syllables: ["Hu","He","Ho","Da"] },
  { en: "Ashlesha",       hi: "आश्लेषा",      lord: "Mercury", syllables: ["Di","Du","De","Do"] },
  { en: "Magha",          hi: "मघा",          lord: "Ketu",    syllables: ["Ma","Mi","Mu","Me"] },
  { en: "Purva Phalguni", hi: "पूर्व फाल्गुनी", lord: "Venus",   syllables: ["Mo","Ta","Ti","Tu"] },
  { en: "Uttara Phalguni",hi: "उत्तर फाल्गुनी", lord: "Sun",     syllables: ["Te","To","Pa","Pi"] },
  { en: "Hasta",          hi: "हस्त",         lord: "Moon",    syllables: ["Pu","Sha","Na","Tha"] },
  { en: "Chitra",         hi: "चित्रा",       lord: "Mars",    syllables: ["Pe","Po","Ra","Ri"] },
  { en: "Swati",          hi: "स्वाति",       lord: "Rahu",    syllables: ["Ru","Re","Ro","Ta"] },
  { en: "Vishakha",       hi: "विशाखा",       lord: "Jupiter", syllables: ["Ti","Tu","Te","To"] },
  { en: "Anuradha",       hi: "अनुराधा",      lord: "Saturn",  syllables: ["Na","Ni","Nu","Ne"] },
  { en: "Jyeshtha",       hi: "ज्येष्ठा",     lord: "Mercury", syllables: ["No","Ya","Yi","Yu"] },
  { en: "Mula",           hi: "मूल",          lord: "Ketu",    syllables: ["Ye","Yo","Bha","Bhi"] },
  { en: "Purva Ashadha",  hi: "पूर्वाषाढ़ा",   lord: "Venus",   syllables: ["Bhu","Dha","Pha","Dha"] },
  { en: "Uttara Ashadha", hi: "उत्तराषाढ़ा",   lord: "Sun",     syllables: ["Bhe","Bho","Ja","Ji"] },
  { en: "Shravana",       hi: "श्रवण",        lord: "Moon",    syllables: ["Ju","Je","Jo","Gha"] },
  { en: "Dhanishta",      hi: "धनिष्ठा",      lord: "Mars",    syllables: ["Ga","Gi","Gu","Ge"] },
  { en: "Shatabhisha",    hi: "शतभिषा",       lord: "Rahu",    syllables: ["Go","Sa","Si","Su"] },
  { en: "Purva Bhadrapada",hi:"पूर्व भाद्रपद",  lord: "Jupiter", syllables: ["Se","So","Da","Di"] },
  { en: "Uttara Bhadrapada",hi:"उत्तर भाद्रपद",lord: "Saturn",  syllables: ["Du","Tha","Jha","Da"] },
  { en: "Revati",         hi: "रेवती",        lord: "Mercury", syllables: ["De","Do","Cha","Chi"] },
];

// Vimshottari Dasha planetary periods (years). Total = 120.
export const DASHA_YEARS = {
  Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7,
  Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17,
};

export const DASHA_ORDER = ["Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"];

export const PLANETS = [
  { key: "Sun",     en: "Sun",     hi: "सूर्य",   sa: "Surya",      symbol: "☉" },
  { key: "Moon",    en: "Moon",    hi: "चन्द्र",  sa: "Chandra",    symbol: "☽" },
  { key: "Mars",    en: "Mars",    hi: "मंगल",    sa: "Mangala",    symbol: "♂" },
  { key: "Mercury", en: "Mercury", hi: "बुध",     sa: "Budha",      symbol: "☿" },
  { key: "Jupiter", en: "Jupiter", hi: "गुरु",    sa: "Guru",       symbol: "♃" },
  { key: "Venus",   en: "Venus",   hi: "शुक्र",   sa: "Shukra",     symbol: "♀" },
  { key: "Saturn",  en: "Saturn",  hi: "शनि",     sa: "Shani",      symbol: "♄" },
  { key: "Rahu",    en: "Rahu",    hi: "राहु",    sa: "Rahu",       symbol: "☊" },
  { key: "Ketu",    en: "Ketu",    hi: "केतु",    sa: "Ketu",       symbol: "☋" },
];

export const WEEKDAYS = [
  { en: "Sunday",    hi: "रविवार",     sa: "Ravivar",   lord: "Sun"     },
  { en: "Monday",    hi: "सोमवार",     sa: "Somavar",   lord: "Moon"    },
  { en: "Tuesday",   hi: "मंगलवार",    sa: "Mangalvar", lord: "Mars"    },
  { en: "Wednesday", hi: "बुधवार",     sa: "Budhvar",   lord: "Mercury" },
  { en: "Thursday",  hi: "गुरुवार",    sa: "Guruvar",   lord: "Jupiter" },
  { en: "Friday",    hi: "शुक्रवार",   sa: "Shukravar", lord: "Venus"   },
  { en: "Saturday",  hi: "शनिवार",     sa: "Shanivar",  lord: "Saturn"  },
];

// 30 tithis: 15 Shukla (waxing) + 15 Krishna (waning). Names repeat per paksha.
export const TITHI_NAMES = [
  "Pratipada","Dwitiya","Tritiya","Chaturthi","Panchami",
  "Shashthi","Saptami","Ashtami","Navami","Dashami",
  "Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Purnima",
  "Pratipada","Dwitiya","Tritiya","Chaturthi","Panchami",
  "Shashthi","Saptami","Ashtami","Navami","Dashami",
  "Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Amavasya",
];

export const YOGA_NAMES = [
  "Vishkambha","Priti","Ayushman","Saubhagya","Shobhana","Atiganda","Sukarma",
  "Dhriti","Shoola","Ganda","Vriddhi","Dhruva","Vyaghata","Harshana","Vajra",
  "Siddhi","Vyatipata","Variyana","Parigha","Shiva","Siddha","Sadhya","Shubha",
  "Shukla","Brahma","Indra","Vaidhriti",
];

export const KARANA_NAMES = [
  "Bava","Balava","Kaulava","Taitila","Garaja","Vanija","Vishti",
  "Shakuni","Chatushpada","Naga","Kimstughna",
];

// Choghadiya order for each weekday (sun=0 ... sat=6), 8 day-time slots.
// Quality is mapped via CHOGHADIYA_QUALITY.
export const CHOGHADIYA_DAY = [
  ["Udveg","Chal","Labh","Amrit","Kaal","Shubh","Rog","Udveg"],   // Sun
  ["Amrit","Kaal","Shubh","Rog","Udveg","Chal","Labh","Amrit"],   // Mon
  ["Rog","Udveg","Chal","Labh","Amrit","Kaal","Shubh","Rog"],     // Tue
  ["Labh","Amrit","Kaal","Shubh","Rog","Udveg","Chal","Labh"],    // Wed
  ["Shubh","Rog","Udveg","Chal","Labh","Amrit","Kaal","Shubh"],   // Thu
  ["Chal","Labh","Amrit","Kaal","Shubh","Rog","Udveg","Chal"],    // Fri
  ["Kaal","Shubh","Rog","Udveg","Chal","Labh","Amrit","Kaal"],    // Sat
];

export const CHOGHADIYA_NIGHT = [
  ["Shubh","Amrit","Chal","Rog","Kaal","Labh","Udveg","Shubh"],   // Sun
  ["Chal","Rog","Kaal","Labh","Udveg","Shubh","Amrit","Chal"],    // Mon
  ["Kaal","Labh","Udveg","Shubh","Amrit","Chal","Rog","Kaal"],    // Tue
  ["Udveg","Shubh","Amrit","Chal","Rog","Kaal","Labh","Udveg"],   // Wed
  ["Amrit","Chal","Rog","Kaal","Labh","Udveg","Shubh","Amrit"],   // Thu
  ["Rog","Kaal","Labh","Udveg","Shubh","Amrit","Chal","Rog"],     // Fri
  ["Labh","Udveg","Shubh","Amrit","Chal","Rog","Kaal","Labh"],    // Sat
];

export const CHOGHADIYA_QUALITY = {
  Amrit: "Auspicious",
  Shubh: "Auspicious",
  Labh:  "Auspicious",
  Chal:  "Neutral",
  Rog:   "Inauspicious",
  Kaal:  "Inauspicious",
  Udveg: "Inauspicious",
};

// Rahu kaal: which 1/8th part of daytime is Rahu kaal for a given weekday.
// Index is sun=0...sat=6.
export const RAHU_KAAL_PART = [8, 2, 7, 5, 6, 4, 3];
// Yamaganda
export const YAMAGANDA_PART = [5, 4, 3, 2, 1, 7, 6];
// Gulika
export const GULIKA_PART = [7, 6, 5, 4, 3, 2, 1];
