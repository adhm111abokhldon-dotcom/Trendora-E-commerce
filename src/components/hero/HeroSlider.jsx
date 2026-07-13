import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { GoArrowUpRight } from "react-icons/go";
import { EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import "swiper/css/pagination";

export default function HeroSlider() {
  const ImagesData = [
    {
      src: "/hero-video.mp4",
      heading: `Shop the Trends  Anywhere`,
      subHeading: ` Your ultimate fashion and tech destination is just one tap away.
              Fast delivery straight to your doorstep.`,
      type: "video",
      buttonText: `Explore Now `,
    },
    {
      src: "/men-fashion.jpg",
      heading: "Redefine Your Look",
      buttonText: "Shop Men's Collection",
      type: "image",
    },
    {
      src: "/smart-gadget.jpg",
      heading: "Smart Gear for Daily Life",
      buttonText: `Explore Tech`,
      type: "image",
    },
    {
      src: "/women-fashion.jpg",
      heading: "Empower Your Style",
      buttonText: "Shop Women's Collection",
      type: "image",
    },
  ];

  return (
    <div
      className="custom-container aspect-square md:aspect-auto md:h-80 lg:h-90
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
          <SwiperSlide className="size-full">
            <div className="size-full rounded-2xl relative">
              <div className="bg-black/50 absolute top-0 rounded-2xl left-0 w-full h-full z-20"></div>
              {slide.type === "image" ? (
                <img
                  src={slide.src}
                  alt={slide.heading}
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
                className="absolute bottom-0 left-0 w-full max-w-md 
                p-6 md:p-10 text-dark-text z-30 text-left flex flex-col 
            gap-3"
              >
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
                  {slide.heading}
                </h2>
                {slide.type === "video" && (
                  <p className="text-sm md:text-base text-base-text-faint leading-relaxed">
                    {slide.subHeading}
                  </p>
                )}
                <button
                  className="mt-2 flex-center gap-2 self-start rounded-full
               bg-accent-trendora hover:bg-accent-hover px-5 py-2.5 text-sm font-semibold text-base-text shadow-sm
                transition-all duration-300"
                >
                  {slide.buttonText} <GoArrowUpRight />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
