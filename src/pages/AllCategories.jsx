import { useQuery } from "@tanstack/react-query";
import Categories from "../components/ui/Categories";
import ProductSkeleton from "../components/ui/ProductSkeleton";
import CategorySkeleton from "../components/ui/CategorySkeleton";
import TitleSkeleton from "../components/ui/TitleSkeleton";
import PageTransition from "../components/PageTransition";

const AllCategories = () => {
  return (
    <PageTransition>
      <Categories
        heading={"Categories"}
        allCategories={true}
        link={"/categories"}
      />
    </PageTransition>
  );
};

export default AllCategories;
