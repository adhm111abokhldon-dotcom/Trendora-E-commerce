import React from "react";

const Title = ({ heading, subHeading }) => {
  return (
    <div className="text-center  max-w-2xl mx-auto px-4 pb-12 lg:pb-16 flex flex-col gap-2">
      <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
        {heading}
      </h2>
      <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
        {subHeading}
      </p>
    </div>
  );
};

export default Title;
