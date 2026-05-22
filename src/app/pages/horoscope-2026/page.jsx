import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HoroscopeViewer from "@/components/HoroscopeViewer";

export const metadata = {
  title: "Horoscope 2026 — Yearly Predictions for All Signs | JyotirVeda",
  description:
    "Yearly horoscope for 2026 — the big transits of Saturn, Jupiter, Rahu and Ketu, and what each of the twelve signs can expect across the year.",
};

const YEAR_EN = {
  Aries:       "A year of career momentum. Saturn's transit through your 11th house unlocks long-stuck gains. Keep patience through March-to-June; the breakthrough arrives in the second half.",
  Taurus:      "Venus rewards steady effort with material consolidation. New income streams emerge; an investment matures. Watch your health — sleep is non-negotiable.",
  Gemini:      "Mercury favours communication-led pursuits — writing, teaching, broadcasting. A skill you learn early in the year pays for itself by Diwali.",
  Cancer:      "Home and family take centre stage. Property matters resolve favourably; a deeper bond with a parent or sibling restores something quietly important.",
  Leo:         "Visibility, leadership and creative recognition. The Sun strengthens your stage — receive it gracefully and don't let the limelight obscure intimacy.",
  Virgo:       "Service and refinement bring quiet transformation. Health routines stick this year. A book, a course, a meticulous project — finish the half-built one.",
  Libra:       "Partnerships dominate — marital, romantic or business. A commitment moves from possibility to plan. Choose well; this choice shapes years.",
  Scorpio:     "Transformation runs deep. An identity sheds; a truer one rises. Trust the discomfort; what feels like loss in spring is structure by autumn.",
  Sagittarius: "Jupiter's grace expands horizons. Study, travel and philosophy flourish. A teacher arrives. Don't over-commit — abundance can become scatter.",
  Capricorn:   "Saturn rewards the patient. Multi-year efforts bear fruit. Sade-sati's weight lifts toward year-end; structure replaces struggle.",
  Aquarius:    "Networks, communities and collective work flourish. An unusual collaboration becomes important; a friendship deepens into family.",
  Pisces:      "Creative and spiritual tide rises. Dreams, intuition and art-making feel uncommonly potent. Make space — your inner world has something to deliver.",
};

const majorTransits = [
  { graha: "Saturn (शनि)", note: "Transits through Aquarius then Pisces — pivotal for Sade-Sati cohorts and 11th-house gains." },
  { graha: "Jupiter (गुरु)", note: "Moves through Gemini and Cancer — expansion blesses 3rd-house communicators and 4th-house homemakers." },
  { graha: "Rahu / Ketu", note: "Axis shifts mid-year, redirecting the karmic compass for all signs — especially Pisces-Virgo." },
  { graha: "Mars (मंगल)", note: "Long retrograde phase tests patience; the wise channel its heat into discipline, not impulse." },
];

export default function Horoscope2026Page() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 right-1/3 w-[36rem] h-[36rem] rounded-full bg-veda-gold/10 blur-3xl animate-pulse-glow" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              Annual Forecast
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Horoscope 2026
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              A year mapped against the slow walk of the major planets. What Saturn, Jupiter and Rahu-Ketu have written for each of the twelve signs.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif text-white mb-2">The Major Transits of 2026</h2>
            <p className="text-white/50">Four planetary movements that shape every sign&apos;s year.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {majorTransits.map((t) => (
              <div key={t.graha} className="glass border border-white/10 rounded-2xl p-6">
                <h3 className="font-serif text-lg text-veda-orange mb-2">{t.graha}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{t.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-24 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-white">Your Year, Sign by Sign</h2>
            <p className="text-white/50 mt-2">Computed live from planetary positions through 2026.</p>
          </div>
          <HoroscopeViewer period="yearly" lang="en" />
        </section>
      </main>
      <Footer />
    </>
  );
}
