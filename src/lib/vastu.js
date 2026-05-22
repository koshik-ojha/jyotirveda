// Vastu Shastra — directional analysis of an entrance for a given birth rashi.

const DIRECTIONS = {
  N:  { name: "North",      lord: "Kubera",   element: "Water", governs: "Wealth, career flow" },
  NE: { name: "North-East", lord: "Ishana",   element: "Water+Air", governs: "Spiritual energy, prosperity" },
  E:  { name: "East",       lord: "Indra",    element: "Air",   governs: "Health, new beginnings, social standing" },
  SE: { name: "South-East", lord: "Agni",     element: "Fire",  governs: "Fame, processed energy (kitchen, electronics)" },
  S:  { name: "South",      lord: "Yama",     element: "Fire",  governs: "Stability, ancestral roots" },
  SW: { name: "South-West", lord: "Niruti",   element: "Earth", governs: "Relationships, heavy storage, master bedroom" },
  W:  { name: "West",       lord: "Varuna",   element: "Water", governs: "Gains, social bonds, children's room" },
  NW: { name: "North-West", lord: "Vayu",     element: "Air",   governs: "Movement, support, guests" },
};

const DIRECTION_KEYS = ["N","NE","E","SE","S","SW","W","NW"];

// Generic quality of each direction for main entrances (classical):
const ENTRANCE_RATING = {
  N: "Excellent — wealth flow",
  NE: "Best — divine energy",
  E: "Excellent — vitality and growth",
  SE: "Avoid for main door (Agni dosha); great for kitchen",
  S: "Acceptable with remedies — supports stability",
  SW: "Avoid for main door — best for master bedroom",
  W: "Good — supports gains",
  NW: "Acceptable — energetic but transient",
};

// Element friendship per rashi for personal vastu compass
const RASHI_ELEMENT = [
  "Fire","Earth","Air","Water","Fire","Earth","Air","Water","Fire","Earth","Air","Water",
];

const ELEMENT_FRIEND_DIRECTIONS = {
  Fire:  ["SE","S","E"],
  Earth: ["SW","S","W"],
  Air:   ["NW","N","E"],
  Water: ["N","NE","W"],
};

export function vastuForDirection(directionKey) {
  const dir = DIRECTIONS[directionKey];
  if (!dir) throw new Error(`Unknown direction: ${directionKey}`);
  return { ...dir, key: directionKey, rating: ENTRANCE_RATING[directionKey] };
}

export function compass() {
  return DIRECTION_KEYS.map((k) => vastuForDirection(k));
}

export function personalDirections(rashiIdx) {
  if (rashiIdx == null || rashiIdx < 0 || rashiIdx > 11) return null;
  const element = RASHI_ELEMENT[rashiIdx];
  return {
    element,
    favourable: ELEMENT_FRIEND_DIRECTIONS[element],
  };
}

export function analyseEntrance(directionKey, rashiIdx) {
  const dir = vastuForDirection(directionKey);
  const personal = personalDirections(rashiIdx);
  let resonance = null;
  if (personal) {
    resonance = personal.favourable.includes(directionKey)
      ? "Favourable for your birth element — natural flow"
      : "Outside your favourable arc — remedies recommended";
  }
  const remedies = buildRemedies(directionKey);
  return { direction: dir, personal, resonance, remedies };
}

function buildRemedies(directionKey) {
  switch (directionKey) {
    case "SW": return ["Heavy almirahs or earth-toned artwork to ground SW energy", "Keep the SW corner clean and clutter-free"];
    case "SE": return ["Avoid water features in SE; this is Agni's zone", "Red/orange tones support the SE fire"];
    case "S":  return ["Use red/maroon accents", "Ancestral photos welcome the S quadrant"];
    case "NW": return ["Add wind chimes or moving elements", "Keep guest spaces lively in NW"];
    default:   return ["Maintain cleanliness and natural light at the entrance", "A small water feature near N/NE supports flow"];
  }
}
