import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignsReadingGrid from "@/components/horoscope/SignsReadingGrid";
import { FiHeart, FiUsers, FiBookOpen, FiStar } from "react-icons/fi";

export const metadata = {
  title: "Love Horoscope — Daily Romance Forecast | JyotirVeda",
  description:
    "Daily love horoscope for all 12 signs — what the planets of romance, Venus and the Moon, are arranging for your heart today.",
};

const LOVE_TODAY = {
  Aries:       "A spark of fresh attraction. Move toward it gently — the slow approach is the seductive one for once.",
  Taurus:      "Touch, cook, share something tactile. Love speaks through the body today.",
  Gemini:      "Words win. Text the funny thought, say the affectionate line out loud. Both will land.",
  Cancer:      "Cherished memories surface. Honour them, but don't live in them — present-tense affection matters more.",
  Leo:         "Be generous, but don't perform. Quiet adoration today reaches further than grand gestures.",
  Virgo:       "Show love by fixing something small for your partner. It says &lsquo;I see you&rsquo; without needing words.",
  Libra:       "Balance returns to a strained connection. A fair conversation, calmly held, restores warmth.",
  Scorpio:     "Intensity needs an outlet — choose intimacy, not interrogation. Trust over testing.",
  Sagittarius: "Plan an outing, even a small one. Shared horizons reset the bond.",
  Capricorn:   "Make space for tenderness in a busy day. Even five minutes of focused presence is medicine.",
  Aquarius:    "Friendship-first love. A platonic moment with your partner deepens romance unexpectedly.",
  Pisces:      "Music, water, candlelight — set the scene and love arrives ready.",
};

const venusTransitNotes = [
  { title: "Venus in Taurus", desc: "Sensual, slow, devoted love. Long-term bonds favoured." },
  { title: "Venus in Libra",  desc: "Harmony, beauty, partnership. New relationships flower." },
  { title: "Venus Combust",   desc: "When Venus is too close to the Sun — romance recedes; postpone confessions." },
  { title: "Venus Retrograde", desc: "Old loves resurface; review before renew." },
];

export default function LoveHoroscopePage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-pink-500/15 blur-3xl animate-pulse-glow" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              <FiHeart className="inline w-3 h-3 mr-1 mb-0.5" /> Venus & The Moon
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Love Horoscope
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Daily insight for the heart — read by the planet of romance and the planet of feeling, sign by sign.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
            {venusTransitNotes.map((v) => (
              <div key={v.title} className="glass border border-white/10 rounded-2xl p-5">
                <p className="text-veda-orange text-xs uppercase tracking-widest mb-2">{v.title}</p>
                <p className="text-sm text-white/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-white">Today, for the Heart</h2>
          </div>
          <SignsReadingGrid periodLabel="Love Today" period="today" readingKey="love" predictions={LOVE_TODAY} />
        </section>

        <section className="px-6 pb-24 max-w-5xl mx-auto">
          <div className="glass border border-white/10 rounded-2xl p-10 grid md:grid-cols-3 gap-8 text-center">
            <a href="/horoscope-matching" className="group">
              <FiUsers className="w-7 h-7 mx-auto text-veda-orange mb-3" />
              <h4 className="font-serif text-lg text-white group-hover:text-veda-orange transition-colors">Match Horoscopes</h4>
              <p className="text-sm text-white/45 mt-1">36-point Guna Milan</p>
            </a>
            <a href="/weekly-love-horoscope" className="group">
              <FiBookOpen className="w-7 h-7 mx-auto text-veda-orange mb-3" />
              <h4 className="font-serif text-lg text-white group-hover:text-veda-orange transition-colors">This Week in Love</h4>
              <p className="text-sm text-white/45 mt-1">Seven-day forecast</p>
            </a>
            <a href="/matrimony" className="group">
              <FiStar className="w-7 h-7 mx-auto text-veda-orange mb-3" />
              <h4 className="font-serif text-lg text-white group-hover:text-veda-orange transition-colors">Find a Partner</h4>
              <p className="text-sm text-white/45 mt-1">Vedic matrimony</p>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
