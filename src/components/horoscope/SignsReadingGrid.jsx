"use client";
import { useEffect, useState } from "react";
import { ZODIAC, SAMPLE_PREDICTIONS } from "@/lib/zodiac";

/**
 * Sign-by-sign reading grid.
 *
 * - When `period` is given ("today" | "tomorrow" | "weekly" | "monthly" | "yearly"),
 *   the grid fetches live horoscope data from /api/horoscope and renders the
 *   computed reading + score for each sign.
 * - Without `period`, falls back to the static `predictions` prop (legacy).
 */
export default function SignsReadingGrid({
  periodLabel,
  period,            // when set → dynamic mode
  predictions = SAMPLE_PREDICTIONS,
  showHindi = true,
  readingKey = "general",  // which reading field to surface (general|love|career|health|finance)
}) {
  const [dynamic, setDynamic] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!period) return;
    let cancelled = false;
    setLoading(true);
    fetch(`/api/horoscope?period=${period}`)
      .then((r) => r.json())
      .then((d) => { if (!cancelled && d.horoscopes) setDynamic(d.horoscopes); })
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [period]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {ZODIAC.map((sign, idx) => {
        const live = dynamic?.[idx];
        const reading = live ? live.readings[readingKey] || live.readings.general : predictions[sign.en];
        const score = live?.score;
        const rating = live?.rating;
        return (
          <div
            key={sign.en}
            className="glass border border-white/10 rounded-2xl p-6 hover:border-veda-orange/40 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-veda-orange/15 border border-veda-orange/20 text-veda-orange text-2xl flex items-center justify-center">
                {sign.symbol}
              </div>
              <div className="text-right">
                {score != null ? (
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-veda-gold/30 bg-veda-gold/10 text-veda-gold">
                    {score} · {rating}
                  </span>
                ) : (
                  <p className="text-[10px] uppercase tracking-widest text-white/40">{sign.dates}</p>
                )}
                <p className="text-[10px] uppercase tracking-widest text-veda-gold/70 mt-0.5">
                  {sign.element} • {sign.lord}
                </p>
              </div>
            </div>
            <h3 className="font-serif text-xl text-white">{sign.en}</h3>
            {showHindi && <p className="text-sm text-white/40 mb-3">{sign.hi}</p>}
            {periodLabel && (
              <p className="text-[10px] uppercase tracking-widest text-veda-orange mb-2 mt-2">{periodLabel}</p>
            )}
            <p className="text-sm text-white/55 leading-relaxed">
              {loading && !live ? "Loading…" : reading}
            </p>
          </div>
        );
      })}
    </div>
  );
}
