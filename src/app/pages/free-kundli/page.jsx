import {
  FiStar, FiSun, FiMoon, FiCompass, FiGift,
  FiBookOpen, FiClock, FiTrendingUp,
} from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KundliForm from "@/components/KundliForm";

export const metadata = {
  title: "Free Kundli — Janam Kundli Online | JyotirVeda",
  description:
    "Generate your free Vedic birth chart (Janam Kundli) by date, time and place of birth. 50+ page report with planetary positions, dashas, yogas, doshas and remedies.",
};

const sections = [
  { icon: FiSun, title: "Lagna Chart", desc: "Your ascendant chart showing planetary positions at the moment of birth." },
  { icon: FiMoon, title: "Navamsa (D9)", desc: "Ninth-divisional chart for marriage, dharma and the deeper self." },
  { icon: FiClock, title: "Vimshottari Dasha", desc: "120-year planetary period timeline with sub-periods and antardashas." },
  { icon: FiTrendingUp, title: "Gochar / Transit", desc: "Live planetary transits and how they interact with your natal chart." },
  { icon: FiCompass, title: "Divisional Charts", desc: "Shodashvarga and Ashtakvarga for granular life-area analysis." },
  { icon: FiGift, title: "Yogas & Doshas", desc: "Raj Yogas, Dhana Yogas, Mangal Dosha, Kaalsarp and remedies." },
  { icon: FiStar, title: "Planetary Positions", desc: "Exact placement of all nine grahas across signs, houses and nakshatras." },
  { icon: FiBookOpen, title: "Detailed Predictions", desc: "A 50+ page personalised report spanning every major life area." },
];

const benefits = [
  { title: "NASA-grade precision", desc: "Astronomical algorithms compute planetary positions to the arc-second." },
  { title: "Authentic Vedic lineage", desc: "Calculations follow classical Parashara and Jaimini schools." },
  { title: "Nine+ languages", desc: "Generate in Hindi, English, Bengali, Marathi, Gujarati, Tamil and more." },
  { title: "Free forever", desc: "Full chart, predictions and PDF download — no paywall, no email-wall." },
];

const faqs = [
  {
    q: "What is a Janam Kundli?",
    a: "Janam Kundli is the Vedic birth chart — a map of the sky as seen from your birthplace at the exact moment of your birth. It captures the position of the Sun, Moon, planets and the rising sign across the 12 zodiac signs and 12 houses.",
  },
  {
    q: "How accurate is a computer-generated Kundli?",
    a: "Modern Kundli software uses the same astronomical algorithms space agencies use for planetary positions. Accuracy is limited only by how precise your birth time and place are.",
  },
  {
    q: "What is the Navamsa chart?",
    a: "Navamsa (D9) is formed by dividing each rasi into nine parts. It is the most important chart after the Rasi chart and reveals deeper truths about marriage, dharma and the inner self.",
  },
  {
    q: "Why does birth time matter so much?",
    a: "The ascendant (Lagna) changes roughly every two hours. Even a five-minute error can shift your entire chart's framework, altering house lordships and predictions significantly.",
  },
];

export default function FreeKundliPage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-veda-orange/10 blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-veda-gold/10 blur-3xl" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              Free • Vedic • Accurate
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Your Free Janam Kundli
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              The cosmos at the exact moment you were born — mapped, analysed and explained.
              Generate a 50+ page Vedic birth chart with planetary positions, dashas, yogas and remedies.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <KundliForm />
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
              What&apos;s Inside Your Kundli
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Eight core sections, computed instantly from your birth details.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((s) => (
              <div
                key={s.title}
                className="glass border border-white/10 rounded-2xl p-6 hover:border-veda-orange/40 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-white mb-1.5">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-veda-orange">
                Why JyotirVeda
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-white mt-3 mb-5">
                Classical wisdom, modern precision
              </h2>
              <p className="text-white/60 leading-relaxed">
                We blend classical Parashara astrology with modern astronomical algorithms. Every chart is rooted in 8,000 years of Vedic tradition and computed with the same precision used to track satellites.
              </p>
            </div>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b.title} className="glass border border-white/10 rounded-xl p-5">
                  <h4 className="font-semibold text-white mb-1">{b.title}</h4>
                  <p className="text-sm text-white/55">{b.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 pb-28 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-10">
            Frequently Asked
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="glass border border-white/10 rounded-xl px-5 py-4 group"
              >
                <summary className="font-medium text-white cursor-pointer list-none flex justify-between items-center gap-4">
                  <span>{f.q}</span>
                  <span className="text-veda-orange text-xl transition-transform group-open:rotate-45 shrink-0">
                    +
                  </span>
                </summary>
                <p className="text-sm text-white/55 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
