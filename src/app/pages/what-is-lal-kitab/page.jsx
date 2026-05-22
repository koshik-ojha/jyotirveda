import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FiBookOpen, FiTool, FiCalendar, FiHeart, FiArrowRight } from "react-icons/fi";

export const metadata = {
  title: "What is Lal Kitab? — A 60-second Guide | JyotirVeda",
  description: "Lal Kitab is a 1939 Punjabi astrology system blending Vedic and Persian elements, with fixed houses and simple remedies (totke).",
};

const PILLARS = [
  { icon: FiBookOpen, title: "Origin", body: "Compiled in by author in India. The original five volumes are written in Urdu verse." },
  { icon: FiCalendar, title: "Fixed Houses", body: "Unlike classical Vedic astrology, the houses never rotate. House 1 is always Aries; House 12 always Pisces." },
  { icon: FiTool, title: "Totke (Remedies)", body: "Remedies use household objects — wheat, jaggery, mustard oil, copper coins — rather than expensive gemstones." },
  { icon: FiHeart, title: "Karmic Debts", body: "The system reads ancestral debts (rinanubandh) — Pitri Rinn, Matri Rinn — and prescribes acts of atonement." },
];

const DIFFERENCES = [
  { lal: "Houses 1–12 are fixed (Aries → Pisces)", vedic: "Houses rotate based on the ascendant" },
  { lal: "Remedies are mostly household actions", vedic: "Remedies often involve gemstones, yantras, complex pujas" },
  { lal: "35-year teva runs in a Saturn-rotation cycle", vedic: "Vimshottari dasha (120-year cycle) drives prediction" },
  { lal: "Friendships of planets differ from Parashara", vedic: "Classical Parashara friendship table" },
];

export default function WhatIsLalKitabPage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-12 px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
            <FiBookOpen className="w-3 h-3" /> 60-second Primer
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">What is Lal Kitab?</h1>
          <p className="text-lg text-white/65 max-w-2xl mx-auto leading-relaxed">
            "The Red Book" — a system of astrology unique to North India, combining Vedic foundations with everyday Punjabi practicality.
          </p>
        </section>

        <section className="px-6 pb-12 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="glass border border-white/10 rounded-2xl p-6">
                <div className="w-11 h-11 rounded-xl bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center mb-3">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-white">{p.title}</h3>
                <p className="text-sm text-white/65 mt-2 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif text-white text-center mb-6">Lal Kitab vs Classical Vedic</h2>
          <div className="glass border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-white/50 text-[10px] uppercase tracking-wider">
                <tr><th className="text-left px-5 py-3">Lal Kitab</th><th className="text-left px-5 py-3">Classical Parashara</th></tr>
              </thead>
              <tbody>
                {DIFFERENCES.map((d, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="px-5 py-3 text-white">{d.lal}</td>
                    <td className="px-5 py-3 text-white/65">{d.vedic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl text-white mb-3">Ready to read your own Lal Kitab?</h2>
          <p className="text-white/55 mb-5">Enter your birth details and we&apos;ll compute your teva live.</p>
          <Link href="/pages/lal-kitab" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #F18C3A, #D99152)", boxShadow: "0 4px 18px rgba(241,140,58,0.3)" }}>
            Open the Calculator <FiArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
