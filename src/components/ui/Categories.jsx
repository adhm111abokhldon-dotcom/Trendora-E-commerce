import React, { useEffect, useState } from "react";
import Title from "./Title";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import TitleSkeleton from "./TitleSkeleton";
import CategorySkeleton from "./CategorySkeleton";
import { useQuery } from "@tanstack/react-query";

const Categories = ({ heading, allCategories = true, link }) => {
  const fetchCategories = async () => {
    const res = await fetch("https://dummyjson.com/products/category-list");
    if (!res.ok) throw new Error("Failed to fetch Categories");

    return res.json();
  };

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  if (error) return <p>{error.message}</p>;
  if (isLoading) {
    return (
      <section className="custom-container section-padding bg-base-bg dark:bg-dark-surface">
        <TitleSkeleton />
        <div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
         gap-6  "
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }
  const displayedCategories = allCategories
    ? categories
    : categories.slice(0, 8);

  return (
    <section
      className="custom-container section-padding bg-base-bg
     dark:bg-dark-surface text-base-text dark:text-dark-text"
    >
      <Title
        heading={heading}
        subHeading={`${displayedCategories.length} Categories `}
      />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedCategories.map((category, index) => (
          <div
            key={index}
            className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer 
                       shadow-lg dark:shadow-slate-950/50 active:scale-[0.98] transition-all duration-300"
          >
            <Link to={`${link}/${category}`} className="w-full h-full">
              <img
                src={`/${category}-image.jpg`}
                alt={category}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105
               transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div
                className="absolute bottom-0 p-4 flex flex-col
               justify-end z-10"
              >
                <h3 className="text-base font-bold capitalize tracking-wide text-dark-text ">
                  {category.replace("-", " ")}
                </h3>

                <div
                  className="flex items-center gap-1 text-xs text-accent-trendora font-semibold mt-1 opacity-90
               lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 transform lg:translate-y-2 
               lg:group-hover:translate-y-0"
                >
                  <span>View Space</span>
                  <GoArrowRight className="text-sm" />
                </div>
              </div>
            </Link>
          </div>
        ))}
        {!allCategories && (
          <div className="h-48 rounded-2xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center p-4 text-center group cursor-pointer hover:border-amber-400 transition-colors duration-300">
            <Link
              className="w-full h-full flex flex-col items-center justify-center"
              to={"categories"}
            >
              <p className="text-sm text-slate-400 group-hover:text-slate-600 transition-colors">
                Want to see more?
              </p>
              <button className="mt-2 text-accent-trendora font-bold text-sm flex items-center gap-2 group-hover:text-accent-hover">
                View All Categories
                <GoArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
