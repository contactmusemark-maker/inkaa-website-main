import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GSAPPageEffects() {
  useEffect(() => {
    // Hero mouse handlers stored at effect scope so cleanup can remove them
    let heroMoveHandler: ((e: MouseEvent) => void) | null = null;
    let heroLeaveHandler: (() => void) | null = null;

    const ctx = gsap.context(() => {

      // ─────────────────────────────────────────────────────────
      // 1. GLOBAL BOOK-OPENING ENTRANCE — every major section
      //    tilts in from above (rotateX scrub). Safe: FM only
      //    controls opacity/filter on these motion.sections, not
      //    the CSS transform, so there is zero conflict.
      // ─────────────────────────────────────────────────────────
      const sectionIds = [
        "#about", "#services", "#work", "#process",
        "#tools", "#vision", "#faq", "#pricing", "#inquiry",
      ];
      sectionIds.forEach((id) => {
        const el = document.querySelector(id);
        if (!el) return;
        gsap.set(el, { transformPerspective: 2400, transformOrigin: "50% 0%", rotateX: 0 });
        gsap.from(el, {
          rotateX: 14,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            end: "top 15%",
            scrub: 2.5,
          },
        });
      });

      // ─────────────────────────────────────────────────────────
      // 2. HERO — silky mouse-driven 3D tilt (GSAP quickTo)
      //    The entire hero viewport gently rotates on X/Y as the
      //    mouse moves — like holding a physical frame.
      // ─────────────────────────────────────────────────────────
      const hero = document.getElementById("hero");
      if (hero) {
        // Note: don't register rotateX/Y with gsap.set() here — context.revert()
        // cannot reset individual transform components in GSAP 3.12+.
        // The event listener cleanup handles this instead.
        gsap.set(hero, { transformPerspective: 1800, transformOrigin: "50% 50%" });
        const qX = gsap.quickTo(hero, "rotateY", { duration: 0.9, ease: "power3.out" });
        const qY = gsap.quickTo(hero, "rotateX", { duration: 0.9, ease: "power3.out" });
        heroMoveHandler = (e: MouseEvent) => {
          qX(((e.clientX / window.innerWidth) - 0.5) * 7);
          qY(((e.clientY / window.innerHeight) - 0.5) * -5);
        };
        heroLeaveHandler = () => { qX(0); qY(0); };
        hero.addEventListener("mousemove", heroMoveHandler);
        hero.addEventListener("mouseleave", heroLeaveHandler);
      }

      // ─────────────────────────────────────────────────────────
      // 3. ABOUT image — flies in from deep Z with a rotateY tilt.
      //    The container div has no Framer Motion, so it's safe.
      // ─────────────────────────────────────────────────────────
      const aboutImg = document.querySelector(".about-img-3d");
      if (aboutImg) {
        gsap.set(aboutImg, { transformPerspective: 1400, rotateY: 0, z: 0 });
        gsap.from(aboutImg, {
          z: -700,
          rotateY: -22,
          ease: "none",
          scrollTrigger: {
            trigger: aboutImg,
            start: "top 90%",
            end: "top 15%",
            scrub: 2,
          },
        });
      }

      // ─────────────────────────────────────────────────────────
      // 4. VISION heading — each word/line zooms from deep Z
      //    toward the viewer at different depths (staggered scrub).
      //    Creates a genuine depth-tunnel text effect.
      // ─────────────────────────────────────────────────────────
      const visionLines = document.querySelectorAll(".vision-line-3d");
      visionLines.forEach((line, i) => {
        gsap.set(line, {
          transformPerspective: 1600,
          transformOrigin: "50% 50%",
          display: "block",
          rotateX: 0,
          z: 0,
        });
        gsap.from(line, {
          z: -(500 + i * 250),
          rotateX: (i % 2 === 0 ? 1 : -1) * 20,
          ease: "none",
          scrollTrigger: {
            trigger: "#vision",
            start: "top 85%",
            end: "top 5%",
            scrub: 2.5,
          },
        });
      });

      // ─────────────────────────────────────────────────────────
      // 5. PORTFOLIO bento row — the whole flex container tilts in
      //    from above on perspective (no FM on this container).
      // ─────────────────────────────────────────────────────────
      const bentoRow = document.querySelector(".portfolio-bento-row");
      if (bentoRow) {
        gsap.set(bentoRow, { transformPerspective: 1600, transformOrigin: "50% 0%", rotateX: 0, z: 0 });
        gsap.from(bentoRow, {
          rotateX: 18,
          z: -200,
          ease: "none",
          scrollTrigger: {
            trigger: bentoRow,
            start: "top 90%",
            end: "top 20%",
            scrub: 2,
          },
        });
      }

      // ─────────────────────────────────────────────────────────
      // 6. PROCESS deck — the card deck tilts from a 3D angle as
      //    it enters, like dealing cards from the void.
      // ─────────────────────────────────────────────────────────
      const processDeck = document.querySelector(".process-deck-3d");
      if (processDeck) {
        gsap.set(processDeck, {
          transformPerspective: 1600,
          transformOrigin: "50% 0%",
          rotateX: 0,
          rotateY: 0,
          z: 0,
        });
        gsap.from(processDeck, {
          rotateX: 16,
          rotateY: -6,
          z: -300,
          ease: "none",
          scrollTrigger: {
            trigger: processDeck,
            start: "top 90%",
            end: "top 20%",
            scrub: 2,
          },
        });
      }

      // ─────────────────────────────────────────────────────────
      // 7. TOOL card grids — each grid column rises from Z depth
      //    creating a staggered cascade entrance.
      // ─────────────────────────────────────────────────────────
      const toolGrids = document.querySelectorAll(".tool-grid-3d");
      toolGrids.forEach((grid, i) => {
        gsap.set(grid, { transformPerspective: 1400, transformOrigin: "50% 0%", rotateX: 0, z: 0 });
        gsap.from(grid, {
          rotateX: 20,
          z: -(300 + i * 80),
          ease: "none",
          scrollTrigger: {
            trigger: grid,
            start: "top 90%",
            end: "top 30%",
            scrub: 1.8,
          },
        });
      });

      // ─────────────────────────────────────────────────────────
      // 8. PRICING grid rows — each pricing row sweeps in from a
      //    3D angle with alternating rotateY direction.
      // ─────────────────────────────────────────────────────────
      const pricingGrids = document.querySelectorAll(".pricing-grid-3d");
      pricingGrids.forEach((grid, i) => {
        gsap.set(grid, {
          transformPerspective: 1600,
          transformOrigin: "50% 0%",
          rotateX: 0,
          rotateY: 0,
          z: 0,
        });
        gsap.from(grid, {
          rotateX: 14,
          rotateY: (i % 2 === 0 ? -1 : 1) * 7,
          z: -350,
          ease: "none",
          scrollTrigger: {
            trigger: grid,
            start: "top 90%",
            end: "top 25%",
            scrub: 2,
          },
        });
      });

      // ─────────────────────────────────────────────────────────
      // 9. FOOTER giant "inkaa." text — slams in from deep Z with
      //    heavy rotateX, like a cinematic title card drop.
      // ─────────────────────────────────────────────────────────
      const footerText = document.querySelector(".footer-text-3d");
      if (footerText) {
        gsap.set(footerText, { transformPerspective: 2000, transformOrigin: "50% 100%", rotateX: 0, z: 0 });
        gsap.from(footerText, {
          z: -1400,
          rotateX: 40,
          ease: "none",
          scrollTrigger: {
            trigger: footerText,
            start: "top 95%",
            end: "top 10%",
            scrub: 2.5,
          },
        });
      }

      // ─────────────────────────────────────────────────────────
      // 10. MARQUEE STRIPS — float up from Z depth as they enter
      //     the viewport, reinforcing the depth sensation.
      // ─────────────────────────────────────────────────────────
      const marquees = document.querySelectorAll(".marquee-3d");
      marquees.forEach((m) => {
        gsap.set(m, { transformPerspective: 1600, transformOrigin: "50% 50%", rotateX: 0, z: 0 });
        gsap.from(m, {
          z: -280,
          rotateX: 14,
          ease: "none",
          scrollTrigger: {
            trigger: m,
            start: "top 95%",
            end: "top 50%",
            scrub: 1.5,
          },
        });
      });

      // ─────────────────────────────────────────────────────────
      // 11. FAQ ITEMS — each FAQ item cascades from depth,
      //     creating a deck-of-cards entrance effect.
      // ─────────────────────────────────────────────────────────
      const faqItems = document.querySelectorAll(".faq-item-3d");
      faqItems.forEach((item, i) => {
        gsap.set(item, { transformPerspective: 1200, transformOrigin: "50% 0%", rotateX: 0, z: 0 });
        gsap.from(item, {
          z: -(150 + i * 60),
          rotateX: 12,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "top 55%",
            scrub: 1.5,
          },
        });
      });

    });

    return () => {
      // Remove hero mouse listeners before GSAP context revert
      const hero = document.getElementById("hero");
      if (hero) {
        if (heroMoveHandler) hero.removeEventListener("mousemove", heroMoveHandler);
        if (heroLeaveHandler) hero.removeEventListener("mouseleave", heroLeaveHandler);
      }
      ctx.revert();
    };
  }, []);

  return null;
}
