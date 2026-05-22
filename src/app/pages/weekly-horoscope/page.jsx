import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignsReadingGrid from "@/components/horoscope/SignsReadingGrid";

export const metadata = {
  title: "Weekly Horoscope — This Week's Predictions | JyotirVeda",
  description:
    "Weekly Vedic horoscope for all 12 zodiac signs — covering love, career, money and health for the week ahead.",
};

const WEEK_PREDICTIONS = {
  Aries:       "A week of momentum on the career front. By Wednesday a key decision falls into your lap — choose the harder right over the easier wrong.",
  Taurus:      "Finances stabilise after a small jolt mid-week. Saturday opens a long-awaited window for self-indulgence — earn it first.",
  Gemini:      "Communication is your superpower this week. A pitch, an interview or a difficult conversation lands well; lean in.",
  Cancer:      "Family takes priority. A small gesture early in the week prevents a larger misunderstanding by Friday.",
  Leo:         "Visibility rises — a public-facing moment arrives. Prepare, but don't over-rehearse; authenticity carries you.",
  Virgo:       "Routines refine themselves. By week's end you'll wonder how you managed any other way.",
  Libra:       "A relationship deepens. Whether romantic or business, mid-week conversations set the tone for the next quarter.",
  Scorpio:     "Investigative energy peaks. The truth you've been circling reveals itself; act on it with care, not haste.",
  Sagittarius: "Learning, travel and big ideas dominate. A book, a course or a trip planted now blossoms by month-end.",
  Capricorn:   "Slow, structural progress. Don't compare your pace to others — your foundation is being laid for years, not days.",
  Aquarius:    "Networks deliver. A casual introduction late in the week opens a door you didn't know was there.",
  Pisces:      "Intuition is heightened. Friday and Saturday favour artistic, healing or spiritual practice — protect the time.",
};

export default function WeeklyHoroscopePage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 left-1/4 w-[36rem] h-[36rem] rounded-full bg-veda-orange/10 blur-3xl animate-pulse-glow" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              The Week Ahead
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Weekly Horoscope
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Seven days at a glance — the rhythm of planetary transits mapped onto each zodiac sign, so you can plan with the sky on your side.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <SignsReadingGrid periodLabel="This Week" period="weekly" predictions={WEEK_PREDICTIONS} />
        </section>
      </main>
      <Footer />
    </>
  );
}
