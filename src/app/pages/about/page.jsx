import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FiStar, FiCpu, FiBookOpen, FiUsers, FiShield,
  FiGlobe, FiHeart, FiAward,
} from "react-icons/fi";

export const metadata = {
  title: "About — JyotirVeda | The Wisdom of the Ages, Precision of AI",
  description:
    "JyotirVeda fuses 8,000 years of Vedic astrology with modern AI and astronomical precision. Free, accurate, multilingual — for the next generation of seekers.",
};

const STATS = [
  { value: "8,000+", label: "Years of Vedic lineage" },
  { value: "1.2M",   label: "Charts generated daily" },
  { value: "27",     label: "Nakshatras mapped" },
  { value: "9+",     label: "Languages supported" },
];

const VALUES = [
  {
    icon: FiBookOpen,
    title: "Authentic Vedic Lineage",
    desc: "Every calculation follows the classical schools — Parashara, Jaimini, Tajik. No watered-down compromises.",
  },
  {
    icon: FiCpu,
    title: "AI-Enhanced Precision",
    desc: "Astronomical algorithms compute planetary positions to arc-second accuracy. The math powering our charts is the same NASA uses to track satellites.",
  },
  {
    icon: FiGlobe,
    title: "For Every Seeker, Free",
    desc: "Full readings, 50-page reports, daily horoscopes — no paywall, no email-wall. Wisdom belongs to everyone.",
  },
  {
    icon: FiShield,
    title: "Privacy By Design",
    desc: "Your birth chart is your soul on paper. We don&apos;t sell it, don&apos;t share it, don&apos;t store it longer than you ask us to.",
  },
];

const TIMELINE = [
  {
    year: "Vedic Times",
    title: "The Origins",
    desc: "Sage Parashara composes the Brihat Parashara Hora Shastra — the foundational text of Vedic astrology.",
  },
  {
    year: "5th c. CE",
    title: "Codification",
    desc: "Aryabhata and Varahamihira systematise the mathematical principles of Indian astronomy and astrology.",
  },
  {
    year: "1939–1952",
    title: "Lal Kitab",
    desc: "Pandit Roop Chand Joshi composes the five-volume Lal Kitab, bringing Jyotish to the householder.",
  },
  {
    year: "20th c.",
    title: "Digital Awakening",
    desc: "AstroSage launches in 2002. Vedic astrology enters the digital age — calculation moves from books to code.",
  },
  {
    year: "2024",
    title: "JyotirVeda Founded",
    desc: "Born from a belief that the next chapter belongs to AI — wisdom that learns, scales, and remains free.",
  },
  {
    year: "Today",
    title: "Where We Are",
    desc: "1.2M charts a day, 11M users a month, and a relentless commitment to keeping every reading classical and free.",
  },
];

const TEAM_VALUES = [
  { icon: FiHeart,    title: "Compassion First",      desc: "Astrology in service, not in fear-mongering." },
  { icon: FiAward,    title: "Scholarship",            desc: "Every algorithm cross-checked against classical texts." },
  { icon: FiUsers,    title: "Community Ownership",   desc: "Built with astrologers, not just for them." },
  { icon: FiStar,     title: "Wonder",                 desc: "The cosmos is awe-inspiring. Our work tries to be too." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-20 px-6 overflow-hidden">
          <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-veda-orange/10 blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-veda-gold/10 blur-3xl" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Wisdom of the Ages,<br />Precision of AI
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              JyotirVeda is a quiet revolution in Vedic astrology — eight thousand years of classical tradition, retold through modern algorithms and made free for every seeker.
            </p>
          </div>
        </section>

        <section className="px-6 pb-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="glass border border-white/10 rounded-2xl p-6 text-center">
                <p className="font-serif text-3xl md:text-4xl text-gradient-gold mb-2">{s.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/45">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-veda-orange">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-serif text-white mt-3 mb-5">
                Make 8,000 years of wisdom accessible to anyone with a question.
              </h2>
              <div className="space-y-4 text-white/65 leading-relaxed">
                <p>
                  Jyotish — the Sanskrit word for astrology — literally means &ldquo;the science of light.&rdquo; For millennia, it was the privilege of the few. Temple priests held the books, royal astrologers held the charts, and the common seeker held only their hopes.
                </p>
                <p>
                  JyotirVeda exists to change that. By pairing classical Vedic methods with modern computation, we make the same readings a maharaja once paid in gold for, available to anyone with an internet connection. In Hindi, English, Bengali, Tamil, Marathi, Gujarati — and growing.
                </p>
                <p>
                  We don&apos;t replace the astrologer. We give the seeker enough self-knowledge to walk into one&apos;s office prepared — or, sometimes, to find the answer themselves.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {VALUES.map((v) => (
                <div key={v.title} className="glass border border-white/10 rounded-2xl p-6 hover:border-veda-orange/40 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center mb-3">
                    <v.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base text-white mb-1.5">{v.title}</h3>
                  <p className="text-xs text-white/55 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-veda-orange">The Long Lineage</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-3 mb-3">A 5,000-Year Bloodline</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              JyotirVeda is the latest chapter in a story that began with the rishis.
            </p>
          </div>
          <div className="space-y-3">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="glass border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-5">
                <div className="sm:w-32 shrink-0">
                  <p className="text-xs uppercase tracking-widest text-veda-orange">{t.year}</p>
                  <p className="font-serif text-veda-gold/70 text-3xl">{String(i + 1).padStart(2, "0")}</p>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-white mb-1.5">{t.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-veda-orange">How We Work</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-3 mb-3">Four Principles</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              The convictions that shape every line of code and every word of every reading we ship.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM_VALUES.map((v) => (
              <div key={v.title} className="glass border border-white/10 rounded-2xl p-6">
                <div className="w-11 h-11 rounded-xl bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-white mb-2">{v.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-28 max-w-3xl mx-auto">
          <div className="glass border border-veda-orange/30 rounded-2xl p-10 text-center">
            <FiStar className="w-7 h-7 text-veda-orange mx-auto mb-4" />
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
              Have a question for the cosmos?
            </h3>
            <p className="text-white/55 mb-7 max-w-md mx-auto">
              Generate your free Janam Kundli, ask a panchang, or write to us — we read every message.
            </p>
            <div className="flex items-center gap-3 justify-center flex-wrap">
              <a
                href="/free-kundli"
                className="inline-flex items-center gap-2 bg-veda-orange text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-veda-gold transition-colors"
              >
                Free Kundli
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/20 text-white/80 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:border-veda-orange hover:text-veda-orange transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
