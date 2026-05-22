// Tarot deck — 78 cards (22 Major Arcana, 56 Minor Arcana across 4 suits).

const MAJOR = [
  ["The Fool",            "Beginnings, innocence, leap of faith",          "Recklessness, hesitation, naïveté"],
  ["The Magician",        "Manifestation, willpower, focused action",       "Manipulation, untapped talent, deception"],
  ["The High Priestess",  "Intuition, sacred knowledge, the subconscious",  "Secrets withheld, disconnection from intuition"],
  ["The Empress",         "Fertility, abundance, nurturing creativity",     "Creative block, dependence, smothering"],
  ["The Emperor",         "Authority, structure, paternal control",         "Tyranny, rigidity, abuse of power"],
  ["The Hierophant",      "Tradition, spiritual guidance, conformity",      "Rebellion, dogma, unconventional path"],
  ["The Lovers",          "Union, choice, alignment of values",             "Disharmony, imbalance, broken values"],
  ["The Chariot",         "Determination, control, victory through will",   "Loss of control, aggression, scattered focus"],
  ["Strength",            "Inner courage, compassion, patience",            "Self-doubt, weakness, raw rage"],
  ["The Hermit",          "Introspection, soul-searching, solitude",        "Isolation, withdrawal, loneliness"],
  ["Wheel of Fortune",    "Cycles, destiny, turning point",                 "Bad luck, resistance to change"],
  ["Justice",             "Truth, fairness, karmic balance",                "Injustice, dishonesty, accountability avoided"],
  ["The Hanged Man",      "Surrender, new perspective, suspension",         "Stalling, indecision, sacrifice for nothing"],
  ["Death",               "Endings, transformation, transition",            "Resistance to change, lingering"],
  ["Temperance",          "Balance, moderation, patience",                  "Imbalance, excess, recklessness"],
  ["The Devil",           "Bondage, addiction, materialism",                "Liberation, awareness, breaking chains"],
  ["The Tower",           "Sudden change, upheaval, revelation",            "Averted disaster, fear of change"],
  ["The Star",            "Hope, faith, renewal, guidance",                 "Despair, faith lost, disconnection"],
  ["The Moon",            "Illusion, intuition, the subconscious depths",   "Confusion lifting, fear unmasked"],
  ["The Sun",             "Joy, success, vitality, clarity",                "Temporary clouds, ego, lack of clarity"],
  ["Judgement",           "Awakening, reckoning, calling",                  "Self-doubt, refusal to grow"],
  ["The World",           "Completion, integration, accomplishment",        "Incomplete, shortcuts, lack of closure"],
];

const SUITS = [
  { name: "Wands",    element: "Fire",  domain: "passion, creativity, drive" },
  { name: "Cups",     element: "Water", domain: "emotion, relationships, intuition" },
  { name: "Swords",   element: "Air",   domain: "intellect, conflict, truth" },
  { name: "Pentacles",element: "Earth", domain: "material, work, body" },
];

const COURTS = ["Page","Knight","Queen","King"];

// Minor arcana meanings are templated by suit + pip/court since full meanings
// for 56 cards would balloon — these reads are faithful but condensed.
const PIP_UP = {
  1:  "New beginning, raw potential",
  2:  "Choice, partnership, balance",
  3:  "Growth, collaboration, expression",
  4:  "Stability, foundation, rest",
  5:  "Conflict, change, instability",
  6:  "Harmony, sharing, progress",
  7:  "Reflection, defence, perseverance",
  8:  "Movement, mastery, action",
  9:  "Near completion, achievement, fulfilment",
  10: "Completion, burden of success, transition",
};
const PIP_RV = {
  1:  "Delays, blocked potential",
  2:  "Indecision, broken balance",
  3:  "Setback, miscommunication",
  4:  "Stagnation, restlessness",
  5:  "Conflict resolving, lessons learned",
  6:  "Imbalance, isolation",
  7:  "Self-deception, giving up",
  8:  "Stalling, lack of progress",
  9:  "Self-sabotage, fear of completion",
  10: "Painful endings, refusal to release",
};
const COURT_UP = {
  Page:   "Curiosity, message, fresh approach",
  Knight: "Action, pursuit, momentum (sometimes haste)",
  Queen:  "Mastery, nurturing, depth of feeling",
  King:   "Authority, leadership, command of the suit's domain",
};
const COURT_RV = {
  Page:   "Procrastination, unwillingness to learn",
  Knight: "Recklessness, scattered energy",
  Queen:  "Possessiveness, emotional smothering",
  King:   "Tyranny, misuse of authority",
};

