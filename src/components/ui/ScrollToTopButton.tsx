import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BiSolidUpArrowCircle } from "react-icons/bi";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 flex-center h-12 w-12  rounded-full
            shadow-lg shadow-zinc-900/20  "
          aria-label="Scroll to top"
        >
          <BiSolidUpArrowCircle className="size-full fill-base-text dark:fill-dark-text text-accent-hover" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
