import FAQ from "@/components/FAQ";
import FeaturedCategories from "@/components/FeaturedCategories";

import Hero from "@/components/hero/Hero";
import PageTransition from "@/components/PageTransition";
import Categories from "@/components/ui/Categories";

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
      <FAQ />
    </PageTransition>
  );
};

export default Home;
