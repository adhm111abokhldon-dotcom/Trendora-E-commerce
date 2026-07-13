// import BestSellers from "../components/BestSellers";
import Hero from "../components/hero/Hero";
import FeaturedCategories from "../components/FeaturedCategories";
// import SmartProductGrid from "../components/SmartProductGrid";
import Categories from "../components/ui/Categories";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageTransition from "../components/PageTransition";
// import CartActions from "../components/ui/CartActions";
// import Testimonials from "../components/Testimonials";
// import FAQ from "../components/FAQ";
// import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <PageTransition>
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
      {/* <CartActions /> */}
    </PageTransition>
  );
};

export default Home;
