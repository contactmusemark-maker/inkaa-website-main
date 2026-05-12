import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { ArrowRight, Menu, Star, ChevronRight, Search, Palette, Code2, Rocket, Bot, Wand2, Layers, Zap, PenTool, Image, Sun, Pen, Monitor, Plus, Minus, Phone, MessageCircle } from "lucide-react";
import { SiInstagram, SiX, SiFigma, SiFramer, SiGithub, SiOpenai, SiGsap } from "react-icons/si";
import anime from "animejs/lib/anime.es.js";
import CustomCursor from "@/components/CustomCursor";
import MarqueeStrip from "@/components/MarqueeStrip";
import BookCallButton from "@/components/BookCallButton";
import { SplitText } from "@/components/SplitText";
import newFounderPhoto from "@assets/Untitled_design_(1)_1778455130934.png";
import founderPhoto from "@assets/Untitled_design_1778451365026.png";
import inkaaLogo from "@assets/Black_and_White_Simple_Profile_Picture_LinkedIn_Profile_Pictur_1778451411760.png";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

/* ── Data ── */
const navLinks = [
  { name: "About", id: "about" },
  { name: "Services", id: "services" },
  { name: "Work", id: "work" },
  { name: "Process", id: "process" },
  { name: "Tools", id: "tools" },
  { name: "Vision", id: "vision" },
  { name: "FAQ", id: "faq" },
  { name: "Pricing", id: "pricing" },
];

const faqData = [
  { q: "How long does a project take?", a: "Project timelines depend on the scope and complexity. Most branding and website projects are completed within 1–4 weeks." },
  { q: "Do you offer revisions?", a: "Yes. All packages include a specific number of revisions to ensure the final result aligns with your vision." },
  { q: "Do you develop websites in Framer?", a: "Yes. I design and develop modern, responsive, and motion-driven websites using Framer." },
  { q: "Do you provide source files?", a: "Absolutely. Final deliverables and source files will be shared after project completion." },
  { q: "What payment methods do you accept?", a: "UPI, Bank Transfer, PayPal, and other secure payment methods are accepted." },
  { q: "Do you work with international clients?", a: "Yes. I collaborate with both Indian and international clients remotely." },
  { q: "Can I request custom services?", a: "Yes. Custom packages and tailored solutions are available based on your project needs." },
  { q: "Do you offer motion and animation design?", a: "Yes. I create cinematic motion interactions, hover effects, and immersive scroll storytelling experiences." },
  { q: "Will my website be mobile responsive?", a: "Absolutely. Every website is optimized for desktop, tablet, and mobile devices." },
  { q: "How do we start a project?", a: "Simply fill out the inquiry form or contact me directly to discuss your project goals and requirements." },
];

const visionFocusAreas = [
  "Cinematic Digital Experiences",
  "Modern UI/UX Systems",
  "Founder-led Creative Direction",
  "Motion-driven Storytelling",
  "Premium Visual Identities",
  "Human-centered Design",
];

const pricingPackages = [
  {
    name: "Starter Brand Kit",
    tagline: "Perfect for creators, freelancers, and startups building their first identity.",
    price: "₹2,999",
    badge: null,
    features: ["Logo Design", "Business Card Design", "Bio Link Page", "Brand Color Palette", "Social Profile Setup", "2 Revisions"],
    cta: "Get Started",
    dark: false,
    featured: false,
  },
  {
    name: "Creator Identity Pack",
    tagline: "For personal brands, influencers, and modern creators.",
    price: "₹5,999",
    badge: null,
    features: ["Premium Logo Design", "Business Card Design", "Bio Link Website", "Instagram Branding", "Profile Optimization", "Story Highlight Covers", "Typography System", "3 Revisions"],
    cta: "Build My Brand",
    dark: true,
    featured: false,
  },
  {
    name: "Business Brand Package",
    tagline: "For businesses needing a complete modern identity.",
    price: "₹9,999",
    badge: "Most Popular",
    features: ["Logo Design", "Business Card", "Letterhead Design", "Brand Guidelines", "Bio Link Website", "Social Media Branding", "Email Signature", "Basic Brand Strategy", "5 Revisions"],
    cta: "Launch My Business",
    dark: false,
    featured: true,
  },
  {
    name: "Premium Website Package",
    tagline: "Modern cinematic website experience for founders and brands.",
    price: "₹24,999",
    badge: null,
    features: ["Premium Website Design", "UI/UX Design", "Responsive Mobile Design", "Motion Interactions", "Contact Form Setup", "SEO Optimization", "Framer Development", "Social Integration", "Custom Animations"],
    cta: "Create My Website",
    dark: true,
    featured: false,
  },
  {
    name: "Cinematic Brand Experience",
    tagline: "Luxury creative direction for premium brands and founders.",
    price: "₹49,999+",
    badge: "Premium",
    features: ["Full Brand Identity", "Cinematic Website", "Motion Design", "Creative Direction", "Scroll Storytelling", "Premium UI/UX", "Interactive Animations", "Portfolio Showcase", "Brand System", "Launch Support"],
    cta: "Start Premium Project",
    dark: true,
    featured: true,
  },
];

