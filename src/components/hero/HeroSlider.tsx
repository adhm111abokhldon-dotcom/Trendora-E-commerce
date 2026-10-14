import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { GoArrowUpRight } from "react-icons/go";
import { EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/products";
import { useI18n } from "@/i18n";
import type { TranslationKey } from "@/i18n/en";

import "swiper/css";
import "swiper/css/effect-fade";

import "swiper/css/pagination";

type Slide = {
  src: string;
  headingKey: TranslationKey;
  subHeadingKey?: TranslationKey;
  type: "video" | "image";
  buttonTextKey: TranslationKey;
  /** Link straight to the categories index (all product listings). */
  allCategories?: boolean;
  /** Link to the first backend category starting with this prefix. */
  categoryPrefix?: string;
  /** Exact backend categories to try, in order. */
  categoryCandidates?: string[];
};

export default function HeroSlider() {
  const { t } = useI18n();

  // Real categories from our backend (same cached query the Categories
  // grid uses) — hero CTAs never point at hardcoded category names.
  const { data: categories } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Resolve a slide to a real destination; gracefully falls back to the
  // categories index while categories load or if a category is missing.
  const resolvePath = (slide: Slide): string => {
    const available = categories ?? [];
    if (slide.categoryCandidates) {
      const match = slide.categoryCandidates.find((candidate) =>
        available.includes(candidate),
      );
      return match ? `/categories/${match}` : "/categories";
    }
    if (slide.categoryPrefix) {
      const match = available.find((candidate) =>
        candidate.startsWith(slide.categoryPrefix as string),
      );
      return match ? `/categories/${match}` : "/categories";
    }
    return "/categories";
  };

  const ImagesData: Slide[] = [
    {
      src: "/hero-video.mp4",
      headingKey: "home.slideShop",
      subHeadingKey: "home.slideShopSub",
      type: "video",
      buttonTextKey: "home.exploreNow",
      allCategories: true,
    },
    {
      src: "/men-fashion.jpg",
      headingKey: "home.redefine",
      buttonTextKey: "home.menCollection",
      type: "image",
      categoryPrefix: "mens-",
    },
    {
      src: "/smart-gadget.jpg",
      headingKey: "home.smartGear",
      buttonTextKey: "home.tech",
      type: "image",
      categoryCandidates: [
        "laptops",
        "tablets",
        "smartphones",
        "mobile-accessories",
      ],
    },
    {
      src: "/women-fashion.jpg",
      headingKey: "home.empower",
      buttonTextKey: "home.womenCollection",
      type: "image",
      categoryCandidates: [
        "womens-dresses",
        "womens-shoes",
        "womens-watches",
        "womens-bags",
        "womens-jewellery",
      ],
    },
  ];

  return (
    <div
      className="custom-container aspect-square h-80 w-full md:aspect-auto md:h-90 lg:h-100
      overflow-hidden"
    >
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        effect={"fade"}
        modules={[EffectFade, Pagination, Autoplay]}
        className="w-full h-full"
      >
        {ImagesData.map((slide, index) => (
          <SwiperSlide className="size-full" key={index}>
            <div className="size-full rounded-2xl relative">
              <div className="bg-black/50 absolute top-0 rounded-2xl start-0 w-full h-full z-20"></div>
              {slide.type === "image" ? (
                <img
                  src={slide.src}
                  alt={t(slide.headingKey)}
                  loading="lazy"
                  className="w-full h-full aspect-square md:aspect-auto object-cover rounded-2xl"
                />
              ) : (
                <video
                  src={slide.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full rounded-2xl h-full aspect-square md:aspect-auto object-cover"
                />
              )}
              <div
                className="absolute bottom-0 start-0 w-full max-w-md 
                p-6 md:p-10 text-dark-text z-30 text-start flex flex-col 
            gap-3"
              >
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
                  {t(slide.headingKey)}
                </h2>
                {slide.type === "video" && slide.subHeadingKey && (
                  <p className="text-sm md:text-base text-base-text-faint leading-relaxed">
                    {t(slide.subHeadingKey)}
                  </p>
                )}
                <Link
                  to={resolvePath(slide)}
                  aria-label={t(slide.buttonTextKey)}
                  className="mt-2 flex-center gap-2 self-start rounded-full
               bg-accent-trendora hover:bg-accent-hover px-5 py-2.5 text-sm font-semibold text-base-text shadow-sm
                transition-all duration-300 focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-accent-hover focus-visible:ring-offset-2 active:scale-95"
                >
                  {t(slide.buttonTextKey)}{" "}
                  <GoArrowUpRight className="rtl:-scale-x-100" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
