"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlacePicker from "@/components/PlacePicker";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function MonthlyPanchangPage() {
  const now = new Date();
  const [year,  setYear]  = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [place, setPlace] = useState(null);
  const [data,  setData]  = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!place?.latitude) return;
    setLoading(true);
    fetch(`/api/panchang-month?year=${year}&month=${month}&lat=${place.latitude}&lng=${place.longitude}`)
      .then((r) => r.json()).then((d) => d.month && setData(d.month))
      .finally(() => setLoading(false));
  }, [year, month, place]);

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

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-3">Monthly Panchang</h1>
          <p className="text-lg text-white/60">Every day&apos;s panchang in one table.</p>
        </section>

        <section className="px-6 pb-6 max-w-5xl mx-auto">
          <div className="glass border border-white/10 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Month</label>
              <Select value={String(month)} onValueChange={(v) => setMonth(parseInt(v, 10))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{MONTHS.map((m, i) => <SelectItem key={m} value={String(i + 1)}>{m}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Year</label>
              <Select value={String(year)} onValueChange={(v) => setYear(parseInt(v, 10))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{Array.from({length: 11}, (_, i) => now.getFullYear() - 3 + i).map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Location</label>
              <PlacePicker value={place} onChange={setPlace} />
            </div>
          </div>
        </section>

        {loading && <p className="text-center text-white/40 py-6">Computing…</p>}

        {data && (
          <section className="px-6 pb-24 max-w-7xl mx-auto">
            <div className="glass border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 text-white/50 text-[10px] uppercase tracking-wider">
                    <tr>
                      <th className="text-left px-3 py-3">Date</th>
                      <th className="text-left px-3 py-3">Vara</th>
                      <th className="text-left px-3 py-3">Tithi</th>
                      <th className="text-left px-3 py-3">Paksha</th>
                      <th className="text-left px-3 py-3">Nakshatra</th>
                      <th className="text-left px-3 py-3">Yoga</th>
                      <th className="text-left px-3 py-3">Karana</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.days.map((d) => (
                      <tr key={d.date} className="border-t border-white/5 hover:bg-white/[0.02]">
                        <td className="px-3 py-2 text-white/80 font-mono">{d.date}</td>
                        <td className="px-3 py-2 text-white">{d.weekday}</td>
                        <td className="px-3 py-2 text-white/85">{d.tithi?.name || "—"}</td>
                        <td className="px-3 py-2 text-white/55">{d.tithi?.paksha || "—"}</td>
                        <td className="px-3 py-2 text-white/85">{d.nakshatra}</td>
                        <td className="px-3 py-2 text-white/55">{d.yoga}</td>
                        <td className="px-3 py-2 text-white/55">{d.karana}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
