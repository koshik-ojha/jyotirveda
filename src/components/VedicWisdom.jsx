import Link from "next/link";
import { FiBookOpen, FiCompass, FiSun, FiUsers, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { computePanchang } from "@/lib/astro/panchang";

const DEFAULT_LAT = 28.6139;
const DEFAULT_LNG = 77.209;

// Yogas considered auspicious / favorable
const AUSPICIOUS_YOGAS = new Set([
  "Priti","Ayushman","Saubhagya","Shobhana","Sukarma","Dhriti","Vriddhi",
  "Dhruva","Harshana","Siddhi","Siddha","Sadhya","Shubha","Shukla","Brahma","Indra","Shiva","Variyana",
]);

function buildCosmicOverview(panchang) {
  const { tithi, nakshatra, yoga, vara } = panchang;
  const isAuspicious = AUSPICIOUS_YOGAS.has(yoga.name);
  const headline = isAuspicious
    ? "An Auspicious Day Awaits"
    : "A Day for Reflection & Care";
  const body = `Moon is in ${nakshatra.en} Nakshatra, ruled by ${nakshatra.lord}. ` +
    `${yoga.name} Yoga ${isAuspicious ? "blesses" : "governs"} this ${vara.en}, ` +
    `a day whose lord is ${vara.lord}. ` +
    `Today's Tithi is ${tithi.paksha} ${tithi.name}.`;
  return { headline, body };
}

const WISDOM_CARDS = [
  { title: "Horoscopes 2026", href: "/pages/horoscope-2026", Icon: FiSun, gradient: "from-orange-500 to-amber-400", glow: "rgba(241,140,58,0.22)", items: ["Daily", "Weekly", "Monthly", "Love"] },
  { title: "Zodiac & Moon Signs", href: "/pages/zodiac-signs", Icon: FiCompass, gradient: "from-violet-500 to-purple-400", glow: "rgba(168,85,247,0.22)", items: ["Sun Signs", "Moon Signs", "Nakshatras"] },
  { title: "Lal Kitab Insights", href: "/pages/lal-kitab", Icon: FiBookOpen, gradient: "from-rose-500 to-pink-400", glow: "rgba(244,63,142,0.22)", items: ["Remedies", "Predictions"] },
  { title: "Celebrity Horoscopes", href: "/pages/celebrity-horoscope", Icon: FiUsers, gradient: "from-emerald-500 to-teal-400", glow: "rgba(16,185,129,0.22)", items: ["Featured Profiles"] },
];

export default async function VedicWisdom() {
  let cosmic = null;
  try {
    const panchang = computePanchang({ dateUTC: new Date(), latitude: DEFAULT_LAT, longitude: DEFAULT_LNG });
    cosmic = buildCosmicOverview(panchang);
  } catch {
    // fall through — show placeholder
  }
  return (
    <section className="py-24 px-6 bg-veda-dark">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-end mb-14">
          <div>
            <p className="text-veda-orange text-xs font-bold uppercase tracking-[0.2em] mb-3">Ancient Knowledge</p>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              Vedic Wisdom &amp; <span className="text-gradient-gold">Predictions</span>
            </h2>
          </div>
          <Link href="/pages/horoscope-2026" className="hidden md:flex items-center gap-2 text-white/35 hover:text-veda-orange text-xs font-bold uppercase tracking-widest transition-colors group">
            View All <FiArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 5-col layout: featured 2 cols + 2×2 card grid 3 cols */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Featured card — today's cosmic snapshot */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden flex flex-col min-h-[380px] border border-white/10"
            style={{ background: "linear-gradient(155deg, rgba(241,140,58,0.15) 0%, rgba(11,13,23,0.95) 55%)" }}>
            <div className="flex-1 p-8 flex flex-col">
              <div className="flex items-center gap-2 text-veda-orange text-xs font-bold uppercase tracking-widest mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-veda-orange animate-pulse" />
                Today&apos;s Cosmic Overview
              </div>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: "linear-gradient(135deg, rgba(241,140,58,0.3), rgba(217,145,82,0.1))", border: "1px solid rgba(241,140,58,0.2)" }}>
                <FiSun className="w-7 h-7 text-veda-orange" />
              </div>

              <h3 className="text-2xl font-serif text-white mb-3">
                {cosmic?.headline ?? "Today's Cosmic Snapshot"}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed mb-auto">
                {cosmic?.body ?? "Fetching today's planetary overview…"}
              </p>

              <Link href="/pages/todays-horoscope" className="mt-8 flex items-center gap-2 text-veda-orange text-sm font-semibold hover:gap-3 transition-all duration-200 group">
                Read Full Horoscope
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 2×2 category card grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WISDOM_CARDS.map((card) => {
              const Icon = card.Icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group rounded-2xl p-6 border border-white/8 hover:border-white/18 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden block"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  {/* Per-card colored glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(circle at 15% 85%, ${card.glow} 0%, transparent 60%)` }} />
                  <div className={`relative w-10 h-10 rounded-xl bg-linear-to-br ${card.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="relative text-base font-serif text-white mb-3">{card.title}</h3>
                  <ul className="relative space-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-white/35 hover:text-veda-orange transition-colors">
                        <span className="w-1 h-1 rounded-full bg-veda-gold/50 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="relative mt-5 pt-4 border-t border-white/6">
                    <span className="flex items-center gap-1.5 text-veda-orange text-xs font-semibold opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                      Explore <FiArrowRight className="w-3 h-3 -translate-x-1 group-hover:translate-x-0 transition-transform duration-200" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
