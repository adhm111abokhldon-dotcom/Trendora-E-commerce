import HeroSlider from "./HeroSlider";
import Title from "../ui/Title";
import FeaturesMarquee from "../FeaturesMarquee";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-base-bg dark:bg-dark-surface
      section-padding "
    >
      <Title
        heading={"Where Style Meets Innovation"}
        subHeading={` Explore the latest arrivals in fashion and smart
       gadgets,selected just for you`}
      />
      <HeroSlider />
      <FeaturesMarquee />
    </section>
  );
}
