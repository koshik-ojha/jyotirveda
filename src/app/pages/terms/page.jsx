import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service — JyotirVeda",
  description:
    "Read the Terms of Service for JyotirVeda. By using our website and services you agree to these terms.",
};

const LAST_UPDATED = "May 21, 2026";

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: [
      `By accessing or using JyotirVeda ("the Service", "we", "us", or "our") at jyotirveda.com, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, please do not use the Service.`,
      `We may update these Terms from time to time. Continued use of the Service after any changes constitutes your acceptance of the revised Terms. The date of the most recent revision appears at the top of this page.`,
    ],
  },
  {
    id: "description",
    title: "2. Description of Service",
    body: [
      `JyotirVeda provides free Vedic astrology services including — but not limited to — Kundli generation, daily horoscopes, Panchang, numerology readings, Tarot, compatibility reports, and AI-assisted interpretations.`,
      `All astrological content is provided for entertainment and informational purposes only. It does not constitute professional advice of any kind — medical, psychological, financial, legal, or otherwise. Always consult a qualified professional before making important life decisions.`,
    ],
  },
  {
    id: "user-conduct",
    title: "3. User Conduct",
    body: [
      `You agree not to use the Service to:`,
    ],
    list: [
      "Violate any applicable law or regulation.",
      "Transmit any content that is harmful, abusive, defamatory, obscene, or otherwise objectionable.",
      "Impersonate any person or entity, or falsely represent your affiliation with any person or entity.",
      "Attempt to gain unauthorized access to any part of the Service or its related systems.",
      "Use automated tools (bots, scrapers, crawlers) to extract data in a manner that disrupts the Service.",
      "Reproduce, duplicate, copy, sell, or resell any part of the Service without express written permission.",
    ],
  },
  {
    id: "intellectual-property",
    title: "4. Intellectual Property",
    body: [
      `All content, trademarks, logos, graphics, charts, and software on the Service are the property of JyotirVeda or its licensors and are protected by applicable intellectual property laws.`,
      `You are granted a limited, non-exclusive, non-transferable license to access and use the Service for personal, non-commercial purposes. This license does not include any right to resell or make commercial use of the Service or its contents.`,
    ],
  },
  {
    id: "user-data",
    title: "5. User-Provided Data",
    body: [
      `When you enter birth details (date, time, place) to generate a chart, you provide that data voluntarily. We use it solely to compute and display your reading. We do not sell or share individual birth data with third parties. See our Privacy Policy for full details.`,
      `If you create an account, you are responsible for maintaining the confidentiality of your credentials and for all activity under your account. Notify us immediately of any unauthorized use.`,
    ],
  },
  {
    id: "disclaimer",
    title: "6. Disclaimer of Warranties",
    body: [
      `The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied, including — without limitation — implied warranties of merchantability, fitness for a particular purpose, or non-infringement.`,
      `We do not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. Astrological readings and predictions are inherently interpretive; we make no guarantee as to their accuracy or applicability to your personal circumstances.`,
    ],
  },
  {
    id: "limitation",
    title: "7. Limitation of Liability",
    body: [
      `To the fullest extent permitted by applicable law, JyotirVeda and its affiliates, officers, employees, agents, partners, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, data, or goodwill — arising out of or in connection with your use of the Service, even if we have been advised of the possibility of such damages.`,
      `Our total aggregate liability to you for any claim arising from these Terms or your use of the Service shall not exceed INR 0 (zero), reflecting the fact that the Service is provided free of charge.`,
    ],
  },
  {
    id: "third-party",
    title: "8. Third-Party Links & Services",
    body: [
      `The Service may contain links to third-party websites or services that are not owned or controlled by JyotirVeda. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites. We encourage you to read the terms and privacy policies of every site you visit.`,
    ],
  },
  {
    id: "termination",
    title: "9. Termination",
    body: [
      `We reserve the right to suspend or terminate your access to the Service at any time, with or without cause or notice, if we believe you have violated these Terms or acted in a manner harmful to the Service or other users.`,
    ],
  },
  {
    id: "governing-law",
    title: "10. Governing Law",
    body: [
      `These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict-of-law provisions. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.`,
    ],
  },
  {
    id: "contact",
    title: "11. Contact",
    body: [
      `If you have questions about these Terms, please reach out to us via our Contact page.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">

        {/* Hero */}
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-veda-orange/10 blur-3xl animate-pulse-glow pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-veda-gold/10 blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-gradient-gold mb-4 leading-tight">
              Terms of Service
            </h1>
            <p className="text-white/50 text-sm">Last updated: {LAST_UPDATED}</p>
          </div>
        </section>

        {/* Body */}
        <section className="px-6 pb-24 max-w-3xl mx-auto">

          {/* Quick-nav */}
          <nav className="mb-10 glass border border-white/10 rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-veda-orange mb-4">Contents</p>
            <ul className="space-y-2">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-sm text-white/50 hover:text-veda-orange transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-veda-gold/50 group-hover:bg-veda-orange transition-colors shrink-0" />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sections */}
          <div className="space-y-12">
            {SECTIONS.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-xl font-serif text-white mb-4 pb-3 border-b border-white/10">
                  {s.title}
                </h2>
                <div className="space-y-4">
                  {s.body.map((para, i) => (
                    <p key={i} className="text-white/60 text-sm leading-relaxed">{para}</p>
                  ))}
                  {s.list && (
                    <ul className="space-y-2 mt-2">
                      {s.list.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-veda-orange/60 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 glass border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-white/50 text-sm mb-4">
              For privacy-related questions, see our{" "}
              <Link href="/pages/privacy-policy" className="text-veda-orange hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <Link
              href="/pages/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white px-6 py-2.5 rounded-xl border border-white/15 hover:border-veda-orange/40 transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
