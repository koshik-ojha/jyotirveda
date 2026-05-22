import Link from "next/link";
import { FiArrowRight, FiZap } from "react-icons/fi";

const STATS = [
  { value: "10M+", label: "Kundlis Generated" },
  { value: "98%", label: "Accuracy Rate" },
  { value: "50K+", label: "Daily Users" },
];

export default function Hero() {
  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-bg">

      {/* Glow orbs */}
      <div className="absolute -top-20 -left-40 w-[700px] h-[700px] rounded-full animate-pulse-glow pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(241,140,58,0.18) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full animate-pulse-glow pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(111,78,220,0.16) 0%, transparent 70%)", animationDelay: "2s" }} />

      {/* Orbital rings — decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 640, height: 640, borderRadius: "50%", border: "1px solid rgba(241,140,58,0.1)", animation: "spin-slow 30s linear infinite" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 880, height: 880, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", animation: "spin-slow-reverse 22s linear infinite" }} />
      {/* Orbital dot */}
      <div className="absolute top-1/2 left-1/2 pointer-events-none animate-spin-slow"
        style={{ width: 640, height: 640, marginLeft: -320, marginTop: -320 }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-veda-orange shadow-[0_0_12px_4px_rgba(241,140,58,0.6)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-24">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-veda-orange/25 text-veda-orange text-xs font-bold uppercase tracking-[0.18em] mb-10"
          style={{ background: "rgba(241,140,58,0.08)" }}>
          <FiZap className="w-3 h-3" />
          AI-Powered Vedic Astrology
        </div>

        {/* Headline */}
        <h1 className="font-serif text-white leading-[1.06] tracking-tight mb-5"
          style={{ fontSize: "clamp(2.8rem, 7.5vw, 96px)" }}>
          Unlock the Cosmos.
          <br />
          <span className="text-gradient-gold"
            style={{ textShadow: "0 0 100px rgba(241,140,58,0.45)" }}>
            Know Your Destiny.
          </span>
        </h1>

        <p className="text-white/45 text-base sm:text-lg max-w-lg mx-auto mb-12 leading-relaxed">
          8,000 years of Vedic wisdom, amplified by AI. Get your personalized
          Kundli, daily horoscope &amp; life guidance — free.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/pages/free-kundli"
            className="group flex items-center gap-3 text-white font-bold text-sm px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #F18C3A, #D99152)",
              boxShadow: "0 0 50px rgba(241,140,58,0.4), inset 0 1px 0 rgba(255,255,255,0.15)"
            }}
          >
            Get Fee Kundli
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            className="text-white/60 hover:text-white font-semibold text-sm px-10 py-4 rounded-full border border-white/12 hover:border-white/25 transition-all duration-300 hover:scale-105"
            style={{ backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.04)" }}
          >
            Explore Features
          </button>
        </div>

        {/* Stats strip */}
        <div
          className="inline-flex divide-x divide-white/8 rounded-2xl border border-white/8 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)" }}
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="px-8 py-4 text-center">
              <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
              <div className="text-[10px] text-white/35 uppercase tracking-widest mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 inset-x-0 h-52 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0B0D17 0%, transparent 100%)" }} />
    </header>
  );
}
