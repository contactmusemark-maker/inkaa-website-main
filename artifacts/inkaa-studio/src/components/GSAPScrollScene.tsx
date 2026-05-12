import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    num: "01",
    headline: ["Design", "is the", "Language", "of Power."],
    body: "We don't just make things look good — we make them feel inevitable.",
    accent: false,
    color: "#ffffff",
  },
  {
    num: "02",
    headline: ["Motion", "Tells", "the Story."],
    body: "Every scroll, hover, and transition is choreographed with cinematic purpose.",
    accent: true,
    color: "#d64238",
  },
  {
    num: "03",
    headline: ["Identity", "that", "Commands."],
    body: "Your brand deserves more than a logo. It deserves an entire world.",
    accent: false,
    color: "#ffffff",
  },
  {
    num: "04",
    headline: ["Experiences,", "Not Just", "Websites."],
    body: "We engineer immersive digital journeys your audience cannot forget.",
    accent: false,
    color: "#ffffff",
  },
];

export default function GSAPScrollScene() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    if (!outer || !stage) return;

    const panels = gsap.utils.toArray<HTMLElement>(".gsap3d-panel", stage);
    const indicators = gsap.utils.toArray<HTMLElement>(".gsap3d-dot", stage);

    gsap.set(panels, { transformPerspective: 1200, transformOrigin: "50% 50%" });

    panels.forEach((panel, i) => {
      if (i === 0) {
        gsap.set(panel, { opacity: 1, rotateX: 0, z: 0 });
      } else {
        gsap.set(panel, { opacity: 0, rotateX: 30, z: -800 });
      }
    });

    const totalScrollLength = (panels.length - 1) * 100;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: outer,
        start: "top top",
        end: `+=${totalScrollLength}%`,
        scrub: 1.8,
        pin: stage,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const sceneIndex = Math.round(self.progress * (panels.length - 1));
          indicators.forEach((dot, i) => {
            dot.style.opacity = i === sceneIndex ? "1" : "0.25";
            dot.style.transform = i === sceneIndex ? "scaleX(2.5)" : "scaleX(1)";
          });
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }
        },
      },
    });

    panels.forEach((panel, i) => {
      if (i === 0) return;

      tl.to(
        panels[i - 1],
        {
          opacity: 0,
          rotateX: -18,
          z: 600,
          duration: 1,
          ease: "power2.inOut",
        },
        (i - 1) * 1
      ).fromTo(
        panel,
        { opacity: 0, rotateX: 28, z: -900 },
        {
          opacity: 1,
          rotateX: 0,
          z: 0,
          duration: 1,
          ease: "power3.out",
        },
        (i - 1) * 1 + 0.35
      );

      const words = panel.querySelectorAll<HTMLElement>(".gsap3d-word");
      gsap.set(words, { opacity: 0, rotateX: 60, z: -200, transformPerspective: 800, transformOrigin: "50% 100%" });

      tl.to(
        words,
        {
          opacity: 1,
          rotateX: 0,
          z: 0,
          stagger: 0.04,
          duration: 0.6,
          ease: "back.out(1.5)",
        },
        (i - 1) * 1 + 0.5
      );
    });

    const firstWords = panels[0]?.querySelectorAll<HTMLElement>(".gsap3d-word");
    if (firstWords?.length) {
      gsap.set(firstWords, { opacity: 0, rotateX: 60, z: -200, transformPerspective: 800, transformOrigin: "50% 100%" });
      gsap.to(firstWords, {
        opacity: 1,
        rotateX: 0,
        z: 0,
        stagger: 0.07,
        duration: 0.9,
        ease: "back.out(1.4)",
        delay: 0.3,
      });
    }

    gsap.to(".gsap3d-grid", {
      rotateX: 75,
      duration: 1,
      scrollTrigger: {
        trigger: outer,
        start: "top top",
        end: `+=${totalScrollLength}%`,
        scrub: 2,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === outer) st.kill();
      });
    };
  }, []);

  return (
    <div ref={outerRef} style={{ height: `${scenes.length * 100}vh` }} className="relative">
      <div
        ref={stageRef}
        className="w-full h-screen bg-[#030303] overflow-hidden relative flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Depth grid floor */}
        <div
          className="gsap3d-grid absolute inset-x-0 bottom-0 pointer-events-none z-0"
          style={{
            height: "60%",
            backgroundImage: `linear-gradient(rgba(214,66,56,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(214,66,56,0.10) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            transformOrigin: "50% 100%",
            transform: "rotateX(55deg)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
          }}
        />

        {/* Ambient orb */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(214,66,56,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
            backgroundSize: "100% 3px",
          }}
        />

        {/* Top label */}
        <div className="absolute top-10 left-10 z-30 flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">
            Inkaa Studio · Creative Direction
          </span>
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5 z-40">
          <div
            ref={progressRef}
            className="h-full bg-primary transition-none"
            style={{ width: "0%", willChange: "width" }}
          />
        </div>

        {/* Scene panels */}
        <div
          className="relative z-10 w-full h-full flex items-center justify-center"
          style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
        >
          {scenes.map((scene, i) => (
            <div
              key={i}
              className="gsap3d-panel absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Scene number */}
              <div className="mb-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/20">
                  {scene.num} / 0{scenes.length}
                </span>
              </div>

              {/* Headline */}
              <h2
                className="font-black tracking-tighter leading-[0.9] mb-8"
                style={{
                  fontSize: "clamp(3.5rem, 10vw, 9rem)",
                  color: scene.accent ? "#d64238" : "#ffffff",
                  transformStyle: "preserve-3d",
                }}
              >
                {scene.headline.map((line, li) => (
                  <div key={li} className="overflow-hidden">
                    <span className="gsap3d-word block" style={{ transformStyle: "preserve-3d" }}>
                      {line}
                    </span>
                  </div>
                ))}
              </h2>

              {/* Body text */}
              <p
                className="gsap3d-word max-w-lg text-base md:text-xl font-light leading-relaxed text-white/45"
                style={{ transformStyle: "preserve-3d" }}
              >
                {scene.body}
              </p>

              {/* Bottom decorative line */}
              <div className="gsap3d-word mt-10 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-primary/40" />
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/15">
                  Scroll to continue
                </span>
                <div className="w-12 h-[1px] bg-primary/40" />
              </div>
            </div>
          ))}
        </div>

        {/* Dot navigation */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {scenes.map((_, i) => (
            <div
              key={i}
              className="gsap3d-dot h-[3px] w-6 rounded-full bg-white transition-all duration-300"
              style={{ opacity: i === 0 ? 1 : 0.25 }}
            />
          ))}
        </div>

        {/* Corner brackets */}
        {[
          "top-6 left-6 border-t border-l",
          "top-6 right-6 border-t border-r",
          "bottom-6 left-6 border-b border-l",
          "bottom-6 right-6 border-b border-r",
        ].map((cls, i) => (
          <div key={i} className={`absolute ${cls} border-white/[0.06] w-6 h-6 z-30`} />
        ))}
      </div>
    </div>
  );
}
