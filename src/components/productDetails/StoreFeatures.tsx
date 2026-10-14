import { FaTruckFast, FaArrowRotateLeft, FaHeadphones } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";
import { useI18n } from "@/i18n";

const StoreFeatures = () => {
  const { t } = useI18n();
  const features = [
    {
      icon: <FaTruckFast className="text-2xl text-accent-trendora " />,
      title: t("store.fastShipping"),
      description: t("store.fastShippingDesc"),
    },
    {
      icon: <IoShieldCheckmark className="text-2xl text-accent-trendora" />,
      title: t("store.securePayment"),
      description: t("store.securePaymentDesc"),
    },
    {
      icon: <FaArrowRotateLeft className="text-2xl text-accent-trendora" />,
      title: t("store.easyReturns"),
      description: t("store.easyReturnsDesc"),
    },
    {
      icon: <FaHeadphones className="text-2xl text-accent-trendora" />,
      title: t("store.support"),
      description: t("store.supportDesc"),
    },
  ];

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <div key={index} className="flex  gap-4 items-center ">
          <div
            className="flex items-center justify-center p-3 bg-white dark:bg-zinc-800 rounded-xl
           shadow-sm border border-border-light dark:border-border-dark"
          >
            {feature.icon}
          </div>
          <div className="text-sm flex gap-1 sm:gap-2 flex-col">
            <h2 className="font-semibold text-base-text dark:text-dark-text flex">
              {feature.title}
            </h2>
            <p className="text-base-text-faint">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreFeatures;
