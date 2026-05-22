import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiSearch, FiTrendingUp } from "react-icons/fi";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Celebrity Horoscope — Star Charts of the Famous | JyotirVeda",
  description:
    "Birth charts and Vedic astrology readings of celebrities — actors, sportspeople, politicians and global icons. Learn from the stars who shaped history.",
};

const CELEBRITIES = [
  { name: "Sachin Tendulkar",  field: "Cricket",       sign: "Taurus",      dob: "Apr 24, 1973" },
  { name: "Amitabh Bachchan",  field: "Cinema",        sign: "Libra",       dob: "Oct 11, 1942" },
  { name: "Narendra Modi",     field: "Politics",      sign: "Scorpio",     dob: "Sep 17, 1950" },
  { name: "A. R. Rahman",      field: "Music",         sign: "Capricorn",   dob: "Jan 6, 1967" },
  { name: "Mahatma Gandhi",    field: "Statesman",     sign: "Libra",       dob: "Oct 2, 1869" },
  { name: "Sundar Pichai",     field: "Technology",    sign: "Cancer",      dob: "Jun 10, 1972" },
  { name: "Lata Mangeshkar",   field: "Music",         sign: "Virgo",       dob: "Sep 28, 1929" },
  { name: "Virat Kohli",       field: "Cricket",       sign: "Scorpio",     dob: "Nov 5, 1988" },
  { name: "Sri Sri Ravishankar", field: "Spirituality", sign: "Taurus",      dob: "May 13, 1956" },
  { name: "Shah Rukh Khan",    field: "Cinema",        sign: "Scorpio",     dob: "Nov 2, 1965" },
  { name: "Indira Gandhi",     field: "Politics",      sign: "Scorpio",     dob: "Nov 19, 1917" },
  { name: "Rabindranath Tagore", field: "Literature",  sign: "Taurus",      dob: "May 7, 1861" },
];

const fields = ["All", "Cinema", "Cricket", "Politics", "Music", "Technology", "Spirituality", "Literature"];

export default function CelebrityHoroscopePage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-veda-gold/10 blur-3xl animate-pulse-glow" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              <FiTrendingUp className="inline w-3 h-3 mr-1 mb-0.5" /> Charts of the Famous
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Celebrity Horoscope
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              The birth charts that shaped history. Read the planetary patterns behind the careers of actors, sportspeople, leaders and seers.
            </p>
          </div>
        </section>

        <section className="px-6 pb-10 max-w-5xl mx-auto">
          <div className="glass border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <FiSearch className="text-white/40 w-4 h-4" />
              <Input placeholder="Search a celebrity..." className="border-0 bg-transparent shadow-none px-0 focus-visible:ring-0" />
            </div>
            <div className="flex flex-wrap gap-2">
              {fields.map((f, i) => (
                <button
                  key={f}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    i === 0
                      ? "bg-veda-orange text-white border-veda-orange"
                      : "border-white/10 text-white/60 hover:text-white hover:border-white/30"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CELEBRITIES.map((c) => (
              <a
                key={c.name}
                href="#"
                className="glass border border-white/10 rounded-2xl p-6 hover:border-veda-orange/40 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-veda-orange/40 to-veda-gold/40 border border-white/10 flex items-center justify-center text-xl font-serif text-white shrink-0">
                    {c.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg text-white group-hover:text-veda-orange transition-colors truncate">
                      {c.name}
                    </h3>
                    <p className="text-xs text-white/40 mt-0.5">{c.field}</p>
                    <p className="text-xs text-veda-gold/70 mt-2">{c.sign} • {c.dob}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
