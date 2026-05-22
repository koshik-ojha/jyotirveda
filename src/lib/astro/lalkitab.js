// Lal Kitab — uses a FIXED-house chart where House 1 = Aries, House 2 = Taurus,
// ..., House 12 = Pisces. Planets are placed by sidereal sign, NOT by Lagna.
// Each (planet, house) cell carries a classical "teva" reading.

import { julianDayUT, planetPosition } from "./ephemeris.js";
import { RASHIS, PLANETS } from "./constants.js";

const PLANET_KEYS = ["Sun","Moon","Mars","Mercury","Jupiter","Venus","Saturn","Rahu","Ketu"];

function signOf(lng) { return Math.floor(lng / 30); }

// Lal Kitab planet-in-house keynotes (1-12 = Aries-Pisces). Concise but real.
const LAL_KEYNOTES = {
  Sun: {
    1: "King in own house — strong vitality, leadership",
    2: "Family wealth conditional on father's blessings",
    3: "Courageous, but siblings need care",
    4: "Health of mother to be watched",
    5: "Children bring honour; education sound",
    6: "Defeats enemies, but health volatile",
    7: "Spouse strong-willed; partnerships steady late",
    8: "Hidden Sun — watch eyes and heart",
    9: "Fortune through father, religion",
    10: "Career glory in government / authority",
    11: "Steady gains, elder support",
    12: "Foreign opportunities; expenses on hospitals",
  },
  Moon: {
    1: "Emotional sovereign — popularity, mother's love",
    2: "Wealth from mother; sweet speech",
    3: "Restless mind; emotional siblings",
    4: "Strong home, motherly comforts",
    5: "Imaginative, romantic, fertile",
    6: "Mind under stress; manage emotions",
    7: "Emotional partnerships; women support",
    8: "Anxiety; cautious of water travel",
    9: "Pilgrimage, devotion, peaceful father",
    10: "Public recognition; reputation through caring",
    11: "Friends and gains, especially female",
    12: "Sleep issues; spiritual depth",
  },
  Mars: {
    1: "Bold, aggressive, accident-prone Manglik",
    2: "Hot words cause family trouble",
    3: "Warrior siblings; strong courage",
    4: "Property disputes possible",
    5: "Fiery creativity; tempered children",
    6: "Excellent — slays enemies and disease",
    7: "Manglik — partner dynamics fiery",
    8: "Surgery / accidents possible",
    9: "Lucky warrior — fortune through risk",
    10: "Career through arms, sports, engineering",
    11: "Gains through bold ventures",
    12: "Hidden expenses, foreign action",
  },
  Mercury: {
    1: "Witty, articulate, youthful",
    2: "Speech earns wealth",
    3: "Writer, journalist, polymath",
    4: "Education in business / commerce",
    5: "Sharp creativity; clever children",
    6: "Communication-led conflicts; watch nerves",
    7: "Business partnerships flourish",
    8: "Research, occult studies, secrets",
    9: "Philosophical learning",
    10: "Career in writing/teaching/commerce",
    11: "Income through networks and trade",
    12: "Lost in thought; foreign assignments",
  },
  Jupiter: {
    1: "Wise, dharmic, scholar",
    2: "Wealth and beautiful speech",
    3: "Younger siblings less supportive",
    4: "Excellent home, mother's blessings",
    5: "Devoted children, divine favour",
    6: "Wins arguments / lawsuits",
    7: "Spouse virtuous, marriage stable",
    8: "Inheritance, hidden treasures",
    9: "Highest dharma yoga — guru's grace",
    10: "Career in law, teaching, advice",
    11: "Constant gains, supportive elders",
    12: "Spiritual liberation, foreign luck",
  },
  Venus: {
    1: "Charm, beauty, magnetism",
    2: "Wealth through women / arts",
    3: "Artistic siblings",
    4: "Comforts, vehicles, mother-love",
    5: "Romance, art, devotion",
    6: "Service through arts, possible romance trouble",
    7: "Marriage joys, but watch indulgence",
    8: "Sudden gains from spouse's wealth",
    9: "Foreign trips, religious art",
    10: "Career in art, hospitality, design",
    11: "Income through luxury and women",
    12: "Bed pleasures, foreign relationships",
  },
  Saturn: {
    1: "Old soul — slow rise, austere",
    2: "Wealth comes late, family austere",
    3: "Hard-working siblings",
    4: "Mother's hardships; landed property late",
    5: "Children delayed but devoted",
    6: "Wins through perseverance",
    7: "Marriage late or austere",
    8: "Long life but chronic issues",
    9: "Karmic father, philosophy of duty",
    10: "Career through structure, government, mining",
    11: "Slow but enormous gains",
    12: "Foreign retirement, monastic leanings",
  },
  Rahu: {
    1: "Innovative, restless, identity-shifting",
    2: "Speech can mislead; sudden wealth",
    3: "Bold ventures, unconventional siblings",
    4: "Domestic turbulence, foreign home",
    5: "Sudden creativity, unconventional kids",
    6: "Defeats enemies cleverly",
    7: "Foreign spouse / unusual marriage",
    8: "Sudden upheavals, occult depth",
    9: "Foreign teachings, unorthodox father-figures",
    10: "Career through technology, foreign companies",
    11: "Sudden gains, large networks",
    12: "Spiritual breakthroughs, hidden expenses",
  },
  Ketu: {
    1: "Detached self, spiritual head",
    2: "Speech detached; learn material lessons",
    3: "Few siblings or distant",
    4: "Mother distant or spiritual",
    5: "Children spiritually inclined; delayed",
    6: "Mysterious illnesses; psychic enemies",
    7: "Detached partner, philosophical marriage",
    8: "Past-life talents emerge in mysticism",
    9: "Highest moksha karaka — guru's blessing",
    10: "Spiritual career possible",
    11: "Gains via spiritual networks",
    12: "Liberation, foreign monastic life",
  },
};

