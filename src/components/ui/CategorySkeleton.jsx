const CategorySkeleton = () => {
  return (
    <div className="h-48 animate-pulse rounded-2xl relative">
      {/* image */}
      <div className="bg-gray-200  w-full rounded-2xl h-full"></div>
      <div className="absolute w-30 p-4 bottom-0 left-0 flex flex-col">
        <div className=" h-6 md:h-5 w-full  bg-gray-300 z-10 "></div>
        <div className=" lg:bg-transparent mt-2  h-4 md:h-4 w-full  bg-gray-300 z-10 "></div>
      </div>
    </div>
  );
};

export default CategorySkeleton;
