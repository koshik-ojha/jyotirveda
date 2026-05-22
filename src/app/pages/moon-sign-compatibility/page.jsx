"use client";
import { useEffect, useState } from "react";
import { FiMoon } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RashiPicker from "@/components/RashiPicker";
import SignPairResult from "@/components/compatibility/SignPairResult";
import { Button } from "@/components/ui/button";

export default function MoonSignCompatibilityPage() {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (a == null || b == null) { setResult(null); return; }
    fetch("/api/compatibility", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "moon-sign", aIdx: a, bIdx: b }),
    }).then((r) => r.json()).then((d) => d.result && setResult(d.result));
  }, [a, b]);

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
            <FiMoon className="w-3 h-3" /> Vedic Rashi Compatibility
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Moon Sign Compatibility</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Pick both partners' moon signs to see the Vedic compatibility lens — elements, lords, bhakoot.
          </p>
        </section>

        <section className="px-6 pb-12 max-w-6xl mx-auto space-y-6">
          <RashiPicker value={a} onChange={setA} label="Your Moon Sign" />
          <RashiPicker value={b} onChange={setB} label="Partner's Moon Sign" />
          {a != null && b != null && (
            <div className="text-center">
              <Button type="button" variant="ghost" onClick={() => { setA(null); setB(null); }} className="text-white/50">Reset</Button>
            </div>
          )}
        </section>

        {result && (
          <section className="px-6 pb-24 max-w-3xl mx-auto">
            <SignPairResult result={result} lensLabel="Moon Sign Match" />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
