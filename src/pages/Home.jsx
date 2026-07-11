// import BestSellers from "../components/BestSellers";
import Hero from "../components/hero/Hero";
import FeaturedCategories from "../components/FeaturedCategories";
// import SmartProductGrid from "../components/SmartProductGrid";
import Categories from "../components/ui/Categories";
import { useEffect, useState } from "react";
// import Testimonials from "../components/Testimonials";
// import FAQ from "../components/FAQ";
// import Newsletter from "../components/Newsletter";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => setCategories(data.slice(0, 8) || []))
      .catch((err) => console.log("error From Category Section", err));
  }, []);
  if (!categories) return <>Loading...</>;
  return (
    <div>
      <Hero />
      <FeaturedCategories />
      <Categories
        heading={"Explore Categories"}
        categories={categories}
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