export const DECK = (() => {
  const cards = [];
  for (const [name, up, rv] of MAJOR) {
    cards.push({ id: cards.length, suit: "Major", name, upright: up, reversed: rv, value: cards.length });
  }
  for (const suit of SUITS) {
    for (let v = 1; v <= 10; v++) {
      const label = v === 1 ? `Ace of ${suit.name}` : `${v} of ${suit.name}`;
      cards.push({
        id: cards.length,
        suit: suit.name,
        element: suit.element,
        name: label,
        upright: `${PIP_UP[v]} — in the realm of ${suit.domain}.`,
        reversed: `${PIP_RV[v]} — in the realm of ${suit.domain}.`,
        value: v,
      });
    }
    for (const court of COURTS) {
      cards.push({
        id: cards.length,
        suit: suit.name,
        element: suit.element,
        name: `${court} of ${suit.name}`,
        upright: `${COURT_UP[court]} — through ${suit.domain}.`,
        reversed: `${COURT_RV[court]} — through ${suit.domain}.`,
        value: court,
      });
    }
  }
  return cards;
})();

const SPREADS = {
  single: { size: 1, positions: ["Card of the moment"] },
  three:  { size: 3, positions: ["Past","Present","Future"] },
  yesno:  { size: 1, positions: ["Yes / No"] },
  loveTriad: { size: 3, positions: ["You","Them","The dynamic between you"] },
  career:  { size: 3, positions: ["Where you are","The lesson","What unfolds"] },
  celtic: {
    size: 10,
    positions: ["Present","Challenge","Past","Future","Conscious goal","Subconscious","You","Environment","Hopes/Fears","Outcome"],
  },
};

// Deterministic shuffle from a seed (so a given day/question is reproducible).
function seededShuffle(arr, seed) {
  let h = seed >>> 0;
  const xs = [...arr];
  for (let i = xs.length - 1; i > 0; i--) {
    h = (h * 1664525 + 1013904223) >>> 0;
    const j = h % (i + 1);
    [xs[i], xs[j]] = [xs[j], xs[i]];
  }
  return xs;
}

function hashString(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Draw a tarot spread.
 * @param {Object} opts
 * @param {keyof SPREADS} opts.spread
 * @param {string}        [opts.seed]   – stable seed (defaults: today + question hash if provided)
 * @param {string}        [opts.question]
 */
export function drawSpread({ spread = "three", seed, question = "" } = {}) {
  const conf = SPREADS[spread];
  if (!conf) throw new Error(`Unknown spread: ${spread}`);

  const today = new Date().toISOString().slice(0, 10);
  const seedStr = seed ?? `${today}|${question}`;
  const numericSeed = hashString(seedStr) || 1;
  const shuffled = seededShuffle(DECK, numericSeed);

  const cards = shuffled.slice(0, conf.size).map((card, i) => {
    const reversed = ((numericSeed >> (i + 1)) & 1) === 1;
    return {
      ...card,
      reversed,
      position: conf.positions[i],
      meaning:  reversed ? card.reversed : card.upright,
    };
  });

  return {
    spread, question, seed: seedStr, positions: conf.positions, cards,
  };
}

export const SPREAD_KEYS = Object.keys(SPREADS);
