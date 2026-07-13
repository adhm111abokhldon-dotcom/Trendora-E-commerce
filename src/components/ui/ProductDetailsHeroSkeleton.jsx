import React from "react";

const ProductDetailsHeroSkeleton = () => {
  return (
    <div
      className="flex flex-col md:items-center
     md:flex-row gap-4 "
    >
      {/* Images */}
      <div className="w-full md:w-1/2">
        <div className=" mb-3 w-full flex justify-center">
          <div className="w-45 h-45 md:h-40 bg-gray-300"></div>
        </div>
        <div className="flex gap-2">
          <div className="w-1/3 h-45 md:h-28 bg-gray-300"></div>
          <div className="w-1/3 h-45 md:h-28 bg-gray-300"></div>
          <div className="w-1/3 h-45 md:h-28 bg-gray-300"></div>
        </div>
      </div>

      {/* Desc */}
      <div className="w-full md:w-1/2 flex flex-col">
        {/* title */}
        <div className="mb-1 md:mb-2 h-8 bg-gray-300 w-1/2 mx-auto"></div>
        {/* desc */}
        <div className="mb-1 md:mb-2 md:hidden w-[90%] h-8 bg-gray-300"></div>
        <div className="hidden md:block h-4 w-full mb-1 bg-gray-300"></div>
        <div className="hidden md:block h-4 w-full mb-1 bg-gray-300"></div>
        <div className="hidden md:block h-4 w-[60%] mb-4 bg-gray-300"></div>

        {/*  */}
        <div className="h-6 mb-1 bg-gray-200 w-25"></div>
        <div className="h-6 mb-1 bg-gray-200 w-25"></div>
        <div className="h-6 mb-1 bg-gray-200 w-25"></div>
        <div className="h-6 mb-1 bg-gray-200 w-25"></div>
        <div className="w-30 self-center h-8 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default ProductDetailsHeroSkeleton;
