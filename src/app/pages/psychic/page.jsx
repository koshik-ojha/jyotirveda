"use client";
import { useState } from "react";
import { FiEye, FiRefreshCw } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PsychicPage() {
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState("oracle");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    setLoading(true);
    setResult(null);
    const seed = `${Date.now()}|${question}`;
    const res = await fetch(`/api/psychic?mode=${mode}&q=${encodeURIComponent(question)}&seed=${encodeURIComponent(seed)}`);
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              <FiEye className="w-3 h-3" /> Psychic Oracle
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Ask the Oracle</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Centre your breath, hold your question gently, and pull a card.
            </p>
          </div>
        </section>

        <section className="px-6 pb-8 max-w-2xl mx-auto">
          <div className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Your Question</label>
              <Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="What do I need to know right now?" />
            </div>
            <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-full text-xs">
              <button type="button" onClick={() => setMode("oracle")} className={`px-4 py-1.5 rounded-full transition-colors ${mode === "oracle" ? "bg-veda-orange text-white" : "text-white/60"}`}>Oracle Card</button>
              <button type="button" onClick={() => setMode("yesno")} className={`px-4 py-1.5 rounded-full transition-colors ${mode === "yesno" ? "bg-veda-orange text-white" : "text-white/60"}`}>Yes / No</button>
            </div>
            <div className="flex justify-end">
              <Button onClick={ask} disabled={loading} variant="primary-fill" className="rounded-xl px-8">
                {loading ? "Drawing…" : result ? <><FiRefreshCw className="w-4 h-4 mr-1" /> Ask Again</> : "Pull a Card"}
              </Button>
            </div>
          </div>
        </section>

        {result && (
          <section className="px-6 pb-24 max-w-2xl mx-auto">
            <div className="glass border border-veda-orange/20 rounded-2xl p-8 text-center bg-linear-to-br from-veda-orange/10 to-veda-gold/5">
              {mode === "oracle" ? (
                <>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-veda-orange">Your Card</p>
                  <h2 className="font-serif text-4xl text-white mt-3 mb-5">{result.title}</h2>
                  <p className="text-lg text-white/80 leading-relaxed">{result.guidance}</p>
                </>
              ) : (
                <>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-veda-orange">The Oracle Says</p>
                  <h2 className="font-serif text-3xl text-white mt-4 leading-snug">{result.answer}</h2>
                </>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
