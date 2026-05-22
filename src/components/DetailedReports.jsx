import Link from "next/link";
import { FiActivity, FiAlertCircle, FiHeart, FiTrendingUp, FiArrowRight, FiArrowUpRight } from "react-icons/fi";

const REPORTS = [
  {
    title: "Kaalsarp Dosha",
    description: "Discover the influence of Kaal Sarp Yoga in your chart and get powerful remedies from expert astrologers.",
    cta: "Get Report",
    href: "/pages/kaalsarp-yoga",
    Icon: FiAlertCircle,
    color: "#ef4444",
    gradient: "from-red-500 to-rose-600",
    glow: "rgba(239,68,68,0.12)",
  },
  {
    title: "Sade Sati Report",
    description: "Understand the 7.5-year Saturn transit and its effects on your life, with personalized remedies.",
    cta: "Get Report",
    href: "/pages/sade-sati-report",
    Icon: FiActivity,
    color: "#6366f1",
    gradient: "from-indigo-500 to-violet-600",
    glow: "rgba(99,102,241,0.12)",
  },
  {
    title: "Mangal Dosha",
    description: "Check compatibility issues from Mars placement and receive guidance for harmonious relationships.",
    cta: "Check Compatibility",
    href: "/pages/mangal-dosha-report",
    Icon: FiHeart,
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.12)",
  },
  {
    title: "Transit Today",
    description: "Real-time planetary transit analysis with career, finance, and health predictions for today.",
    cta: "View Transit",
    href: "/pages/transit-today",
    Icon: FiTrendingUp,
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.12)",
  },
];

export default function DetailedReports() {
  return (
    <section className="py-24 px-6 bg-veda-dark">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-end mb-14">
          <div>
            <p className="text-veda-orange text-xs font-bold uppercase tracking-[0.2em] mb-3">In-Depth Analysis</p>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              Detailed Reports &amp; <span className="text-gradient-gold">Analysis</span>
            </h2>
          </div>
          <Link href="/pages/kaalsarp-yoga" className="hidden md:flex items-center gap-2 text-white/35 hover:text-veda-orange text-xs font-bold uppercase tracking-widest transition-colors group">
            View All <FiArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Horizontal cards with gradient left-border accent */}
        <div className="flex flex-col gap-4">
          {REPORTS.map((report) => {
            const Icon = report.Icon;
            return (
              <Link
                key={report.title}
                href={report.href}
                className="group flex items-center gap-6 p-6 rounded-2xl border border-white/8 hover:border-white/20 hover:scale-[1.01] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                {/* Hover glow — left origin + bottom-left corner */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 5% 50%, ${report.glow.replace('0.12','0.28')} 0%, transparent 50%), radial-gradient(circle at 10% 90%, ${report.glow.replace('0.12','0.18')} 0%, transparent 40%)` }} />

                {/* Colored left accent bar */}
                <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
                  style={{ background: `linear-gradient(to bottom, ${report.color}, transparent)` }} />

                {/* Icon */}
                <div
                  className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `linear-gradient(135deg, ${report.glow}, rgba(255,255,255,0.03))`, border: `1px solid ${report.color}25` }}
                >
                  <Icon className="w-7 h-7" style={{ color: report.color }} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-serif text-white mb-1">{report.title}</h4>
                  <p className="text-sm text-white/35 leading-relaxed line-clamp-2">{report.description}</p>
                </div>

                {/* CTA */}
                <span
                  className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold border border-white/10 text-white/50 group-hover:text-white group-hover:border-white/20 transition-all duration-200 whitespace-nowrap"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  {report.cta}
                  <FiArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
