"use client";
import { useEffect, useState } from "react";
import { FiTrendingUp } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DatePicker } from "@/components/ui/date-picker";

function isoDate(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : "";
}

export default function AyanamsaCalculatorPage() {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!date) return;
    fetch(`/api/ayanamsa?date=${isoDate(date)}`)
      .then((r) => r.json()).then((d) => d.ayanamsas && setData(d));
  }, [date]);

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
            <FiTrendingUp className="w-3 h-3" /> Precession Offset
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Ayanamsa Calculator</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            The ayanamsa is the angle between tropical and sidereal zodiacs at any given moment. Seven major schools, side by side.
          </p>
        </section>

        <section className="px-6 pb-6 max-w-md mx-auto">
          <div className="glass border border-white/10 rounded-xl p-5">
            <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Date</label>
            <DatePicker value={date} onChange={setDate} />
          </div>
        </section>

        {data && (
          <section className="px-6 pb-24 max-w-4xl mx-auto">
            <div className="glass border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-serif text-white">For {new Date(data.date).toLocaleDateString()}</h3>
                <span className="text-xs text-white/40 font-mono">JD {data.julianDay.toFixed(4)}</span>
              </div>
              <ul className="divide-y divide-white/5">
                {Object.values(data.ayanamsas).map((a) => (
                  <li key={a.key} className="px-5 py-3 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">{a.label}</div>
                      <div className="text-xs text-white/45 mt-0.5">{a.note}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-veda-orange">{a.formatted}</div>
                      <div className="text-[10px] text-white/40 font-mono">{a.degrees.toFixed(6)}°</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-center text-xs text-white/40 mt-4 max-w-md mx-auto">
              For everyday Vedic work, <b className="text-veda-gold">Lahiri</b> is the Indian government standard. Different schools differ by ~1–6° depending on assumptions about the precession starting point.
            </p>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
