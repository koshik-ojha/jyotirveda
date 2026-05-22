"use client";
import { useLanguage } from "./context";
import { t } from "./strings";

/**
 * Hook that returns a (key) => translated string function bound to the
 * currently selected language.
 */
export function useT() {
  const { lang } = useLanguage();
  return (key) => t(lang, key);
}

/**
 * Pick the matching language field from a multilingual object like
 *   { en: "Aries", hi: "मेष", gu: "મેષ", sa: "Mesha" }
 * Falls back gracefully: gu → hi → en.
 */
export function pickLang(obj, lang) {
  if (!obj) return "";
  if (lang === "gu") return obj.gu ?? obj.hi ?? obj.en;
  if (lang === "hi") return obj.hi ?? obj.en;
  return obj.en ?? obj.sa ?? "";
}
