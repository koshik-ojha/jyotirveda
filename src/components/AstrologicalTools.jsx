import Link from "next/link";
import {
  FiAlertTriangle,
  FiCalendar,
  FiClock,
  FiHash,
  FiHeart,
  FiMoon,
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";

const TOOLS = [
  {
    num: "01",
    title: "Muhurat",
    subtitle: "Auspicious Timing",
    desc: "Find the perfect moment for weddings, travel, business launches & every major life event.",
    Icon: FiClock,
    color: "#F18C3A",
    gradient: "from-orange-500 to-amber-400",
    glow: "rgba(241,140,58,0.25)",
    cta: "Find Muhurat",
    href: "/pages/muhurat",
    big: true,
  },
  {
    num: "02",
    title: "Baby Names",
    subtitle: "Nakshatra-based naming",
    Icon: FiHeart,
    color: "#f43f8e",
    gradient: "from-rose-500 to-pink-400",
    glow: "rgba(244,63,142,0.2)",
    href: "/pages/baby-names",
  },
  {
    num: "03",
    title: "Numerology",
    subtitle: "Discover your numbers",
    Icon: FiHash,
    color: "#a855f7",
    gradient: "from-violet-500 to-purple-400",
    glow: "rgba(168,85,247,0.2)",
    href: "/pages/numerology",
  },
  {
    num: "04",
    title: "Rahu Kaal",
    subtitle: "Avoid inauspicious hours",
    Icon: FiAlertTriangle,
    color: "#ef4444",
    gradient: "from-red-500 to-orange-400",
    glow: "rgba(239,68,68,0.2)",
    href: "/pages/rahu-kaal",
  },
  {
    num: "05",
    title: "Moon Phases",
    subtitle: "Lunar calendar insights",
    Icon: FiMoon,
    color: "#6366f1",
    gradient: "from-indigo-500 to-blue-400",
    glow: "rgba(99,102,241,0.2)",
    href: "/pages/moon-signs",
  },
  {
    num: "06",
    title: "Panchangam",
    subtitle: "Daily Vedic Almanac",
    desc: "Tithi, nakshatra, yoga, karana & all auspicious windows — your complete daily cosmic guide.",
    Icon: FiCalendar,
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-400",
    glow: "rgba(16,185,129,0.25)",
    cta: "View Today",
    href: "/pages/panchangam",
    big: true,
  },
];

export default function AstrologicalTools() {
  const [muhurat, baby, numerology, rahu, moon, panchang] = TOOLS;
  const smalls = [baby, numerology, rahu, moon];

  return (
    <section className="py-24 px-6 bg-veda-navy">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-end mb-14">
          <div>
            <p className="text-veda-orange text-xs font-bold uppercase tracking-[0.2em] mb-3">Cosmic Toolkit</p>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              Astrological Tools &amp; <span className="text-gradient-gold">Calculations</span>
            </h2>
          </div>
          <Link href="/pages/muhurat" className="hidden md:flex items-center gap-2 text-white/35 hover:text-veda-orange text-xs font-bold uppercase tracking-widest transition-colors group">
            View All <FiArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Bento grid: 4 cols */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {/* ── Muhurat — big featured (col 1-2, row 1) ── */}
          <BigCard tool={muhurat} align="left" />

          {/* ── 4 small cards (row 1 col 3-4, row 2 col 1-2) ── */}
          {smalls.map((tool) => (
            <SmallCard key={tool.title} tool={tool} />
          ))}

          {/* ── Panchangam — big featured (col 3-4, row 2) ── */}
          <BigCard tool={panchang} align="right" />

        </div>
      </div>
    </section>
  );
}

function BigCard({ tool }) {
  const Icon = tool.Icon;
  return (
    <Link
      href={tool.href}
      className="col-span-2 group rounded-2xl border border-white/10 p-8 flex flex-col sm:flex-row gap-8 items-center relative overflow-hidden cursor-pointer transition-all duration-300"
      style={{ background: "rgba(255,255,255,0.04)", minHeight: 220 }}
    >
      {/* Ambient glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 50%, ${tool.glow} 0%, transparent 70%)` }} />

      {/* Icon column */}
      <div className="shrink-0 flex flex-col items-center gap-3 relative z-10">
        {/* Decorative glow ring behind icon */}
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl blur-xl opacity-60 scale-125"
            style={{ background: `linear-gradient(135deg, ${tool.color}50, transparent)` }} />
          <div className={`relative w-20 h-20 rounded-2xl bg-linear-to-br ${tool.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
            <Icon className="w-9 h-9 text-white" />
          </div>
        </div>
        <span className="text-xs font-bold text-white/20 tracking-widest">{tool.num}</span>
      </div>

      {/* Text column */}
      <div className="relative z-10 flex-1">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: tool.color }}>{tool.subtitle}</p>
        <h3 className="text-2xl font-serif text-white mb-3">{tool.title}</h3>
        <p className="text-sm text-white/35 leading-relaxed mb-6">{tool.desc}</p>
        <span
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-200 group-hover:gap-3.5"
          style={{ background: `linear-gradient(135deg, ${tool.color}, ${tool.color}cc)`, boxShadow: `0 0 24px ${tool.glow}` }}
        >
          {tool.cta} <FiArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}

function SmallCard({ tool }) {
  const Icon = tool.Icon;
  return (
    <Link
      href={tool.href}
      className="group rounded-2xl border border-white/8 p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 relative overflow-hidden"
      style={{ background: "rgba(255,255,255,0.03)", minHeight: 220 }}
    >
      {/* Colored top-right number badge */}
      <div className="flex justify-between items-start">
        <div
          className={`w-12 h-12 rounded-xl bg-linear-to-br ${tool.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
          style={{ boxShadow: `0 8px 24px ${tool.glow}` }}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-[11px] font-bold tracking-widest" style={{ color: `${tool.color}60` }}>{tool.num}</span>
      </div>

      {/* Bottom text */}
      <div>
        <h4 className="text-base font-serif text-white mb-1.5">{tool.title}</h4>
        <p className="text-xs text-white/35 leading-relaxed mb-4">{tool.subtitle}</p>
        <span
          className="flex items-center gap-1.5 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-y-1 group-hover:translate-y-0"
          style={{ color: tool.color }}
        >
          Explore <FiArrowRight className="w-3 h-3" />
        </span>
      </div>

      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 20% 80%, ${tool.glow} 0%, transparent 60%)` }} />
    </Link>
  );
}