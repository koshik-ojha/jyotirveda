"use client";

import Image from "next/image";
import logo from "@/app/assets/images/logo.svg";
import { useEffect, useRef, useState } from "react";
import { FiSearch, FiPlus, FiChevronDown, FiMenu, FiX, FiGlobe } from "react-icons/fi";
import LoginModal from "./modals/LoginModal";
import SignupModal from "./modals/SignupModal";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";
import { useT } from "@/lib/i18n/useT";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "gu", label: "ગુજરાતી" },
];

const NAV = [
  // { label: "Home", href: "/" },
  { label: "About", href: "/pages/about" },
  {
    label: "Kundli & Muhurat",
    items: [
      { label: "Free Kundli", href: "/pages/free-kundli" },
      { label: "Hindi Kundli", href: "/pages/hindi-kundli" },
      { label: "Muhurat", href: "/pages/muhurat" },
      { label: "Baby Names", href: "/pages/baby-names" },
    ],
  },
  {
    label: "Horoscope",
    columns: 2,
    items: [
      { label: "Horoscope Matching", href: "/pages/horoscope-matching" },
      { label: "Horoscope 2026", href: "/pages/horoscope-2026" },
      { label: "राशिफल 2026", href: "/pages/rashifal-2026" },
      { label: "Today's Horoscope", href: "/pages/todays-horoscope" },
      { label: "Rashifal", href: "/pages/rashifal" },
      { label: "Online Horoscope", href: "/pages/online-horoscope" },
      { label: "Rahu Kaal Today", href: "/pages/rahu-kaal" },
      { label: "Lal Kitab", href: "/pages/lal-kitab" },
      { label: "Moon Signs", href: "/pages/moon-signs" },
      { label: "Today Horoscope", href: "/pages/todays-horoscope" },
      { label: "Tomorrow's Horoscope", href: "/pages/tomorrows-horoscope" },
      { label: "Weekly Horoscope", href: "/pages/weekly-horoscope" },
      { label: "Weekly Love", href: "/pages/weekly-love-horoscope" },
      { label: "Monthly Horoscope", href: "/pages/monthly-horoscope" },
      { label: "Horoscope RSS", href: "/pages/horoscope-rss" },
      { label: "Zodiac Signs", href: "/pages/zodiac-signs" },
      { label: "Celebrity Horoscope", href: "/pages/celebrity-horoscope" },
      { label: "Love Horoscope", href: "/pages/love-horoscope" },
      { label: "Matrimony", href: "/pages/matrimony" },
    ],
  },
  {
    label: "Occult",
    items: [
      { label: "Palmistry", href: "/pages/palmistry" },
      { label: "Tarot Reading", href: "/pages/tarot-reading" },
      { label: "Psychic", href: "/pages/psychic" },
      { label: "Vastu", href: "/pages/vastu" },
      { label: "Numerology", href: "/pages/numerology" },
      { label: "Numerology Chart", href: "/pages/numerology-chart" },
      { label: "Nadi Astrology", href: "/pages/nadi-astrology" },
      { label: "Swarodaya", href: "/pages/swarodaya" },
      { label: "Nakshatra", href: "/pages/nakshatra" },
    ],
  },
  {
    label: "Reports",
    items: [
      { label: "Kaalsarp Yoga/Dosha", href: "/pages/kaalsarp-yoga" },
      { label: "Gemstones Report", href: "/pages/gemstones-report" },
      { label: "Sade Sati Report", href: "/pages/sade-sati-report" },
      { label: "Mangal Dosha Report", href: "/pages/mangal-dosha-report" },
      { label: "Varshphal", href: "/pages/varshphal" },
      { label: "Transit Today", href: "/pages/transit-today" },
      { label: "Lal Kitab Report", href: "/pages/lal-kitab-report" },
      { label: "Vimshottari Dasha", href: "/pages/vimshottari-dasha" },
      { label: "Baby Names Suggestion", href: "/pages/baby-names" },
    ],
  },
  {
    label: "Panchang",
    items: [
      { label: "Today Panchang", href: "/pages/today-panchang" },
      { label: "Panchangam", href: "/pages/panchangam" },
      { label: "Monthly Panchang", href: "/pages/monthly-panchang" },
      { label: "Indian Calendar", href: "/pages/indian-calendar" },
      { label: "Abhijit", href: "/pages/abhijit" },
      { label: "Gowri Panchangam", href: "/pages/gowri-panchangam" },
      { label: "Do Ghati Muhurat", href: "/pages/do-ghati-muhurat" },
      { label: "Hora Calculator", href: "/pages/hora-calculator" },
      { label: "Rahu Kaal Today", href: "/pages/rahu-kaal" },
      { label: "Choghadiya", href: "/pages/choghadiya" },
      { label: "Sunrise & Sunset", href: "/pages/sunrise-sunset" },
    ],
  },
  {
    label: "Lal Kitab",
    items: [
      { label: "Lal Kitab Home", href: "/pages/lal-kitab" },
      { label: "What is Lal Kitab?", href: "/pages/what-is-lal-kitab" },
      { label: "Lal Kitab Chart Online", href: "/pages/lal-kitab-chart" },
      { label: "Lal Kitab Worksheet", href: "/pages/lal-kitab-worksheet" },
      { label: "Lal Kitab Discussion", href: "/pages/lal-kitab-discussion" },
      { label: "Lal Kitab Facebook Discussion", href: "/pages/lal-kitab-facebook" },
      { label: "Free Lal Kitab E-book", href: "/pages/lal-kitab-ebook" },
    ],
  },
  {
    label: "Compatibility",
    items: [
      { label: "Horoscope Matching", href: "/pages/horoscope-matching" },
      { label: "Porutham", href: "/pages/porutham" },
      { label: "Love Match", href: "/pages/love-match" },
      { label: "Moon Sign Compatibility", href: "/pages/moon-sign-compatibility" },
      { label: "Name Compatibility", href: "/pages/name-compatibility" },
      { label: "Astrology Compatibility", href: "/pages/astrology-compatibility" },
      { label: "Numerology Name", href: "/pages/numerology-name" },
      { label: "Birth Date Compatibility", href: "/pages/birth-date-compatibility" },
    ],
  },
  {
    label: "Calculator",
    items: [
      { label: "Numerology Calculator", href: "/pages/numerology" },
      { label: "Moon Sign", href: "/pages/moon-signs" },
      { label: "Sun Sign", href: "/pages/sun-sign" },
      { label: "Rasi Calculator", href: "/pages/rasi-calculator" },
      { label: "Ascendant Calculator", href: "/pages/ascendant-calculator" },
      { label: "Ayanamsa Calculator", href: "/pages/ayanamsa-calculator" },
      { label: "Nakshatra Calculator", href: "/pages/nakshatra" },
      { label: "Love Calculator", href: "/pages/love-calculator" },
      { label: "Friendship Calculator", href: "/pages/friendship-calculator" },
    ],
  },
  { label: "Contact Us", href: "/pages/contact" },
];

