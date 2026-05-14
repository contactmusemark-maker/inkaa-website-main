import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "UI/UX Design",
    price: "₹15,000+",
    tag: "Design",
    kicker: "Human flow",
    desc: "Pixel-perfect product interfaces shaped around clarity, hierarchy, and conversion.",
    details: ["Research-backed user flows", "High-fidelity UI screens", "Interactive prototype", "Responsive design system"],
    img: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1400&auto=format&fit=crop&q=85",
  },
  {
    title: "Website Design",
    price: "₹25,000+",
    tag: "Web",
    kicker: "Digital presence",
    desc: "Cinematic responsive websites with strong art direction and premium interaction design.",
    details: ["Landing page direction", "Responsive website design", "Motion interaction plan", "Launch-ready handoff"],
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&auto=format&fit=crop&q=85",
  },
  {
    title: "Branding & Identity",
    price: "₹12,000+",
    tag: "Branding",
    kicker: "Visual memory",
    desc: "Distinctive identity systems built to feel intentional, recognizable, and future-facing.",
    details: ["Logo and identity suite", "Color and type system", "Brand usage guide", "Social visual direction"],
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1400&auto=format&fit=crop&q=85",
  },
  {
    title: "Graphic Design",
    price: "₹5,000+",
    tag: "Visual",
    kicker: "Campaign craft",
    desc: "High-impact visuals for launches, social, print, decks, and brand-led storytelling.",
    details: ["Campaign graphics", "Social media creatives", "Print-ready assets", "Presentation visuals"],
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1400&auto=format&fit=crop&q=85",
  },
  {
    title: "Creative Direction",
    price: "₹20,000+",
    tag: "Direction",
    kicker: "Taste system",
    desc: "A sharp visual compass for campaigns, websites, content, and complete brand worlds.",
    details: ["Creative mood system", "Visual storytelling guide", "Campaign art direction", "Experience review"],
    img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1400&auto=format&fit=crop&q=85",
  },
  {
    title: "Motion Design",
    price: "₹18,000+",
    tag: "Motion",
    kicker: "Living interface",
    desc: "Scroll storytelling, micro-interactions, and motion systems that make brands feel alive.",
    details: ["Scroll animation direction", "Micro-interaction design", "Motion timing system", "Launch-ready specs"],
    img: "https://plus.unsplash.com/premium_photo-1681426317576-18cf057e9bb1?w=1400&auto=format&fit=crop&q=85",
  },
] as const;

type Service = (typeof services)[number];

type ServiceCardProps = {
  active: boolean;
  flipped: boolean;
  index: number;
  offset: number;
  onClick: () => void;
  service: Service;
};

