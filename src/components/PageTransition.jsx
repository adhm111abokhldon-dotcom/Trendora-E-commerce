import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }) => {
  const { pathname } = useLocation();
  const variants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4, ease: "easeOut" },
  };
  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
