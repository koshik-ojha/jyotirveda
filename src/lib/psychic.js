// Oracle deck for the Psychic page. Deterministic by seed (day or question).

const ORACLE = [
  { title: "The Listening Tree",     guidance: "Stop seeking answers — listen. The reply is already in the silence around you." },
  { title: "The Hidden Door",        guidance: "What you can't see yet is closer than you think. One honest action opens it." },
  { title: "The River Bends",        guidance: "The plan has changed and it is right that it has. Trust the curve, not the line." },
  { title: "The Lantern",            guidance: "You don't need the whole road lit — just the next ten feet. Take the next step." },
  { title: "The Phoenix Ember",      guidance: "An ending you've been resisting is mercy in disguise. Let it complete." },
  { title: "The Two Roads",          guidance: "Both options have a future. Choose the one that lets you breathe deeper." },
  { title: "The Mirror",             guidance: "What you criticised in them this week is a teaching about you. Don't flinch from it." },
  { title: "The Loom",               guidance: "Patience is the work right now. The thread is being woven; the picture is not yours to see yet." },
  { title: "The Inner Sun",          guidance: "Stop borrowing approval from outside. Your light is enough. Stand in it." },
  { title: "The Migrating Bird",     guidance: "It is time to move. The home you remember is no longer the home you need." },
  { title: "The Cup Overflowing",    guidance: "Receive. Saying yes to help is not weakness; it is grace." },
  { title: "The Quiet Word",         guidance: "Speak less. The right word, well-timed, will land harder than ten arguments." },
  { title: "The Open Hand",          guidance: "Let go. What is meant for you returns; what isn't was already gone." },
  { title: "The Crossroads at Dawn", guidance: "Decide before noon. Delaying past today costs more than choosing wrong." },
  { title: "The Returning Tide",     guidance: "Someone from your past will resurface. Meet them present-tense, not in old roles." },
  { title: "The Soft Yes",           guidance: "The opportunity is real. Say yes, even if it makes your stomach turn." },
  { title: "The Stone Bridge",       guidance: "Your foundation is steadier than fear says. Walk." },
  { title: "The Whispered Name",     guidance: "Someone is thinking of you with love. Reach out — they need it too." },
  { title: "The Cracked Pot",        guidance: "The flaw lets the light through. Stop trying to look complete." },
  { title: "The Compass",            guidance: "You already know. The struggle is not in finding the answer — it is in honouring it." },
  { title: "The Falling Star",       guidance: "A wish you'd given up on returns wearing a different face. Don't miss it." },
  { title: "The Hearth",             guidance: "Tend the small daily things this week — they are the real work." },
];

const YESNO_RESPONSES = [
  "Yes, but the timing is not today.",
  "Yes — proceed with confidence.",
  "Not in the form you're imagining.",
  "Yes, if you are willing to be uncomfortable first.",
  "No, and the no is protection.",
  "Wait. The question itself will change in two weeks.",
  "Yes — you already know it.",
  "No — but a related door opens soon.",
];

function hashString(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function pullOracle({ seed = "", question = "" } = {}) {
  const day = new Date().toISOString().slice(0, 10);
  const s = seed || `${day}|${question}`;
  const h = hashString(s);
  return ORACLE[h % ORACLE.length];
}

export function askYesNo({ question = "", seed = "" } = {}) {
  const day = new Date().toISOString().slice(0, 10);
  const s = seed || `${day}|${question}`;
  const h = hashString(s);
  return { question, answer: YESNO_RESPONSES[h % YESNO_RESPONSES.length] };
}

export const DAILY_ORACLE_COUNT = ORACLE.length;
