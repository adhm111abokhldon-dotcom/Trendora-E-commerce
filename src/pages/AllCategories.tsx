import PageTransition from "@/components/PageTransition";
import Categories from "@/components/ui/Categories";
import { useI18n } from "@/i18n";

const AllCategories = () => {
  const { t } = useI18n();
  return (
    <PageTransition>
      <Categories
        heading={t("categories.heading")}
        allCategories={true}
        link={"/categories"}
      />
    </PageTransition>
  );
};

export default AllCategories;
