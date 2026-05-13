import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="relative rounded-[1.75rem] overflow-hidden group cursor-pointer"
      style={{ height: 420 }}
    >
      <img
        src={service.img}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />

      {/* Tag */}
      <div className="absolute top-5 left-5">
        <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-white/70 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
          {service.tag}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-white/40 font-mono text-[11px] tracking-widest mb-0.5 uppercase">Starting at</p>
        <p className="text-primary font-bold text-base mb-1 font-mono">{service.price}</p>
        <h4 className="text-white font-bold text-2xl leading-tight mb-3">{service.title}</h4>
        <p className="text-white/50 text-xs font-light leading-relaxed mb-5 line-clamp-2">{service.desc}</p>
        <a
          href="#inquiry"
          className="inline-flex items-center gap-2 rounded-full bg-white text-black hover:bg-primary hover:text-white text-sm px-5 h-10 font-semibold transition-colors duration-200"
        >
          Inquire Now <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

export default function ServicesScrollScene() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(214,66,56,0.06) 0%, transparent 70%)" }}
      />

      <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.35em] text-primary mb-4"
          >
            Capabilities
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]"
            >
              Core<br /><span className="text-white/15">Services.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={headingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/35 max-w-xs text-sm font-light leading-relaxed md:text-right"
            >
              Premium design solutions crafted for ambitious brands that refuse to blend in.
            </motion.p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
