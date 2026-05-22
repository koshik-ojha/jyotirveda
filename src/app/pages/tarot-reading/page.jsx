"use client";
import { useState } from "react";
import { FiZap, FiRefreshCw } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SPREADS = [
  { key: "single",    label: "Single Card",    desc: "Quick clarity — one card on a focused question" },
  { key: "three",     label: "Three Card",     desc: "Past · Present · Future" },
  { key: "yesno",     label: "Yes / No",       desc: "Direct binary guidance" },
  { key: "loveTriad", label: "Love Triad",     desc: "You · Them · The dynamic" },
  { key: "career",    label: "Career Path",    desc: "Where you are · The lesson · What unfolds" },
  { key: "celtic",    label: "Celtic Cross",   desc: "Ten cards — the deepest spread" },
];

const CARD_COLORS = {
  Major: "from-veda-orange/20 to-veda-gold/10 border-veda-orange/40",
  Wands: "from-amber-500/20 to-rose-500/10 border-amber-500/30",
  Cups:  "from-sky-500/20 to-blue-500/10 border-sky-500/30",
  Swords:"from-indigo-500/20 to-violet-500/10 border-indigo-500/30",
  Pentacles: "from-emerald-500/20 to-amber-700/10 border-emerald-500/30",
};

export default function TarotReadingPage() {
  const [spread, setSpread] = useState("three");
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const draw = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/tarot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spread, question, seed: `${Date.now()}|${question}` }),
      });
      const data = await res.json();
      setResult(data.result);
    } finally { setLoading(false); }
  };

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              <FiZap className="w-3 h-3" /> 78-card deck · live draw
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Tarot Reading</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Pose a question, choose a spread, and let the deck speak.
            </p>
          </div>
        </section>

        <section className="px-6 pb-8 max-w-4xl mx-auto">
          <div className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-5">
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Your Question</label>
              <Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="What should I focus on this week?" />
            </div>
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-3 block">Spread</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {SPREADS.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSpread(s.key)}
                    className={`text-left rounded-xl border px-4 py-3 transition-colors ${
                      spread === s.key ? "border-veda-orange bg-veda-orange/10" : "border-white/10 bg-white/[0.03] hover:border-veda-orange/40"
                    }`}
                  >
                    <div className="text-sm font-medium text-white">{s.label}</div>
                    <div className="text-xs text-white/45 mt-0.5">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="button" disabled={loading} onClick={draw} variant="primary-fill" className="rounded-xl px-8">
                {loading ? "Shuffling…" : result ? (<><FiRefreshCw className="w-4 h-4 mr-1" /> Draw Again</>) : "Draw Cards"}
              </Button>
            </div>
          </div>
        </section>

        {result && (
          <section className="px-6 pb-24 max-w-6xl mx-auto">
            <div className="text-center mb-6">
              {result.question && <p className="text-white/55 italic">&ldquo;{result.question}&rdquo;</p>}
            </div>
            <div className={`grid gap-4 ${result.cards.length === 1 ? "grid-cols-1 max-w-md mx-auto" : result.cards.length <= 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"}`}>
              {result.cards.map((c, i) => {
                const color = CARD_COLORS[c.suit] || CARD_COLORS.Major;
                return (
                  <div key={i} className={`rounded-2xl border bg-linear-to-br p-5 ${color} ${c.reversed ? "rotate-180" : ""}`}>
                    <div className={`${c.reversed ? "-rotate-180" : ""}`}>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-white/50 mb-2">{c.position}</div>
                      <h3 className="font-serif text-lg text-white">{c.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-veda-gold mt-1">
                        {c.reversed ? "Reversed" : "Upright"} · {c.suit}
                      </p>
                      <p className="text-sm text-white/70 mt-3 leading-relaxed">{c.meaning}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
