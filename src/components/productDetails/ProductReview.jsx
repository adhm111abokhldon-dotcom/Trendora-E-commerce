import React from "react";
import Title from "../ui/Title";
import getProductRating from "../../../utils/getProductRating";
import { FaRegStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const ProductReview = ({ product }) => {
  if (!product || !product.reviews)
    return (
      <p className="text-center py-10  text-gray-500">Loading reviews...</p>
    );

  return (
    <>
     

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6">
        {product.reviews.map((review, index) => (
          <div
            key={index}
            className="flex flex-col justify-between p-6 bg-base-surface dark:bg-slate-900 rounded-2xl shadow-sm border
             border-border-light dark:border-border-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              <div className="flex gap-1 mb-3 flex-col">
                <h3 className="font-semibold text-base-text dark:text-dark-text  text-sm">
                  {review.reviewerName}
                </h3>
                <div className="flex">
                  {getProductRating(review.rating).map((star, index) => {
                    if (star === "full")
                      return (
                        <FaStar key={index} className="text-accent text-sm" />
                      );
                    if (star === "half")
                      return (
                        <FaStarHalfAlt
                          key={index}
                          className="text-accent text-sm"
                        />
                      );
                    return (
                      <FaRegStar key={index} className="text-accent text-sm" />
                    );
                  })}
                </div>
              </div>

              <p className="text-base-text  dark:text-dark-text font-extralight text-sm leading-relaxed italic mb-4">
                "{review.comment}"
              </p>
            </div>

            <div
              className="flex sm:flex-col sm:justify-center sm:gap-2  
              items-center justify-between sm:items-start pt-4 border-t
             border-border-light dark:border-border-dark"
            >
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500  max-w-37.5">
                  {review.reviewerEmail}
                </p>
              </div>

              <span className="text-[11px] text-gray-400 bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded-md ">
                {new Date(review.date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductReview;
