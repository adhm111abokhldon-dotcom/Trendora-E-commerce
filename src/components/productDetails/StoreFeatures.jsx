import React from "react";
import { FaTruckFast, FaArrowRotateLeft, FaHeadphones } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";
import Title from "../ui/Title";

const StoreFeatures = () => {
  const features = [
    {
      icon: <FaTruckFast className="text-2xl text-accent-trendora " />,
      title: "Fast Shipping",
      description: "Free Fast delivery for orders over $100",
    },
    {
      icon: <IoShieldCheckmark className="text-2xl text-accent-trendora" />,
      title: "Secure Payment",
      description: "100% protected payment methods",
    },
    {
      icon: <FaArrowRotateLeft className="text-2xl text-accent-trendora" />,
      title: "Easy Returns",
      description: "14 days money-back guarantee",
    },
    {
      icon: <FaHeadphones className="text-2xl text-accent-trendora" />,
      title: "24/7 Support",
      description: "Dedicated backup professional team",
    },
  ];

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
      {features.map((feature, index) => (
        <div key={index} className="flex  gap-4 items-center">
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
