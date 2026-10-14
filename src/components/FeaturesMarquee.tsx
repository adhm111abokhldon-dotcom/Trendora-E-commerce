import { FiTruck, FiShield, FiRefreshCw, FiPhoneCall } from "react-icons/fi";
import { useI18n } from "@/i18n";

const FeaturesMarquee = () => {
  const { lang } = useI18n();
  const isLeft = lang === "en";
  const { t } = useI18n();
  const features = [
    { icon: <FiTruck />, text: t("marquee.delivery") },
    { icon: <FiShield />, text: t("marquee.secure") },
    { icon: <FiRefreshCw />, text: t("marquee.returns") },
    { icon: <FiPhoneCall />, text: t("marquee.support") },
  ];

  return (
    <div
      className="w-full h-14 md:h-16 bg-accent-trendora  text-base-text flex items-center overflow-hidden
     whitespace-nowrap font-bold tracking-wider text-xs md:text-sm border-y border-accent-hover shadow-sm"
    >
      <div
        className={`flex ${isLeft ? "animate-marqueeLeft" : "animate-marqueeRight"} shrink-0 gap-16 px-8`}
      >
        {features.map((item, index) => (
          <div key={`group1-${index}`} className="flex items-center gap-3">
            <span className="text-lg md:text-xl text-base-text">
              {item.icon}
            </span>
            <span>{item.text}</span>

            <span className="ms-16 text-base-text/40">•</span>
          </div>
        ))}

        {features.map((item, index) => (
          <div key={`group2-${index}`} className="flex items-center gap-3">
            <span className="text-lg md:text-xl text-base-text">
              {item.icon}
            </span>
            <span>{item.text}</span>
            <span className="ms-16 text-base-text/40">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesMarquee;
