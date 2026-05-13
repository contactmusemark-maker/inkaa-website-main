import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Search, Palette, Code2, Rocket } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discover & Define",
    desc: "Deep-diving into your brand, goals, and audience to uncover the creative strategy that truly sets you apart.",
    metric: "Strategy",
    stat: "01",
    Icon: Search,
  },
  {
    num: "02",
    title: "Design & Concept",
    desc: "Crafting cinematic brand systems, high-fidelity interfaces, and motion concepts perfectly aligned to your vision.",
    metric: "Direction",
    stat: "02",
    Icon: Palette,
  },
  {
    num: "03",
    title: "Build & Refine",
    desc: "Engineering the final product with clean code, smooth animations, and premium micro-interactions that feel alive.",
    metric: "Execution",
    stat: "03",
    Icon: Code2,
  },
  {
    num: "04",
    title: "Launch & Evolve",
    desc: "Deploying your product and supporting post-launch growth with analytics, feedback loops, and iteration.",
    metric: "Launch",
    stat: "04",
    Icon: Rocket,
  },
] as const;

type Step = (typeof steps)[number];

function MobileStepCard({ index, step }: { index: number; step: Step }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 34, filter: "blur(7px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white p-7"
    >
      <div className="absolute right-5 top-5 font-mono text-5xl font-black leading-none text-black/[0.04]">{step.num}</div>
      <div className="relative z-10">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
          <step.Icon className="h-[18px] w-[18px] text-primary" />
        </div>
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-primary">{step.metric}</p>
        <h4 className="mb-3 text-2xl font-bold leading-tight text-black">{step.title}</h4>
        <p className="text-sm font-light leading-relaxed text-black/48">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function ProcessScrollScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    if (shouldReduce) {
      return;
    }

    const section = sectionRef.current;
    const progress = progressRef.current;

    if (!section || !progress) {
      return;
    }

    const mm = gsap.matchMedia();
    const context = gsap.context(() => {
      mm.add("(min-width: 768px)", () => {
        gsap.set("[data-process-node], [data-process-card], [data-process-detail]", {
          willChange: "transform, opacity, filter",
          force3D: true,
        });

        gsap.to(progress, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=2800",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            snap: 1 / (steps.length - 1),
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const nextIndex = Math.round(self.progress * (steps.length - 1));
              const clampedIndex = Math.min(steps.length - 1, Math.max(0, nextIndex));
              if (activeIndexRef.current !== clampedIndex) {
                activeIndexRef.current = clampedIndex;
                setActiveIndex(clampedIndex);
              }
            },
          },
        });

        gsap.to("[data-process-map]", {
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=2800",
            scrub: 1.6,
          },
        });

        gsap.to("[data-process-title]", {
          yPercent: -3,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=2800",
            scrub: 1.35,
          },
        });
      });
    }, section);

    const refresh = gsap.delayedCall(0.25, () => ScrollTrigger.refresh());

    return () => {
      refresh.kill();
      mm.revert();
      context.revert();
    };
  }, [shouldReduce]);

  return (
    <section ref={sectionRef} id="process" className="relative overflow-hidden bg-[#f5f5f5] py-28 md:py-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(214,66,56,0.09),transparent_30%),radial-gradient(circle_at_80%_72%,rgba(0,0,0,0.055),transparent_30%)]" />

      <div className="container mx-auto max-w-7xl px-6 md:absolute md:left-1/2 md:top-8 md:z-20 md:-translate-x-1/2 md:px-12">
        <div ref={headingRef} className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-black/[0.06] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black/40"
          >
            <Rocket className="h-2.5 w-2.5" /> Process
          </motion.span>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <motion.h2
              data-process-title
              initial={{ opacity: 0, y: 24 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl font-black leading-[0.9] tracking-normal text-black md:text-6xl"
            >
              How I<br />
              <span className="text-black/12">Work.</span>
            </motion.h2>
          </div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:hidden">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {steps.map((step, i) => (
            <MobileStepCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>

      <div className="relative hidden min-h-screen items-center md:flex">
        <div className="pointer-events-none absolute -right-10 top-2 z-0 font-mono text-[10vw] font-black leading-none tracking-normal text-black/[0.018]">
          Map
        </div>

        <div data-process-map className="container relative z-10 mx-auto grid max-w-7xl grid-cols-[0.9fr_140px_1fr] items-center gap-8 px-12 pt-44">
          <div className="space-y-5">
            {steps.map((step, index) => {
              const active = activeIndex === index;
              const past = activeIndex > index;

              return (
                <div
                  key={step.num}
                  data-process-card
                  className="relative overflow-hidden rounded-[1.5rem] border bg-white p-5 transition-[opacity,filter,transform,box-shadow,border-color] duration-700"
                  style={
                    {
                      opacity: active || past ? 1 : 0.42,
                      filter: active ? "blur(0px)" : "blur(1.5px)",
                      transform: `translate3d(${active ? 18 : 0}px, 0, 0) scale(${active ? 1 : 0.96})`,
                      borderColor: active ? "rgba(214,66,56,0.25)" : "rgba(0,0,0,0.06)",
                      boxShadow: active ? "0 24px 70px rgba(0,0,0,0.12), 0 14px 50px rgba(214,66,56,0.10)" : "0 12px 36px rgba(0,0,0,0.05)",
                    } as CSSProperties
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${active ? "bg-primary text-white" : "bg-black/[0.04] text-black/42"} transition-colors duration-500`}>
                      <step.Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-primary">{step.metric}</p>
                      <h4 className="mt-1 text-xl font-bold text-black">{step.title}</h4>
                    </div>
                    <span className="ml-auto font-mono text-xs text-black/28">{step.num}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative flex h-[520px] items-center justify-center">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/10" />
            <div ref={progressRef} className="absolute left-1/2 top-0 h-full w-[2px] origin-top -translate-x-1/2 scale-y-0 bg-primary shadow-[0_0_24px_rgba(214,66,56,0.5)]" />

            {steps.map((step, index) => {
              const active = activeIndex === index;
              const top = `${(index / (steps.length - 1)) * 100}%`;

              return (
                <div
                  key={step.num}
                  data-process-node
                  className="absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[transform,opacity,background,border-color] duration-700"
                  style={
                    {
                      top,
                      height: active ? 76 : 52,
                      width: active ? 76 : 52,
                      opacity: activeIndex >= index ? 1 : 0.38,
                      background: active ? "#d64238" : "#fff",
                      borderColor: active ? "rgba(214,66,56,0.45)" : "rgba(0,0,0,0.10)",
                      transform: `translate3d(-50%, -50%, 0) scale(${active ? 1 : 0.92})`,
                      boxShadow: active ? "0 0 0 10px rgba(214,66,56,0.10), 0 24px 60px rgba(214,66,56,0.24)" : "0 12px 32px rgba(0,0,0,0.08)",
                    } as CSSProperties
                  }
                >
                  <span className={`font-mono text-xs font-bold ${active ? "text-white" : "text-black/44"}`}>{step.num}</span>
                </div>
              );
            })}
          </div>

          <div data-process-detail className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white p-10 shadow-[0_30px_100px_rgba(0,0,0,0.10)]">
            <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="mb-10 flex items-start justify-between gap-6">
                  <div>
                    <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.34em] text-primary">
                      {steps[activeIndex].metric}
                    </p>
                    <h3 className="max-w-[9ch] text-6xl font-black leading-[0.9] tracking-normal text-black">
                      {steps[activeIndex].title}
                    </h3>
                  </div>
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    {(() => {
                      const Icon = steps[activeIndex].Icon;
                      return <Icon className="h-6 w-6" />;
                    })()}
                  </div>
                </div>
                <p className="max-w-md text-lg font-light leading-relaxed text-black/48">{steps[activeIndex].desc}</p>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-3">
                {steps.map((step, index) => (
                  <div
                    key={step.num}
                    className={`rounded-2xl border px-4 py-4 transition-colors duration-500 ${
                      activeIndex === index ? "border-primary/25 bg-primary/10" : "border-black/[0.06] bg-black/[0.025]"
                    }`}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/35">{step.metric}</p>
                    <p className="mt-2 text-2xl font-black text-black">{step.stat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 right-10 z-30 flex items-center gap-5 lg:left-16 lg:right-16">
          <div className="h-px flex-1 overflow-hidden bg-black/12">
            <div className="h-full origin-left bg-primary" style={{ transform: `scaleX(${activeIndex / (steps.length - 1)})` }} />
          </div>
          <div className="font-mono text-xs text-black/40">
            {String(activeIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </div>
        </div>
      </div>
    </section>
  );
}
