import React from "react";

const TitleSkeleton = () => {
  return (
    <div
      className="max-w-2xl mx-auto animate-pulse
     px-4 pb-8 md:pb-10 lg:pb-12 flex flex-col gap-2"
    >
      <div className="bg-gray-300 rounded-2xl w-[60%] mx-auto h-11 md:h-15"></div>
      <div className="mx-auto h-8 md:h-12 w-[40%] rounded-2xl bg-gray-200 "></div>
    </div>
  );
};

export default TitleSkeleton;
