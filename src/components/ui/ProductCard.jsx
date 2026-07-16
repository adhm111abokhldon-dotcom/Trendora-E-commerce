import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

const ProductCard = ({ children }) => {
  return (
    <div
      className="group flex flex-col h-70 sm:h-75 md:h-80 rounded-3xl overflow-hidden border
       border-border-light dark:border-border-dark shadow-sm 
    hover:shadow-md transition-all"
    >
      {children}
    </div>
  );
};
const CardImage = ({ path, src, alt, discount, className = "", children }) => {
  return (
    <div
      className={`relative bg-gray-50 dark:bg-slate-900 overflow-hidden shrink-0 ${className}`}
    >
      {discount && (
        <div className="absolute top-2 left-3 text-base-text-faint text-[10px] md:text-xs bg-danger font-semibold px-2 py-1 rounded-xl z-10">
          <span>{Math.round(discount)}% OFF</span>
        </div>
      )}
      {children}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain p-2 md:p-4 group-hover:scale-105 transition"
      />
      <button
        className=" absolute bottom-0 right-1  hover:text-accent-hover
         text-xs text-accent-trendora font-semibold opacity-90
                 transition-all duration-300   "
      >
        <Link className="w-full gap-1 h-full flex items-center" to={path}>
          {" "}
          View Space <GoArrowRight className="text-sm " />
        </Link>
      </button>
    </div>
  );
};

const CardBody = ({ price, title, brand, children }) => {
  return (
    <div className="flex flex-col flex-1 p-1 sm:p-2 md:p-4 bg-gray-200 dark:bg-dark-bg">
      <div className=" mb-1 sm:mb-2 md:mb-4 flex-1">
        <span className="text-base-text-faint block mb-1 truncate text[10px] md:text-xs">
          {brand}
        </span>
        <h2 className="text-xs md:text-sm font-semibold text-base-text dark:text-dark-text line-clamp-2 h-8 md:h-10">
          {title}
        </h2>
      </div>
      <div
        className="pt-1 sm:pt-2 md:pt-3 border-t gap-1 flex items-center max-sm:flex-col md:gap-0 md:justify-between 
         justify-center border-gray-100
       dark:border-zinc-800"
      >
        <p className="text-accent-trendora font-bold text-sm md:text-base ">
          {price}
        </p>
        {children}
      </div>
    </div>
  );
};

ProductCard.Image = CardImage;
ProductCard.body = CardBody;
export default ProductCard;
