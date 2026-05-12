import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const trailConfig = { damping: 40, stiffness: 180, mass: 0.8 };

  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const trailSpringX = useSpring(trailX, trailConfig);
  const trailSpringY = useSpring(trailY, trailConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);
    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
      document.body.style.cursor = "";
    };
  }, [cursorX, cursorY, trailX, trailY, isVisible]);

  return (
    <>
      {/* Trailing glow blob */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: trailSpringX,
          y: trailSpringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 80 : isClicking ? 28 : 40,
            height: isHovering ? 80 : isClicking ? 28 : 40,
            opacity: isHovering ? 0.25 : 0.15,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="rounded-full bg-[#d64238]"
          style={{ filter: "blur(12px)" }}
        />
      </motion.div>

      {/* Main dot cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 14 : isClicking ? 6 : 8,
            height: isHovering ? 14 : isClicking ? 6 : 8,
            backgroundColor: isHovering ? "#d64238" : "#171717",
            boxShadow: isHovering
              ? "0 0 0 2px rgba(214,66,56,0.3)"
              : "none",
          }}
          transition={{ type: "spring", damping: 22, stiffness: 400 }}
          className="rounded-full"
        />
      </motion.div>

      {/* Outer ring — only on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: trailSpringX,
          y: trailSpringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isHovering && isVisible ? 1 : 0,
          scale: isHovering ? 1 : 0.5,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div
          className="rounded-full border border-[#d64238]/40"
          style={{ width: 44, height: 44 }}
        />
      </motion.div>
    </>
  );
}
