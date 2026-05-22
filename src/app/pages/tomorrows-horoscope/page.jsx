import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignsReadingGrid from "@/components/horoscope/SignsReadingGrid";

export const metadata = {
  title: "Tomorrow's Horoscope — Tomorrow's Predictions for All Signs | JyotirVeda",
  description:
    "Tomorrow's horoscope for all 12 zodiac signs — plan ahead with Vedic insight into love, work and health.",
};

const TOMORROW_PREDICTIONS = {
  Aries:       "A new project knocks on the door — answer it. Energy is sharp, but pace yourself; the win is in the second hour, not the first.",
  Taurus:      "A small financial detail you almost ignored proves consequential. Open the spreadsheet; the answer is hiding in plain sight.",
  Gemini:      "Travel or a long phone call brings clarity. A friend from a different season returns with timely advice.",
  Cancer:      "An old recipe, an old playlist, an old photograph — the past whispers something useful. Listen, then act on the present.",
  Leo:         "Recognition arrives in an unexpected form. Receive it gracefully; downplaying it now will read as humility, not insecurity.",
  Virgo:       "A health habit you've been postponing becomes easy to start tomorrow. Small commitment, lasting return.",
  Libra:       "Negotiations soften. The middle path you were uncertain about turns out to be the elegant one — pursue it.",
  Scorpio:     "Deep work suits you. Carve out three uninterrupted hours and the breakthrough you've been waiting for arrives.",
  Sagittarius: "An adventure beckons — say yes to the spontaneous plan. Order returns by the weekend.",
  Capricorn:   "A long climb shows its summit. The next step is administrative; tedious but defining.",
  Aquarius:    "An unusual collaboration pays off. The person you least expected becomes the most aligned ally.",
  Pisces:      "Dreams run vivid; jot them down before breakfast. One of them holds a metaphor you'll need by midweek.",
};

export default function TomorrowsHoroscopePage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 right-1/3 w-[36rem] h-[36rem] rounded-full bg-veda-gold/10 blur-3xl animate-pulse-glow" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              The Day Ahead
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Tomorrow&apos;s Horoscope
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              A glance at the cosmos one step ahead. Use tomorrow&apos;s reading to time decisions, set intentions and prepare for what&apos;s coming.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <SignsReadingGrid periodLabel="Tomorrow" period="tomorrow" predictions={TOMORROW_PREDICTIONS} />
        </section>
      </main>
      <Footer />
    </>
  );
}
