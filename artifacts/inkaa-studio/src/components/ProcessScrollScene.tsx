import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Palette, Code2, Rocket } from "lucide-react";

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

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(0,0,0,0.10)", transition: { duration: 0.25 } }}
      className="relative bg-white rounded-[1.75rem] border border-black/[0.06] p-8 flex flex-col justify-between overflow-hidden"
      style={{ minHeight: 280 }}
    >
      {/* Red gradient accent */}
      <div
        className="absolute top-0 left-0 right-0 h-28 rounded-t-[1.75rem] pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(214,66,56,0.08) 0%, rgba(214,66,56,0.01) 100%)" }}
      />
      {/* Top dot */}
      <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-primary/50" />

      {/* Step number */}
      <p
        className="font-black tracking-tighter leading-none select-none mb-auto"
        style={{ fontSize: "5rem", color: "rgba(0,0,0,0.04)" }}
      >
        {step.num}.
      </p>

      {/* Content */}
      <div className="relative z-10 mt-4">
        <div className="mb-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <step.Icon className="w-4.5 h-4.5 text-primary" style={{ width: 18, height: 18 }} />
        </div>
        <h4 className="font-bold text-black text-xl leading-tight mb-2">{step.title}</h4>
        <p className="text-black/45 text-sm font-light leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function ProcessScrollScene() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="process" className="py-28 bg-[#f5f5f5] relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-black/40 bg-black/[0.06] border border-black/[0.08] rounded-full px-4 py-1.5 mb-6"
          >
            <Rocket className="w-2.5 h-2.5" /> Process
          </motion.span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-[0.9]"
            >
              How I<br /><span className="text-black/12">Work.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={headingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-black/40 max-w-xs text-sm font-light leading-relaxed md:text-right"
            >
              A refined four-step process built for precision and premium outcomes, every time.
            </motion.p>
          </div>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
