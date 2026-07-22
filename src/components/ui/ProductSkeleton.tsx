const ProductSkeleton = () => {
  return (
    <div
      className="rounded-3xl border border-border-light
     dark:border-border-dark h-70 sm:h-75 md:h-80  animate-pulse flex- flex-col"
    >
      {/* Image */}
      <div className="w-full mb-1 h-35 md:h-40 rounded-3xl bg-gray-300"></div>
      <div className="flex  flex-col flex-1 p-1 sm:p-2 md:p-4">
        <div className=" mb-1 w-1/2 sm:mb-2 md:mb-4 flex-1">
          {/* brand */}
          <div className="mb-1 h-4  bg-gray-300"></div>

          {/* title */}
          <div className="h-8 md:h-10">
            <div className="mt-2 h-4  bg-gray-300"></div>
          </div>
        </div>
        <div
          className="pt-1 sm:pt-2 md:pt-3 border-t border-gray-100 w-full
       dark:border-zinc-800 gap-1 justify-center flex items-center max-sm:flex-col md:gap-0 md:justify-between"
        >
          {/* Price */}
          <div className="= h-6 rounded-md w-12 bg-gray-300"></div>

          {/* Button */}
          <div className="= h-6  rounded-md w-12 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
