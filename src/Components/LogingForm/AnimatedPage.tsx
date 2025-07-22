import { motion } from "framer-motion";
import type { ReactNode } from "react";

const animations = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
  transition: { duration: 0.5 },
};

type AnimatedPageProps = {
  children: ReactNode;
};

const AnimatedPage = ({ children }: AnimatedPageProps) => {
  return (
    <motion.div
      initial={animations.initial}
      animate={animations.animate}
      exit={animations.exit}
      transition={animations.transition}
      className="h-flex-1 items-center justify-center md:h-full md:flex md:items-center md:justify-center"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;