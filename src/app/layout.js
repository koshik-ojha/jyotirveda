import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

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

export const metadata = {
  title: "VedaAI - Wisdom of the Ages, Precision of AI",
  description:
    "Unlock the secrets of the cosmos. VedaAI fuses 8,000 years of Vedic tradition with cutting-edge neural networks for life's most accurate spiritual guidance.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
