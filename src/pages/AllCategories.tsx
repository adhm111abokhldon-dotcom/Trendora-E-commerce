import PageTransition from "@/components/PageTransition";
import Categories from "@/components/ui/Categories";

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
