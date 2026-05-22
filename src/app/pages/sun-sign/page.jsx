"use client";
import { useState } from "react";
import { FiSun } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

function isoDate(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : "";
}

const TIMEZONES = [
  { value: "Asia/Kolkata",     label: "Asia/Kolkata (India)" },
  { value: "Asia/Dubai",       label: "Asia/Dubai (UAE)" },
  { value: "Asia/Singapore",   label: "Asia/Singapore" },
  { value: "Europe/London",    label: "Europe/London (UK)" },
  { value: "America/New_York", label: "America/New_York" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles" },
  { value: "Australia/Sydney", label: "Australia/Sydney" },
  { value: "UTC",              label: "UTC" },
];

function SignCard({ title, data }) {
  return (
    <div className="glass border border-white/10 rounded-2xl p-6">
      <p className="text-[10px] uppercase font-bold tracking-widest text-veda-orange">{title}</p>
      <h2 className="font-serif text-4xl text-white mt-2">{data.sign.en}</h2>
      <p className="text-white/55 text-sm">{data.sign.hi} · {data.sign.sa}</p>
      <p className="text-xs text-white/40 mt-2 font-mono">Sun at {data.degInSign.toFixed(2)}° in {data.sign.en}</p>
      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
        <div><span className="text-white/40">Lord:</span> <span className="text-white">{data.sign.lord}</span></div>
        <div><span className="text-white/40">Element:</span> <span className="text-white">{data.sign.element}</span></div>
      </div>
    </div>
  );
}

export default function SunSignPage() {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("12:00");
  const [tz, setTz] = useState("Asia/Kolkata");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!date) return setError("Pick a birth date");
    setLoading(true);
    const res = await fetch("/api/sun-sign", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: isoDate(date), time, timezone: tz }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error);
    else setResult(data);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
            <FiSun className="w-3 h-3" /> Sun Sign Finder
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Sun Sign Calculator</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Where was the Sun at the moment of your birth? We show both Vedic (sidereal) and Western (tropical).
          </p>
        </section>

        <section className="px-6 pb-10 max-w-3xl mx-auto">
          <form onSubmit={submit} className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Birth Date</label>
                <DatePicker value={date} onChange={setDate} maxDate={new Date()} />
              </div>
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Birth Time</label>
                <TimePicker value={time} onChange={setTime} />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Timezone</label>
              <Select value={tz} onValueChange={setTz}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{TIMEZONES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
            <div className="flex justify-end">
              <Button type="submit" disabled={loading} variant="primary-fill" className="rounded-xl px-8">
                {loading ? "Computing…" : "Find My Sun Sign"}
              </Button>
            </div>
          </form>
        </section>

        {result && (
          <section className="px-6 pb-24 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SignCard title="Vedic (Sidereal · Lahiri)" data={result.vedic} />
              <SignCard title="Western (Tropical)"        data={result.tropical} />
            </div>
            <p className="text-center text-xs text-white/40 mt-5">
              The {result.ayanamsa.toFixed(2)}° difference is the Lahiri ayanamsa — the precession-shift between the two systems.
            </p>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
