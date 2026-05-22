import Link from "next/link";
import { FiStar, FiSun } from "react-icons/fi";
import { computePanchang } from "@/lib/astro/panchang";

// Default to New Delhi, India
const DEFAULT_LAT = 28.6139;
const DEFAULT_LNG = 77.209;
const DEFAULT_LOCATION = "New Delhi, India";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default async function PanchangWidget() {
  const now = new Date();
  let panchang = null;
  try {
    panchang = computePanchang({ dateUTC: now, latitude: DEFAULT_LAT, longitude: DEFAULT_LNG });
  } catch {
    // fall through — show placeholders
  }

  const day = now.getUTCDate();
  const monthYear = `${MONTH_NAMES[now.getUTCMonth()]}, ${now.getUTCFullYear()}`;

  const rows = panchang
    ? [
        { label: "Tithi",     value: `${panchang.tithi.paksha} ${panchang.tithi.name}` },
        { label: "Nakshatra", value: panchang.nakshatra.en },
        { label: "Yoga",      value: panchang.yoga.name },
      ]
    : [
        { label: "Tithi",     value: "—" },
        { label: "Nakshatra", value: "—" },
        { label: "Yoga",      value: "—" },
      ];

  return (
    <div
      className="rounded-2xl p-8 text-white relative overflow-hidden border border-white/10 flex flex-col"
      style={{ background: "linear-gradient(155deg, rgba(241,140,58,0.14) 0%, rgba(26,27,47,0.95) 50%)" }}
    >
      {/* Decorative bg icon */}
      <div className="absolute -top-6 -right-6 opacity-[0.06]">
        <FiStar className="w-40 h-40" />
      </div>

      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-veda-orange text-xs font-bold uppercase tracking-[0.18em] mb-1">Live</p>
          <h3 className="text-xl font-serif">Daily Panchang</h3>
          <p className="text-xs text-white/35 mt-1">{DEFAULT_LOCATION}</p>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(241,140,58,0.15)", border: "1px solid rgba(241,140,58,0.2)" }}>
          <FiSun className="w-5 h-5 text-veda-orange" />
        </div>
      </div>

      <div className="mb-8">
        <span className="text-6xl font-serif font-light">{day}</span>
        <p className="text-base text-white/60 mt-1">{monthYear}</p>
      </div>

      <div className="space-y-3 text-sm mb-8 flex-1">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between items-center border-b border-white/8 pb-3">
            <span className="text-white/45 text-xs uppercase tracking-wider">{row.label}</span>
            <span className="text-veda-orange font-semibold text-sm">{row.value}</span>
          </div>
        ))}
      </div>

      <Link href="/pages/panchangam">
        <button
          className="w-full py-3 rounded-xl text-sm font-semibold border border-white/10 text-white/70 hover:text-white hover:border-veda-orange/30 transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          View Full Panchang
        </button>
      </Link>
    </div>
  );
}
