import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ZODIAC } from "@/lib/zodiac";

export const metadata = {
  title: "Zodiac Signs — 12 Rashis Explained | JyotirVeda",
  description:
    "The twelve Vedic zodiac signs explained — their element, ruling planet, traits, strengths and shadow sides.",
};

const TRAITS = {
  Aries:       { strengths: "Courage, initiative, energy",     shadow: "Impulsiveness, impatience",    keyword: "I am" },
  Taurus:      { strengths: "Stability, sensuality, loyalty",  shadow: "Stubbornness, possessiveness", keyword: "I have" },
  Gemini:      { strengths: "Wit, curiosity, adaptability",    shadow: "Restlessness, indecision",     keyword: "I think" },
  Cancer:      { strengths: "Empathy, intuition, nurture",     shadow: "Moodiness, clinging",          keyword: "I feel" },
  Leo:         { strengths: "Generosity, leadership, warmth",  shadow: "Pride, theatricality",         keyword: "I will" },
  Virgo:       { strengths: "Precision, service, analysis",    shadow: "Criticism, anxiety",           keyword: "I analyse" },
  Libra:       { strengths: "Diplomacy, beauty, fairness",     shadow: "Indecision, people-pleasing",  keyword: "I balance" },
  Scorpio:     { strengths: "Depth, focus, regeneration",      shadow: "Jealousy, secrecy",            keyword: "I desire" },
  Sagittarius: { strengths: "Optimism, vision, freedom",       shadow: "Bluntness, scattered focus",   keyword: "I seek" },
  Capricorn:   { strengths: "Discipline, ambition, patience",  shadow: "Coldness, rigidity",           keyword: "I build" },
  Aquarius:    { strengths: "Innovation, friendship, ideals",  shadow: "Detachment, eccentricity",     keyword: "I know" },
  Pisces:      { strengths: "Compassion, art, mysticism",      shadow: "Escapism, boundary loss",      keyword: "I dream" },
};

export default function ZodiacSignsPage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-veda-orange/10 blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-veda-gold/10 blur-3xl" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              12 Rashis
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              The Zodiac Signs
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Twelve archetypes the cosmos uses to draw character. Each rasi carries an element, a ruling planet, and a way of being in the world.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ZODIAC.map((sign) => (
              <div
                key={sign.en}
                className="glass border border-white/10 rounded-2xl p-7 hover:border-veda-orange/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-veda-orange text-4xl mb-1">{sign.symbol}</p>
                    <h3 className="font-serif text-2xl text-white">{sign.en}</h3>
                    <p className="text-sm text-white/40">{sign.hi}</p>
                  </div>
                  <div className="text-right text-[10px] uppercase tracking-widest text-white/40 space-y-1">
                    <p>{sign.dates}</p>
                    <p className="text-veda-gold/80">{sign.element}</p>
                    <p>Lord • {sign.lord}</p>
                  </div>
                </div>
                <p className="italic text-veda-gold/80 mb-4 font-serif">&ldquo;{TRAITS[sign.en].keyword}&rdquo;</p>
                <div className="space-y-2.5 text-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">Strengths</p>
                    <p className="text-white/65">{TRAITS[sign.en].strengths}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">Shadow</p>
                    <p className="text-white/65">{TRAITS[sign.en].shadow}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
