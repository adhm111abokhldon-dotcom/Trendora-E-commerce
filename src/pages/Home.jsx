// import BestSellers from "../components/BestSellers";
import Hero from "../components/hero/Hero";
import FeaturedCategories from "../components/FeaturedCategories";
// import SmartProductGrid from "../components/SmartProductGrid";
import Categories from "../components/ui/Categories";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import Testimonials from "../components/Testimonials";
// import FAQ from "../components/FAQ";
// import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedCategories />

      <Categories
        heading={"Explore Categories"}
        allCategories={false}
        link={"categories"}
      />
      {/* <Testimonials /> */}
      {/* <FAQ /> */}
      {/* <Newsletter /> */}
    </div>
  );
};

export default Home;
