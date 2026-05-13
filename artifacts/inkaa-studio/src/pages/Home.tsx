import React, { useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { ArrowRight, Menu, Star, ChevronRight, Search, Palette, Code2, Rocket, Bot, Wand2, Layers, Zap, PenTool, Image, Sun, Pen, Monitor, Plus, Minus, Phone, MessageCircle } from "lucide-react";
import { SiInstagram, SiX, SiFigma, SiFramer, SiGithub, SiOpenai, SiGsap } from "react-icons/si";
import CustomCursor from "@/components/CustomCursor";
import ServicesScrollScene from "@/components/ServicesScrollScene";
import ProcessScrollScene from "@/components/ProcessScrollScene";
import MarqueeStrip from "@/components/MarqueeStrip";
import BookCallButton from "@/components/BookCallButton";
import { SplitText } from "@/components/SplitText";
import newFounderPhoto from "@assets/Untitled_design_(1)_1778455130934.optimized.webp";
import founderPhoto from "@assets/Untitled_design_1778451365026.optimized.webp";
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
  { name: "Products", id: "products" },
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

const inkaaProducts = [
  {
    id: "marketing",
    tab: "inkaa Marketing",
    name: "inkaa.",
    nameAccent: "Marketing",
    tagline: "Digital marketing software built for modern brands.",
    url: "marketing.inkaastudio.com",
    href: "https://marketing.inkaastudio.com",
    description: "A powerful all-in-one digital marketing platform designed to help brands grow faster — with AI-assisted campaigns, analytics dashboards, social scheduling, and creative automation built right in.",
    features: ["AI Campaign Generator", "Social Media Scheduler", "Analytics Dashboard", "Brand Asset Manager", "Lead Tracking", "Email Automation"],
    accent: "#d64238",
    badge: "Software",
    status: "Live",
  },
  {
    id: "campus",
    tab: "inkaa Campus",
    name: "inkaa.",
    nameAccent: "Campus",
    tagline: "Learn design, branding, and creative direction.",
    url: "campus.inkaastudio.com",
    href: "https://campus.inkaastudio.com",
    description: "An education platform where designers, founders, and creators learn the art of cinematic branding, UI/UX, and motion design — through structured courses taught by Moses Martin himself.",
    features: ["Live Cohorts", "Design Courses", "Branding Masterclass", "Motion Design Labs", "Mentorship Access", "Community Forums"],
    accent: "#d64238",
    badge: "Education",
    status: "Coming Soon",
  },
  {
    id: "peopleos",
    tab: "inkaa PeopleOS",
    name: "inkaa.",
    nameAccent: "PeopleOS",
    tagline: "AI-powered workforce operating system for modern teams.",
    url: "peopleos.inkaastudio.com",
    href: "https://peopleos.inkaastudio.com",
    description: "An AI-powered workforce operating system that manages the entire employee lifecycle — from hiring to payroll to performance — in one intelligent platform. One central business operating system for employees and HR teams.",
    features: ["AI Hiring Workflows", "Employee Lifecycle OS", "Payroll Intelligence", "Performance Reviews", "HR Team Workspace", "People Analytics"],
    accent: "#d64238",
    badge: "Software",
    status: "Coming Soon",
  },
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

/* ── Main Page ── */
export default function Home() {
  const shouldReduce = useReducedMotion();
  const [activeSection, setActiveSection] = React.useState("about");
  const [faqOpenIdx, setFaqOpenIdx] = React.useState<number | null>(0);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeProduct, setActiveProduct] = React.useState(0);
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
  const progressDotX = useTransform(progressBarScale, (s) => `calc(${Math.min(s, 0.9999) * 100}% - 2.5px)`);
  const progressDotOpacity = useTransform(progressBarScale, [0, 0.01, 0.99, 1], [0, 1, 1, 0]);

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
    offset: ["start 92%", "center 54%"],
  });
  const aboutClip = useTransform(aboutImgProgress, [0, 1], ["inset(14% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const aboutImgScale = useTransform(aboutImgProgress, [0, 1], [1.07, 1.015]);
  const aboutImgY = useTransform(aboutImgProgress, [0, 1], ["-1.5%", "1.5%"]);
  const aboutTextRef = useRef(null);
  const aboutTextInView = useInView(aboutTextRef, { once: true, margin: "-100px" });

  /* ── Portfolio per-card parallax ── */
  const workRef = useRef<HTMLElement>(null);
  const { scrollYProgress: workProgress } = useScroll({
    target: workRef,
    offset: ["start end", "end start"],
  });
  const workHeadingRef = useRef(null);
  const workHeadingInView = useInView(workHeadingRef, { once: true, margin: "-80px" });

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
      <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
        {/* Track */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-white/[0.06]" />
        {/* Filled bar with glow */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] origin-left"
          style={{
            scaleX: progressBarScale,
            background: "linear-gradient(90deg, #b32d24 0%, #d64238 55%, #ff6b5e 100%)",
            boxShadow: "0 0 8px rgba(214,66,56,0.7), 0 0 20px rgba(214,66,56,0.35)",
            width: "100%",
          }}
        />
        {/* Leading-edge bright dot */}
        <motion.div
          className="absolute top-0 w-[5px] h-[5px] rounded-full -translate-y-[1.5px]"
          style={{
            left: 0,
            x: progressDotX,
            background: "#fff",
            boxShadow: "0 0 6px 2px rgba(214,66,56,0.9), 0 0 12px 4px rgba(214,66,56,0.5)",
            opacity: progressDotOpacity,
          }}
        />
      </div>

      {/* ── 1. Nav ── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-4 right-4 z-50 px-6 h-14 flex items-center justify-between bg-white/90 backdrop-blur-xl rounded-2xl border border-black/8 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-2.5 flex-shrink-0"
        >
          <img src={inkaaLogo} alt="Inkaa Studio Logo" loading="eager" decoding="async" className="w-8 h-8 rounded-full" />
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
        id="hero"
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
              loading="eager"
              decoding="async"
              fetchPriority="high"
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
      <div className="marquee-3d">
        <MarqueeStrip dark />
      </div>

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
          <div ref={aboutImageRef} className="about-img-3d relative aspect-[3/4] rounded-2xl overflow-hidden lg:order-1">
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-2xl"
              style={{ clipPath: aboutClip }}
            >
              <motion.img
                src={founderPhoto}
                alt="Moses Martin Profile"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover grayscale"
                style={{ scale: aboutImgScale, y: aboutImgY, objectPosition: "50% 38%" }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── Marquee ── */}
      <div className="marquee-3d"><MarqueeStrip /></div>

      {/* ── 4. Services — GSAP Scroll Pinned Scene ── */}
      <ServicesScrollScene />

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
                <img src={service.img} alt={service.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
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
        className="py-24 bg-[#f6f3ee] relative overflow-hidden text-black"
        initial={{ opacity: 0, filter: shouldReduce ? "blur(0px)" : "blur(8px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(214,66,56,0.08),transparent_28%),radial-gradient(circle_at_78%_68%,rgba(0,0,0,0.06),transparent_30%)]" />

        <div ref={workHeadingRef} className="container relative z-10 mx-auto mb-12 max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[160px_1fr_160px]">
            <motion.a
              href="https://heyimartin.framer.ai/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              animate={workHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden h-24 w-24 items-center justify-center rounded-full border border-black/10 bg-white/55 backdrop-blur-md md:flex"
              aria-label="Learn about this portfolio"
            >
              <span className="absolute h-full w-full animate-[spin_18s_linear_infinite] rounded-full text-[8px] font-bold uppercase tracking-[0.22em] text-black/40 [writing-mode:vertical-rl]">
                Learn about this works
              </span>
              <span className="ml-1 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-black" />
            </motion.a>

            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={workHeadingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary"
              >
                Selected Works
              </motion.p>
              <SplitText
                text="Elevate Your Brand With Bold Digital Experiences"
                as="h3"
                className="mx-auto max-w-5xl text-5xl font-black leading-[0.96] tracking-normal text-black md:text-7xl"
                delay={0.05}
                stagger={0.035}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={workHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden justify-self-end md:flex -space-x-3 pt-6"
            >
              {[projects[1].img, projects[2].img, projects[0].img].map((img, i) => (
                <span key={img} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#f6f3ee] bg-black">
                  <img src={img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  {i === 2 && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black text-sm font-bold text-white">
                      +
                    </span>
                  )}
                </span>
              ))}
            </motion.p>
          </div>
        </div>

        <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-12">
          <div className="portfolio-bento-row grid grid-cols-1 gap-5 md:grid-cols-[1fr_1.05fr_0.95fr_1.05fr_1fr] md:items-end">
            <div className="grid gap-5">
              <motion.a href="https://heyimartin.framer.ai/" target="_blank" rel="noopener noreferrer" whileHover={{ y: -8 }} className="group relative h-72 overflow-hidden rounded-[1.75rem] md:h-[300px]">
                <img src={projects[0].img} alt={projects[0].title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_52%] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <p className="absolute bottom-5 left-5 text-lg font-bold text-white">{projects[0].title}</p>
              </motion.a>
              <motion.a href="https://heyimartin.framer.ai/" target="_blank" rel="noopener noreferrer" whileHover={{ y: -8 }} className="group relative h-40 overflow-hidden rounded-[1.75rem] md:h-[140px]">
                <img src={projects[2].img} alt={projects[2].title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_50%] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-primary/30" />
                <p className="absolute bottom-5 left-5 text-lg font-bold text-white">{projects[2].title}</p>
              </motion.a>
            </div>

            <motion.a href="https://heyimartin.framer.ai/" target="_blank" rel="noopener noreferrer" whileHover={{ y: -8 }} className="group relative h-[440px] overflow-hidden rounded-[1.75rem] md:h-[390px]">
              <img src={projects[1].img} alt={projects[1].title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[48%_50%] transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/5 to-transparent" />
              <p className="absolute bottom-5 left-5 text-xl font-bold text-white">{projects[1].title}</p>
            </motion.a>

            <div className="grid gap-5">
              <motion.a href="https://heyimartin.framer.ai/" target="_blank" rel="noopener noreferrer" whileHover={{ y: -8 }} className="group relative h-64 overflow-hidden rounded-[1.75rem] md:h-[230px]">
                <img src={projects[4].img} alt={projects[4].title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_50%] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
                <p className="absolute bottom-5 left-5 text-lg font-bold text-white">{projects[4].title}</p>
              </motion.a>
              <motion.a
                href="https://heyimartin.framer.ai/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.02 }}
                className="mx-auto inline-flex h-14 items-center justify-center gap-2 rounded-full bg-black px-8 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
              >
                Explore Portfolio <ArrowRight className="h-4 w-4 -rotate-45 text-primary" />
              </motion.a>
            </div>

            <motion.a href="https://heyimartin.framer.ai/" target="_blank" rel="noopener noreferrer" whileHover={{ y: -8 }} className="group relative h-[440px] overflow-hidden rounded-[1.75rem] md:h-[370px]">
              <img src={projects[3].img} alt={projects[3].title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_54%] transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/5 to-transparent" />
              <p className="absolute bottom-5 left-5 text-xl font-bold text-white">{projects[3].title}</p>
            </motion.a>

            <div className="grid gap-5">
              <motion.a href="https://heyimartin.framer.ai/" target="_blank" rel="noopener noreferrer" whileHover={{ y: -8 }} className="group relative h-72 overflow-hidden rounded-[1.75rem] md:h-[300px]">
                <img src={projects[5].img} alt={projects[5].title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_48%] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/5 to-transparent" />
                <p className="absolute bottom-5 left-5 text-lg font-bold text-white">{projects[5].title}</p>
              </motion.a>
              <motion.div className="relative h-40 overflow-hidden rounded-[1.75rem] bg-black p-6 text-white md:h-[140px]">
                <p className="text-5xl font-black leading-none">50+</p>
                <p className="mt-2 text-sm text-white/55">Premium projects delivered</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── 6. Process — GSAP Scroll Pinned Scene ── */}
      <ProcessScrollScene />

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
                  <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=280&auto=format&fit=crop&q=80" loading="lazy" decoding="async" className="w-full h-full object-cover" alt="" />
                </motion.div>
                <motion.div style={{ y: testiCol1Y, height: 110 }} className="rounded-2xl overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=280&auto=format&fit=crop&q=80" loading="lazy" decoding="async" className="w-full h-full object-cover" alt="" />
                </motion.div>
              </div>
              <div className="flex flex-col gap-2.5 mt-8">
                <motion.div style={{ y: testiCol2Y, height: 110 }} className="rounded-2xl overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=280&auto=format&fit=crop&q=80" loading="lazy" decoding="async" className="w-full h-full object-cover" alt="" />
                </motion.div>
                <motion.div style={{ y: testiCol2Y, height: 180 }} className="rounded-2xl overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=280&auto=format&fit=crop&q=80" loading="lazy" decoding="async" className="w-full h-full object-cover" alt="" />
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
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=280&auto=format&fit=crop&q=80" loading="lazy" decoding="async" className="w-full h-full object-cover" alt="" />
                </motion.div>
                <motion.div style={{ y: testiCol2Y, height: 180 }} className="rounded-2xl overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=280&auto=format&fit=crop&q=80" loading="lazy" decoding="async" className="w-full h-full object-cover" alt="" />
                </motion.div>
              </div>
              <div className="flex flex-col gap-2.5">
                <motion.div style={{ y: testiCol3Y, height: 180 }} className="rounded-2xl overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=280&auto=format&fit=crop&q=80" loading="lazy" decoding="async" className="w-full h-full object-cover" alt="" />
                </motion.div>
                <motion.div style={{ y: testiCol3Y, height: 110 }} className="rounded-2xl overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=280&auto=format&fit=crop&q=80" loading="lazy" decoding="async" className="w-full h-full object-cover" alt="" />
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
          <div className="tool-grid-3d grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
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
          <div className="tool-grid-3d grid grid-cols-1 md:grid-cols-2 gap-3">
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
                <span className="vision-line-3d block">Designing</span>
                <span className="vision-line-3d block text-white/20">Meaningful</span>
                <span className="vision-line-3d block">Digital</span>
                <span className="vision-line-3d block text-white/20">Experiences</span>
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

      {/* ── Products ── */}
      <section id="products" className="py-28 bg-[#030303] relative overflow-hidden">
        {/* Ambient glow that shifts per product */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct}
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background:
                activeProduct === 0
                  ? "radial-gradient(ellipse 70% 55% at 70% 50%, rgba(214,66,56,0.07) 0%, transparent 70%)"
                  : activeProduct === 1
                    ? "radial-gradient(ellipse 70% 55% at 30% 50%, rgba(214,66,56,0.07) 0%, transparent 70%)"
                    : "radial-gradient(ellipse 72% 58% at 52% 42%, rgba(214,66,56,0.08) 0%, transparent 72%)",
            }}
          />
        </AnimatePresence>

        <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="mb-14">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-primary mb-4"
            >Our Products</motion.p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]"
              >
                Built for<br /><span className="text-white/15">the Future.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-white/35 max-w-xs text-sm font-light leading-relaxed md:text-right"
              >
                Beyond client work — tools and platforms we're building to push the ecosystem forward.
              </motion.p>
            </div>
          </div>

          {/* Tab switcher */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 flex w-fit max-w-full flex-wrap items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-1"
          >
            {inkaaProducts.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActiveProduct(i)}
                className="relative rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-200 focus:outline-none"
                style={{ color: activeProduct === i ? "#030303" : "rgba(255,255,255,0.45)" }}
              >
                {activeProduct === i && (
                  <motion.span
                    layoutId="product-tab-bg"
                    className="absolute inset-0 bg-white rounded-xl"
                    transition={{ type: "spring", bounce: 0.22, duration: 0.45 }}
                  />
                )}
                <span className="relative z-10">{p.tab}</span>
              </button>
            ))}
          </motion.div>

          {/* Product card */}
          <AnimatePresence mode="wait">
            {inkaaProducts.map((product, i) =>
              i !== activeProduct ? null : (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/[0.07] bg-white/[0.02]"
                >
                  {/* Left — product info */}
                  <div className="p-10 md:p-14 flex flex-col justify-between gap-10">
                    <div>
                      {/* Status + badge row */}
                      <div className="flex items-center gap-3 mb-8">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-1.5">
                          {product.badge}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full px-4 py-1.5 ${
                          product.status === "Live"
                            ? "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20"
                            : "text-amber-400 bg-amber-400/10 border border-amber-400/20"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${product.status === "Live" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
                          {product.status}
                        </span>
                      </div>

                      {/* Product name */}
                      <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-none mb-2">
                        {product.name}
                        <span className="text-primary">{product.nameAccent}</span>
                      </h3>

                      {/* URL */}
                      <p className="text-white/25 font-mono text-xs tracking-widest mb-6">
                        ↗ {product.url}
                      </p>

                      {/* Tagline */}
                      <p className="text-white/60 text-lg font-light leading-relaxed mb-6">
                        {product.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-white/35 text-sm font-light leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div>
                      <a
                        href={product.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-7 h-12 rounded-full hover:bg-primary/90 transition-colors duration-200"
                      >
                        Explore {product.nameAccent} <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Right — features grid */}
                  <div className="p-10 md:p-14 bg-white/[0.02] border-l border-white/[0.06] flex flex-col justify-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/25 mb-7">
                      Key Features
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.features.map((feat, fi) => (
                        <motion.div
                          key={feat}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: fi * 0.07 }}
                          className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="text-white/70 text-sm font-light">{feat}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom decorative element */}
                    <div className="mt-10 pt-8 border-t border-white/[0.06]">
                      <p className="text-white/15 font-mono text-[11px] tracking-widest uppercase">
                        An inkaa Studio product · {new Date().getFullYear()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </section>

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
                    className={`faq-item-3d rounded-2xl border transition-all duration-300 overflow-hidden ${
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
          <div className="pricing-grid-3d grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
          <div className="pricing-grid-3d grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-semibold text-foreground">Full Name *</label>
                  <input id="fullName" autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "fullName-error" : undefined} {...register("fullName")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="John Doe" />
                  {errors.fullName && <span id="fullName-error" className="text-xs text-destructive">{errors.fullName.message as string}</span>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground">Email *</label>
                  <input id="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="john@example.com" />
                  {errors.email && <span id="email-error" className="text-xs text-destructive">{errors.email.message as string}</span>}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-semibold text-foreground">Company Name</label>
                <input id="company" autoComplete="organization" {...register("company")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Acme Corp (Optional)" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-semibold text-foreground">Service Needed *</label>
                  <select id="service" aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined} {...register("service")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none">
                    <option value="">Select Service...</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Website Design">Website Design</option>
                    <option value="Branding">Branding & Identity</option>
                    <option value="Motion Design">Motion & Visual Design</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.service && <span id="service-error" className="text-xs text-destructive">{errors.service.message as string}</span>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-semibold text-foreground">Budget Range *</label>
                  <select id="budget" aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? "budget-error" : undefined} {...register("budget")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none">
                    <option value="">Select Budget...</option>
                    <option value="< ₹50k">Under ₹50,000</option>
                    <option value="₹50k - ₹1L">₹50,000 - ₹1,00,000</option>
                    <option value="₹1L - ₹3L">₹1,00,000 - ₹3,00,000</option>
                    <option value="₹3L+">₹3,00,000+</option>
                  </select>
                  {errors.budget && <span id="budget-error" className="text-xs text-destructive">{errors.budget.message as string}</span>}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="timeline" className="text-sm font-semibold text-foreground">Timeline *</label>
                <select id="timeline" aria-invalid={Boolean(errors.timeline)} aria-describedby={errors.timeline ? "timeline-error" : undefined} {...register("timeline")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none">
                  <option value="">Select Timeline...</option>
                  <option value="ASAP">ASAP (Rush)</option>
                  <option value="1-2 Months">1-2 Months</option>
                  <option value="3+ Months">3+ Months</option>
                  <option value="Flexible">Flexible</option>
                </select>
                {errors.timeline && <span id="timeline-error" className="text-xs text-destructive">{errors.timeline.message as string}</span>}
              </div>
              <div className="space-y-2">
                <label htmlFor="details" className="text-sm font-semibold text-foreground">Project Details *</label>
                <textarea id="details" aria-invalid={Boolean(errors.details)} aria-describedby={errors.details ? "details-error" : undefined} {...register("details")} rows={4} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" placeholder="Tell me about your project, goals, and expectations..." />
                {errors.details && <span id="details-error" className="text-xs text-destructive">{errors.details.message as string}</span>}
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
                <img src={inkaaLogo} alt="Inkaa Studio" loading="lazy" decoding="async" className="w-16 h-16 rounded-2xl" />
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
          <div ref={footerTextRef} className="footer-text-3d w-full flex items-center justify-center mt-20 relative overflow-hidden -mx-6 px-6">
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