// Lal Kitab generic remedies per planet (when the planet is "asleep" or troubled)
const PLANET_REMEDIES = {
  Sun: [
    "Offer water to the rising sun daily",
    "Donate wheat and jaggery on Sundays",
    "Respect and serve your father; never accept gold from him as a gift",
    "Recite Aditya Hridayam Stotra",
  ],
  Moon: [
    "Drink milk/water from a silver glass at night",
    "Donate milk, rice or silver on Mondays",
    "Honour your mother; keep her happy",
    "Avoid taking milk on credit",
  ],
  Mars: [
    "Donate red lentils (masoor) and jaggery on Tuesdays",
    "Plant a sweet fruit tree (mango/jamun) and care for it",
    "Recite Hanuman Chalisa daily",
    "Avoid the colour red on key days; never lie",
  ],
  Mercury: [
    "Bury a copper coin near a Peepul tree on Wednesday",
    "Feed green grass to cows",
    "Avoid green-coloured medicines and adulterated speech",
    "Donate green moong or emerald-coloured cloth",
  ],
  Jupiter: [
    "Apply saffron (kesar) tilak on the forehead",
    "Feed Brahmins or yellow food (chana dal, turmeric) on Thursdays",
    "Respect gurus and elders; serve them sincerely",
    "Recite the Vishnu Sahasranama",
  ],
  Venus: [
    "Donate sweets, curd or perfume to small girls on Fridays",
    "Keep your sleeping space and clothes immaculately clean",
    "Avoid extramarital relationships; honour your spouse",
    "Wear white clothes on Fridays",
  ],
  Saturn: [
    "Feed crows or black dogs every Saturday",
    "Donate iron, black sesame, mustard oil at a Shani temple",
    "Light a mustard-oil lamp under a Peepul tree on Saturday",
    "Avoid alcohol, meat, leather work on Saturdays",
  ],
  Rahu: [
    "Donate radish, mustard or coconut to flowing water",
    "Keep a square piece of silver in your pocket",
    "Recite Maha Mrityunjaya mantra daily",
    "Avoid electric-blue clothes during Rahu Kaal",
  ],
  Ketu: [
    "Feed dogs (especially black-and-white) regularly",
    "Donate a black-and-white blanket on Tuesdays",
    "Wear gold ring on the ring finger (if afforded)",
    "Respect spiritual elders and saints",
  ],
};

