"use client";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlacePicker from "@/components/PlacePicker";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function IndianCalendarPage() {
  const now = new Date();
  const [view, setView] = useState({ y: now.getFullYear(), m: now.getMonth() + 1 });
  const [place, setPlace] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!place?.latitude) return;
    fetch(`/api/panchang-month?year=${view.y}&month=${view.m}&lat=${place.latitude}&lng=${place.longitude}`)
      .then((r) => r.json()).then((d) => d.month && setData(d.month));
  }, [view, place]);

  useEffect(() => {
    if (place || typeof navigator === "undefined" || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const r = await fetch(`/api/geocode?q=${pos.coords.latitude},${pos.coords.longitude}`);
        const j = await r.json();
        if (j.results?.[0]) setPlace(j.results[0]);
      } catch {}
    }, () => {}, { timeout: 5000 });
  }, [place]);

  const prev = () => setView((v) => v.m === 1 ? { y: v.y - 1, m: 12 } : { ...v, m: v.m - 1 });
  const next = () => setView((v) => v.m === 12 ? { y: v.y + 1, m: 1 } : { ...v, m: v.m + 1 });

  const firstWeekday = new Date(view.y, view.m - 1, 1).getDay();
  const cells = data ? [...Array(firstWeekday).fill(null), ...data.days] : [];

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-8 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-3">Indian Calendar</h1>
          <p className="text-lg text-white/60">Vedic tithi, nakshatra and vara mapped onto the Gregorian month.</p>
        </section>

        <section className="px-6 pb-6 max-w-3xl mx-auto">
          <div className="glass border border-white/10 rounded-xl p-4">
            <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Location</label>
            <PlacePicker value={place} onChange={setPlace} />
          </div>
        </section>

        <section className="px-6 pb-24 max-w-6xl mx-auto">
          <div className="glass border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <button onClick={prev} className="p-2 rounded-lg hover:bg-white/10"><FiChevronLeft /></button>
              <h3 className="font-serif text-xl text-white">{MONTHS[view.m - 1]} {view.y}</h3>
              <button onClick={next} className="p-2 rounded-lg hover:bg-white/10"><FiChevronRight /></button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {WEEKDAYS.map((d) => <div key={d} className="text-center text-[10px] uppercase font-bold tracking-widest text-white/40 py-1">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {cells.map((day, i) => {
                if (!day) return <div key={`e-${i}`} />;
                const dayNum = parseInt(day.date.slice(-2), 10);
                const isToday = day.date === `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
                return (
                  <div key={day.date}
                    className={`rounded-lg border p-2 text-xs min-h-[78px] ${
                      isToday ? "border-veda-orange bg-veda-orange/10" : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex justify-between items-baseline">
                      <span className="font-serif text-lg text-white">{dayNum}</span>
                      <span className={`text-[9px] uppercase tracking-wider ${day.tithi?.paksha === "Shukla" ? "text-veda-gold/70" : "text-white/40"}`}>
                        {day.tithi?.paksha?.[0]}
                      </span>
                    </div>
                    <div className="text-[10px] text-white/55 mt-1 truncate">{day.tithi?.name}</div>
                    <div className="text-[10px] text-white/35 truncate">{day.nakshatra}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
