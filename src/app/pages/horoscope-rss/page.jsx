import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiRss, FiCopy, FiExternalLink } from "react-icons/fi";
import { ZODIAC } from "@/lib/zodiac";

export const metadata = {
  title: "Horoscope RSS — Subscribe to Daily Predictions | JyotirVeda",
  description:
    "Subscribe to your sign's daily horoscope via RSS. Free feeds for every zodiac, plus combined feeds for love, weekly and monthly horoscope.",
};

const FEEDS = [
  { name: "All Signs — Daily", path: "/feed/daily.xml" },
  { name: "All Signs — Weekly", path: "/feed/weekly.xml" },
  { name: "All Signs — Monthly", path: "/feed/monthly.xml" },
  { name: "Love Horoscope — Daily", path: "/feed/love-daily.xml" },
  { name: "Rashifal (Hindi) — Daily", path: "/feed/rashifal.xml" },
  { name: "Festivals & Calendar", path: "/feed/festivals.xml" },
];

export default function HoroscopeRssPage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl animate-pulse-glow" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              <FiRss className="inline w-3 h-3 mr-1 mb-0.5" /> RSS Feeds
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Subscribe by RSS
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Daily horoscope, delivered into your reader of choice. Paste the feed URL into Feedly, Inoreader, NetNewsWire — anything that speaks RSS.
            </p>
          </div>
        </section>

        <section className="px-6 pb-16 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-white">General Feeds</h2>
          </div>
          <div className="space-y-3">
            {FEEDS.map((f) => (
              <div key={f.path} className="glass border border-white/10 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                <FiRss className="w-4 h-4 text-veda-orange shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm">{f.name}</p>
                  <code className="text-[11px] text-white/40 break-all">{f.path}</code>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs text-white/70 border border-white/10 hover:border-veda-orange/40 hover:text-veda-orange transition-colors">
                    <FiCopy className="w-3 h-3" /> Copy URL
                  </button>
                  <a href={f.path} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs text-white/70 border border-white/10 hover:border-veda-orange/40 hover:text-veda-orange transition-colors">
                    <FiExternalLink className="w-3 h-3" /> Open
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-white">Per-Sign Feeds</h2>
            <p className="text-white/50 mt-2">One feed per rasi — only your sign, daily.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {ZODIAC.map((s) => (
              <div key={s.en} className="glass border border-white/10 rounded-xl p-4 flex items-center gap-3 hover:border-veda-orange/40 transition-colors">
                <span className="text-veda-orange text-xl">{s.symbol}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm truncate">{s.en}</p>
                  <p className="text-[10px] text-white/40 truncate">/feed/{s.en.toLowerCase()}.xml</p>
                </div>
                <a href={`/feed/${s.en.toLowerCase()}.xml`} className="text-veda-orange hover:text-veda-gold">
                  <FiRss className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
