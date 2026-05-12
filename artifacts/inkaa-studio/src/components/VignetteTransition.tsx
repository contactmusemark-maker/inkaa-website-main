import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VignetteTransition() {
  const [flash, setFlash] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;

      if (timerRef.current) clearTimeout(timerRef.current);
      setFlash(true);
      timerRef.current = setTimeout(() => setFlash(false), 750);
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {flash && (
        <motion.div
          key="vignette-flash"
          className="fixed inset-0 pointer-events-none z-[9994]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            enter: { duration: 0.18, ease: "easeIn" },
            exit: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          }}
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.10) 40%, rgba(0,0,0,0.88) 100%)",
          }}
        />
      )}
    </AnimatePresence>
  );
}
