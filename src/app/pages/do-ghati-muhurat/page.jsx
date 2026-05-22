"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DateLocationBar from "@/components/DateLocationBar";

function isoDate(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : "";
}
function fmt(iso) { return iso ? new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) : "—"; }

const NATURE_CLASS = {
  "Very Auspicious": "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
  Auspicious:        "text-sky-300 bg-sky-500/10 border-sky-500/20",
  Inauspicious:      "text-rose-300 bg-rose-500/10 border-rose-500/20",
};

function MuhurtaList({ title, items }) {
  return (
    <div className="glass border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-5 py-3 border-b border-white/10 font-serif text-white">{title}</div>
      <ul className="divide-y divide-white/5">
        {items.map((m) => (
          <li key={m.index} className="flex items-center justify-between px-5 py-2 text-sm gap-3">
            <span className="text-white/45 font-mono w-6">{m.index}</span>
            <span className="text-white font-medium flex-1 truncate">{m.name}</span>
            <span className="text-white/55 font-mono text-xs whitespace-nowrap">{fmt(m.start)} – {fmt(m.end)}</span>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${NATURE_CLASS[m.nature]}`}>{m.nature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DoGhatiMuhuratPage() {
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!place?.latitude) return;
    fetch(`/api/muhurta?date=${isoDate(date)}&lat=${place.latitude}&lng=${place.longitude}`)
      .then((r) => r.json()).then((d) => d.muhurta && setData(d.muhurta));
  }, [date, place]);

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-3">Do Ghati Muhurat</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            30 named muhurats — fifteen for the day, fifteen for the night, each 48 minutes (2 ghati).
          </p>
        </section>

        <section className="px-6 pb-6 max-w-3xl mx-auto">
          <DateLocationBar date={date} setDate={setDate} place={place} setPlace={setPlace} />
        </section>

        {data && (
          <section className="px-6 pb-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            <MuhurtaList title="Day Muhurtas" items={data.day} />
            <MuhurtaList title="Night Muhurtas" items={data.night} />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
