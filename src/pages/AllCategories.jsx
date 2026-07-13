import { useQuery } from "@tanstack/react-query";
import Categories from "../components/ui/Categories";
import ProductSkeleton from "../components/ui/ProductSkeleton";
import CategorySkeleton from "../components/ui/CategorySkeleton";
import TitleSkeleton from "../components/ui/TitleSkeleton";

const AllCategories = () => {
  return (
    <Categories
      heading={"Categories"}
      allCategories={true}
      link={"/categories"}
    />
  );
};

export default AllCategories;