const coreServices = [
  { title: "UI/UX Design", price: "₹15,000+", img: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=900&auto=format&fit=crop&q=80", tag: "Design" },
  { title: "Website Design", price: "₹25,000+", img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&auto=format&fit=crop&q=80", tag: "Web" },
  { title: "Branding & Identity", price: "₹12,000+", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&auto=format&fit=crop&q=80", tag: "Branding" },
  { title: "Graphic Design", price: "₹5,000+", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&auto=format&fit=crop&q=80", tag: "Visual" },
  { title: "Creative Direction", price: "₹20,000+", img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=900&auto=format&fit=crop&q=80", tag: "Direction" },
  { title: "Motion Design", price: "₹18,000+", img: "https://images.unsplash.com/photo-1574717024453-354056aefa63?w=900&auto=format&fit=crop&q=80", tag: "Motion" },
];

const addOnServices = [
  { title: "Business Card Design", price: "₹299+", img: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=800&auto=format&fit=crop&q=80" },
  { title: "Pamphlet Design", price: "₹599+", img: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=800&auto=format&fit=crop&q=80" },
  { title: "Brochure Booklet", price: "₹699+", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80" },
  { title: "Letterhead Design", price: "₹899+", img: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80" },
  { title: "Logo Design", price: "₹1,599+", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80" },
];

const projects = [
  { title: "Brand Refresh — Arka Co.", tag: "Branding", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&auto=format&fit=crop&q=80", speed: -0.15 },
  { title: "App UI — NexPay", tag: "UI/UX", colSpan: "col-span-1", rowSpan: "row-span-1", img: "https://images.unsplash.com/photo-1616469829935-c2f53c1c82ed?w=800&auto=format&fit=crop&q=80", speed: 0.1 },
  { title: "Motion Reel — Inkaa", tag: "Motion", colSpan: "col-span-1", rowSpan: "row-span-1", img: "https://images.unsplash.com/photo-1574717024453-354056aefa63?w=800&auto=format&fit=crop&q=80", speed: -0.1 },
  { title: "E-Commerce — Luma", tag: "Web", colSpan: "col-span-1", rowSpan: "row-span-2", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80", speed: 0.2 },
  { title: "Web Platform — Sync", tag: "Development", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1", img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&auto=format&fit=crop&q=80", speed: -0.05 },
  { title: "Creative Direction — Vibe", tag: "Direction", colSpan: "col-span-1", rowSpan: "row-span-1", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80", speed: 0.15 },
];

const processCards = [
  { num: "01", title: "Discover & Define", desc: "Deep-diving into your brand, goals, and audience to uncover the creative strategy that truly sets you apart." },
  { num: "02", title: "Design & Concept", desc: "Crafting cinematic brand systems, high-fidelity interfaces, and motion concepts perfectly aligned to your vision." },
  { num: "03", title: "Build & Refine", desc: "Engineering the final product with clean code, smooth animations, and premium micro-interactions that feel alive." },
  { num: "04", title: "Launch & Evolve", desc: "Deploying your product and supporting post-launch growth with analytics, feedback loops, and iteration." },
];

const testimonials = [
  { name: "Sarah J.", company: "Arka Co.", text: "Moses transformed our entire digital presence. Absolute visionary.", rating: 5 },
  { name: "David L.", company: "NexPay", text: "The app UI is stunning. User retention went up 40% after the redesign.", rating: 5 },
  { name: "Elena R.", company: "Vibe", text: "Creative direction that perfectly captured our brand's soul.", rating: 5 },
  { name: "Michael T.", company: "Luma", text: "Incredible attention to detail. Every interaction feels premium.", rating: 5 },
  { name: "Jessica W.", company: "Sync", text: "Fast, reliable, and unmatched aesthetic sensibility.", rating: 5 },
];

/* ── Form schema ── */
const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget"),
  timeline: z.string().min(1, "Please select a timeline"),
  details: z.string().min(10, "Please provide project details"),
});

/* ── Per-card parallax ── */
function ParallaxCard({
  project,
  index,
  scrollProgress,
}: {
  project: typeof projects[0];
  index: number;
  scrollProgress: MotionValue<number>;
}) {
  const range = 80 * project.speed;
  const y = useTransform(scrollProgress, [0, 1], [range, -range]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.025 }}
      className={`relative rounded-3xl overflow-hidden group cursor-pointer ${project.colSpan} ${project.rowSpan} min-h-[280px]`}
    >
      <motion.img
        src={project.img}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10" />
      <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
        <div className="flex justify-end">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-white/60 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
            {project.tag}
          </span>
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2 block">
            Project {String(index + 1).padStart(2, "0")}
          </span>
          <h4 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md leading-tight">
            {project.title}
          </h4>
          <div className="mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/80 hover:text-primary transition-colors">
              View Case Study <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Testimonial card ── */
function TestimonialCard({ t, delay = 0 }: { t: typeof testimonials[0]; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(0,0,0,0.10)" }}
      className="bg-card border border-border p-6 rounded-2xl shadow-lg"
    >
      <div className="flex gap-1 mb-4 text-primary">
        {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
      </div>
      <p className="text-foreground/70 italic mb-6 leading-relaxed">"{t.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-sm text-primary flex-shrink-0">
          {t.name.charAt(0)}
        </div>
        <div>
          <h5 className="font-semibold text-sm">{t.name}</h5>
          <p className="text-xs text-muted-foreground">{t.company}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Cinematic Scroll Storytelling ── */
const cinematicPhrases = [
  { text: "Design is the Language of the Future.", accent: false },
  { text: "Every Pixel Has Purpose.", accent: true },
  { text: "Motion Tells the Story.", accent: false },
  { text: "We Build Experiences, Not Just Websites.", accent: false },
];

function CinematicScrollSection() {
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const phrases = sectionRef.current?.querySelectorAll<HTMLElement>(".cp-phrase");
    if (!phrases?.length) return;
    const observers: IntersectionObserver[] = [];
    phrases.forEach((phrase) => {
      const words = phrase.querySelectorAll<HTMLElement>(".cp-word");
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              anime({
                targets: Array.from(words),
                opacity: [0, 1],
                translateY: ["52px", "0px"],
                filter: ["blur(12px)", "blur(0px)"],
                duration: 900,
                easing: "easeOutExpo",
                delay: anime.stagger(90),
              });
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 }
      );
      obs.observe(phrase);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cinematic"
      className="relative bg-[#030303] overflow-hidden py-0"
    >
      {/* Ambient orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(214,66,56,0.07) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <div className="relative z-10">
        {cinematicPhrases.map((item, i) => (
          <div
            key={i}
            className={`cp-phrase border-b border-white/[0.04] flex items-center min-h-[26vh] px-8 md:px-20 ${
              i % 2 === 1 ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[1.05] max-w-5xl ${
                item.accent ? "text-primary" : "text-white"
              }`}
            >
              {item.text.split(" ").map((word, j) => (
                <span
                  key={j}
                  className="cp-word inline-block opacity-0 mr-[0.25em] last:mr-0"
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Main Page ── */
export default function Home() {
  const shouldReduce = useReducedMotion();
  const [activeService, setActiveService] = React.useState(0);
  const [activeProcess, setActiveProcess] = React.useState(1);
  const [activeSection, setActiveSection] = React.useState("about");
  const [faqOpenIdx, setFaqOpenIdx] = React.useState<number | null>(0);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  React.useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
      },
      { threshold: 0.25, rootMargin: "-64px 0px 0px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Global scroll progress bar ── */
  const { scrollYProgress: globalProgress } = useScroll();
  const progressBarScale = useSpring(globalProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  /* ── Hero scroll-driven parallax ── */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTextY   = useSpring(useTransform(heroProgress, [0, 1], [0, -160]), { stiffness: 60, damping: 20 });
  const heroPhotoY  = useSpring(useTransform(heroProgress, [0, 1], [0, -80]),  { stiffness: 60, damping: 20 });
  const heroOpacity = useTransform(heroProgress, [0, 0.65], [1, 0]);
  const heroBgScale = useTransform(heroProgress, [0, 1], [1, 1.12]);

  /* ── About clip-path image reveal ── */
  const aboutImageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: aboutImgProgress } = useScroll({
    target: aboutImageRef,
    offset: ["start end", "center 40%"],
  });
  const aboutClip  = useTransform(aboutImgProgress, [0, 1], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const aboutImgScale = useTransform(aboutImgProgress, [0, 1], [1.25, 1]);
  const aboutTextRef = useRef(null);
  const aboutTextInView = useInView(aboutTextRef, { once: true, margin: "-100px" });

  /* ── Services horizontal scroll ── */
  const servicesTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesTrackRef,
    offset: ["start start", "end end"],
  });
  const servicesX = useTransform(servicesProgress, [0, 1], ["0%", "-58%"]);
  const servicesXSpring = useSpring(servicesX, { stiffness: 50, damping: 20 });
  const servicesHeadingRef = useRef(null);
  const servicesHeadingInView = useInView(servicesHeadingRef, { once: true, margin: "-80px" });

  /* ── Portfolio per-card parallax ── */
  const workRef = useRef<HTMLElement>(null);
  const { scrollYProgress: workProgress } = useScroll({
    target: workRef,
    offset: ["start end", "end start"],
  });
  const workHeadingRef = useRef(null);
  const workHeadingInView = useInView(workHeadingRef, { once: true, margin: "-80px" });

  /* ── Process section ── */
  const processRef = useRef<HTMLElement>(null);
  const processHeadingRef = useRef(null);
  const processHeadingInView = useInView(processHeadingRef, { once: true, margin: "-80px" });

  /* ── Testimonials floating columns ── */
  const testimonialsRef = useRef<HTMLElement>(null);
  const { scrollYProgress: testiProgress } = useScroll({
    target: testimonialsRef,
    offset: ["start end", "end start"],
  });
  const testiCol1Y = useTransform(testiProgress, [0, 1], [60, -60]);
  const testiCol2Y = useTransform(testiProgress, [0, 1], [0,   40]);
  const testiCol3Y = useTransform(testiProgress, [0, 1], [80, -40]);

  /* ── CTA zoom from center ── */
  const ctaRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "center center"],
  });
  const ctaScale   = useTransform(ctaProgress, [0, 1], [0.82, 1]);
  const ctaOpacity = useTransform(ctaProgress, [0, 0.5], [0, 1]);

  /* ── Inquiry form slide up ── */
  const formPanelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: formProgress } = useScroll({
    target: formPanelRef,
    offset: ["start end", "center center"],
  });
  const formY       = useTransform(formProgress, [0, 1], [100, 0]);
  const formOpacity = useTransform(formProgress, [0, 0.6], [0, 1]);

  /* ── Footer big text ── */
  const footerTextRef = useRef(null);
  const footerTextInView = useInView(footerTextRef, { once: true, margin: "-60px" });

  /* ── Background depth parallax ── */
  const aboutSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: aboutBgProgress } = useScroll({
    target: aboutSectionRef,
    offset: ["start end", "end start"],
  });
  const aboutBgY1 = useTransform(aboutBgProgress, [0, 1], ["-18%", "18%"]);
  const aboutBgY2 = useTransform(aboutBgProgress, [0, 1], ["18%", "-18%"]);

  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: footerBgProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });
  const footerBgY = useTransform(footerBgProgress, [0, 1], ["-15%", "15%"]);

  /* ── Form ── */
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const subject = `New Inquiry from ${data.fullName} - ${data.company || "Independent"}`;
    const body = `Name: ${data.fullName}\nEmail: ${data.email}\nCompany: ${data.company || "N/A"}\nService: ${data.service}\nBudget: ${data.budget}\nTimeline: ${data.timeline}\n\nDetails:\n${data.details}`;
    window.location.href = `mailto:mosesmartin@inkaastudio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="w-full min-h-[100dvh] bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white font-sans">
      <CustomCursor />
      <BookCallButton />

      {/* ── Global scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[100]"
        style={{ scaleX: progressBarScale }}
      />

      {/* ── 1. Nav ── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 h-16 flex items-center justify-between bg-white/95 backdrop-blur-xl border-b border-black/8 shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-2.5 flex-shrink-0"
        >
          <img src={inkaaLogo} alt="Inkaa Studio Logo" className="w-8 h-8 rounded-full" />
          <span className="font-bold text-lg tracking-tight text-black">inkaa.</span>
        </motion.div>

        {/* Center nav */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex items-center gap-0.5 bg-black/[0.05] rounded-full p-1"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              className="relative px-4 py-1.5 rounded-full text-sm font-medium block"
            >
              {activeSection === link.id && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-black rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-200 ${activeSection === link.id ? "text-white" : "text-black/55 hover:text-black/80"}`}>
                {link.name}
              </span>
            </a>
          ))}
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3"
        >
          <Button asChild className="hidden md:flex rounded-full px-5 h-9 text-sm font-semibold border border-black/20 bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300">
            <a href="#inquiry">Start a Project</a>
          </Button>
          <Button variant="ghost" size="icon" className="text-black/60 hover:text-black md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </motion.div>
      </motion.nav>

      {/* ── 2. Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-0 px-6 overflow-hidden bg-[#f2f2f2]"
      >
        {/* Background — scales on scroll */}
        <motion.div style={{ scale: heroBgScale }} className="absolute inset-0 z-0 pointer-events-none overflow-hidden origin-center">
          <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(214,66,56,0.10) 0%,transparent 70%)", animation: "float-orb 12s ease-in-out infinite", filter: "blur(60px)" }} />
          <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(214,66,56,0.07) 0%,transparent 70%)", animation: "float-orb-2 16s ease-in-out infinite", filter: "blur(80px)" }} />
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.4) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            animate={{ top: ["10%", "90%", "10%"] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          />
        </motion.div>

        <div className="container max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 items-end min-h-[calc(100dvh-6rem)]">
          {/* Left — parallax text */}
          <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="flex flex-col items-start gap-8 z-20 pb-16 lg:pb-24 justify-end lg:justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-black/5 backdrop-blur-sm text-xs font-semibold uppercase tracking-widest text-black/55"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Founder of Inkaa Studio
            </motion.div>

            {/* Split word-by-word name reveal */}
            <div className="leading-[0.88] text-[#1a1a1a]" style={{ fontFamily: "'Cormorant Garant', Georgia, serif" }}>
              <div className="overflow-hidden">
                <motion.span
                  className="block text-[13vw] md:text-[9.5vw] lg:text-[8vw] font-semibold italic tracking-tight"
                  initial={{ y: "110%", filter: "blur(12px)" }}
                  animate={{ y: "0%", filter: "blur(0px)" }}
                  transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  Moses
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  className="block text-[13vw] md:text-[9.5vw] lg:text-[8vw] font-bold tracking-[-0.03em]"
                  initial={{ y: "110%", filter: "blur(12px)" }}
                  animate={{ y: "0%", filter: "blur(0px)" }}
                  transition={{ duration: 1.0, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  Martin
                </motion.span>
              </div>
            </div>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="w-24 h-[3px] bg-primary origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-2xl text-black/50 font-light max-w-md leading-relaxed"
            >
              Designing Intelligent<br />Digital Experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 mt-2"
            >
              <Button size="lg" className="rounded-full px-8 text-base h-14 bg-primary text-white hover:bg-primary/80 shadow-xl shadow-primary/30 transition-all duration-300" asChild>
                <a href="#inquiry">Start a Project <ArrowRight className="w-4 h-4 ml-2" /></a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-14 border-black/20 text-black/80 bg-transparent hover:bg-black/5 transition-all duration-300" asChild>
                <a href="https://heyimartin.framer.ai/" target="_blank" rel="noopener noreferrer">View Portfolio</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-8 mt-4 pt-8 border-t border-black/10 w-full"
            >
              {[{ value: "6+", label: "Years" }, { value: "50+", label: "Projects" }, { value: "30+", label: "Clients" }].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-black">{s.value}</div>
                  <div className="text-xs text-black/40 uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — photo parallax */}
          <motion.div
            style={{ y: heroPhotoY }}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative self-stretch flex justify-end items-end min-h-[70vh] lg:min-h-[92vh] overflow-hidden"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 z-0"
              style={{ top: "33%", height: "28%", left: "6%", transformOrigin: "left", backgroundColor: "rgba(214,66,56,0.55)" }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="absolute right-4 z-20 overflow-hidden flex items-start justify-end"
              style={{ top: "2rem", bottom: "70%" }}
            >
              <span className="text-[9px] font-mono font-semibold uppercase text-foreground/30" style={{ writingMode: "vertical-rl", letterSpacing: "0.3em", whiteSpace: "nowrap" }}>
                INKAA STUDIO · CREATIVE DIRECTION
              </span>
            </motion.div>
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={newFounderPhoto}
              alt="Moses Martin"
              className="relative z-10 h-full w-auto object-contain object-bottom select-none"
              style={{ maxWidth: "100%", filter: "drop-shadow(-20px 0px 40px rgba(0,0,0,0.15))" }}
            />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-mono">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-foreground/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Marquee ── */}
      <MarqueeStrip dark />

      {/* ── 3. About ── */}
      <motion.section
        id="about"
        ref={aboutSectionRef}
        className="py-32 px-6 bg-foreground text-background relative overflow-hidden"
        initial={{ opacity: 0, filter: shouldReduce ? "blur(0px)" : "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Cinematic bg depth — scroll-driven blobs */}
        <motion.div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <motion.div
            className="absolute top-[-10%] right-[-8%] w-[640px] h-[640px] rounded-full"
            style={{ y: aboutBgY1, background: "radial-gradient(circle, rgba(214,66,56,0.14) 0%, transparent 65%)", filter: "blur(100px)" }}
          />
          <motion.div
            className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full"
            style={{ y: aboutBgY2, background: "radial-gradient(circle, rgba(214,66,56,0.08) 0%, transparent 65%)", filter: "blur(80px)" }}
          />
        </motion.div>
        <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text — stagger word reveals */}
          <div ref={aboutTextRef} className="flex flex-col gap-8 lg:order-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={aboutTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground"
            >The Story</motion.h2>

            <SplitText
              text="A pursuit of perfection in the digital realm."
              as="h3"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              delay={0.05}
              stagger={0.05}
            />

            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={aboutTextInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-background/70 font-light space-y-6"
            >
              <p>Inkaa Studio was born from a singular vision: to bridge the gap between profound aesthetics and intelligent functionality. As a founder and lead designer, my mission is to craft experiences that don't just exist, but command attention.</p>
              <p>We believe in the power of visual storytelling, seamless motion, and cinematic reveals. Every pixel is intentional. Every interaction is designed to elevate your brand from noise to signal.</p>
            </motion.div>

            <div className="mt-8 border-l border-background/20 pl-8 space-y-8">
              {[
                { year: "2018", event: "Began the creative journey" },
                { year: "2021", event: "Founded Inkaa Studio" },
                { year: "2024", event: "Award-winning global projects" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                  animate={aboutTextInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <span className="absolute -left-[37px] top-1 w-2 h-2 rounded-full bg-primary" />
                  <h4 className="text-xl font-bold">{item.year}</h4>
                  <p className="text-background/60">{item.event}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image — clip-path reveal from bottom */}
          <div ref={aboutImageRef} className="relative aspect-[3/4] rounded-2xl overflow-hidden lg:order-1">
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-2xl"
              style={{ clipPath: aboutClip }}
            >
              <motion.img
                src={founderPhoto}
                alt="Moses Martin Profile"
                className="absolute inset-0 w-full h-full object-cover grayscale"
                style={{ scale: aboutImgScale }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── Marquee ── */}
      <MarqueeStrip />

      {/* ── 4. Services — 3D Fan Carousel ── */}
      <motion.section
        id="services"
        className="py-24 bg-background relative overflow-hidden"
        initial={{ opacity: 0, filter: shouldReduce ? "blur(0px)" : "blur(8px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Section heading */}
        <div className="text-center mb-14 px-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.35em] text-primary mb-3"
          >Capabilities</motion.p>
          <SplitText
            text="Core Services"
            as="h3"
            className="text-4xl md:text-6xl font-black tracking-tighter mb-4"
            delay={0.05}
            stagger={0.06}
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground font-light text-lg"
          >
            Premium design solutions for ambitious brands.
          </motion.p>
        </div>

        {/* Fan carousel stage */}
        <div
          className="relative mx-auto select-none"
          style={{ height: "520px", perspective: "1100px" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {coreServices.map((service, i) => {
              const pos = i - activeService;
              const absPos = Math.abs(pos);
              if (absPos > 2) return null;

              const xMap   = [0, 290, 500];
              const ryMap  = [0, 28, 46];
              const scMap  = [1, 0.80, 0.62];
              const opMap  = [1, 0.72, 0.38];
              const blMap  = ["blur(0px)", "blur(1.5px)", "blur(3px)"];
              const zMap   = [10, 6, 2];

              const x        = pos * xMap[absPos];
              const rotateY  = pos < 0 ? ryMap[absPos] : -ryMap[absPos];
              const scale    = scMap[absPos];
              const opacity  = opMap[absPos];
              const filter   = blMap[absPos];
              const zIndex   = zMap[absPos];

              return (
                <motion.div
                  key={service.title}
                  onClick={() => setActiveService(i)}
                  animate={{ x, rotateY, scale, opacity, filter }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute cursor-pointer"
                  style={{
                    width: 300,
                    height: 440,
                    zIndex,
                    transformOrigin: "center center",
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={absPos !== 0 ? { scale: scale * 1.04 } : {}}
                >
                  {/* Card */}
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/5" />

                    {/* Top tag */}
                    <div className="absolute top-5 left-5">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-white/70 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                        {service.tag}
                      </span>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white/40 font-mono text-[11px] tracking-widest mb-1 uppercase">Starting at</p>
                      <p className="text-primary font-bold text-lg mb-1 font-mono">{service.price}</p>
                      <h4 className="text-white font-bold text-2xl leading-tight mb-4">{service.title}</h4>
                      {absPos === 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                        >
                          <Button
                            className="rounded-full bg-white text-black hover:bg-primary hover:text-white text-sm px-5 h-10"
                            asChild
                          >
                            <a href="#inquiry">Inquire Now</a>
                          </Button>
                        </motion.div>
                      )}
                    </div>

                    {/* Active glow ring */}
                    {absPos === 0 && (
                      <motion.div
                        layoutId="service-ring"
                        className="absolute inset-0 rounded-[2rem] border-2 border-primary/60 pointer-events-none"
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          {/* Prev */}
          <motion.button
            onClick={() => setActiveService((v) => Math.max(0, v - 1))}
            disabled={activeService === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:border-primary hover:text-primary disabled:opacity-25 transition-colors duration-200"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
          </motion.button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {coreServices.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveService(i)}
                animate={{
                  width: i === activeService ? 28 : 8,
                  backgroundColor: i === activeService ? "rgb(214,66,56)" : "rgba(255,255,255,0.2)",
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-2 rounded-full"
              />
            ))}
          </div>

          {/* Next */}
          <motion.button
            onClick={() => setActiveService((v) => Math.min(coreServices.length - 1, v + 1))}
            disabled={activeService === coreServices.length - 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:border-primary hover:text-primary disabled:opacity-25 transition-colors duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Service count */}
        <div className="text-center mt-4">
          <span className="text-xs font-mono text-foreground/30 tracking-widest uppercase">
            {String(activeService + 1).padStart(2, "0")} / {String(coreServices.length).padStart(2, "0")}
          </span>
        </div>
      </motion.section>

      {/* ── 4b. Design Add-ons ── */}
      <motion.section
        className="py-20 px-6 bg-background"
        initial={{ opacity: 0, filter: shouldReduce ? "blur(0px)" : "blur(8px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container max-w-7xl mx-auto">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold mb-8 tracking-tight"
          >Design Add-ons</motion.h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {addOnServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img src={service.img} alt={service.title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 transition-colors duration-500" />
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <h5 className="text-white font-semibold leading-tight mb-1 text-sm">{service.title}</h5>
                  <p className="text-primary font-mono text-xs mb-3">{service.price}</p>
                  <a href="#inquiry" className="inline-flex items-center gap-1 text-xs font-semibold text-white/80 hover:text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Inquire <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── 5. Portfolio ── */}
      <motion.section
        id="work"
        ref={workRef}
        className="py-24 bg-[#0d0d0d] relative overflow-hidden"
        initial={{ opacity: 0, filter: shouldReduce ? "blur(0px)" : "blur(8px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Heading */}
        <div ref={workHeadingRef} className="px-6 md:px-12 mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 container max-w-7xl mx-auto">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={workHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-primary mb-3"
            >Selected Works</motion.p>
            <SplitText
              text="Portfolio Showcase"
              as="h3"
              className="text-4xl md:text-6xl font-black tracking-tighter text-white"
              delay={0.05}
              stagger={0.05}
            />
          </div>
          <motion.a
            href="https://heyimartin.framer.ai/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 30 }}
            animate={workHeadingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-primary transition-colors duration-200 flex-shrink-0"
          >
            View Full Portfolio <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Scattered bento row */}
        <div className="px-6 md:px-12 overflow-x-auto pb-2">
          <div className="flex items-end gap-3 min-w-max md:min-w-0">

            {/* Card 1 — Brand Refresh, h=400 */}
            <motion.a
              href="https://heyimartin.framer.ai/" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="relative flex-shrink-0 rounded-[1.75rem] overflow-hidden cursor-pointer group"
              style={{ width: 250, height: 400 }}
            >
              <img src={projects[0].img} alt={projects[0].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/60 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">{projects[0].tag}</span>
                  <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-white -rotate-45" />
                  </div>
                </div>
                <div>
                  <p className="text-white/40 font-mono text-[10px] tracking-widest uppercase mb-1">Project 01</p>
                  <h4 className="text-white font-bold text-xl leading-tight">{projects[0].title}</h4>
                </div>
              </div>
            </motion.a>

            {/* Card 2 — App UI, h=500 (tallest) */}
            <motion.a
              href="https://heyimartin.framer.ai/" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="relative flex-shrink-0 rounded-[1.75rem] overflow-hidden cursor-pointer group"
              style={{ width: 230, height: 500 }}
            >
              <img src={projects[1].img} alt={projects[1].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/60 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">{projects[1].tag}</span>
                  <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-white -rotate-45" />
                  </div>
                </div>
                <div>
                  <p className="text-white/40 font-mono text-[10px] tracking-widest uppercase mb-1">Project 02</p>
                  <h4 className="text-white font-bold text-xl leading-tight">{projects[1].title}</h4>
                </div>
              </div>
            </motion.a>

            {/* Card 3 — Stat card (shortest, center) */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex-shrink-0 rounded-[1.75rem] overflow-hidden flex flex-col justify-between p-6 border border-white/8"
              style={{ width: 230, height: 340, background: "rgba(255,255,255,0.04)" }}
            >
              <div>
                <p className="text-white/35 text-xs font-mono uppercase tracking-widest mb-3">Portfolio</p>
                <p className="text-white font-black text-5xl leading-none tracking-tight">50+</p>
                <p className="text-white/50 text-base font-light mt-2 leading-snug">Projects<br />Delivered</p>
              </div>
              <a
                href="https://heyimartin.framer.ai/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-primary transition-colors duration-200 group"
              >
                View Portfolio
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-200">
                  <ArrowRight className="w-3 h-3 text-white -rotate-45" />
                </div>
              </a>
            </motion.div>

            {/* Card 4 — E-Commerce Luma, h=500 (tallest) */}
            <motion.a
              href="https://heyimartin.framer.ai/" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="relative flex-shrink-0 rounded-[1.75rem] overflow-hidden cursor-pointer group"
              style={{ width: 240, height: 500 }}
            >
              <img src={projects[3].img} alt={projects[3].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/60 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">{projects[3].tag}</span>
                  <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-white -rotate-45" />
                  </div>
                </div>
                <div>
                  <p className="text-white/40 font-mono text-[10px] tracking-widest uppercase mb-1">Project 04</p>
                  <h4 className="text-white font-bold text-xl leading-tight">{projects[3].title}</h4>
                </div>
              </div>
            </motion.a>

            {/* Card 5 — Motion Reel, h=420, primary accent */}
            <motion.a
              href="https://heyimartin.framer.ai/" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.27, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="relative flex-shrink-0 rounded-[1.75rem] overflow-hidden cursor-pointer group"
              style={{ width: 230, height: 420 }}
            >
              <img src={projects[2].img} alt={projects[2].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(214,66,56,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)" }} />
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/70 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">{projects[2].tag}</span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-black group-hover:text-white -rotate-45 transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <p className="text-white/60 font-mono text-[10px] tracking-widest uppercase mb-1">Project 03</p>
                  <h4 className="text-white font-bold text-xl leading-tight">{projects[2].title}</h4>
                </div>
              </div>
            </motion.a>

            {/* Card 6 — Web Platform Sync, h=380 */}
            <motion.a
              href="https://heyimartin.framer.ai/" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="relative flex-shrink-0 rounded-[1.75rem] overflow-hidden cursor-pointer group"
              style={{ width: 250, height: 380 }}
            >
              <img src={projects[5].img} alt={projects[5].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/60 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">{projects[5].tag}</span>
                  <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-white -rotate-45" />
                  </div>
                </div>
                <div>
                  <p className="text-white/40 font-mono text-[10px] tracking-widest uppercase mb-1">Project 06</p>
                  <h4 className="text-white font-bold text-xl leading-tight">{projects[5].title}</h4>
                </div>
              </div>
            </motion.a>

          </div>
        </div>
      </motion.section>

      {/* ── 6. Process ── */}
      <motion.section
        id="process"
        ref={processRef}
        className="py-24 bg-[#f5f5f5] relative overflow-hidden"
        initial={{ opacity: 0, filter: shouldReduce ? "blur(0px)" : "blur(8px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container max-w-6xl mx-auto px-6">
          {/* Header */}
          <div ref={processHeadingRef} className="mb-14">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={processHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-black/40 bg-black/[0.06] border border-black/[0.08] rounded-full px-4 py-1.5 mb-8"
            >
              <Rocket className="w-2.5 h-2.5" /> Process
            </motion.span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={processHeadingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] text-black">
                  How I <br /><span className="text-black/15">Work.</span>
                </h3>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={processHeadingInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-black/45 max-w-xs text-sm font-light leading-relaxed md:text-right"
              >
                A refined four-step creative process built for precision, clarity, and premium outcomes at every stage.
              </motion.p>
            </div>
          </div>

          {/* Clickable card deck */}
          <div className="flex items-end gap-3">
            {processCards.map((step, i) => {
              const isActive = activeProcess === i;
              const icons = [
                <Search className={`w-4 h-4 transition-colors duration-300 ${isActive ? "text-primary" : "text-black/35"}`} />,
                <Palette className={`w-4 h-4 transition-colors duration-300 ${isActive ? "text-primary" : "text-black/35"}`} />,
                <Code2 className={`w-4 h-4 transition-colors duration-300 ${isActive ? "text-primary" : "text-black/35"}`} />,
                <Rocket className={`w-4 h-4 transition-colors duration-300 ${isActive ? "text-primary" : "text-black/35"}`} />,
              ];
              return (
                <motion.div
                  key={i}
                  layout
                  onClick={() => setActiveProcess(i)}
                  transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                  className="relative cursor-pointer rounded-[1.75rem] bg-white border border-black/[0.06] overflow-hidden flex flex-col justify-between"
                  style={{
                    flex: isActive ? 2.5 : 1,
                    height: isActive ? 440 : 280,
                    padding: isActive ? 28 : 24,
                    transition: "flex 0.5s cubic-bezier(0.16,1,0.3,1), height 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s",
                    boxShadow: isActive ? "0 8px 40px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  {/* Top gradient area for active card */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-32 rounded-t-[1.75rem] overflow-hidden pointer-events-none">
                      <div className="w-full h-full" style={{ background: "linear-gradient(135deg, rgba(214,66,56,0.09) 0%, rgba(214,66,56,0.02) 100%)" }} />
                      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 25% 60%, rgba(214,66,56,0.1) 0%, transparent 65%)" }} />
                    </div>
                  )}
                  {/* Large step number */}
                  <div>
                    <p className="font-black tracking-tighter leading-none select-none" style={{ fontSize: isActive ? "5rem" : "4rem", color: isActive ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.04)", transition: "font-size 0.4s, color 0.3s" }}>
                      {step.num}.
                    </p>
                  </div>
                  {/* Bottom content */}
                  <div className="relative z-10">
                    <div className={`mb-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? "bg-primary/10" : "bg-black/5"}`}>
                      {icons[i]}
                    </div>
                    <h4 className="font-bold leading-tight text-black" style={{ fontSize: isActive ? "1.35rem" : "0.95rem", transition: "font-size 0.4s" }}>
                      {step.title}
                    </h4>
                    {isActive && (
                      <motion.p
                        key={`desc-${i}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        className="text-black/45 text-sm font-light leading-relaxed mt-3 max-w-[280px]"
                      >
                        {step.desc}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ── 7. Testimonials ── */}
      <motion.section
        ref={testimonialsRef}
        className="py-24 bg-white relative overflow-hidden"
        initial={{ opacity: 0, filter: shouldReduce ? "blur(0px)" : "blur(8px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container max-w-6xl mx-auto px-6">
          {/* Photo mosaic + centre heading */}
          <div className="hidden md:grid grid-cols-[1fr_260px_1fr] gap-3 items-center mb-16">
            {/* Left photo grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-2.5">
                <motion.div style={{ y: testiCol1Y, height: 180 }} className="rounded-2xl overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=280&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="" />
                </motion.div>
                <motion.div style={{ y: testiCol1Y, height: 110 }} className="rounded-2xl overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=280&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="" />
                </motion.div>
              </div>
              <div className="flex flex-col gap-2.5 mt-8">
                <motion.div style={{ y: testiCol2Y, height: 110 }} className="rounded-2xl overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=280&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="" />
                </motion.div>
                <motion.div style={{ y: testiCol2Y, height: 180 }} className="rounded-2xl overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=280&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="" />
                </motion.div>
              </div>
            </div>

            {/* Centre heading */}
            <div className="text-center px-4">
              <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-black/45 border border-black/15 rounded-full px-4 py-1.5 mb-5">Testimonials</span>
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-black leading-snug">
                Trusted by creatives<br />and leaders
              </h3>
              <p className="text-black/40 text-xs mt-2 font-light">from various industries</p>
            </div>

            {/* Right photo grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-2.5 mt-8">
                <motion.div style={{ y: testiCol2Y, height: 110 }} className="rounded-2xl overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=280&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="" />
                </motion.div>
                <motion.div style={{ y: testiCol2Y, height: 180 }} className="rounded-2xl overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=280&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="" />
                </motion.div>
              </div>
              <div className="flex flex-col gap-2.5">
                <motion.div style={{ y: testiCol3Y, height: 180 }} className="rounded-2xl overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=280&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="" />
                </motion.div>
                <motion.div style={{ y: testiCol3Y, height: 110 }} className="rounded-2xl overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=280&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mobile heading */}
          <div className="md:hidden text-center mb-10">
            <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-black/45 border border-black/15 rounded-full px-4 py-1.5 mb-4">Testimonials</span>
            <h3 className="text-3xl font-black tracking-tight text-black">Trusted by creatives<br />and leaders</h3>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#f7f7f7] rounded-2xl p-6 flex flex-col gap-4 border border-black/[0.04]"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-black/65 text-sm leading-relaxed font-light flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-black/[0.06]">
                  <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-xs font-bold text-black/50">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-black font-semibold text-sm leading-tight">{t.name}</p>
                    <p className="text-black/40 text-xs">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── TECH STACK & TOOLS ── */}
      <motion.section
        id="tools"
        className="py-24 bg-[#0a0a0a] relative overflow-hidden"
        initial={{ opacity: 0, filter: shouldReduce ? "blur(0px)" : "blur(8px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          {/* Heading */}
          <div className="mb-14">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-primary mb-4"
            >Tech Stack & Tools</motion.p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <SplitText
                text="Tools of the Trade"
                as="h3"
                className="text-4xl md:text-6xl font-black tracking-tighter text-white"
                delay={0.05}
                stagger={0.05}
              />
              <p className="text-white/30 max-w-xs text-sm font-light leading-relaxed md:text-right">
                Industry-standard tools I use to craft premium digital experiences and scalable brand systems.
              </p>
            </div>
          </div>

          {/* Row 1: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            {/* Design & UI/UX */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="rounded-2xl border border-white/[0.06] p-6 flex flex-col gap-4"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">Design & UI/UX</p>
              <div className="flex flex-col gap-2">
                {[
                  { name: "Figma", Icon: SiFigma, color: "#F24E1E", si: true },
                  { name: "Framer", Icon: SiFramer, color: "#0066FF", si: true },
                  { name: "Adobe XD", Icon: PenTool, color: "#FF61F6", si: false },
                ].map(({ name, Icon, color, si }) => (
                  <div key={name} className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.04] hover:border-white/[0.09] transition-colors" style={{ background: "rgba(255,255,255,0.03)" }}>
                    {si ? <Icon style={{ color, fontSize: 18, flexShrink: 0 }} /> : <Icon className="w-[18px] h-[18px] flex-shrink-0" style={{ color }} />}
                    <span className="text-white/80 text-sm font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Creative & Branding */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="rounded-2xl border border-white/[0.06] p-6 flex flex-col gap-4"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">Creative & Branding</p>
              <div className="flex flex-col gap-2">
                {[
                  { name: "Photoshop", Icon: Image, color: "#31A8FF" },
                  { name: "Illustrator", Icon: Pen, color: "#FF9A00" },
                  { name: "Lightroom", Icon: Sun, color: "#5EC8F2" },
                ].map(({ name, Icon, color }) => (
                  <div key={name} className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.04] hover:border-white/[0.09] transition-colors" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <Icon className="w-[18px] h-[18px] flex-shrink-0" style={{ color }} />
                    <span className="text-white/80 text-sm font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Development & Workflow */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="rounded-2xl border border-white/[0.06] p-6 flex flex-col gap-4"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">Development & Workflow</p>
              <div className="flex flex-col gap-2">
                {[
                  { name: "GitHub", Icon: SiGithub, color: "#ffffff", si: true },
                  { name: "VS Code", Icon: Code2, color: "#007ACC", si: false },
                  { name: "Replit", Icon: Monitor, color: "#F26207", si: false },
                ].map(({ name, Icon, color, si }) => (
                  <div key={name} className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.04] hover:border-white/[0.09] transition-colors" style={{ background: "rgba(255,255,255,0.03)" }}>
                    {si ? <Icon style={{ color, fontSize: 18, flexShrink: 0 }} /> : <Icon className="w-[18px] h-[18px] flex-shrink-0" style={{ color }} />}
                    <span className="text-white/80 text-sm font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Row 2: 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* AI & Creative Systems */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="rounded-2xl border border-white/[0.06] p-6 flex flex-col gap-4"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">AI & Creative Systems</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "Claude AI", Icon: Bot, color: "#D97706", lucide: true },
                  { name: "ChatGPT", Icon: SiOpenai, color: "#ffffff" },
                  { name: "Midjourney", Icon: Wand2, color: "#9333ea", lucide: true },
                ].map(({ name, Icon, color, lucide }) => (
                  <div key={name} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.09] transition-colors text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                    {lucide
                      ? <Icon className="w-5 h-5" style={{ color }} />
                      : <Icon style={{ color, fontSize: 20 }} />
                    }
                    <span className="text-white/60 text-xs font-medium leading-tight">{name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Motion & Interaction */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="rounded-2xl border border-white/[0.06] p-6 flex flex-col gap-4"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">Motion & Interaction</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "Framer Motion", Icon: SiFramer, color: "#0066FF", si: true },
                  { name: "GSAP", Icon: SiGsap, color: "#88CE02", si: true },
                  { name: "Rive", Icon: Layers, color: "#FF5733", si: false },
                ].map(({ name, Icon, color, si }) => (
                  <div key={name} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.09] transition-colors text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                    {si ? <Icon style={{ color, fontSize: 20 }} /> : <Icon className="w-5 h-5" style={{ color }} />}
                    <span className="text-white/60 text-xs font-medium leading-tight">{name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── Studio Vision ── */}
      <motion.section
        id="vision"
        className="py-28 px-6 bg-[#030303] relative overflow-hidden"
        initial={{ opacity: 0, filter: shouldReduce ? "blur(0px)" : "blur(8px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(214,66,56,0.09) 0%, transparent 65%)", filter: "blur(120px)" }} />
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left — heading */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xs font-semibold uppercase tracking-[0.35em] text-primary mb-5"
              >Studio Vision</motion.p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white mb-8">
                Designing<br />
                <span className="text-white/20">Meaningful</span><br />
                Digital<br />
                <span className="text-white/20">Experiences</span>
              </h2>
              {/* Focus areas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-2 mt-10"
              >
                {visionFocusAreas.map((area, i) => (
                  <motion.span
                    key={area}
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                    className="text-xs font-semibold uppercase tracking-wider text-white/70 border border-white/10 rounded-full px-4 py-2 bg-white/[0.04] hover:border-primary/40 hover:text-primary transition-colors duration-300 cursor-default"
                  >
                    {area}
                  </motion.span>
                ))}
              </motion.div>
            </div>
            {/* Right — body */}
            <div className="flex flex-col gap-6">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-white/55 text-lg font-light leading-relaxed"
              >
                Inkaa Studio was created with a vision to blend creativity, storytelling, and technology into immersive digital experiences that feel modern, cinematic, and emotionally engaging.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-white/40 text-base font-light leading-relaxed"
              >
                I believe design is more than visuals — it is about creating meaningful interactions, building memorable identities, and crafting experiences that connect deeply with people.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-white/40 text-base font-light leading-relaxed"
              >
                Through UI/UX design, branding, motion, and interactive storytelling, my goal is to help creators, startups, and modern businesses stand out in the digital world with clarity and purpose.
              </motion.p>
              <motion.blockquote
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="mt-4 border-l-2 border-primary pl-6"
              >
                <p className="text-white/70 text-base italic font-light leading-relaxed">
                  "Every project is approached with a balance of aesthetics, strategy, and functionality to create experiences that not only look beautiful but also feel intuitive and impactful."
                </p>
              </motion.blockquote>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Cinematic Scroll Storytelling (anime.js) ── */}
      <CinematicScrollSection />

      {/* ── FAQ ── */}
      <section id="faq" className="py-28 px-6 bg-[#f7f7f7] relative overflow-hidden">
        <div className="container max-w-7xl mx-auto">
          {/* Heading */}
          <div className="mb-14 text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-primary mb-3"
            >FAQs</motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-tight"
            >
              Questions?{" "}
              <span className="italic font-black text-[#d64238]">Look here.</span>
              <span className="inline-block ml-2 text-[#d64238]" aria-hidden>✦</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            {/* Left — Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col gap-3"
            >
              {faqData.map((item, i) => {
                const isOpen = faqOpenIdx === i;
                return (
                  <div
                    key={i}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "bg-[#d64238] border-[#d64238] shadow-lg shadow-[#d64238]/20"
                        : "bg-white border-black/[0.07] hover:border-black/15"
                    }`}
                  >
                    <button
                      className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                      onClick={() => setFaqOpenIdx(isOpen ? null : i)}
                    >
                      <span className={`font-semibold text-base ${isOpen ? "text-white" : "text-black"}`}>
                        {item.q}
                      </span>
                      <span className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${isOpen ? "border-white/40 text-white" : "border-black/15 text-black"}`}>
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-white/85 text-sm font-light leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* Right — Cards */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-28">
              {/* Dark contact card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="rounded-3xl bg-[#111] p-8 flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Red blob bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 rounded-b-3xl" style={{ background: "linear-gradient(to top, rgba(214,66,56,0.55) 0%, transparent 100%)" }} />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#d64238]/15 border border-[#d64238]/30 flex items-center justify-center mb-5">
                    <MessageCircle className="w-7 h-7 text-[#d64238]" />
                  </div>
                  <h3 className="text-white font-bold text-xl leading-snug mb-2">
                    You have different<br />questions? Ask Away!
                  </h3>
                  <p className="text-white/40 text-sm mb-6 font-light">
                    Your Questions, My Answers.<br />Quick Responses Guaranteed.
                  </p>
                  <a
                    href="#inquiry"
                    className="inline-block bg-[#d64238] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#c0392b] transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </motion.div>

              {/* Phone card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="rounded-3xl bg-white border border-black/[0.07] p-6 flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-full bg-[#d64238]/10 border border-[#d64238]/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#d64238]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-black/30 mb-0.5">Your Vision, My Craft</p>
                  <p className="text-black font-bold text-lg leading-none">Available 24/7</p>
                  <a href="mailto:mosesmartin@inkaastudio.com" className="text-black/50 text-sm hover:text-[#d64238] transition-colors">mosesmartin@inkaastudio.com</a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Support / CTA — zoom from center ── */}
      <motion.section
        ref={ctaRef}
        className="py-32 px-6 bg-card relative"
        initial={{ opacity: 0, filter: shouldReduce ? "blur(0px)" : "blur(8px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container max-w-4xl mx-auto text-center">
          <motion.div
            style={{ scale: ctaScale, opacity: ctaOpacity }}
            className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-b from-background to-muted border border-border shadow-2xl relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 rounded-[3rem]"
              initial={false}
              whileHover={{ background: "radial-gradient(circle at center, rgba(214,66,56,0.06) 0%, transparent 70%)" }}
              transition={{ duration: 0.8 }}
            />
            <SplitText
              text="Support My Work"
              as="h2"
              className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-6 relative z-10"
              delay={0}
              stagger={0.04}
            />
            <SplitText
              text="Help Me Build Better Digital Experiences"
              as="h3"
              className="text-4xl md:text-5xl font-black tracking-tighter mb-6 relative z-10"
              delay={0.1}
              stagger={0.04}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto font-light relative z-10"
            >
              If you enjoy my work, designs, and creative journey through Inkaa Studio, support my creative work and help me continue building meaningful digital experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap items-center justify-center gap-4 relative z-10"
            >
              <Button size="lg" className="rounded-full px-8 text-base h-14 bg-primary text-white hover:bg-primary/90" asChild>
                <a href="https://buymeaprashant.com/inkaastudio" target="_blank" rel="noopener noreferrer">Support Inkaa Studio</a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-14 border-border hover:bg-background" asChild>
                <a href="https://heyimartin.framer.ai/" target="_blank" rel="noopener noreferrer">View Portfolio</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── 9. Pricing ── */}
      <motion.section
        id="pricing"
        className="py-28 px-6 bg-[#0a0a0a] relative overflow-hidden"
        initial={{ opacity: 0, filter: shouldReduce ? "blur(0px)" : "blur(8px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Background grain */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }} />

        <div className="container max-w-7xl mx-auto">
          {/* Editorial heading */}
          <div className="mb-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-primary mb-4"
            >Packages</motion.p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.88] text-white">
                  Plans &amp; <br />
                  <span className="text-white/20">Pricing</span>
                </h2>
              </div>
              <motion.p
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/40 max-w-xs font-light text-base md:text-right"
              >
                Transparent packages designed for every stage of your brand journey.
              </motion.p>
            </div>
          </div>

          {/* Row 1: Starter + Creator */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {pricingPackages.slice(0, 2).map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between min-h-[380px] overflow-hidden group border ${
                  pkg.dark
                    ? "bg-foreground text-background border-foreground"
                    : "bg-white/[0.04] text-white border-white/10 hover:border-white/20"
                } transition-all duration-500`}
              >
                <div>
                  <p className={`text-xs font-mono uppercase tracking-widest mb-2 ${pkg.dark ? "text-background/40" : "text-white/35"}`}>
                    {pkg.name}
                  </p>
                  <p className={`text-lg font-light mb-6 max-w-xs leading-snug ${pkg.dark ? "text-background/70" : "text-white/60"}`}>
                    {pkg.tagline}
                  </p>
                  <ul className="flex flex-col gap-2 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2 text-sm ${pkg.dark ? "text-background/80" : "text-white/70"}`}>
                        <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className={`text-4xl font-black tracking-tight ${pkg.dark ? "text-background" : "text-white"}`}>{pkg.price}</span>
                  </div>
                  <Button
                    asChild
                    className={`rounded-full px-6 h-11 font-semibold transition-all duration-300 ${
                      pkg.dark
                        ? "bg-background text-foreground hover:bg-primary hover:text-white"
                        : "bg-white text-black hover:bg-primary hover:text-white"
                    }`}
                  >
                    <a href="#inquiry">{pkg.cta} →</a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Row 2: Business (featured full-width) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden mb-4 border border-white/10 group"
          >
            <div className="relative bg-white/[0.04] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
              {/* Glow */}
              <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(214,66,56,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />

              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-xs font-mono uppercase tracking-widest text-white/35">Business Brand Package</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/15 border border-primary/30 px-3 py-1 rounded-full">Most Popular</span>
                </div>
                <p className="text-white/55 font-light text-lg max-w-md mb-6">For businesses needing a complete modern identity.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">
                  {pricingPackages[2].features.map((f) => (
                    <span key={f} className="flex items-center gap-2 text-sm text-white/65">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative z-10 flex flex-col items-start md:items-end gap-4 flex-shrink-0">
                <span className="text-5xl font-black text-white tracking-tight">₹9,999</span>
                <Button asChild className="rounded-full bg-white text-black hover:bg-primary hover:text-white px-8 h-12 font-semibold transition-all duration-300">
                  <a href="#inquiry">Launch My Business →</a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Row 3: Premium + Cinematic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pricingPackages.slice(3).map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between overflow-hidden border transition-all duration-500 ${
                  pkg.featured
                    ? "bg-foreground text-background border-foreground min-h-[420px]"
                    : "bg-white/[0.04] text-white border-white/10 hover:border-white/20 min-h-[420px]"
                }`}
              >
                {pkg.badge && (
                  <span className={`absolute top-6 right-6 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                    pkg.featured ? "text-primary bg-primary/10 border-primary/30" : "text-white/50 bg-white/10 border-white/15"
                  }`}>{pkg.badge}</span>
                )}
                {/* Subtle glow for cinematic */}
                {pkg.featured && (
                  <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(214,66,56,0.15) 0%, transparent 70%)", filter: "blur(40px)" }} />
                )}
                <div className="relative z-10">
                  <p className={`text-xs font-mono uppercase tracking-widest mb-2 ${pkg.featured ? "text-background/40" : "text-white/35"}`}>
                    {pkg.name}
                  </p>
                  <p className={`text-base font-light mb-6 max-w-xs leading-snug ${pkg.featured ? "text-background/65" : "text-white/55"}`}>
                    {pkg.tagline}
                  </p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2 text-sm ${pkg.featured ? "text-background/75" : "text-white/65"}`}>
                        <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative z-10 flex items-end justify-between gap-4">
                  <span className={`text-4xl font-black tracking-tight ${pkg.featured ? "text-background" : "text-white"}`}>{pkg.price}</span>
                  <Button
                    asChild
                    className={`rounded-full px-6 h-11 font-semibold transition-all duration-300 ${
                      pkg.featured
                        ? "bg-background text-foreground hover:bg-primary hover:text-white"
                        : "bg-white text-black hover:bg-primary hover:text-white"
                    }`}
                  >
                    <a href="#inquiry">{pkg.cta} →</a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── 10. Inquiry Form ── */}
      <motion.section
        id="inquiry"
        className="py-32 px-6 bg-background relative"
        initial={{ opacity: 0, filter: shouldReduce ? "blur(0px)" : "blur(8px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-4"
            >Start a Project</motion.p>
            <SplitText
              text="Let's create something iconic."
              as="h3"
              className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8"
              delay={0.05}
              stagger={0.04}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xl text-muted-foreground font-light max-w-md"
            >
              Fill out the form, and I'll get back to you within 24-48 hours. Let's build the future together.
            </motion.p>
          </div>

          <motion.div
            ref={formPanelRef}
            style={{ y: formY, opacity: formOpacity }}
            className="bg-card p-8 md:p-12 rounded-[2rem] border border-border shadow-xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Full Name *</label>
                  <input {...register("fullName")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="John Doe" />
                  {errors.fullName && <span className="text-xs text-destructive">{errors.fullName.message as string}</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Email *</label>
                  <input type="email" {...register("email")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="john@example.com" />
                  {errors.email && <span className="text-xs text-destructive">{errors.email.message as string}</span>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Company Name</label>
                <input {...register("company")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Acme Corp (Optional)" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Service Needed *</label>
                  <select {...register("service")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none">
                    <option value="">Select Service...</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Website Design">Website Design</option>
                    <option value="Branding">Branding & Identity</option>
                    <option value="Motion Design">Motion & Visual Design</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.service && <span className="text-xs text-destructive">{errors.service.message as string}</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Budget Range *</label>
                  <select {...register("budget")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none">
                    <option value="">Select Budget...</option>
                    <option value="< ₹50k">Under ₹50,000</option>
                    <option value="₹50k - ₹1L">₹50,000 - ₹1,00,000</option>
                    <option value="₹1L - ₹3L">₹1,00,000 - ₹3,00,000</option>
                    <option value="₹3L+">₹3,00,000+</option>
                  </select>
                  {errors.budget && <span className="text-xs text-destructive">{errors.budget.message as string}</span>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Timeline *</label>
                <select {...register("timeline")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none">
                  <option value="">Select Timeline...</option>
                  <option value="ASAP">ASAP (Rush)</option>
                  <option value="1-2 Months">1-2 Months</option>
                  <option value="3+ Months">3+ Months</option>
                  <option value="Flexible">Flexible</option>
                </select>
                {errors.timeline && <span className="text-xs text-destructive">{errors.timeline.message as string}</span>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Project Details *</label>
                <textarea {...register("details")} rows={4} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" placeholder="Tell me about your project, goals, and expectations..." />
                {errors.details && <span className="text-xs text-destructive">{errors.details.message as string}</span>}
              </div>
              <Button type="submit" size="lg" className="w-full rounded-xl h-14 text-base font-semibold bg-foreground text-background hover:bg-primary hover:text-white transition-colors duration-300">
                Send Inquiry
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.section>

      {/* ── 10. Footer ── */}
      <motion.footer
        ref={footerRef}
        className="bg-foreground text-background pt-32 pb-12 px-6 relative overflow-hidden"
        initial={{ opacity: 0, filter: shouldReduce ? "blur(0px)" : "blur(8px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Cinematic bg depth */}
        <motion.div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <motion.div
            className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full"
            style={{ y: footerBgY, background: "radial-gradient(circle, rgba(214,66,56,0.10) 0%, transparent 60%)", filter: "blur(100px)" }}
          />
        </motion.div>
        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 mb-32">
            <div className="md:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex items-center gap-4 mb-6"
              >
                <img src={inkaaLogo} alt="Inkaa Studio" className="w-16 h-16 rounded-2xl" />
                <span className="font-bold text-3xl tracking-tight">inkaa.</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-background/60 max-w-xs font-light"
              >
                Designing intelligent digital experiences that command attention. Based in the digital realm.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="md:col-span-2 md:col-start-7"
            >
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-background/40">Navigation</h4>
              <ul className="flex flex-col gap-4">
                {["about","services","work","process"].map(id => (
                  <li key={id}><a href={`#${id}`} className="hover:text-primary transition-colors capitalize">{id}</a></li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="md:col-span-2"
            >
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-background/40">Connect</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="mailto:mosesmartin@inkaastudio.com" className="hover:text-primary transition-colors">Email</a></li>
                <li><a href="https://heyimartin.framer.ai/" className="hover:text-primary transition-colors">Portfolio</a></li>
                <li><a href="https://buymeaprashant.com/inkaastudio" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="md:col-span-2"
            >
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-background/40">Socials</h4>
              <div className="flex gap-3">
                <motion.a whileHover={{ scale: 1.15, backgroundColor: "rgb(214,66,56)" }} href="https://www.instagram.com/inkaastudio.in/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:text-white transition-colors">
                  <SiInstagram className="w-4 h-4" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.15, backgroundColor: "rgb(214,66,56)" }} href="https://x.com/inkaastudio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:text-white transition-colors">
                  <SiX className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Cinematic rising "inkaa." */}
          <div ref={footerTextRef} className="w-full flex items-center justify-center mt-20 relative overflow-hidden -mx-6 px-6">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={footerTextInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[25vw] leading-none font-black tracking-tighter text-background/10 whitespace-nowrap"
              >
                inkaa.
              </motion.h1>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/40">
            <p>© {new Date().getFullYear()} Inkaa Studio. All rights reserved.</p>
            <p>Designed by Moses Martin</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
