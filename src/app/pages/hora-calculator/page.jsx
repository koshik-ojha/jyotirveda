"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DateLocationBar from "@/components/DateLocationBar";

function isoDate(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : "";
}
function fmt(iso) { return iso ? new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) : "—"; }

const PLANET_ACCENT = {
  Sun: "from-amber-500/20 to-rose-500/10 border-amber-500/30",
  Moon: "from-sky-500/20 to-indigo-500/10 border-sky-500/30",
  Mars: "from-rose-500/20 to-amber-500/10 border-rose-500/30",
  Mercury: "from-emerald-500/20 to-sky-500/10 border-emerald-500/30",
  Jupiter: "from-veda-orange/20 to-veda-gold/10 border-veda-orange/30",
  Venus: "from-pink-500/20 to-rose-500/10 border-pink-500/30",
  Saturn: "from-slate-500/20 to-indigo-500/10 border-slate-500/30",
};

export default function HoraCalculatorPage() {
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!place?.latitude) return;
    fetch(`/api/hora?date=${isoDate(date)}&lat=${place.latitude}&lng=${place.longitude}`)
      .then((r) => r.json()).then((d) => d.hora && setData(d.hora));
  }, [date, place]);

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-3">Hora Calculator</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Each hour of day and night is ruled by a planet — start your important task in the right hora.
          </p>
        </section>

        <section className="px-6 pb-6 max-w-3xl mx-auto">
          <DateLocationBar date={date} setDate={setDate} place={place} setPlace={setPlace} />
        </section>

        {data && (
          <section className="px-6 pb-24 max-w-6xl mx-auto space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="glass border border-white/10 rounded-xl p-5">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Weekday Lord</div>
                <div className="font-serif text-2xl text-veda-gold mt-1">{data.weekdayLord}</div>
                <p className="text-xs text-white/50 mt-1">Rules the first hora after sunrise.</p>
              </div>
              {data.current && (
                <div className={`rounded-xl border bg-linear-to-br p-5 ${PLANET_ACCENT[data.current.lord]}`}>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/50">Currently Running</div>
                  <div className="font-serif text-2xl text-white mt-1">{data.current.lord} Hora</div>
                  <p className="text-xs text-white/65 mt-1 font-mono">{fmt(data.current.start)} – {fmt(data.current.end)}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {["day", "night"].map((phase) => (
                <div key={phase} className="glass border border-white/10 rounded-2xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-white/10 font-serif text-white capitalize">{phase} Horas</div>
                  <ul className="divide-y divide-white/5">
                    {data.horas.filter((h) => h.phase === phase).map((h) => (
                      <li key={h.index} className={`px-5 py-2 flex items-center justify-between text-sm ${data.current?.index === h.index ? "bg-veda-orange/10" : ""}`}>
                        <span className="text-white/55 w-6 font-mono text-xs">{h.index}</span>
                        <span className="text-white font-medium flex-1 ml-2">{h.lord}</span>
                        <span className="text-xs text-white/45">{h.trait}</span>
                        <span className="text-white/55 font-mono text-xs ml-4">{fmt(h.start)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
