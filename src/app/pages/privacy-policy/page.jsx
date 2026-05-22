import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — JyotirVeda",
  description:
    "Learn how JyotirVeda collects, uses, and protects your personal information. Your privacy is our priority.",
};

const LAST_UPDATED = "May 21, 2026";

const SECTIONS = [
  {
    id: "overview",
    title: "1. Overview",
    body: [
      `JyotirVeda ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains what information we collect when you use jyotirveda.com ("the Service"), how we use it, and the choices you have.`,
      `By using the Service, you consent to the data practices described in this policy. If you do not agree, please discontinue use of the Service.`,
    ],
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    body: [`We collect the following categories of information:`],
    subsections: [
      {
        heading: "2a. Information You Provide",
        list: [
          "Birth details (date, time, and place of birth) entered to generate a Kundli, horoscope, or compatibility report.",
          "Account information (name, email, password) if you register for an account.",
          "Messages you send us through the Contact page or support channels.",
        ],
      },
      {
        heading: "2b. Information Collected Automatically",
        list: [
          "Log data: IP address, browser type, referring URL, pages visited, and timestamps.",
          "Device information: operating system, screen resolution, and language settings.",
          "Cookies and similar tracking technologies (see Section 6).",
        ],
      },
      {
        heading: "2c. Information from Third Parties",
        list: [
          "If you sign in with Google or another OAuth provider, we receive the profile information you authorize (typically your name and email address).",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    body: ["We use the information we collect to:"],
    list: [
      "Compute and display your astrological readings, charts, and reports.",
      "Maintain and improve the Service, including debugging and performance monitoring.",
      "Send transactional emails (e.g., account confirmation, password reset) — never unsolicited marketing without your consent.",
      "Detect and prevent fraud, abuse, or security incidents.",
      "Comply with applicable legal obligations.",
    ],
  },
  {
    id: "data-sharing",
    title: "4. Data Sharing & Disclosure",
    body: [
      "We do not sell, rent, or trade your personal information to third parties for their marketing purposes. We may share your data only in the following limited circumstances:",
    ],
    list: [
      "Service providers: trusted vendors who help us operate the Service (e.g., cloud hosting, analytics) and who are bound by confidentiality agreements.",
      "Legal compliance: when required by law, court order, or governmental authority.",
      "Business transfers: in connection with a merger, acquisition, or sale of assets, with advance notice to you.",
      "With your consent: in any other circumstance where you have explicitly authorised the sharing.",
    ],
  },
  {
    id: "birth-data",
    title: "5. Birth Data & Sensitive Information",
    body: [
      "Birth details are the most sensitive data we handle. We treat them accordingly:",
    ],
    list: [
      "Birth details entered without an account are processed in memory to produce your reading and are not persistently stored after the session.",
      "If you save a chart to your account, the birth data is stored encrypted at rest and is accessible only to you.",
      "We do not share, publish, or sell individual birth details under any circumstances.",
    ],
  },
  {
    id: "cookies",
    title: "6. Cookies & Tracking Technologies",
    body: [
      `We use cookies and similar technologies to keep you signed in, remember your preferences, and collect aggregate analytics. You can control cookie behaviour through your browser settings. Note that disabling certain cookies may affect Service functionality.`,
      `We use privacy-respecting analytics (no cross-site tracking or advertising cookies are set by default).`,
    ],
  },
  {
    id: "data-retention",
    title: "7. Data Retention",
    body: [
      `We retain your personal information only for as long as necessary to provide the Service or comply with our legal obligations. Account data is retained until you delete your account. Anonymous log data is purged on a rolling 90-day basis.`,
    ],
  },
  {
    id: "security",
    title: "8. Security",
    body: [
      `We implement industry-standard security measures including HTTPS encryption, hashed passwords (bcrypt), and access controls. However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.`,
    ],
  },
  {
    id: "your-rights",
    title: "9. Your Rights",
    body: ["Depending on your jurisdiction, you may have the right to:"],
    list: [
      "Access — request a copy of the personal data we hold about you.",
      "Rectification — ask us to correct inaccurate or incomplete data.",
      "Erasure — request deletion of your personal data (subject to legal retention requirements).",
      "Portability — receive your data in a structured, machine-readable format.",
      "Objection — object to certain processing activities.",
      "Withdraw consent — where processing is based on consent, withdraw it at any time without affecting prior processing.",
    ],
    afterList: "To exercise any of these rights, contact us via the Contact page. We will respond within 30 days.",
  },
  {
    id: "children",
    title: "10. Children's Privacy",
    body: [
      `The Service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us and we will delete it promptly.`,
    ],
  },
  {
    id: "third-party",
    title: "11. Third-Party Links",
    body: [
      `The Service may contain links to external websites not operated by us. This Privacy Policy does not apply to those sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
    ],
  },
  {
    id: "changes",
    title: "12. Changes to This Policy",
    body: [
      `We may update this Privacy Policy periodically. When we do, we will revise the "Last updated" date at the top of this page. For material changes, we will provide additional notice (such as an in-app notification or email). Continued use of the Service after changes constitutes acceptance of the updated policy.`,
    ],
  },
  {
    id: "contact",
    title: "13. Contact",
    body: [
      `If you have questions or concerns about this Privacy Policy, or would like to exercise your rights, please contact us through our Contact page. We are committed to addressing your concerns promptly.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
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
              Privacy Policy
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
                  {s.subsections && (
                    <div className="space-y-5 mt-2">
                      {s.subsections.map((sub) => (
                        <div key={sub.heading}>
                          <p className="text-white/80 text-sm font-semibold mb-2">{sub.heading}</p>
                          <ul className="space-y-2">
                            {sub.list.map((item) => (
                              <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-veda-orange/60 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
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
                  {s.afterList && (
                    <p className="text-white/60 text-sm leading-relaxed mt-3">{s.afterList}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 glass border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-white/50 text-sm mb-4">
              For usage terms, see our{" "}
              <Link href="/pages/terms" className="text-veda-orange hover:underline">
                Terms of Service
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
