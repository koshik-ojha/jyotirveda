import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignsReadingGrid from "@/components/horoscope/SignsReadingGrid";

export const metadata = {
  title: "Monthly Horoscope — This Month's Predictions | JyotirVeda",
  description:
    "Monthly Vedic horoscope for all 12 zodiac signs — the planetary forecast for love, career, money and health.",
};

const monthName = new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" });

const MONTH_PREDICTIONS = {
  Aries:       "A month of bold initiation. Mars empowers your sector of work — but the second fortnight asks for collaboration over conquest.",
  Taurus:      "Venus blesses your finances. A long-pending purchase, raise or settlement matures. Don't rush it; the right moment arrives mid-month.",
  Gemini:      "Mercury runs lively in your chart. Writing, teaching, or any communication-led venture gathers unusual traction.",
  Cancer:      "Emotional renewal. An old wound finally closes, freeing energy you didn't realise was being taxed.",
  Leo:         "The Sun strengthens your stage. Public recognition, leadership opportunities and creative breakthroughs cluster around the new moon.",
  Virgo:       "A month of meticulous progress. Health, daily routines and service work become quietly transformative.",
  Libra:       "Partnerships are highlighted. A commitment — marital, business, or creative — moves from possibility to plan.",
  Scorpio:     "Transformation runs deep. Old patterns shed; new identity surfaces. Trust the discomfort — it's growth, not loss.",
  Sagittarius: "Expansion across travel, study and philosophy. A teacher or mentor arrives precisely when needed.",
  Capricorn:   "Career milestones. Saturn rewards the patient. Don't be surprised if a multi-year effort suddenly bears fruit this month.",
  Aquarius:    "Friendships, networks and collective work flourish. A community you join now becomes important for years.",
  Pisces:      "Spiritual and creative tide rises. Dreams, meditation and art-making feel uncommonly potent — make space.",
};

export default function MonthlyHoroscopePage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 right-1/4 w-[36rem] h-[36rem] rounded-full bg-veda-gold/10 blur-3xl animate-pulse-glow" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              {monthName}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Monthly Horoscope
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              A thirty-day weather report for the soul. The major planetary movements of the month mapped onto each rasi.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <SignsReadingGrid periodLabel="This Month" period="monthly" predictions={MONTH_PREDICTIONS} />
        </section>
      </main>
      <Footer />
    </>
  );
}
