import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useI18n } from "@/i18n";

const footerLinks = [
  {
    titleKey: "footer.shop" as const,
    links: [
      {
        labelKey: "footer.newArrivals" as const,
        url: "/customCategory/new-arrivals",
        isRoute: true,
      },
      {
        labelKey: "footer.bestSellers" as const,
        url: "/customCategory/best-sellers",
        isRoute: true,
      },
      {
        labelKey: "footer.hotDrops" as const,
        url: "/customCategory/hot-drops",
        isRoute: true,
      },
      {
        labelKey: "footer.trending" as const,
        url: "/customCategory/trending",
        isRoute: true,
      },
    ],
  },
  {
    titleKey: "footer.support" as const,
    links: [
      { labelKey: "nav.contact" as const, url: "#contact-us", isRoute: false },
      { labelKey: "footer.faqs" as const, url: "#FAQ", isRoute: false },
      { labelKey: "footer.shipping" as const, url: "#", isRoute: false },
      { labelKey: "footer.trackOrder" as const, url: "#", isRoute: false },
      { labelKey: "footer.demoLogin" as const, url: "/login", isRoute: true },
    ],
  },
  {
    titleKey: "footer.legal" as const,
    links: [
      { labelKey: "footer.terms" as const, url: "#", isRoute: false },
      { labelKey: "footer.privacy" as const, url: "#", isRoute: false },
      { labelKey: "footer.returnPolicy" as const, url: "#", isRoute: false },
    ],
  },
];

const contactData = [
  {
    className:
      "text-[#E4405F] lg:hover:text-[#E4405F] lg:text-base-text-muted lg:dark:text-dark-text-muted",
    href: "https://www.instagram.com/adhmaobeid/?hl=en",
    icon: <FaInstagram />,
  },
  {
    className:
      "text-[#1877F2] lg:hover:text-[#1877F2] lg:text-base-text-muted lg:dark:text-dark-text-muted",
    href: "https://www.facebook.com/adhm.k.aobeid/",
    icon: <FaFacebook />,
  },
  {
    className:
      "text-[#1DA1F2] lg:hover:text-[#1DA1F2] lg:text-base-text-muted lg:dark:text-dark-text-muted",
    href: "https://x.com/",
    icon: <FaTwitter />,
  },
  {
    className:
      "text-[#FF0000] lg:hover:text-[#FF0000] lg:text-base-text-muted lg:dark:text-dark-text-muted",
    href: "https://www.youtube.com/",
    icon: <FaYoutube />,
  },
];

export default function Footer() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "ok" | "error">("idle");

  const handleSubscribe = () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setSubStatus(valid ? "ok" : "error");
    if (valid) setEmail("");
  };

  return (
    <footer
      id="contact-us"
      className="bg-base-surface dark:bg-dark-bg border-t border-border-light
       dark:border-border-dark pt-15 md:pt-20 pb-8 mt-10"
    >
      <div className="custom-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <h3 className="text-2xl font-bold text-base-text dark:text-dark-text tracking-wide">
              Trendora
            </h3>
            <p className="text-base-text-muted dark:text-dark-text-muted text-sm max-w-sm leading-relaxed">
              {t("footer.tagline")}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 max-w-md mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubStatus("idle");
                }}
                placeholder={t("footer.subscribePlaceholder")}
                aria-label={t("footer.subscribePlaceholder")}
                className="flex-1 px-4 py-2.5 bg-base-bg dark:bg-dark-surface border border-border-light dark:border-border-dark rounded-card text-base-text dark:text-dark-text text-sm focus:border-accent-trendora focus:ring-1 focus:ring-accent-trendora transition-all duration-300"
              />

              <button
                type="button"
                onClick={handleSubscribe}
                className="px-6 py-2.5 bg-base-text dark:bg-dark-text text-base-surface dark:text-dark-bg font-bold rounded-card text-sm hover:bg-accent-trendora hover:text-base-text dark:hover:bg-accent-trendora dark:hover:text-base-text transition-all duration-300 active:scale-95"
              >
                {t("footer.subscribe")}
              </button>
            </div>

            <div aria-live="polite" className="text-xs min-h-4">
              {subStatus === "ok" && (
                <span className="text-green-600 dark:text-green-400">
                  {t("footer.subscribed")}
                </span>
              )}
              {subStatus === "error" && (
                <span className="text-red-500">{t("footer.invalidEmail")}</span>
              )}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.titleKey} className="flex flex-col gap-4">
              <h4
                className="font-heading font-bold text-base-text dark:text-dark-text
               uppercase tracking-wider text-sm"
              >
                {t(group.titleKey)}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.labelKey}>
                    {link.isRoute ? (
                      <Link
                        className="w-full h-full text-base-text-muted dark:text-dark-text-muted text-sm hover:text-accent-trendora dark:hover:text-accent-trendora transition-colors duration-200"
                        to={link.url}
                      >
                        {t(link.labelKey)}
                      </Link>
                    ) : (
                      <a
                        href={link.url}
                        className="text-base-text-muted dark:text-dark-text-muted text-sm hover:text-accent-trendora dark:hover:text-accent-trendora transition-colors duration-200"
                      >
                        {t(link.labelKey)}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="border-t border-border-light dark:border-border-dark
         pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-base-text-faint"
        >
          <div>{t("footer.rights")}</div>

          <ul className="flex  gap-4 items-center">
            {contactData.map((link) => (
              <li
                key={link.href}
                className={` ${link.className} text-4xl cursor-pointer transition-colors`}
              >
                <a target="_blank" rel="noreferrer" href={link.href}>
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
