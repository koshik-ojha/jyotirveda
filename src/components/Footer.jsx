import Image from "next/image";
import logo from "@/app/assets/images/logo.svg";
import Link from "next/link";
import { FiInstagram, FiTwitter, FiFacebook, FiSend } from "react-icons/fi";

const SOCIAL = [
  { Icon: FiFacebook, label: "Facebook" },
  { Icon: FiInstagram, label: "Instagram" },
  { Icon: FiTwitter, label: "X (Twitter)" },
];

const QUICK_LINKS = [
  { label: "Free Kundli", href: "/pages/free-kundli" },
  { label: "Rashifal 2026", href: "/pages/rashifal" },
  { label: "Horoscope Matching", href: "/pages/horoscope-matching" },
  { label: "Today's Panchang", href: "/pages/today-panchang" },
];
const SERVICES = [
  { label: "Tarot Reading", href: "/pages/tarot-reading" },
  { label: "Palmistry", href: "/pages/palmistry" },
  { label: "Vastu Consultancy", href: "/pages/vastu" },
  { label: "Lal Kitab Special", href: "/pages/lal-kitab" },
];

export default function Footer() {
  return (
    <footer className="bg-veda-navy border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div>
            <div className="mb-5">
              <Image
                src={logo}
                alt="JyotirVeda"
                height={36}
                unoptimized
                className="h-9 w-auto"
              />
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              The world&apos;s leading spiritual sanctuary, blending ancient Vedic wisdom with modern technological precision.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-white/40 hover:text-veda-orange hover:border-veda-orange/30 hover:scale-110 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link className="flex items-center gap-2 text-sm text-white/40 hover:text-veda-orange transition-colors group" href={href}>
                    <span className="w-1.5 h-1.5 rounded-full bg-veda-gold/50 group-hover:bg-veda-orange transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Services</h4>
            <ul className="space-y-3">
              {SERVICES.map(({ label, href }) => (
                <li key={label}>
                  <Link className="flex items-center gap-2 text-sm text-white/40 hover:text-veda-orange transition-colors group" href={href}>
                    <span className="w-1.5 h-1.5 rounded-full bg-veda-gold/50 group-hover:bg-veda-orange transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-sm text-white/40 mb-6 leading-relaxed">Get your weekly cosmic forecast directly in your inbox.</p>
            <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <input
                className="grow bg-transparent px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none"
                placeholder="your@email.com"
                type="email"
              />
              <button
                className="bg-linear-to-r from-veda-orange to-veda-gold text-white px-4 py-3 hover:opacity-90 transition-opacity"
                aria-label="Subscribe"
              >
                <FiSend className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">© 2026 JyotirVeda. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-white/25">
            <Link className="hover:text-veda-orange transition-colors" href="/pages/terms">Terms of Service</Link>
            <Link className="hover:text-veda-orange transition-colors" href="/pages/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
