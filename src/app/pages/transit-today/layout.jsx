export const metadata = {
  title: "Today's Planetary Transit Chart",
  description: "Live planetary transit chart for today. Track all 9 grahas in real time with sidereal positions.",
  alternates: { canonical: "/pages/transit-today" },
  openGraph: {
    title: "Today's Planetary Transit Chart",
    description: "Live planetary transit chart for today. Track all 9 grahas in real time with sidereal positions.",
    url: "/pages/transit-today",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Today's Planetary Transit Chart",
    description: "Live planetary transit chart for today. Track all 9 grahas in real time with sidereal positions.",
  },
};

export default function Layout({ children }) {
  return children;
}
