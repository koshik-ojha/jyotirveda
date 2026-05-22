import { moonLongitudeAt } from "@/lib/astro/ashtakoot";
import { localToUTC } from "@/lib/geocode";
import { NAKSHATRAS, RASHIS } from "@/lib/astro/constants";

export const runtime = "nodejs";

const NAK_SIZE = 360 / 27;

// Nakshatra-specific lore (deity, gana, nadi, traits) — concise but real.
const LORE = {
  Ashwini:        { deity: "Ashwini Kumaras",  gana: "Deva",     nadi: "Aadi",  yoni: "Horse",     traits: "Swift, healing, pioneering" },
  Bharani:        { deity: "Yama",              gana: "Manushya", nadi: "Madhya", yoni: "Elephant",  traits: "Bearing burdens, transformative" },
  Krittika:       { deity: "Agni",              gana: "Rakshasa", nadi: "Antya", yoni: "Sheep",     traits: "Sharp, purifying, critical" },
  Rohini:         { deity: "Brahma",            gana: "Manushya", nadi: "Antya", yoni: "Serpent",   traits: "Sensual, fertile, creative" },
  Mrigashira:     { deity: "Soma",              gana: "Deva",     nadi: "Madhya",yoni: "Serpent",   traits: "Seeker, restless, gentle" },
  Ardra:          { deity: "Rudra",             gana: "Manushya", nadi: "Aadi",  yoni: "Dog",       traits: "Intense, stormy, transformative" },
  Punarvasu:      { deity: "Aditi",             gana: "Deva",     nadi: "Aadi",  yoni: "Cat",       traits: "Renewal, abundance, optimism" },
  Pushya:         { deity: "Brihaspati",        gana: "Deva",     nadi: "Madhya",yoni: "Sheep",     traits: "Nourishing, scholarly, protective" },
  Ashlesha:       { deity: "Nagas",             gana: "Rakshasa", nadi: "Antya", yoni: "Cat",       traits: "Mystic, hypnotic, secretive" },
  Magha:          { deity: "Pitrs",             gana: "Rakshasa", nadi: "Antya", yoni: "Rat",       traits: "Regal, ancestral, proud" },
  "Purva Phalguni": { deity: "Bhaga",           gana: "Manushya", nadi: "Madhya",yoni: "Rat",       traits: "Pleasure-loving, lucky, charming" },
  "Uttara Phalguni":{ deity: "Aryaman",         gana: "Manushya", nadi: "Aadi",  yoni: "Cow",       traits: "Generous, friendly, devoted" },
  Hasta:          { deity: "Savitr",            gana: "Deva",     nadi: "Aadi",  yoni: "Buffalo",   traits: "Skilful hands, witty, helpful" },
  Chitra:         { deity: "Tvashtar",          gana: "Rakshasa", nadi: "Madhya",yoni: "Tiger",     traits: "Beautiful, artistic, dramatic" },
  Swati:          { deity: "Vayu",              gana: "Deva",     nadi: "Antya", yoni: "Buffalo",   traits: "Independent, flexible, fair" },
  Vishakha:       { deity: "Indragni",          gana: "Rakshasa", nadi: "Antya", yoni: "Tiger",     traits: "Goal-driven, ambitious" },
  Anuradha:       { deity: "Mitra",             gana: "Deva",     nadi: "Madhya",yoni: "Deer",      traits: "Devoted, friendly, persevering" },
  Jyeshtha:       { deity: "Indra",             gana: "Rakshasa", nadi: "Aadi",  yoni: "Deer",      traits: "Eldest, protective, intense" },
  Mula:           { deity: "Nirriti",           gana: "Rakshasa", nadi: "Aadi",  yoni: "Dog",       traits: "Root-uprooting, philosophical, intense" },
  "Purva Ashadha":{ deity: "Apas",              gana: "Manushya", nadi: "Madhya",yoni: "Monkey",    traits: "Invincible, confident, expansive" },
  "Uttara Ashadha":{ deity: "Vishvedevas",      gana: "Manushya", nadi: "Antya", yoni: "Mongoose",  traits: "Universal, leadership, lasting" },
  Shravana:       { deity: "Vishnu",            gana: "Deva",     nadi: "Antya", yoni: "Monkey",    traits: "Listening, learning, traditional" },
  Dhanishta:      { deity: "Vasus",             gana: "Rakshasa", nadi: "Madhya",yoni: "Lion",      traits: "Wealthy, musical, dynamic" },
  Shatabhisha:    { deity: "Varuna",            gana: "Rakshasa", nadi: "Aadi",  yoni: "Horse",     traits: "Healing, eccentric, secretive" },
  "Purva Bhadrapada": { deity: "Aja Ekapada",   gana: "Manushya", nadi: "Aadi",  yoni: "Lion",      traits: "Fiery, transformative, intense" },
  "Uttara Bhadrapada":{ deity: "Ahirbudhnya",   gana: "Manushya", nadi: "Madhya",yoni: "Cow",       traits: "Deep, oceanic, wise" },
  Revati:         { deity: "Pushan",            gana: "Deva",     nadi: "Antya", yoni: "Elephant",  traits: "Gentle, traveling, compassionate" },
};

export async function POST(request) {
  try {
    const { date, time, latitude, longitude, timezone } = await request.json();
    if (!date || !time || latitude == null || longitude == null || !timezone) {
      return Response.json({ error: "date, time, latitude, longitude, timezone are required" }, { status: 400 });
    }
    const [y, mo, d] = date.split("-").map(Number);
    const [h, mi]    = time.split(":").map(Number);
    const utc = localToUTC({ year: y, month: mo, day: d, hour: h, minute: mi, timezone });
    const moonLng = moonLongitudeAt(utc);

    const idx = Math.floor(moonLng / NAK_SIZE);
    const within = moonLng - idx * NAK_SIZE;
    const pada = Math.floor(within / (NAK_SIZE / 4)) + 1;
    const signIdx = Math.floor(moonLng / 30);

    const meta = NAKSHATRAS[idx];
    const lore = LORE[meta.en] ?? {};

    return Response.json({
      nakshatra: { ...meta, index: idx, pada, ...lore },
      rashi:     { index: signIdx, ...RASHIS[signIdx] },
      moonLongitude: moonLng,
    });
  } catch (err) {
    console.error("[/api/nakshatra]", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
