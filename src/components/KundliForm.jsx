"use client";
import { useEffect, useState } from "react";
import { FiSettings, FiStar, FiChevronDown, FiRotateCcw } from "react-icons/fi";
import { useLanguage } from "@/lib/i18n/context";

import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { Button } from "@/components/ui/button";
import PlacePicker from "@/components/PlacePicker";
import KundliResult from "@/components/KundliResult";

function toISODate(d) {
  if (!d) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function normalizeTime(t) {
  // Accept "HH:mm" or "h:mm AM/PM" — convert to "HH:mm".
  if (!t) return "";
  const ampm = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (ampm) {
    let h = parseInt(ampm[1], 10);
    const m = ampm[2];
    if (/PM/i.test(ampm[3]) && h !== 12) h += 12;
    if (/AM/i.test(ampm[3]) && h === 12) h = 0;
    return `${String(h).padStart(2,"0")}:${m}`;
  }
  return t;
}

const DEFAULT_OPTIONS = { ayanamsa: "LAHIRI", houseSystem: "WHOLE_SIGN", nodeType: "TRUE" };

export default function KundliForm({ lang: langProp }) {
  const ctx = useLanguage();
  const lang = langProp ?? ctx.lang;
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [birthTime, setBirthTime] = useState("");
  const [place, setPlace] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [kundli, setKundli] = useState(null);

  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [catalog, setCatalog] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/astro-options")
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setCatalog(d); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const resetAdvanced = () => setOptions(DEFAULT_OPTIONS);
  const advancedChanged =
    options.ayanamsa !== DEFAULT_OPTIONS.ayanamsa ||
    options.houseSystem !== DEFAULT_OPTIONS.houseSystem ||
    options.nodeType !== DEFAULT_OPTIONS.nodeType;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!birthDate) return setError("Please select a birth date");
    if (!birthTime) return setError("Please select a birth time");
    if (!place || place.latitude == null || !place.timezone) {
      return setError("Please pick a birth place from the suggestions (so we know its timezone)");
    }

    setSubmitting(true);
    setKundli(null);
    try {
      const res = await fetch("/api/kundli", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          gender,
          date: toISODate(birthDate),
          time: normalizeTime(birthTime),
          latitude: place.latitude,
          longitude: place.longitude,
          timezone: place.timezone,
          options,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to compute kundli");
        return;
      }
      setKundli(data.kundli);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="lg:col-span-2 glass rounded-2xl p-8 md:p-10 border border-white/10">
        <div className="flex items-start gap-4 mb-8">
          <div className="p-3 bg-veda-orange/15 border border-veda-orange/20 rounded-xl text-veda-orange">
            <FiStar className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-serif text-white">
              {lang === "hi" ? "व्यक्तिगत कुंडली" : "Personalized Kundli"}
            </h2>
            <p className="text-white/40 text-sm mt-1">
              {lang === "hi"
                ? "स्विस एफेमेरिस — परिशुद्ध सिडेरियल गणना"
                : "Swiss Ephemeris precision • Sidereal Lahiri ayanamsa"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase tracking-wide">
              {lang === "hi" ? "पूरा नाम" : "Full Name"}
            </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase tracking-wide">
              {lang === "hi" ? "लिंग" : "Gender"}
            </label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase tracking-wide">
              {lang === "hi" ? "जन्म तिथि" : "Birth Date"}
            </label>
            <DatePicker
              value={birthDate}
              onChange={setBirthDate}
              placeholder="Select birth date"
              maxDate={new Date()}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase tracking-wide">
              {lang === "hi" ? "जन्म समय" : "Birth Time"}
            </label>
            <TimePicker
              value={birthTime}
              onChange={setBirthTime}
              placeholder="Select birth time"
              use24Hour={false}
              minuteStep={1}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase tracking-wide">
              {lang === "hi" ? "जन्म स्थान" : "Birth Place"}
            </label>
            <PlacePicker value={place} onChange={setPlace} />
          </div>

          {error && (
            <div className="md:col-span-2 text-sm text-red-400/90 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="md:col-span-2">
            <button
              type="button"
              onClick={() => setAdvancedOpen((v) => !v)}
              aria-expanded={advancedOpen}
              className="inline-flex items-center gap-2 text-veda-gold hover:text-veda-orange transition-colors text-sm font-medium"
            >
              <FiSettings className="w-4 h-4" />
              {lang === "hi" ? "उन्नत सेटिंग्स" : "Advanced Settings"}
              {advancedChanged && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-veda-orange/15 text-veda-orange border border-veda-orange/30">
                  customised
                </span>
              )}
              <FiChevronDown className={`w-4 h-4 transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
            </button>

            {advancedOpen && (
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-start justify-between mb-4">
                  <p className="text-xs text-white/45 leading-relaxed max-w-md">
                    {lang === "hi"
                      ? "ये विकल्प गणना के नियम बदलते हैं — जब तक आप उद्देश्यपूर्वक नहीं चुन रहे, डिफ़ॉल्ट छोड़ दें।"
                      : "These options change how the chart is calculated. Leave defaults unless you specifically want a different tradition."}
                  </p>
                  {advancedChanged && (
                    <button
                      type="button"
                      onClick={resetAdvanced}
                      className="flex items-center gap-1.5 text-xs text-white/50 hover:text-veda-orange transition-colors shrink-0 ml-4"
                    >
                      <FiRotateCcw className="w-3.5 h-3.5" />
                      {lang === "hi" ? "रीसेट" : "Reset"}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-white/60 uppercase tracking-wide">
                      {lang === "hi" ? "अयनांश" : "Ayanamsa"}
                    </label>
                    <Select
                      value={options.ayanamsa}
                      onValueChange={(v) => setOptions((o) => ({ ...o, ayanamsa: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(catalog?.ayanamsas ?? []).map((a) => (
                          <SelectItem key={a.key} value={a.key}>{a.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-[11px] text-white/35 leading-snug">
                      {catalog?.ayanamsas?.find((a) => a.key === options.ayanamsa)?.note}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-white/60 uppercase tracking-wide">
                      {lang === "hi" ? "भाव पद्धति" : "House System"}
                    </label>
                    <Select
                      value={options.houseSystem}
                      onValueChange={(v) => setOptions((o) => ({ ...o, houseSystem: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(catalog?.houseSystems ?? []).map((h) => (
                          <SelectItem key={h.key} value={h.key}>{h.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-[11px] text-white/35 leading-snug">
                      {catalog?.houseSystems?.find((h) => h.key === options.houseSystem)?.note}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-white/60 uppercase tracking-wide">
                      {lang === "hi" ? "राहु नोड प्रकार" : "Rahu Node Type"}
                    </label>
                    <Select
                      value={options.nodeType}
                      onValueChange={(v) => setOptions((o) => ({ ...o, nodeType: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(catalog?.nodeTypes ?? []).map((n) => (
                          <SelectItem key={n.key} value={n.key}>{n.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-[11px] text-white/35 leading-snug">
                      {catalog?.nodeTypes?.find((n) => n.key === options.nodeType)?.note}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end mt-2">
            <Button
              variant="primary-fill"
              size="md"
              type="submit"
              disabled={submitting}
              className="rounded-xl px-8 bg-zinc-700 hover:bg-zinc-600 text-white"
            >
              {submitting
                ? (lang === "hi" ? "गणना हो रही है…" : "Computing…")
                : (lang === "hi" ? "मेरी जन्म कुंडली बनाएं" : "Generate My Birth Chart")}
            </Button>
          </div>
        </form>
      </div>

      {kundli && <KundliResult kundli={kundli} lang={lang} />}
    </div>
  );
}
