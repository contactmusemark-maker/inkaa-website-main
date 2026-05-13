import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "UI/UX Design",
    price: "₹15,000+",
    tag: "Design",
    desc: "Crafting pixel-perfect, user-centred interfaces that convert visitors into loyal customers.",
    img: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=900&auto=format&fit=crop&q=80",
  },
  {
    title: "Website Design",
    price: "₹25,000+",
    tag: "Web",
    desc: "Cinematic, responsive websites built to command attention and drive real business outcomes.",
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&auto=format&fit=crop&q=80",
  },
  {
    title: "Branding & Identity",
    price: "₹12,000+",
    tag: "Branding",
    desc: "Distinctive brand identities that tell your story, build trust, and outlast trends.",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&auto=format&fit=crop&q=80",
  },
  {
    title: "Graphic Design",
    price: "₹5,000+",
    tag: "Visual",
    desc: "High-impact visual assets for print, social, and digital — designed to stop the scroll.",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&auto=format&fit=crop&q=80",
  },
  {
    title: "Creative Direction",
    price: "₹20,000+",
    tag: "Direction",
    desc: "End-to-end creative leadership that aligns every visual touchpoint with your brand vision.",
    img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=900&auto=format&fit=crop&q=80",
  },
  {
    title: "Motion Design",
    price: "₹18,000+",
    tag: "Motion",
    desc: "Scroll-driven animations, micro-interactions, and video motion that breathe life into your brand.",
    img: "https://images.unsplash.com/photo-1574717024453-354056aefa63?w=900&auto=format&fit=crop&q=80",
  },
];

const CARD_W = 300;
const CARD_H = 440;

// Compute per-card transform from a continuous relative position
function computeTransform(relPos: number) {
  const abs = Math.abs(relPos);
  const sign = relPos > 0 ? 1 : -1;

  if (abs >= 3) {
    return { x: sign * 760, scale: 0.3, opacity: 0, rotateY: -sign * 55, blurPx: 12, zIndex: 0 };
  }

  const fl = Math.min(Math.floor(abs), 2);
  const t = abs - fl;

  const xStops   = [0, 340, 570, 760];
  const scStops  = [1, 0.78, 0.57, 0.3];
  const opStops  = [1, 0.72, 0.32, 0];
  const ryStops  = [0, 22, 40, 55];
  const blStops  = [0, 1.5, 4, 12];

  const lerp = (a: number, b: number) => a + (b - a) * t;

  const x      = sign * lerp(xStops[fl], xStops[fl + 1]);
  const scale  = lerp(scStops[fl], scStops[fl + 1]);
  const opacity = lerp(opStops[fl], opStops[fl + 1]);
  const ry     = -sign * lerp(ryStops[fl], ryStops[fl + 1]);
  const blurPx = lerp(blStops[fl], blStops[fl + 1]);
  const zIndex = Math.round(10 - abs * 3);

  return { x, scale, opacity, rotateY: ry, blurPx, zIndex };
}

export default function ServicesScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef    = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<HTMLDivElement[]>([]);
  const dotRefs      = useRef<HTMLDivElement[]>([]);
  const labelRef     = useRef<HTMLDivElement>(null);
  const idxRef       = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const sticky    = stickyRef.current;
    if (!container || !sticky) return;

    const n = services.length;

    // Set initial positions
    cardRefs.current.forEach((card, i) => {
      const t = computeTransform(i);
      gsap.set(card, {
        x: t.x, scale: t.scale, opacity: t.opacity,
        rotateY: t.rotateY, filter: `blur(${t.blurPx}px)`,
        zIndex: t.zIndex, transformPerspective: 1100, transformOrigin: "center center",
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
            const t = computeTransform(relPos);
            gsap.set(card, {
              x: t.x, scale: t.scale, opacity: t.opacity,
              rotateY: t.rotateY, filter: `blur(${t.blurPx}px)`,
              zIndex: t.zIndex,
            });
          });

          // Update dots
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
    <div ref={containerRef} id="services" style={{ height: `${services.length * 100}vh`, position: "relative" }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
        style={{ perspective: "1100px" }}
      >
        {/* ── Background glow ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(214,66,56,0.08) 0%, transparent 70%)",
          }}
        />

        {/* ── Heading ── */}
        <div className="relative z-10 text-center mb-10 px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-primary mb-2">Capabilities</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none">
            Core Services
          </h2>
          <p className="text-white/30 text-sm font-light mt-2">Premium design solutions for ambitious brands.</p>
        </div>

        {/* ── Card carousel ── */}
        <div className="relative w-full flex items-center justify-center" style={{ height: CARD_H }}>
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => { if (el) cardRefs.current[i] = el; }}
              className="absolute rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer"
              style={{ width: CARD_W, height: CARD_H, willChange: "transform, opacity" }}
            >
              <img
                src={service.img}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10" />

              {/* Top tag */}
              <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-white/70 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                  {service.tag}
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/40 font-mono text-[11px] tracking-widest mb-0.5 uppercase">Starting at</p>
                <p className="text-primary font-bold text-base mb-1 font-mono">{service.price}</p>
                <h4 className="text-white font-bold text-2xl leading-tight mb-4">{service.title}</h4>
                <p className="text-white/50 text-xs font-light leading-relaxed mb-5 line-clamp-2">{service.desc}</p>
                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-black hover:bg-primary hover:text-white text-sm px-5 h-10 font-semibold transition-colors duration-200"
                >
                  Inquire Now <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Active ring */}
              <div className="absolute inset-0 rounded-[2rem] border-2 border-primary/50 pointer-events-none opacity-0 card-active-ring" />
            </div>
          ))}
        </div>

        {/* ── Progress dots ── */}
        <div className="flex items-center gap-2 mt-10 z-20">
          {services.map((_, i) => (
            <div
              key={i}
              ref={(el) => { if (el) dotRefs.current[i] = el; }}
              className="h-1.5 rounded-full bg-white transition-colors"
              style={{ width: i === 0 ? 24 : 6, opacity: i === 0 ? 1 : 0.35 }}
            />
          ))}
        </div>

        {/* ── Scroll hint ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <p className="text-white/30 text-[11px] font-mono tracking-widest uppercase">Scroll to explore</p>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}