function NavDropdown({ item }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const cols = item.columns ?? 1;

  const onEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "relative flex items-center gap-1 px-3 py-2 transition-colors whitespace-nowrap group",
          open ? "text-veda-orange" : "text-white/60 hover:text-white",
        )}
      >
        <span>{item.label}</span>
        <FiChevronDown
          className={cn("w-3.5 h-3.5 transition-transform", open && "rotate-180")}
        />
      </button>
      <div
        className={cn(
          "absolute left-0 top-full pt-2 z-50 transition-all duration-150 origin-top",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none",
          cols === 2 ? "min-w-115" : "min-w-55",
        )}
      >
        <ul
          className={cn(
            "rounded-xl border border-white/10 bg-veda-dark/95 backdrop-blur-xl shadow-xl shadow-black/40 p-2",
            cols === 2 && "grid grid-cols-2 gap-x-2",
          )}
        >
          {item.items.map((sub) => {
            const label = typeof sub === "string" ? sub : sub.label;
            const href = typeof sub === "string" ? "#" : sub.href ?? "#";
            return (
              <li key={label}>
                <a
                  href={href}
                  className="block rounded-md px-3 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-veda-orange transition-colors"
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function MobileSection({ item, onSelect }) {
  const [expanded, setExpanded] = useState(false);

  if (!item.items) {
    return (
      <a
        href={item.href}
        onClick={onSelect}
        className="block py-3 px-4 text-sm font-medium text-white/70 border-b border-white/5 hover:text-veda-orange transition-colors"
      >
        {item.label}
      </a>
    );
  }

  return (
    <div className="border-b border-white/5">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between py-3 px-4 text-sm font-medium text-white/70 hover:text-veda-orange transition-colors"
        aria-expanded={expanded}
      >
        <span>{item.label}</span>
        <FiChevronDown
          className={cn("w-4 h-4 transition-transform", expanded && "rotate-180")}
        />
      </button>
      {expanded && (
        <ul className="bg-white/5 py-1">
          {item.items.map((sub) => {
            const label = typeof sub === "string" ? sub : sub.label;
            const href = typeof sub === "string" ? "#" : sub.href ?? "#";
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={onSelect}
                  className="block px-7 py-2 text-sm text-white/50 hover:text-veda-orange transition-colors"
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// Flat search index built from NAV at module load
const SEARCH_INDEX = NAV.flatMap((entry) => {
  if (entry.href) return [{ label: entry.label, href: entry.href, category: "Pages" }];
  return (entry.items ?? []).map((sub) => ({
    label: sub.label,
    href: sub.href ?? "#",
    category: entry.label,
  }));
});

function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  const q = query.toLowerCase().trim();
  const results = q.length === 0
    ? SEARCH_INDEX.slice(0, 10)
    : SEARCH_INDEX.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      ).slice(0, 12);

  return (
    <div className="fixed inset-0 z-200 flex items-start justify-center pt-[14vh]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg mx-4 rounded-2xl border border-white/10 bg-veda-dark/98 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-white/10">
          <FiSearch className="w-4 h-4 text-white/40 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages…"
            className="flex-1 bg-transparent py-4 text-sm text-white placeholder-white/30 outline-none"
          />
          <kbd
            onClick={onClose}
            className="shrink-0 px-1.5 py-0.5 rounded border border-white/10 text-[10px] text-white/30 cursor-pointer hover:text-white/60 transition-colors select-none"
          >
            ESC
          </kbd>
        </div>
        {results.length > 0 ? (
          <ul className="max-h-80 overflow-y-auto py-2">
            {results.map((item) => (
              <li key={`${item.category}-${item.href}-${item.label}`}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-white/5 group transition-colors"
                >
                  <span className="text-sm text-white/80 group-hover:text-white">{item.label}</span>
                  <span className="text-xs text-white/30 group-hover:text-veda-orange/70">{item.category}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-8 text-center text-sm text-white/30">No results for &ldquo;{query}&rdquo;</p>
        )}
      </div>
    </div>
  );
}

function LanguageDropdown() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-all text-xs font-medium"
        aria-label="Select language"
      >
        <FiGlobe className="w-4 h-4" />
        <span className="hidden sm:inline">{selected.label}</span>
        <FiChevronDown className={cn("w-3 h-3 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-white/10 bg-veda-dark/95 backdrop-blur-xl shadow-xl shadow-black/40 p-1 z-50"
        >
          {LANGUAGES.map((l) => (
            <li key={l.code} role="option" aria-selected={lang === l.code}>
              <button
                type="button"
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={cn(
                  "w-full text-left rounded-md px-3 py-2 text-sm transition-colors",
                  lang === l.code
                    ? "text-veda-orange bg-white/5 font-semibold"
                    : "text-white/60 hover:bg-white/5 hover:text-white",
                )}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { lang: mobileLangCode, setLang: setMobileLangCode } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  const wrapperClass = scrolled
    ? "bg-veda-dark/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30"
    : "bg-veda-dark/75 backdrop-blur-lg border-b border-white/5";

  return (
    <>
      <nav
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${wrapperClass}`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center shrink-0">
            <Image
              src={logo}
              alt="JyotirVeda"
              height={36}
              unoptimized
              className="h-9 w-auto"
            />
          </a>

          {/* Desktop nav (xl+) */}
          <div className="hidden xl:flex items-center gap-1 text-[13px] font-medium">
            {NAV.map((item) =>
              item.items ? (
                <NavDropdown key={item.label} item={item} />
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative px-3 py-2 whitespace-nowrap text-white/60 hover:text-white transition-colors group"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-veda-orange to-veda-gold group-hover:w-4/5 transition-all duration-300 rounded-full" />
                </a>
              ),
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageDropdown />
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 pl-3 pr-2 py-1.5 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-xs"
              aria-label="Search"
            >
              <FiSearch className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden md:inline px-1 py-0.5 rounded border border-white/10 text-[10px] text-white/20">⌃K</kbd>
            </button>
            {/* <button
              onClick={() => setLoginOpen(true)}
              className="bg-linear-to-r from-veda-orange to-veda-gold text-white px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-md shadow-veda-orange/25 hover:shadow-veda-orange/45 hover:scale-105 transition-all duration-200"
            >
              Login
            </button> */}
            <button
              onClick={() => setMobileOpen(true)}
              className="xl:hidden p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Open menu"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile / tablet drawer */}
      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 z-100">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-veda-dark/98 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 shrink-0">
              <Image
                src={logo}
                alt="JyotirVeda"
                height={30}
                unoptimized
                className="h-8 w-auto"
              />
              <div className="flex items-center gap-2">
                <div className="flex rounded-lg overflow-hidden border border-white/10 text-xs">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setMobileLangCode(l.code)}
                      className={cn(
                        "px-3 py-1.5 transition-colors",
                        mobileLangCode === l.code
                          ? "bg-veda-orange text-white font-semibold"
                          : "text-white/50 hover:text-white",
                      )}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-white/60 hover:text-white"
                aria-label="Close menu"
              >
                <FiX className="w-5 h-5" />
              </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {NAV.map((item) => (
                <MobileSection
                  key={item.label}
                  item={item}
                  onSelect={() => setMobileOpen(false)}
                />
              ))}
            </div>
          </aside>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <LoginModal
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSwitchToSignup={() => setSignupOpen(true)}
      />
      <SignupModal
        open={signupOpen}
        onOpenChange={setSignupOpen}
        onSwitchToLogin={() => setLoginOpen(true)}
      />
    </>
  );
}
