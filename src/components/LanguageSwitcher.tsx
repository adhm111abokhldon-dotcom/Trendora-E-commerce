import { useI18n } from "@/i18n";
import { Languages } from "lucide-react";

const LanguageSwitcher = () => {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-border-light dark:border-border-dark px-1 py-0.5"
      role="group"
      aria-label={t("lang.switch")}
    >
      <Languages
        className="hidden sm:block text-base-text-muted dark:text-dark-text-muted mx-1"
        size={16}
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-2 py-0.5 text-xs font-bold rounded-full transition-colors ${
          lang === "en"
            ? "bg-accent-trendora text-base-text"
            : "text-base-text-muted dark:text-dark-text-muted hover:text-base-text dark:hover:text-dark-text"
        }`}
      >
        {t("lang.english")}
      </button>
      <button
        type="button"
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
        className={`px-2 py-0.5 text-xs font-bold rounded-full transition-colors ${
          lang === "ar"
            ? "bg-accent-trendora text-base-text"
            : "text-base-text-muted dark:text-dark-text-muted hover:text-base-text dark:hover:text-dark-text"
        }`}
      >
        {t("lang.arabic")}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
