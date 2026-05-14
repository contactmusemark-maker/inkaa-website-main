import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "SETTING THE STAGE...",
  "TUNING THE LIGHT...",
  "WARMING THE MOTION...",
  "COMPOSING THE FRAME...",
  "OPENING THE STUDIO...",
  "WELCOME.",
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function ScrambleText({ text, active }: { text: string; active: boolean }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration += 0.42;
      if (iteration >= text.length) clearInterval(interval);
    }, 38);
    return () => clearInterval(interval);
  }, [text, active]);

  return <span>{display}</span>;
}

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [hasSeenSplash] = useState(() => {
    try {
      return window.sessionStorage.getItem("inkaa:splash-seen") === "true";
    } catch {
      return false;
    }
  });
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const shouldReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const duration = shouldReduce ? 320 : hasSeenSplash ? 900 : 2250;

    const raf = requestAnimationFrame(function step(now) {
      const elapsed = now - start;
      const p = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(p);
      setMsgIdx(Math.min(MESSAGES.length - 1, Math.floor((p / 100) * MESSAGES.length)));
      if (p < 100) requestAnimationFrame(step);
      else {
        try {
          window.sessionStorage.setItem("inkaa:splash-seen", "true");
        } catch {
          // Session storage can be unavailable in some privacy modes.
        }
        setTimeout(() => setDone(true), shouldReduce || hasSeenSplash ? 120 : 240);
      }
    });

    const tickInterval = setInterval(() => setTick((t) => t + 1), shouldReduce ? 160 : 90);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(tickInterval);
    };
  }, [hasSeenSplash]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onDone, hasSeenSplash ? 320 : 620);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [done, hasSeenSplash, onDone]);

  function skipIntro() {
    try {
      window.sessionStorage.setItem("inkaa:splash-seen", "true");
    } catch {
      // Session storage can be unavailable in some privacy modes.
    }
    setProgress(100);
    setMsgIdx(MESSAGES.length - 1);
    setDone(true);
  }

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(214,66,56,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(214,66,56,0.04) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Corner HUD brackets */}
          {[
            "top-6 left-6 border-t border-l",
            "top-6 right-6 border-t border-r",
            "bottom-6 left-6 border-b border-l",
            "bottom-6 right-6 border-b border-r",
          ].map((cls, i) => (
            <div key={i} className={`absolute ${cls} border-primary/40 w-8 h-8`} />
          ))}

          {/* Top-left system info */}
          <div className="absolute top-8 left-12 text-[10px] font-mono text-white/20 space-y-1">
            <div>SCENE 01</div>
            <div>MOOD: CINEMATIC</div>
            <div>USER: VISITOR_{String(tick % 999).padStart(3, "0")}</div>
          </div>

          {/* Top-right timestamp */}
          <div className="absolute top-8 right-12 text-[10px] font-mono text-white/20 text-right space-y-1">
            <div>INKAA.STUDIO</div>
            <div>LIVING DIGITAL EXPERIENCE</div>
            <div className="flex items-center gap-1 justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>LIVE</span>
            </div>
          </div>

          {/* Center logo */}
          <div className="flex flex-col items-center gap-10 w-full max-w-sm px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-2"
            >
              <span
                className="text-[4.5rem] font-black tracking-tighter text-white leading-none"
                style={{ fontFamily: "'Cormorant Garant', Georgia, serif", fontStyle: "italic" }}
              >
                inkaa<span className="text-primary">.</span>
              </span>
              <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 tracking-widest uppercase">
                <div className="w-4 h-[1px] bg-primary/40" />
                STUDIO
                <div className="w-4 h-[1px] bg-primary/40" />
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="w-full space-y-3">
              <div className="relative h-[2px] bg-white/10 w-full overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-primary"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
                {/* Scan glint */}
                <motion.div
                  className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
                />
              </div>

              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-white/30">
                  <ScrambleText text={MESSAGES[msgIdx]} active={true} />
                </span>
                <span className="text-primary tabular-nums">{String(progress).padStart(3, "0")}%</span>
              </div>
            </div>

            {/* Binary stream decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[9px] font-mono text-white/10 tracking-widest text-center leading-relaxed"
            >
              {Array.from({ length: 4 }, (_, row) =>
                Array.from({ length: 32 }, (_, col) =>
                  ((row * 32 + col + tick) % 7 === 0 ? "1" : "0")
                ).join(" ")
              ).join("\n")}
            </motion.div>
          </div>

          {/* Bottom status bar */}
          <div className="absolute bottom-8 left-12 right-12 flex items-center justify-between font-mono text-[10px] text-white/20">
            <span>MOSES MARTIN · DESIGNER · CREATIVE DIRECTOR</span>
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-primary"
                style={{ animation: "pulse 1s ease-in-out infinite" }}
              />
              SECURE CONNECTION
            </span>
          </div>

          <button
            type="button"
            onClick={skipIntro}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38 transition-colors hover:border-primary/40 hover:text-white focus-visible:text-white"
          >
            Skip Intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
