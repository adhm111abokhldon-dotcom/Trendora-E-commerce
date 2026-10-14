import { Link } from "react-router-dom";
import Title from "./ui/Title";
import { useI18n } from "@/i18n";
import type { TranslationKey } from "@/i18n/en";

type Category = {
  id: number;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  countKey: TranslationKey;
  image: string;
  url: string;
};

const categories: Category[] = [
  {
    id: 1,
    titleKey: "featured.best",
    subtitleKey: "featured.bestSub",
    countKey: "featured.bestCount",
    image: "/best-image.jpg",
    url: "/customCategory/best-sellers",
  },
  {
    id: 2,
    titleKey: "featured.trending",
    subtitleKey: "featured.trendingSub",
    countKey: "featured.trendingCount",
    image: "/trend-image.jpg",
    url: "/customCategory/trending",
  },
  {
    id: 3,
    titleKey: "featured.hot",
    subtitleKey: "featured.hotSub",
    countKey: "featured.hotCount",
    image: "/hotDrop-image.jpg",
    url: "/customCategory/hot-drops",
  },
  {
    id: 4,
    titleKey: "featured.new",
    subtitleKey: "featured.newSub",
    countKey: "featured.newCount",
    image: "/new-image.jpg",
    url: "/customCategory/new-arrivals",
  },
];

export default function FeaturedCategories() {
  const { t } = useI18n();
  return (
    <section className="section-padding px-4 max-w-7xl mx-auto bg-base-bg dark:bg-dark-surface">
      <Title subHeading={" "} heading={t("home.spacesTitle")} />
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
                  {t(cat.countKey)}
                </span>
                <h3 className="text-xl md:text-2xl font-black mt-1 text-accent-trendora ">
                  {t(cat.titleKey)}
                </h3>
                <p className="mt-1 text-slate-400 text-xs md:text-base font-medium">
                  {t(cat.subtitleKey)}
                </p>
                <div className="mt-4  ">
                  <Link
                    to={cat.url}
                    className="bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl
                     border border-slate-700 group-hover:bg-white
                   group-hover:text-slate-950 transition-all duration-300 active:scale-95"
                  >
                    {t("product.view")}
                  </Link>
                </div>
              </div>

              <div className="w-1/2 h-full rounded-xl overflow-hidden">
                <img
                  src={cat.image}
                  alt={t(cat.titleKey)}
                  loading="lazy"
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
