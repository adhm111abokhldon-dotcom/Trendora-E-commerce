import React from "react";
import { FiTruck, FiShield, FiRefreshCw, FiPhoneCall } from "react-icons/fi";

export default function FeaturesMarquee() {
  const features = [
    { icon: <FiTruck />, text: "FREE FAST DELIVERY FOR ORDERS OVER $100" },
    { icon: <FiShield />, text: "100% SECURE PAYMENT" },
    { icon: <FiRefreshCw />, text: "14-DAYS EASY RETURNS" },
    { icon: <FiPhoneCall />, text: "24/7 CUSTOMER SUPPORT" },
  ];

  return (
    <div
      className="w-full h-14 md:h-16 bg-accent  text-base-text flex items-center overflow-hidden
     whitespace-nowrap font-bold tracking-wider text-xs md:text-sm border-y border-accent-hover shadow-sm"
    >
      <div className="flex animate-marquee shrink-0 gap-16 px-8">
        {features.map((item, index) => (
          <div key={`group1-${index}`} className="flex items-center gap-3">
            <span className="text-lg md:text-xl text-base-text">
              {item.icon}
            </span>
            <span>{item.text}</span>

            <span className="ml-16 text-base-text/40">•</span>
          </div>
        ))}

        {features.map((item, index) => (
          <div key={`group2-${index}`} className="flex items-center gap-3">
            <span className="text-lg md:text-xl text-base-text">
              {item.icon}
            </span>
            <span>{item.text}</span>
            <span className="ml-16 text-base-text/40">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