function ServiceCard({ active, flipped, index, offset, onClick, service }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const card = cardRef.current;
    const image = imageRef.current;

    if (!card || !image) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty("--tilt-x", `${-y * 4}deg`);
    card.style.setProperty("--tilt-y", `${x * 5}deg`);
    image.style.transform = `translate3d(${x * -14}px, ${y * -14}px, 0) scale(${active ? 1.095 : 1.035})`;
  }

  function handlePointerLeave() {
    const card = cardRef.current;
    const image = imageRef.current;
    const button = buttonRef.current;

    if (card) {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    }

    if (image) {
      image.style.transform = `translate3d(0, 0, 0) scale(${active ? 1.08 : 1})`;
    }

    if (button) {
      button.style.transform = "translate3d(0, 0, 0)";
    }
  }

  function handleButtonMove(event: React.PointerEvent<HTMLAnchorElement>) {
    const button = buttonRef.current;

    if (!button) {
      return;
    }

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate3d(${x * 0.18}px, ${y * 0.2}px, 0)`;
  }

  const clampedOffset = Math.max(-3, Math.min(3, offset));
  const absOffset = Math.abs(clampedOffset);
  const translateX = clampedOffset * 164;
  const translateY = absOffset * 14 + (active ? -6 : 18);
  const rotate = clampedOffset * 7;
  const scale = active ? 1 : Math.max(0.78, 0.9 - absOffset * 0.035);

  return (
    <article
      ref={cardRef}
      data-service-card
      role="button"
      tabIndex={0}
      aria-label={`${flipped ? "Hide" : "View"} details for ${service.title}`}
      aria-pressed={flipped}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      className="group absolute left-1/2 top-1/2 h-[66vh] min-h-[520px] w-[min(72vw,420px)] cursor-pointer rounded-[1.75rem] outline-none transition-[opacity,filter,transform] duration-700 ease-out will-change-transform focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black md:h-[68vh]"
      style={
        {
          "--tilt-x": "0deg",
          "--tilt-y": "0deg",
          opacity: active ? 1 : Math.max(0.28, 0.62 - absOffset * 0.07),
          filter: active ? "blur(0px)" : `grayscale(1) blur(${Math.min(3.2, absOffset * 0.9)}px)`,
          transform: `translate3d(-50%, -50%, 0) translate3d(${translateX}px, ${translateY}px, ${active ? 64 : -absOffset * 50}px) rotate(${rotate}deg) scale(${scale})`,
          zIndex: 20 - absOffset,
          pointerEvents: absOffset > 3 ? "none" : "auto",
        } as CSSProperties
      }
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className="relative h-full w-full rounded-[1.75rem] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d]"
        style={{ transform: `perspective(1300px) rotateX(var(--tilt-x)) rotateY(calc(var(--tilt-y) + ${flipped ? 180 : 0}deg))` }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-2xl [backface-visibility:hidden]"
          style={{
            boxShadow: active
              ? "0 40px 120px rgba(214, 66, 56, 0.24), 0 24px 80px rgba(0, 0, 0, 0.72)"
              : "0 20px 70px rgba(0, 0, 0, 0.44)",
            borderColor: active ? "rgba(255,255,255,0.24)" : "rgba(255,255,255,0.09)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              ref={imageRef}
              src={service.img}
              alt={service.title}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform"
              style={{ transform: `translate3d(0, 0, 0) scale(${active ? 1.08 : 1})` }}
            />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.14),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.62)_52%,rgba(0,0,0,0.96))]" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(214,66,56,0.22),transparent_32%,rgba(255,255,255,0.08)_58%,transparent_78%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="absolute left-5 top-5 flex items-center gap-3">
            <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/75 backdrop-blur-xl">
              {service.tag}
            </span>
            <span className="font-mono text-[11px] text-white/35">0{index + 1}</span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <div className="overflow-hidden">
              <p
                data-service-copy
                className="mb-3 font-mono text-[11px] uppercase tracking-[0.34em] text-primary"
                style={{ transform: active ? "translateY(0)" : "translateY(18px)", opacity: active ? 1 : 0 }}
              >
                {service.kicker}
              </p>
            </div>
            <div className="overflow-hidden">
              <h3
                data-service-copy
                className="max-w-[10ch] text-4xl font-black leading-[0.92] tracking-normal text-white md:text-5xl"
                style={{ transform: active ? "translateY(0)" : "translateY(26px)", opacity: active ? 1 : 0.18 }}
              >
                {service.title}
              </h3>
            </div>
            <div className="mt-6 flex items-end justify-between gap-5">
              <div className="font-mono">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/32">Starting at</p>
                <p className="text-base font-bold text-white">{service.price}</p>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/44">Click to flip</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between rounded-[1.75rem] border border-white/15 bg-[#111] p-8 text-white shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.34em] text-primary">{service.tag}</p>
                <h3 className="text-4xl font-black leading-[0.92] tracking-normal">{service.title}</h3>
              </div>
              <span className="font-mono text-xs text-white/30">0{index + 1}</span>
            </div>
            <p className="text-sm font-light leading-relaxed text-white/58">{service.desc}</p>
            <div className="mt-8 space-y-3">
              {service.details.map((detail) => (
                <div key={detail} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-white/72">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {detail}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="font-mono">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/32">Starting at</p>
              <p className="text-lg font-bold text-white">{service.price}</p>
            </div>
            <a
              ref={buttonRef}
              href="#inquiry"
              onClick={(event) => event.stopPropagation()}
              onPointerMove={handleButtonMove}
              onPointerLeave={() => {
                if (buttonRef.current) {
                  buttonRef.current.style.transform = "translate3d(0, 0, 0)";
                }
              }}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.18)] transition-[background,color,transform] duration-300 will-change-transform hover:bg-primary hover:text-white"
              aria-label={`Inquire about ${service.title}`}
            >
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function MobileServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
    >
      <img src={service.img} alt={service.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{service.tag}</p>
        <h3 className="text-3xl font-black leading-none tracking-normal text-white">{service.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-white/58">{service.desc}</p>
        <a
          href="#inquiry"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-semibold text-white/82 backdrop-blur-xl transition-colors hover:border-primary/45 hover:bg-primary hover:text-white"
          aria-label={`Start a project for ${service.title}`}
        >
          Start Project <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.article>
  );
}

export default function ServicesScrollScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const headingInView = useInView(headingRef, { once: true, margin: "-120px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    if (shouldReduce) {
      return;
    }

    const section = sectionRef.current;
    const cardsWrapper = cardsWrapperRef.current;
    const heading = headingRef.current;
    const progress = progressRef.current;

    if (!section || !cardsWrapper || !heading || !progress) {
      return;
    }

    const mm = gsap.matchMedia();
    const context = gsap.context(() => {
      mm.add("(min-width: 768px)", () => {
        gsap.set(cardsWrapper, {
          width: "100vw",
          willChange: "transform",
          force3D: true,
        });

        gsap.set("[data-service-panel]", { willChange: "transform" });
        gsap.set("[data-service-card]", { willChange: "transform, opacity, filter" });
        gsap.set("[data-service-copy]", { transition: "opacity 720ms ease, transform 720ms cubic-bezier(0.16, 1, 0.3, 1)" });

        gsap.fromTo(
          heading.querySelectorAll("[data-heading-line]"),
          { yPercent: 110, opacity: 0, filter: "blur(10px)" },
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.95,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              end: "top 30%",
              scrub: 0.85,
            },
          },
        );

        gsap.to(cardsWrapper, {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=3600",
            scrub: 0.9,
            pin: true,
            anticipatePin: 1,
            fastScrollEnd: true,
            snap: {
              snapTo: 1 / (services.length - 1),
              duration: { min: 0.22, max: 0.48 },
              delay: 0.03,
              ease: "power2.out",
            },
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const nextIndex = Math.round(self.progress * (services.length - 1));
              const clampedIndex = Math.min(services.length - 1, Math.max(0, nextIndex));
              if (activeIndexRef.current !== clampedIndex) {
                activeIndexRef.current = clampedIndex;
                setFlippedIndex(null);
                setActiveIndex(clampedIndex);
              }
              gsap.set(progress, { scaleX: self.progress, transformOrigin: "left center" });
            },
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

  function handleSectionPointerMove(event: React.PointerEvent<HTMLElement>) {
    const glow = glowRef.current;

    if (!glow) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    glow.style.transform = `translate3d(${event.clientX - rect.left - 180}px, ${event.clientY - rect.top - 180}px, 0)`;
    glow.style.opacity = "1";
  }

  function handleSectionPointerLeave() {
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-[#050505] text-white"
      onPointerMove={handleSectionPointerMove}
      onPointerLeave={handleSectionPointerLeave}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 z-20 hidden h-[360px] w-[360px] rounded-full bg-primary/18 blur-3xl opacity-0 transition-opacity duration-500 md:block"
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,transparent_44%,rgba(0,0,0,0.64)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.055] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:4px_4px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(214,66,56,0.14),transparent_36%),radial-gradient(ellipse_at_78%_58%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,#030303,#090504_48%,#030303)]" />

      <div className="relative z-20 px-6 py-24 md:min-h-screen md:px-0 md:py-0">
        <div
          ref={headingRef}
          className="mx-auto mb-12 max-w-7xl md:pointer-events-none md:absolute md:left-8 md:top-16 md:z-0 md:mx-0 md:mb-0 md:max-w-[34vw] lg:left-12 lg:top-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.42em] text-primary"
          >
            Scroll to Explore
          </motion.p>
          <div className="overflow-hidden">
            <h2
              data-heading-line
              className="text-5xl font-black leading-[0.85] tracking-normal text-white sm:text-7xl md:text-[clamp(4.5rem,8.4vw,8.75rem)]"
            >
              Core
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              data-heading-line
              className="text-5xl font-black leading-[0.85] tracking-normal text-white/10 sm:text-7xl md:text-[clamp(4.5rem,8.4vw,8.75rem)]"
            >
              Services
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-sm text-sm font-light leading-relaxed text-white/42 md:ml-2"
          >
            Premium creative systems move from interface to identity, one focused frame at a time.
          </motion.p>
        </div>

        <div className="md:hidden">
          <div className="mx-auto grid max-w-xl gap-5">
            {services.map((service, index) => (
              <MobileServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>

        <div className="relative z-20 hidden min-h-screen items-center md:flex">
          <div aria-hidden="true" className="pointer-events-none absolute right-10 top-28 z-0 font-mono text-[12vw] font-black leading-none tracking-normal text-white/[0.035]">
            Explore
          </div>

          <div ref={cardsWrapperRef} className="relative h-screen w-screen [perspective:1600px]">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                active={activeIndex === index}
                offset={index - activeIndex}
                flipped={flippedIndex === index}
                onClick={() => {
                  activeIndexRef.current = index;
                  setActiveIndex(index);
                  setFlippedIndex((currentIndex) => (currentIndex === index ? null : index));
                }}
              />
            ))}
          </div>

          <div className="absolute bottom-10 left-10 right-10 z-30 flex items-center gap-5 lg:left-16 lg:right-16">
            <div className="h-px flex-1 overflow-hidden bg-white/12">
              <div ref={progressRef} className="h-full origin-left scale-x-0 bg-primary" />
            </div>
            <div className="font-mono text-xs text-white/42">
              {String(activeIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
