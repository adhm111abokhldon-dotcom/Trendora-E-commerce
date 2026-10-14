import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en, type TranslationKey } from "./en";
import { ar } from "./ar";

export type Language = "en" | "ar";
export type Direction = "ltr" | "rtl";

const dictionaries: Record<Language, Record<TranslationKey, string>> = {
  en,
  ar,
};

const STORAGE_KEY = "lang";

const getInitialLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ar") return saved;
  } catch {
    // ignore (SSR / privacy mode)
  }
  return "en";
};

type I18nContextType = {
  lang: Language;
  dir: Direction;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

const interpolate = (
  template: string,
  vars?: Record<string, string | number>,
) => {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, token) =>
    token in vars ? String(vars[token]) : match,
  );
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(getInitialLanguage);
  const dir: Direction = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang, dir]);

  const setLang = useCallback((next: Language) => setLangState(next), []);
  const toggleLang = useCallback(
    () => setLangState((prev) => (prev === "en" ? "ar" : "en")),
    [],
  );

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) =>
      interpolate(dictionaries[lang][key] ?? en[key], vars),
    [lang],
  );

  const value = useMemo(
    () => ({ lang, dir, setLang, toggleLang, t }),
    [lang, dir, setLang, toggleLang, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageProvider;