// Critical placements (planet+house combos) that traditionally call for remedies.
// True = needs strong remedy; false = naturally placed.
const NEEDS_REMEDY = {
  Sun:  { 3: false, 11: false, default: true,  "5": false, "9": false, "10": false, "1": false },
  Moon: { 4: false, 1: false, 2: false, default: true },
  Mars: { 1: true, 4: true, 7: true, 8: true, 12: true, 6: false, default: false },
  Mercury: { 6: true, 8: true, 12: true, default: false },
  Jupiter: { 5: false, 9: false, 1: false, 4: false, 7: false, 10: false, 11: false, default: false },
  Venus: { 1: false, 2: false, 4: false, 5: false, 7: false, default: false, 6: true, 8: true, 12: true },
  Saturn: { 3: false, 6: false, 11: false, default: true },
  Rahu:  { 3: false, 6: false, 11: false, default: true },
  Ketu:  { 1: true, 4: false, 9: false, default: false },
};

function planetNeedsRemedy(planet, house) {
  const rules = NEEDS_REMEDY[planet];
  if (!rules) return false;
  if (rules[house] != null) return rules[house];
  return !!rules.default;
}

// Yearly teva (Varshphal in Lal Kitab) — 35 years of predictions based on the
// pyramidal arrangement of planets through the 12 houses, rotating by 1 each year.
// Simplified: which house Saturn occupies on the year-of-life from age 0.
function buildTeva(saturnHouse) {
  const teva = [];
  for (let year = 1; year <= 35; year++) {
    const occupiedHouse = ((saturnHouse - 1 + year) % 12) + 1;
    teva.push({ age: year, house: occupiedHouse });
  }
  return teva;
}

export function computeLalKitab(birthUTC) {
  const jd = julianDayUT(new Date(birthUTC));
  const placements = PLANET_KEYS.map((key) => {
    const p = planetPosition(jd, key);
    const sIdx = signOf(p.longitude); // sign index = house index in Lal Kitab (0..11)
    const house = sIdx + 1; // Lal Kitab houses 1..12 = Aries..Pisces
    const meta = PLANETS.find((pl) => pl.key === key);
    const needs = planetNeedsRemedy(key, house);
    return {
      key,
      meta,
      sign: { index: sIdx, ...RASHIS[sIdx] },
      house,
      keynote: LAL_KEYNOTES[key]?.[house] ?? "Standard placement",
      retrograde: p.retrograde,
      needsRemedy: needs,
      remedies: needs ? (PLANET_REMEDIES[key] || []) : [],
    };
  });

  // Group by house for the chart view
  const housesArr = Array.from({ length: 12 }, (_, i) => ({
    house: i + 1,
    sign: RASHIS[i],
    planets: placements.filter((p) => p.house === i + 1),
  }));

  // Year-specific debt (Lal Kitab "rinanubandh") — simplified flag if Saturn or Rahu in 12
  const saturnHouse = placements.find((p) => p.key === "Saturn")?.house;
  const rahuHouse   = placements.find((p) => p.key === "Rahu")?.house;
  const debts = [];
  if (saturnHouse === 12) debts.push("Saturn in 12 — Pitri Rinn (ancestral debt) suggested");
  if (rahuHouse === 12)   debts.push("Rahu in 12 — Rinn associated with hidden expenses / foreign karma");

  // Year-by-year teva (35-year cycle) from Saturn's house
  const teva = buildTeva(saturnHouse ?? 1);

  return {
    placements,
    houses: housesArr,
    debts,
    teva,
    planetRemedies: PLANET_REMEDIES,
    summary: `Lal Kitab teva — ${placements.length} grahas placed across the 12 fixed houses.`,
  };
}
