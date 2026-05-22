"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const SUPPORTED = ["en", "hi", "gu"];
const DEFAULT = "en";
const STORAGE_KEY = "jv_lang";
const GOOGLE_COOKIE = "googtrans";

const LanguageContext = createContext({
  lang: DEFAULT,
  setLang: () => {},
  supported: SUPPORTED,
});

/**
 * Patch removeChild / insertBefore so Google Translate's DOM mutations don't
 * crash React's reconciliation. Standard workaround documented at:
 *   https://github.com/facebook/react/issues/11538
 */
function applyDomPatches() {
  if (typeof Node !== "function" || !Node.prototype || Node.prototype.__jvPatched) return;
  Node.prototype.__jvPatched = true;

  const origRemove = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child;
    return origRemove.apply(this, arguments);
  };
  const origInsert = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      return Node.prototype.appendChild.call(this, newNode);
    }
    return origInsert.apply(this, arguments);
  };
}

/**
 * Strip every Google Translate banner / iframe Google injects, and override
 * the inline `body.style.top = '40px'` GT applies to make room for the bar.
 * Uses a MutationObserver because GT re-injects on every page mutation.
 */
function startBannerScrubber() {
  if (typeof window === "undefined") return () => {};

  const scrub = () => {
    // Remove banner iframes (multiple class variants).
    document
      .querySelectorAll(
        ".goog-te-banner-frame, iframe.goog-te-banner-frame, .goog-te-ftab, .goog-te-balloon-frame, #goog-gt-tt"
      )
      .forEach((el) => el.remove());
    // Strip the body inline top push.
    if (document.body && document.body.style && document.body.style.top) {
      document.body.style.top = "";
    }
    if (document.body && document.body.classList.contains("translated-ltr")) {
      // Doesn't hurt to leave the class — only kills the top offset above.
    }
  };

  scrub();
  const obs = new MutationObserver(scrub);
  obs.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style", "class"],
  });
  return () => obs.disconnect();
}

function setGoogleCookie(target) {
  // googtrans format: /<source>/<target>. We always use English as the source.
  const value = target === "en" ? "" : `/en/${target}`;
  // Wipe any prior cookies (Google sets several with different domain scopes).
  const wipe = `${GOOGLE_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  document.cookie = wipe;
  document.cookie = `${wipe} domain=${window.location.hostname};`;
  if (target !== "en") {
    document.cookie = `${GOOGLE_COOKIE}=${value}; path=/`;
    document.cookie = `${GOOGLE_COOKIE}=${value}; path=/; domain=${window.location.hostname}`;
  }
}

function injectGoogleTranslate() {
  if (typeof window === "undefined") return;
  if (document.getElementById("__gt_script")) return;

  window.googleTranslateElementInit = function () {
    /* global google */
    new google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: SUPPORTED.join(","),
        autoDisplay: false,
        layout: 0,
      },
      "google_translate_element"
    );
  };

  const s = document.createElement("script");
  s.id = "__gt_script";
  s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.body.appendChild(s);
}

export function LanguageProvider({ children, initial = DEFAULT }) {
  const [lang, setLangState] = useState(initial);

  // Apply DOM patches before Google Translate loads, then keep stripping
  // the banner GT keeps re-inserting.
  useEffect(() => {
    applyDomPatches();
    injectGoogleTranslate();
    const stop = startBannerScrubber();
    return stop;
  }, []);

  // Hydrate from cookie / localStorage on mount.
  useEffect(() => {
    let next = DEFAULT;
    try {
      const ls = localStorage.getItem(STORAGE_KEY);
      if (ls && SUPPORTED.includes(ls)) next = ls;
      else {
        const m = document.cookie.match(/(?:^|;\s*)jv_lang=([^;]+)/);
        if (m && SUPPORTED.includes(m[1])) next = m[1];
      }
    } catch {}
    setLangState(next);
  }, []);

  // Sync <html lang> with current state.
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
      document.cookie = `${STORAGE_KEY}=${next}; path=/; max-age=31536000; samesite=lax`;
    } catch {}
    setGoogleCookie(next);
    // Reload so Google Translate picks up the new googtrans cookie cleanly.
    // (Programmatic widget switching is brittle; reload is more reliable.)
    if (typeof window !== "undefined") window.location.reload();
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, supported: SUPPORTED }}>
      {/* Hidden container — Google Translate mounts its widget here. */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
