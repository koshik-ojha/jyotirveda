import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignsReadingGrid from "@/components/horoscope/SignsReadingGrid";

export const metadata = {
  title: "Weekly Love Horoscope — Romance & Relationship Forecast | JyotirVeda",
  description:
    "Weekly love and relationship horoscope for all 12 signs — what Venus and the Moon have in store for your heart this week.",
};

const LOVE_WEEK_PREDICTIONS = {
  Aries:       "Passion runs hot, but listening runs colder. A loved one wants to be heard before they want to be solved — try silence first.",
  Taurus:      "A gesture of comfort lands deeply. Cook, gift, hold — your love language is physical this week and it speaks fluently.",
  Gemini:      "Words seduce. A late-night conversation rekindles something dormant; single Geminis find chemistry through wit.",
  Cancer:      "Vulnerability is the bridge. Share the soft thought you've been guarding — the response heals more than you expect.",
  Leo:         "Romance loves a stage. Plan something memorable — even small theatre makes the heart bigger.",
  Virgo:       "Acts of service are your love poem. A small thoughtful thing — a fixed thing, a folded thing — speaks louder than declarations.",
  Libra:       "Harmony returns after a small storm. Don't relitigate the argument; let it pass and tenderness reseals naturally.",
  Scorpio:     "Intensity peaks mid-week. Channel it into intimacy, not interrogation. Trust the chemistry without testing it.",
  Sagittarius: "Adventure together. Plan a trip, even a small one — shared horizon strengthens the bond.",
  Capricorn:   "Long-term thinking. Conversations about future plans, home, and structure deepen the relationship's roots.",
  Aquarius:    "Friendship-first energy. The platonic side of love is honoured — and surprisingly, makes the romantic side richer.",
  Pisces:      "Soulful, dreamy connection. Music, water and candlelight all favour you — create the atmosphere; love responds.",
};

export default function WeeklyLoveHoroscopePage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-pink-500/10 blur-3xl animate-pulse-glow" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              Venus & The Moon
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Weekly Love Horoscope
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Seven days of romance, intimacy and connection — what to nurture, what to forgive, when to speak from the heart.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <SignsReadingGrid periodLabel="Love This Week" period="weekly" readingKey="love" predictions={LOVE_WEEK_PREDICTIONS} />
        </section>
      </main>
      <Footer />
    </>
  );
}
