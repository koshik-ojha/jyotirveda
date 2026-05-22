"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DateLocationBar from "@/components/DateLocationBar";

function isoDate(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : "";
}
function fmt(iso) { return iso ? new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) : "—"; }

const QUALITY_CLASS = {
  Excellent:    "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
  Auspicious:   "text-sky-300 bg-sky-500/10 border-sky-500/20",
  Inauspicious: "text-rose-300 bg-rose-500/10 border-rose-500/20",
};

function SlotList({ title, slots }) {
  return (
    <div className="glass border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-5 py-3 border-b border-white/10 font-serif text-white">{title}</div>
      <ul className="divide-y divide-white/5">
        {slots.map((s) => (
          <li key={s.slot} className="flex items-center justify-between px-5 py-2.5 text-sm">
            <span className="text-white font-medium">{s.name}</span>
            <span className="text-white/55 font-mono">{fmt(s.start)} – {fmt(s.end)}</span>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${QUALITY_CLASS[s.quality]}`}>{s.quality}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function GowriPanchangamPage() {
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!place?.latitude) return;
    fetch(`/api/gowri?date=${isoDate(date)}&lat=${place.latitude}&lng=${place.longitude}`)
      .then((r) => r.json()).then((d) => d.gowri && setData(d.gowri));
  }, [date, place]);

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-3">Gowri Panchangam</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Tamil Nalla Neram — eight day-slots and eight night-slots, each carrying its quality.
          </p>
        </section>

        <section className="px-6 pb-6 max-w-3xl mx-auto">
          <DateLocationBar date={date} setDate={setDate} place={place} setPlace={setPlace} />
        </section>

        {data && (
          <section className="px-6 pb-24 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            <SlotList title="Day Slots" slots={data.daySlots} />
            <SlotList title="Night Slots" slots={data.nightSlots} />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
