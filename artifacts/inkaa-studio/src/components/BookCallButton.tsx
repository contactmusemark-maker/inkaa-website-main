import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";

export default function BookCallButton() {
  const [visible, setVisible] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const hero = document.querySelector("#hero-sentinel");
    if (!hero) {
      const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-[9990]"
        >
          {!shouldReduce && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-[-10px] rounded-full bg-primary/20 blur-md"
              animate={{ opacity: [0.2, 0.42, 0.2], scale: [0.96, 1.08, 0.96] }}
              transition={{ duration: 3.8, ease: "easeInOut", repeat: Infinity }}
            />
          )}

          <motion.a
            href="#inquiry"
            aria-label="Book a call with Inkaa Studio"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-2 bg-primary text-white font-semibold text-sm px-5 py-3.5 rounded-full shadow-2xl shadow-primary/40 hover:bg-primary/90 transition-colors duration-200"
            data-testid="button-book-call"
          >
            <Phone className="w-4 h-4" />
            <span>Book a Call</span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
