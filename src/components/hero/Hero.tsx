import HeroSlider from "./HeroSlider";
import Title from "../ui/Title";
import FeaturesMarquee from "../FeaturesMarquee";
import { useI18n } from "@/i18n";

export default function Hero() {
  const { t } = useI18n();
  return (
    <section
      className="relative overflow-hidden bg-base-bg dark:bg-dark-surface
      section-padding "
    >
      <Title heading={t("home.heroTitle")} subHeading={t("home.heroSub")} />
      <HeroSlider />
      <FeaturesMarquee />
    </section>
  );
}
