"use client";
import { useEffect, useRef, useState } from "react";
import { FiStar, FiSun, FiMoon, FiClock, FiCompass, FiDownload, FiPrinter } from "react-icons/fi";
import NorthIndianChart from "@/components/charts/NorthIndianChart";
import SouthIndianChart from "@/components/charts/SouthIndianChart";
import { planetsBySign, navamsaChart } from "@/lib/astro/chartLayout";

function StatCard({ icon: Icon, label, value, subtitle }) {
  return (
    <div className="glass border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-9 h-9 rounded-lg bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-2xl font-serif text-white">{value}</div>
      {subtitle && <div className="text-xs text-white/50 mt-1">{subtitle}</div>}
    </div>
  );
}

export default function KundliResult({ kundli, lang = "en" }) {
  const rootRef = useRef(null);
  const [chartStyle, setChartStyle] = useState("north"); // "north" | "south"

  // Force-open every <details> for print, then restore each one's prior state.
  useEffect(() => {
    const restore = new WeakMap();

    const onBeforePrint = () => {
      const root = rootRef.current;
      if (!root) return;
      root.querySelectorAll("details").forEach((el) => {
        restore.set(el, el.open);
        el.open = true;
      });
    };
    const onAfterPrint = () => {
      const root = rootRef.current;
      if (!root) return;
      root.querySelectorAll("details").forEach((el) => {
        if (restore.has(el)) el.open = restore.get(el);
      });
    };

    window.addEventListener("beforeprint", onBeforePrint);
    window.addEventListener("afterprint", onAfterPrint);
    return () => {
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("afterprint", onAfterPrint);
    };
  }, []);

  if (!kundli) return null;
  const lbl = (o) => (lang === "hi" ? o.hi || o.en : o.en);

  const handleExport = () => {
    if (typeof window !== "undefined") window.print();
  };

  const subject = kundli.input?.name || (lang === "hi" ? "जन्म कुंडली" : "Birth Chart");

  return (
    <div ref={rootRef} className="space-y-8 print-area">
      {/* Print-only header — invisible on screen, shown on PDF */}
      <div className="hidden print:block print:mb-6">
        <h1 className="text-3xl font-serif">{subject}</h1>
        <p className="text-sm opacity-70 mt-1">
          {new Date(kundli.input.birthUTC).toUTCString()} ·{" "}
          {kundli.input.latitude.toFixed(3)}°, {kundli.input.longitude.toFixed(3)}°
        </p>
        <p className="text-xs opacity-60 mt-0.5">
          {kundli.options?.ayanamsa?.label || "Lahiri"} · {kundli.options?.houseSystem?.label || "Whole Sign"} ·
          Ayanamsa {kundli.ayanamsa.toFixed(3)}°
        </p>
      </div>

      {/* Export bar — hidden in print */}
      <div className="no-print flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-serif text-2xl text-white">
            {lang === "hi" ? "आपकी कुंडली" : "Your Birth Chart"}
          </h3>
          <p className="text-sm text-white/40 mt-0.5">
            {lang === "hi" ? "नीचे की रिपोर्ट PDF के रूप में सहेजें" : "Save the report below as a PDF"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #F18C3A, #D99152)", boxShadow: "0 4px 18px rgba(241,140,58,0.3)" }}
          >
            <FiDownload className="w-4 h-4" />
            {lang === "hi" ? "PDF डाउनलोड करें" : "Download PDF"}
          </button>
          <button
            type="button"
            onClick={handleExport}
            title={lang === "hi" ? "प्रिंट करें" : "Print"}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:text-veda-orange hover:border-veda-orange/40 transition-colors"
          >
            <FiPrinter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={FiCompass}
          label="Lagna (Ascendant)"
          value={lbl(kundli.ascendant.sign)}
          subtitle={kundli.ascendant.degInSignFormatted}
        />
        <StatCard
          icon={FiSun}
          label="Sun Sign"
          value={lbl(kundli.sunRashi)}
        />
        <StatCard
          icon={FiMoon}
          label="Moon Sign"
          value={lbl(kundli.moonRashi)}
        />
        <StatCard
          icon={FiStar}
          label="Janma Nakshatra"
          value={lbl(kundli.janmaNakshatra)}
          subtitle={`Pada ${kundli.janmaNakshatra.pada}`}
        />
      </div>

      {/* Vedic Charts: D1 (Rashi) + D9 (Navamsa) */}
      <div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h3 className="font-serif text-xl text-white">{lang === "hi" ? "वैदिक कुंडली चार्ट" : "Vedic Charts"}</h3>
            <p className="text-sm text-white/40 mt-0.5">
              {lang === "hi"
                ? "D1 (लग्न / राशि) और D9 (नवांश)"
                : "D1 (Lagna / Rashi) and D9 (Navamsa)"}
            </p>
          </div>
          <div className="no-print inline-flex p-1 bg-white/5 border border-white/10 rounded-full text-xs">
            <button
              type="button"
              onClick={() => setChartStyle("north")}
              className={`px-4 py-1.5 rounded-full transition-colors ${
                chartStyle === "north" ? "bg-veda-orange text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {lang === "hi" ? "उत्तर भारतीय" : "North Indian"}
            </button>
            <button
              type="button"
              onClick={() => setChartStyle("south")}
              className={`px-4 py-1.5 rounded-full transition-colors ${
                chartStyle === "south" ? "bg-veda-orange text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {lang === "hi" ? "दक्षिण भारतीय" : "South Indian"}
            </button>
          </div>
        </div>

        {(() => {
          const d1Buckets = planetsBySign(kundli.planets);
          const d9 = navamsaChart(kundli);
          const ChartCmp = chartStyle === "north" ? NorthIndianChart : SouthIndianChart;
          const d1Title = lang === "hi" ? "D1 — लग्न / राशि कुंडली" : "D1 — Lagna / Rashi Chart";
          const d9Title = lang === "hi" ? "D9 — नवांश कुंडली" : "D9 — Navamsa Chart";
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ChartCmp
                ascSignIdx={kundli.ascendant.sign.index}
                planetsBySign={d1Buckets}
                title={d1Title}
              />
              <ChartCmp
                ascSignIdx={d9.ascSignIdx}
                planetsBySign={d9.planetsBySign}
                title={d9Title}
              />
            </div>
          );
        })()}
      </div>

      {/* Planet table */}
      <div className="glass border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-serif text-xl text-white">Planetary Positions</h3>
          <span className="text-xs text-white/40">Sidereal • Lahiri Ayanamsa {kundli.ayanamsa.toFixed(3)}°</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/50 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="text-left px-6 py-3">Planet</th>
                <th className="text-left px-4 py-3">Rashi</th>
                <th className="text-left px-4 py-3">Degree</th>
                <th className="text-left px-4 py-3">Nakshatra</th>
                <th className="text-left px-4 py-3">House</th>
                <th className="text-left px-4 py-3">Motion</th>
              </tr>
            </thead>
            <tbody>
              {kundli.planets.map((p) => (
                <tr key={p.key} className="border-t border-white/5 hover:bg-white/[0.02]">
                  <td className="px-6 py-3 font-medium text-white">
                    <span className="text-veda-gold mr-2">{p.meta?.symbol}</span>
                    {lbl(p.meta || { en: p.key })}
                  </td>
                  <td className="px-4 py-3 text-white/80">{lbl(p.sign)}</td>
                  <td className="px-4 py-3 text-white/60 font-mono text-xs">{p.degInSignFormatted}</td>
                  <td className="px-4 py-3 text-white/70">{lbl(p.nakshatra)} <span className="text-white/40">({p.nakshatra.pada})</span></td>
                  <td className="px-4 py-3 text-white/80">H{p.house}</td>
                  <td className="px-4 py-3">
                    {p.retrograde ? (
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-red-500/15 text-red-300 border border-red-500/20">R</span>
                    ) : (
                      <span className="text-white/30 text-xs">Direct</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vimshottari Dasha */}
      <div className="glass border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-serif text-xl text-white flex items-center gap-2">
            <FiClock className="w-4 h-4 text-veda-orange" /> Vimshottari Mahadasha
          </h3>
          <span className="text-xs text-white/40">
            Birth lord: <span className="text-veda-gold">{kundli.dasha.birthLord}</span> • balance {kundli.dasha.balanceYears.toFixed(2)} yrs
          </span>
        </div>
        <div className="divide-y divide-white/5">
          {kundli.dasha.mahadashas.map((m, i) => (
            <details key={i} className="group">
              <summary className="px-6 py-3 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] list-none">
                <div className="flex items-center gap-4">
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                    i === 0 ? "bg-veda-orange/20 text-veda-orange border border-veda-orange/30" : "bg-white/5 text-white/60 border border-white/10"
                  }`}>
                    {m.lord}
                  </span>
                  <span className="text-sm text-white/70 font-mono">
                    {m.start.slice(0,10)} → {m.end.slice(0,10)}
                  </span>
                  <span className="text-xs text-white/40">{m.years.toFixed(1)} yrs</span>
                </div>
                <span className="text-veda-orange text-xs group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 pb-4 pt-1 bg-black/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  {m.antardashas.map((a, j) => (
                    <div key={j} className="flex items-center justify-between rounded-md bg-white/5 px-3 py-1.5">
                      <span className="font-medium text-white/80">{m.lord} / {a.lord}</span>
                      <span className="text-white/50 font-mono">{a.start.slice(0,10)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
