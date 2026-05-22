import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FiUsers, FiArrowRight, FiBookOpen, FiExternalLink } from "react-icons/fi";

export const metadata = {
  title: "Lal Kitab on Facebook | JyotirVeda",
  description: "Join Lal Kitab discussion groups on Facebook for community Q&A, remedies and case studies.",
};

const GROUPS = [
  { name: "Lal Kitab Astrology Group",   members: "115k+",  desc: "General Lal Kitab discussion, remedies, charts" },
  { name: "Lal Kitab Remedies (Totke)",  members: "48k+",   desc: "Focused on the remedies side of Lal Kitab practice" },
  { name: "Lal Kitab India (Hindi)",     members: "92k+",   desc: "Hindi-language community and live Q&A sessions" },
  { name: "Pandit Roopchand Joshi Fans", members: "23k+",   desc: "Devoted to the original 1939 volumes and their translations" },
];

export default function LalKitabFacebookPage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-12 px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
            <FiUsers className="w-3 h-3" /> Community
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Lal Kitab on Facebook</h1>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">
            Public groups where Lal Kitab practitioners share charts, remedies and case studies.
          </p>
        </section>

        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GROUPS.map((g) => (
              <a key={g.name}
                href={`https://www.facebook.com/search/groups/?q=${encodeURIComponent(g.name)}`}
                target="_blank" rel="noopener noreferrer"
                className="glass border border-white/10 rounded-2xl p-6 hover:border-veda-orange/40 transition-colors group block"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-white group-hover:text-veda-orange transition-colors">{g.name}</h3>
                    <p className="text-xs text-veda-gold/70 mt-1">{g.members} members (approx)</p>
                  </div>
                  <FiExternalLink className="w-4 h-4 text-white/40 group-hover:text-veda-orange" />
                </div>
                <p className="text-sm text-white/60 mt-3 leading-relaxed">{g.desc}</p>
              </a>
            ))}
          </div>
          <p className="text-center text-xs text-white/35 mt-5">
            Links open Facebook&apos;s public group search. Membership is at the discretion of each group&apos;s admins.
          </p>
        </section>

        <section className="px-6 pb-24 max-w-3xl mx-auto text-center">
          <div className="glass border border-white/10 rounded-2xl p-8">
            <FiBookOpen className="w-8 h-8 text-veda-orange mx-auto mb-3" />
            <h2 className="font-serif text-2xl text-white mb-2">Prefer to compute first, discuss later?</h2>
            <p className="text-sm text-white/55 mb-5">Generate your own Lal Kitab teva — chart, remedies, 35-year teva.</p>
            <Link href="/pages/lal-kitab" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #F18C3A, #D99152)", boxShadow: "0 4px 18px rgba(241,140,58,0.3)" }}>
              Build My Teva <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
