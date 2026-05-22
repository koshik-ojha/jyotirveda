import {
  FiStar, FiSun, FiMoon, FiHeart, FiShield,
  FiTrendingUp, FiGift, FiClock,
} from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KundliForm from "@/components/KundliForm";

export const metadata = {
  title: "Hindi Kundli — हिन्दी जन्म कुंडली | JyotirVeda",
  description:
    "जन्म तिथि, समय और स्थान से निःशुल्क हिन्दी जन्म कुंडली बनाएं। ग्रह स्थिति, दशा, योग, दोष और उपाय सहित विस्तृत रिपोर्ट।",
};

const sections = [
  { icon: FiSun, title: "लग्न कुंडली", en: "Lagna Chart", desc: "जन्म के समय आकाशीय स्थिति और सभी ग्रहों का स्थान।" },
  { icon: FiMoon, title: "नवांश कुंडली", en: "Navamsa (D9)", desc: "विवाह, धर्म और आत्मा के लिए नौवांश विश्लेषण।" },
  { icon: FiClock, title: "विंशोत्तरी दशा", en: "Vimshottari Dasha", desc: "120 वर्ष का ग्रह दशा कालक्रम — महादशा व अंतर्दशा।" },
  { icon: FiTrendingUp, title: "गोचर", en: "Gochar / Transit", desc: "वर्तमान ग्रहों का संचार और आपकी कुंडली पर प्रभाव।" },
  { icon: FiStar, title: "नक्षत्र विवरण", en: "Nakshatra", desc: "जन्म नक्षत्र, पद, चरण और इसका जीवन पर प्रभाव।" },
  { icon: FiHeart, title: "मांगलिक दोष", en: "Mangal Dosha", desc: "मंगल दोष और कालसर्प दोष की जाँच एवं उपाय।" },
  { icon: FiGift, title: "रत्न व उपाय", en: "Gemstones & Remedies", desc: "लग्न के अनुसार शुभ रत्न, रंग, अंक और दान।" },
  { icon: FiShield, title: "योग व दोष", en: "Yogas & Doshas", desc: "राज योग, धन योग सहित शुभ-अशुभ संयोग।" },
];

const includes = [
  { hi: "जीवन-साथी मिलान", en: "Soulmate matching" },
  { hi: "शुभ रत्न, रंग, अंक", en: "Lucky gemstone, colour, number" },
  { hi: "स्वास्थ्य, करियर, विवाह विश्लेषण", en: "Health, career & marriage analysis" },
  { hi: "धन व आय की संभावनाएँ", en: "Wealth & income prospects" },
  { hi: "बल और कमज़ोरियाँ", en: "Strengths & weaknesses" },
  { hi: "आगामी अवधि का पूर्वानुमान", en: "Forecast for the period ahead" },
];

export default function HindiKundliPage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-veda-orange/10 blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-veda-gold/10 blur-3xl" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              हिन्दी • निःशुल्क • वैदिक
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-3 leading-tight">
              हिन्दी जन्म कुंडली
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-serif mb-6">
              Free Janam Kundli in Hindi
            </p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              जन्म कुंडली वैदिक ज्योतिष की आधारशिला है। यह आकाश का वह नक्शा है जो आपके जन्म के समय आपके जन्मस्थान से दिखाई देता था — हर ग्रह, हर भाव, हर नक्षत्र।
            </p>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <KundliForm lang="hi" />
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
              कुंडली में क्या मिलेगा?
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              आठ मुख्य भाग — जन्म विवरण से तुरंत गणना द्वारा तैयार।
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((s) => (
              <div
                key={s.title}
                className="glass border border-white/10 rounded-2xl p-6 hover:border-veda-orange/40 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-white mb-0.5">{s.title}</h3>
                <p className="text-[11px] uppercase tracking-widest text-veda-gold/80 mb-2">{s.en}</p>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-veda-orange">
                जन्म पत्रिका क्या है?
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-white mt-3 mb-5">
                आपके जीवन का खगोलीय नक़्शा
              </h2>
              <div className="space-y-4 text-white/65 leading-relaxed">
                <p>
                  जन्म पत्रिका अर्थात् कुंडली, एक ज्योतिषीय चार्ट है जो आपके जन्म के समय आकाश में स्थित ग्रहों, चंद्रमा और सूर्य की स्थिति दर्शाता है। यह आपके सम्पूर्ण जीवन का खगोलीय नक़्शा है।
                </p>
                <p>
                  वैदिक ज्योतिष पर आधारित यह सॉफ़्टवेयर पूर्णतः निःशुल्क है। केवल अपना नाम, लिंग, जन्म तिथि, समय और स्थान दर्ज करें — पल भर में आपकी विस्तृत जन्म पत्रिका तैयार हो जाएगी।
                </p>
              </div>
            </div>
            <div className="glass border border-white/10 rounded-2xl p-7">
              <h3 className="font-serif text-xl text-white mb-5">रिपोर्ट में शामिल / Included</h3>
              <ul className="space-y-3">
                {includes.map((it) => (
                  <li key={it.en} className="flex items-start gap-3">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-veda-orange shrink-0" />
                    <div>
                      <p className="text-white text-sm">{it.hi}</p>
                      <p className="text-white/40 text-xs">{it.en}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
