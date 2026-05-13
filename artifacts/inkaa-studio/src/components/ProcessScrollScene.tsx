import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Palette, Code2, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discover & Define",
    desc: "Deep-diving into your brand, goals, and audience to uncover the creative strategy that truly sets you apart.",
    Icon: Search,
  },
  {
    num: "02",
    title: "Design & Concept",
    desc: "Crafting cinematic brand systems, high-fidelity interfaces, and motion concepts perfectly aligned to your vision.",
    Icon: Palette,
  },
  {
    num: "03",
    title: "Build & Refine",
    desc: "Engineering the final product with clean code, smooth animations, and premium micro-interactions that feel alive.",
    Icon: Code2,
  },
  {
    num: "04",
    title: "Launch & Evolve",
    desc: "Deploying your product and supporting post-launch growth with analytics, feedback loops, and iteration.",
    Icon: Rocket,
  },
];

// Position data keyed by relative-to-active index (-2, -1, 0, 1, 2)
type CardStyle = {
  flex: number;
  height: number | string;
  opacity: number;
  scale: number;
  x: number;
  filter: string;
};

function lerpCardStyle(relPos: number): CardStyle {
  const abs = Math.abs(relPos);
  const sign = relPos > 0 ? 1 : -1;

  // Stop values: [active=0, adjacent=1, outer=2]
  const flexStops   = [2.8, 1, 0.65];
  const heightStops = [420, 300, 260];
  const opStops     = [1,   0.75, 0.42];
  const scaleStops  = [1,   1,    0.92];
  const xStops      = [0,   0,    0];   // horizontal offset handled by flex
  const blurStops   = [0,   0,    2];

  if (abs >= 2) {
    return { flex: 0.5, height: 240, opacity: 0.2, scale: 0.85, x: 0, filter: "blur(4px)" };
  }

  const fl = Math.floor(abs);
  const t  = abs - fl;
  const lerp = (a: number, b: number) => a + (b - a) * t;

  return {
    flex:   lerp(flexStops[fl],   flexStops[fl + 1]),
    height: lerp(heightStops[fl], heightStops[fl + 1]),
    opacity:lerp(opStops[fl],     opStops[fl + 1]),
    scale:  lerp(scaleStops[fl],  scaleStops[fl + 1]),
    x:      0,
    filter: `blur(${lerp(blurStops[fl], blurStops[fl + 1])}px)`,
  };
}

export default function ProcessScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef    = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<HTMLDivElement[]>([]);
  const dotRefs      = useRef<HTMLDivElement[]>([]);
  const descRef      = useRef<HTMLDivElement>(null);
  const idxRef       = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const sticky    = stickyRef.current;
    if (!container || !sticky) return;

    const n = steps.length;

    // Set initial positions
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const st = lerpCardStyle(i);
      gsap.set(card, {
        flex: st.flex,
        height: st.height,
        opacity: st.opacity,
        scale: st.scale,
        filter: st.filter,
      });
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.4,
        onUpdate: (self) => {
          const raw = self.progress * (n - 1);

          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            const relPos = i - raw;
            const st = lerpCardStyle(relPos);
            gsap.set(card, {
              flex: st.flex,
              height: st.height,
              opacity: st.opacity,
              scale: st.scale,
              filter: st.filter,
            });
          });

          // Dots
          const activeIdx = Math.round(raw);
          if (activeIdx !== idxRef.current) {
            idxRef.current = activeIdx;
            dotRefs.current.forEach((dot, i) => {
              if (!dot) return;
              gsap.to(dot, {
                width: i === activeIdx ? 24 : 6,
                opacity: i === activeIdx ? 1 : 0.35,
                duration: 0.3,
                ease: "power2.out",
              });
            });
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="process" style={{ height: `${steps.length * 100}vh`, position: "relative" }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full bg-[#f5f5f5] flex flex-col items-center justify-center overflow-hidden px-6"
      >
        {/* ── Heading ── */}
        <div className="text-center mb-12 z-10">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-black/40 bg-black/[0.06] border border-black/[0.08] rounded-full px-4 py-1.5 mb-5">
            <Rocket className="w-2.5 h-2.5" /> Process
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] text-black">
            How I <br /><span className="text-black/15">Work.</span>
          </h2>
          <p className="text-black/40 text-sm font-light mt-3 max-w-xs mx-auto">
            A refined four-step process built for precision and premium outcomes.
          </p>
        </div>

        {/* ── Card fan ── */}
        <div
          className="flex items-end gap-3 w-full max-w-5xl z-10"
          style={{ height: 440, alignItems: "flex-end" }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => { if (el) cardRefs.current[i] = el; }}
              className="relative rounded-[1.75rem] bg-white border border-black/[0.06] overflow-hidden flex flex-col justify-between flex-shrink-0"
              style={{
                flex: i === 0 ? 2.8 : 1,
                height: i === 0 ? 420 : 300,
                padding: 24,
                boxShadow: i === 0 ? "0 12px 48px rgba(0,0,0,0.08)" : "none",
                willChange: "flex, height, opacity, filter",
              }}
            >
              {/* Red gradient accent (always rendered, opacity controlled by activeIdx) */}
              <div
                className="absolute top-0 left-0 right-0 h-32 rounded-t-[1.75rem] overflow-hidden pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(214,66,56,0.09) 0%, rgba(214,66,56,0.02) 100%)" }}
              />

              {/* Large step number */}
              <div>
                <p
                  className="font-black tracking-tighter leading-none select-none"
                  style={{ fontSize: "4.5rem", color: "rgba(0,0,0,0.05)" }}
                >
                  {step.num}.
                </p>
              </div>

              {/* Bottom content */}
              <div className="relative z-10">
                <div className="mb-3 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.Icon className="w-4 h-4 text-primary" />
                </div>
                <h4 className="font-bold text-black text-lg leading-tight">{step.title}</h4>
                <p className="text-black/45 text-sm font-light leading-relaxed mt-2 max-w-[260px] line-clamp-3">{step.desc}</p>
              </div>

              {/* Small dot indicator at top of active card */}
              <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-primary/60" />
            </div>
          ))}
        </div>

        {/* ── Progress dots ── */}
        <div className="flex items-center gap-2 mt-8 z-20">
          {steps.map((_, i) => (
            <div
              key={i}
              ref={(el) => { if (el) dotRefs.current[i] = el; }}
              className="h-1.5 rounded-full bg-black/40 transition-colors"
              style={{ width: i === 0 ? 24 : 6, opacity: i === 0 ? 1 : 0.35 }}
            />
          ))}
        </div>

        {/* ── Scroll hint ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <p className="text-black/30 text-[11px] font-mono tracking-widest uppercase">Scroll to explore</p>
          <div className="w-[1px] h-8 bg-gradient-to-b from-black/30 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}
