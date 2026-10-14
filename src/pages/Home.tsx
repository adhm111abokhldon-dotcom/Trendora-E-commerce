import FAQ from "@/components/FAQ";
import FeaturedCategories from "@/components/FeaturedCategories";

import Hero from "@/components/hero/Hero";
import PageTransition from "@/components/PageTransition";
import Categories from "@/components/ui/Categories";
import { useI18n } from "@/i18n";

const Home = () => {
  const { t } = useI18n();
  return (
    <PageTransition>
      <Hero />
      <FeaturedCategories />

      <Categories
        heading={t("categories.explore")}
        allCategories={false}
        link={"categories"}
      />
      <FAQ />
    </PageTransition>
  );
};

export default Home;
