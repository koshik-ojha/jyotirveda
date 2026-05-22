// Palmistry — feature-checklist reading. The user identifies palm features in their
// own hand from short visual prompts; we return a templated reading.

export const PALM_SHAPES = {
  earth: { name: "Earth Hand",  desc: "Square palm, short fingers — practical, reliable, grounded." },
  air:   { name: "Air Hand",    desc: "Square palm, long fingers — intellectual, communicative, restless mind." },
  fire:  { name: "Fire Hand",   desc: "Rectangular palm, short fingers — passionate, action-driven, impatient." },
  water: { name: "Water Hand",  desc: "Long palm, long fingers — sensitive, intuitive, emotionally expressive." },
};

export const HEART_LINE = {
  curved:    "Expressive in love — wears the heart openly, comfortable with vulnerability.",
  straight:  "Reserved in love — feelings run deep but are guarded; selective about partners.",
  broken:    "Romantic life marked by transitions — each relationship a teacher.",
  long:      "Idealistic about love — sees the highest possibility in a partner.",
  short:     "Pragmatic about romance — affection expressed through action rather than words.",
};

export const HEAD_LINE = {
  straight:  "Logical and methodical mind — excels at structured thinking.",
  curved:    "Creative and imaginative — comfortable with ambiguity, drawn to art.",
  long:      "Thorough thinker — explores every angle before deciding.",
  short:     "Decisive — trusts instinct, moves quickly to action.",
  forked:    "Versatile — can hold both rational and creative perspectives at once.",
};

export const LIFE_LINE = {
  long_deep: "Robust vitality — strong constitution, recovers quickly.",
  long_thin: "Sensitive constitution — long-lived but should mind health rhythms.",
  short:     "Quality over length — focused, intense bursts of vitality. (Note: life line length does NOT predict lifespan.)",
  broken:    "Major life shifts ahead — change of location, career or worldview.",
  curved:    "Adventurous spirit — needs movement, travel and stimulation.",
};

export const FATE_LINE = {
  strong: "Strong vocational pull — early clarity about one's path.",
  weak:   "Self-made path — pulls from many domains rather than one calling.",
  none:   "Free agent — your career is what you make of it, not pre-written.",
  branched:"Multi-vocational — career will pivot meaningfully at least once.",
};

export const MOUNT = {
  venus:   "Mount of Venus prominent — passionate, sensual, family-loving.",
  jupiter: "Mount of Jupiter prominent — ambition, leadership, social presence.",
  saturn:  "Mount of Saturn prominent — discipline, philosophy, depth.",
  apollo:  "Mount of Apollo prominent — creativity, artistic talent, fame.",
  mercury: "Mount of Mercury prominent — communication, business acumen, wit.",
  mars:    "Mounts of Mars prominent — courage, resilience, will.",
  moon:    "Mount of Moon prominent — imagination, intuition, travel.",
  none:    "Flat palm — balanced energies, no dominant pull.",
};

export function readPalm({ shape, heart, head, life, fate, mount }) {
  return {
    palmShape:  shape ? { key: shape, ...PALM_SHAPES[shape] } : null,
    heartLine:  heart ? { key: heart, reading: HEART_LINE[heart] } : null,
    headLine:   head  ? { key: head,  reading: HEAD_LINE[head] }  : null,
    lifeLine:   life  ? { key: life,  reading: LIFE_LINE[life] }  : null,
    fateLine:   fate  ? { key: fate,  reading: FATE_LINE[fate] }  : null,
    dominantMount: mount ? { key: mount, reading: MOUNT[mount] } : null,
    summary:    buildSummary({ shape, heart, head }),
  };
}

function buildSummary({ shape, heart, head }) {
  const parts = [];
  if (shape) parts.push(PALM_SHAPES[shape].desc.toLowerCase().replace(/\.$/, ""));
  if (head)  parts.push(`a ${head} head line suggesting ${HEAD_LINE[head].toLowerCase()}`);
  if (heart) parts.push(`a ${heart} heart line — ${HEART_LINE[heart].toLowerCase()}`);
  if (!parts.length) return "Select the features above for a personalised reading.";
  return "Your palm shows " + parts.join("; ") + ".";
}
