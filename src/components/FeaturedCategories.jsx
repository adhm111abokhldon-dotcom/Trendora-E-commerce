import React from "react";
import Title from "./ui/Title";
import { GoArrowUpRight } from "react-icons/go";

export default function FeaturedCategories() {
  const categories = [
    {
      id: 1,
      title: "BEST SELLERS",
      subtitle: "What Everyone Is Buying",
      count: "Top Rated Items",
      image: "/best-image.jpg",
    },
    {
      id: 2,
      title: "TRENDING NOW",
      subtitle: "Viral & Urban Styles",
      count: "Going Fast 🔥",
      image: "/trend-image.jpg",
    },
    {
      id: 3,
      title: "HOT DROPS",
      subtitle: "Exclusive Limited Deals",
      count: "Up to 40% OFF",
      image: "/hotDrop-image.jpg",
    },
    {
      id: 4,
      title: "NEW ARRIVALS",
      subtitle: "Fresh Off The Design Lab",
      count: "Just Landed",
      image: "/new-image.jpg",
    },
  ];

  return (
    <section className="section-padding px-4 max-w-7xl mx-auto bg-base-bg dark:bg-dark-surface">
      <Title subHeading={""} heading={" Explore Trendora Spaces"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="h-50 md:h-60 rounded-2xl flex items-center justify-center group cursor-pointer
            shadow-md"
          >
            <div
              className=" w-full h-full bg-slate-900 rounded-2xl  
            flex items-center p-6 gap-6 "
            >
              <div className="flex-1 flex flex-col justify-center ">
                <span className="text-base-text-muted text-xs font-semibold">
                  {cat.count}
                </span>
                <h3 className="text-xl md:text-2xl font-black mt-1 text-accent transition-colors duration-300">
                  {cat.title}
                </h3>
                <div className="mt-4">
                  <button
                    className="bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl
                     border border-slate-700 group-hover:bg-white
                   group-hover:text-slate-950 transition-all duration-300 active:scale-95"
                  >
                    View Space
                  </button>
                </div>
              </div>

              <div className="w-1/2 h-full rounded-xl overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover max-w-full max-h-full
                  transition-all duration-500 scale-100 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
