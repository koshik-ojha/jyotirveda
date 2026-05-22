"use client";
import { useEffect, useMemo, useState } from "react";
import { FiSun, FiHeart, FiBriefcase, FiActivity, FiDollarSign, FiStar, FiArrowRight } from "react-icons/fi";
import { RASHIS } from "@/lib/astro/constants";
import { useLanguage } from "@/lib/i18n/context";
import { pickLang } from "@/lib/i18n/useT";

const PERIOD_LABELS = {
  today:    { en: "Today",      hi: "आज",         gu: "આજે" },
  tomorrow: { en: "Tomorrow",   hi: "कल",         gu: "આવતીકાલે" },
  weekly:   { en: "This Week",  hi: "इस सप्ताह",  gu: "આ સપ્તાહ" },
  monthly:  { en: "This Month", hi: "इस माह",     gu: "આ મહિને" },
  yearly:   { en: "This Year",  hi: "इस वर्ष",    gu: "આ વર્ષે" },
};

const SECTIONS = [
  { key: "general", icon: FiSun,        en: "General", hi: "सामान्य",   gu: "સામાન્ય" },
  { key: "love",    icon: FiHeart,      en: "Love",    hi: "प्रेम",     gu: "પ્રેમ" },
  { key: "career",  icon: FiBriefcase,  en: "Career",  hi: "करियर",     gu: "કારકિર્દી" },
  { key: "health",  icon: FiActivity,   en: "Health",  hi: "स्वास्थ्य", gu: "આરોગ્ય" },
  { key: "finance", icon: FiDollarSign, en: "Finance", hi: "वित्त",      gu: "નાણાં" },
];

const HEADINGS = {
  horoscope: { en: "Horoscope", hi: "राशिफल", gu: "રાશિફળ" },
  pickSign:  { en: "Tap your moon sign for the full reading", hi: "अपनी राशि चुनें", gu: "તમારી રાશિ પસંદ કરો" },
  lord:      { en: "Lord", hi: "स्वामी", gu: "સ્વામી" },
  luckyColor:{ en: "Lucky color", hi: "शुभ रंग", gu: "શુભ રંગ" },
  luckyNum:  { en: "Lucky number", hi: "शुभ अंक", gu: "શુભ અંક" },
  bestTime:  { en: "Best time", hi: "शुभ समय", gu: "શુભ સમય" },
  direction: { en: "Direction", hi: "दिशा", gu: "દિશા" },
  liveTransits: { en: "Live Transits", hi: "वर्तमान गोचर", gu: "વર્તમાન ગોચર" },
  pickAbove: { en: "Pick your sign above for the detailed reading", hi: "ऊपर से अपनी राशि चुनें", gu: "ઉપરથી તમારી રાશિ પસંદ કરો" },
};

function gradeClass(score) {
  if (score >= 75) return "text-emerald-300 bg-emerald-500/10 border-emerald-500/20";
  if (score >= 60) return "text-sky-300 bg-sky-500/10 border-sky-500/20";
  if (score >= 45) return "text-amber-300 bg-amber-500/10 border-amber-500/20";
  return "text-rose-300 bg-rose-500/10 border-rose-500/20";
}

export default function HoroscopeViewer({ period = "today", lang: langProp, focus = null }) {
  const ctx = useLanguage();
  const lang = langProp ?? ctx.lang;
  const [horoscopes, setHoroscopes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIdx, setActiveIdx] = useState(focus != null ? focus : null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetch(`/api/horoscope?period=${period}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d.error) setError(d.error);
        else setHoroscopes(d.horoscopes || []);
      })
      .catch(() => !cancelled && setError("Failed to load horoscope"))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [period]);

  const active = useMemo(() => (activeIdx != null ? horoscopes[activeIdx] : null), [activeIdx, horoscopes]);
  const periodLabel = pickLang(PERIOD_LABELS[period], lang) || period;
  const h = (key) => pickLang(HEADINGS[key], lang);

  return (
    <div className="space-y-8">
      {/* 12 sign chips with score */}
      <div>
        <div className="flex items-end justify-between mb-4 flex-wrap gap-3">
          <h3 className="font-serif text-xl text-white">
            {h("horoscope")} — {periodLabel}
          </h3>
          <p className="text-sm text-white/40">{h("pickSign")}</p>
        </div>

        {loading ? (
          <div className="text-center py-10 text-white/40">Loading…</div>
        ) : error ? (
          <div className="text-rose-300 text-sm">{error}</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {horoscopes.map((h, i) => {
              const isActive = activeIdx === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`text-left rounded-xl border p-4 transition-colors group ${
                    isActive
                      ? "border-veda-orange bg-veda-orange/10"
                      : "border-white/10 bg-white/[0.03] hover:border-veda-orange/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-white text-base">
                      {pickLang(h.sign, lang)}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${gradeClass(h.score)}`}>
                      {h.score}
                    </span>
                  </div>
                  <p className="text-xs text-white/45">
                    {lang === "en" ? h.sign.sa : h.sign.en}
                  </p>
                  <p className="text-[11px] text-veda-gold/70 mt-1">{h.rating}</p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Detailed reading for selected sign */}
      {active && (
        <div className="glass border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
            <div>
              <h3 className="font-serif text-3xl text-white">
                {pickLang(active.sign, lang)}
              </h3>
              <p className="text-white/40 text-sm mt-0.5">
                {active.sign.sa} · {h("lord")} {active.signLord} · {periodLabel}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-3xl font-serif text-white">{active.score}<span className="text-base text-white/40">/100</span></div>
                <div className={`text-xs font-medium ${gradeClass(active.score).split(" ")[0]}`}>{active.rating}</div>
              </div>
            </div>
          </div>

          {/* Lucky chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              [h("luckyColor"), active.lucky.color],
              [h("luckyNum"),   active.lucky.number],
              [h("bestTime"),   active.lucky.time],
              [h("direction"),  active.lucky.direction],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{k}</div>
                <div className="text-white mt-0.5 font-serif">{v}</div>
              </div>
            ))}
          </div>

          {/* Reading sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SECTIONS.map((s) => (
              <div key={s.key} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="w-9 h-9 rounded-lg bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center shrink-0">
                  <s.icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/55">
                    {pickLang(s, lang)}
                  </h4>
                  <p className="text-sm text-white/70 mt-1 leading-relaxed">
                    {active.readings[s.key]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Active transits */}
          <div className="mt-6">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/45 mb-3">
              {h("liveTransits")}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {active.aspects.map((a, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/65">
                  <FiArrowRight className="w-3.5 h-3.5 text-veda-orange shrink-0" />
                  <span>{a.line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!active && !loading && (
        <p className="text-center text-white/35 text-sm">
          {h("pickAbove")}
        </p>
      )}
    </div>
  );
}
