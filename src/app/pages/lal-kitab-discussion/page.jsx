import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FiMessageCircle, FiArrowRight, FiBookOpen } from "react-icons/fi";

export const metadata = {
  title: "Lal Kitab Discussion — Q&A and Community | JyotirVeda",
  description: "Common questions about Lal Kitab teva, remedies, and how it differs from classical Vedic astrology.",
};

const FAQS = [
  {
    q: "Do I need an exact birth time for Lal Kitab?",
    a: "Lal Kitab is more forgiving on birth time than classical Vedic, because the houses are fixed (Aries=H1 always). The Moon, however, still moves quickly — accurate time helps for janma nakshatra cross-references.",
  },
  {
    q: "Why are the houses fixed in Lal Kitab?",
    a: "The author, chose a fixed-house mandala to make the system democratic: anyone can read their chart without first computing the ascendant. The cost is that some Vedic nuances (lagna lord, kendras from ascendant) don't apply.",
  },
  {
    q: "Are Lal Kitab remedies really effective?",
    a: "The remedies (totke) are designed to be small, household-scale actions repeated daily — feeding crows, donating jaggery, lighting an oil lamp. Their efficacy is partly devotional, partly behavioural; they keep the practitioner mindful of the planet's lesson.",
  },
  {
    q: "Can I use Lal Kitab alongside Vedic astrology?",
    a: "Yes. Many astrologers cross-reference the two systems. A planet flagged 'troubled' in both will be treated as a clear focus; a planet flagged only in one is a softer signal.",
  },
  {
    q: "What's the 35-year teva?",
    a: "Lal Kitab arranges the houses pyramidally and rotates Saturn through them year by year, producing a 35-year forecast (roughly the prime working years of life). Each year-house combo carries a theme.",
  },
  {
    q: "What about Pitri Rinn (ancestral debt)?",
    a: "If Saturn or Rahu sit in the 12th house, Lal Kitab flags an ancestral debt — usually addressed by acts of service to elders, ancestors and the unfortunate.",
  },
];

export default function LalKitabDiscussionPage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-12 px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
            <FiMessageCircle className="w-3 h-3" /> Q&amp;A
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Lal Kitab Discussion</h1>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">
            The questions practitioners ask most often, answered briefly.
          </p>
        </section>

        <section className="px-6 pb-12 max-w-3xl mx-auto">
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details key={i} className="glass border border-white/10 rounded-xl px-5 py-4 group">
                <summary className="font-medium text-white cursor-pointer list-none flex justify-between items-center gap-4">
                  <span>{f.q}</span>
                  <span className="text-veda-orange text-xl transition-transform group-open:rotate-45 shrink-0">+</span>
                </summary>
                <p className="text-sm text-white/65 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="px-6 pb-24 max-w-3xl mx-auto text-center">
          <div className="glass border border-white/10 rounded-2xl p-8">
            <FiBookOpen className="w-8 h-8 text-veda-orange mx-auto mb-3" />
            <h2 className="font-serif text-2xl text-white mb-2">Ready for your own teva?</h2>
            <p className="text-sm text-white/55 mb-5">Try the calculator — your chart and remedies are computed live.</p>
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
