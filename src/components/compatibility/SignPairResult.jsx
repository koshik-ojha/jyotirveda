"use client";

const SCORE_CLASS = (s) =>
  s >= 80 ? "text-emerald-300 bg-emerald-500/10 border-emerald-500/20"
  : s >= 65 ? "text-sky-300 bg-sky-500/10 border-sky-500/20"
  : s >= 50 ? "text-amber-300 bg-amber-500/10 border-amber-500/20"
  : "text-rose-300 bg-rose-500/10 border-rose-500/20";

export default function SignPairResult({ result, lensLabel = "Compatibility" }) {
  if (!result) return null;
  return (
    <div className={`glass border rounded-2xl p-6 md:p-8 ${SCORE_CLASS(result.score).split(" ").slice(0,2).join(" ")}`}>
      <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-veda-orange">{lensLabel}</p>
          <h2 className="font-serif text-3xl text-white mt-1">{result.a.en} <span className="text-white/40 text-xl">×</span> {result.b.en}</h2>
          <p className="text-white/55 text-sm mt-0.5">{result.a.hi} · {result.b.hi}</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-serif text-white">{result.score}<span className="text-lg text-white/40">/100</span></div>
          <div className={`text-xs font-medium ${SCORE_CLASS(result.score).split(" ")[0]}`}>{result.rating}</div>
        </div>
      </div>

      <p className="text-white/75 mb-5">{result.summary}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <Chip label="Same element" value={result.sameElement} />
        <Chip label="Friend element" value={result.friendElement} />
        <Chip label="Lords friendly" value={result.lordsFriend} />
        <Chip label="Bhakoot dosha" value={result.bhakootDosha} inverse />
      </div>
    </div>
  );
}

function Chip({ label, value, inverse = false }) {
  const good = inverse ? !value : value;
  return (
    <div className={`rounded-lg border px-3 py-2 ${good ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-200" : "border-white/10 bg-white/[0.03] text-white/50"}`}>
      <div className="text-[10px] uppercase font-bold tracking-widest opacity-70">{label}</div>
      <div className="font-medium mt-0.5">{value ? (inverse ? "Present" : "Yes") : (inverse ? "Absent" : "No")}</div>
    </div>
  );
}
