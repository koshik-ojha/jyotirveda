import { Playfair_Display, Poppins, Noto_Sans_Devanagari, Noto_Sans_Gujarati } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
});

const gujarati = Noto_Sans_Gujarati({
  variable: "--font-gujarati",
  subsets: ["gujarati"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://jyotirveda.wedoodles.com"
  ),
  title: {
    default: "VedaAI – Wisdom of the Ages, Precision of AI",
    template: "%s | VedaAI",
  },
  description:
    "Unlock the secrets of the cosmos. VedaAI fuses 8,000 years of Vedic tradition with cutting-edge neural networks for life's most accurate spiritual guidance.",
  keywords: [
    "Vedic astrology",
    "kundli",
    "horoscope",
    "rashifal",
    "panchang",
    "numerology",
    "tarot",
    "lal kitab",
    "AI astrology",
  ],
  applicationName: "VedaAI",
  authors: [{ name: "VedaAI" }],
  openGraph: {
    type: "website",
    siteName: "VedaAI",
    title: "VedaAI – Wisdom of the Ages, Precision of AI",
    description:
      "AI-powered Vedic astrology: free kundli, daily horoscope, panchang, numerology, matching, muhurat and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VedaAI – Wisdom of the Ages, Precision of AI",
    description:
      "AI-powered Vedic astrology: free kundli, daily horoscope, panchang, numerology, matching, muhurat and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }) {
  // Read the language cookie on the server so the initial HTML matches the
  // user's stored preference (no hydration flash).
  const c = await cookies();
  const initialLang = ["en", "hi", "gu"].includes(c.get("jv_lang")?.value)
    ? c.get("jv_lang").value
    : "en";

  return (
    <html
      lang={initialLang}
      className={`${playfair.variable} ${poppins.variable} ${devanagari.variable} ${gujarati.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LanguageProvider initial={initialLang}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
