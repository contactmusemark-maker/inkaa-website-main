import { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";

const PARTICLE_COUNT = 16;
const LERP = 0.055;
const VIEWPORT_BUFFER = 1.25;
const supportsHoverPointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function isUsableCard(el: Element) {
  const rect = el.getBoundingClientRect();
  const text = (el.textContent || "").trim();

  return rect.width >= 130 && rect.height >= 110 && text.length > 0;
}

function isInsideCustomScene(el: Element) {
  return Boolean(el.closest("#services, #process, #hero, nav, [data-service-card]"));
}

export default function AnimeCinematicEffects() {
  useEffect(() => {
    const shouldReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldUseLightMotion = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;

    if (shouldReduce || shouldUseLightMotion) {
      return;
    }

    const style = document.createElement("style");
    style.dataset.animeCinematicEffects = "true";
    style.textContent = `
      .anime-atmosphere {
        pointer-events: none;
        position: fixed;
        inset: 0;
        z-index: 34;
        overflow: hidden;
        mix-blend-mode: screen;
      }

      .anime-particle {
        position: absolute;
        width: 3px;
        height: 3px;
        border-radius: 999px;
        opacity: 0;
        background: rgba(214, 66, 56, .52);
        box-shadow: 0 0 14px rgba(214, 66, 56, .28);
        will-change: transform, opacity;
      }

      .anime-glint {
        position: absolute;
        left: -20vw;
        width: 18vw;
        height: 1px;
        opacity: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.24), rgba(214,66,56,.26), transparent);
        will-change: transform, opacity;
      }

      .anime-motion-section {
        isolation: isolate;
        transform-style: preserve-3d;
        perspective: 1400px;
        --anime-depth-y: 0px;
        --anime-depth-scale: 1;
      }

      .anime-scene-ambient {
        pointer-events: none;
        position: absolute;
        inset: -18% -10%;
        z-index: 0;
        opacity: 0;
        transform: translate3d(0, var(--anime-ambient-y, 0px), 0) scale(1.04);
        background:
          radial-gradient(circle at 16% 18%, rgba(214,66,56,.09), transparent 30%),
          radial-gradient(circle at 76% 72%, rgba(255,255,255,.055), transparent 29%),
          linear-gradient(180deg, transparent, rgba(214,66,56,.026), transparent);
        will-change: transform, opacity;
      }

      .anime-transition-veil {
        pointer-events: none;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1px;
        z-index: 1;
        height: 150px;
        opacity: .28;
        background: linear-gradient(0deg, rgba(0,0,0,.14), transparent);
      }

      .anime-depth-card {
        transform-style: preserve-3d;
        will-change: transform, opacity, filter, box-shadow;
      }

      .anime-depth-card img {
        will-change: transform;
      }

      .anime-magnetic-ready {
        will-change: transform;
      }

      .anime-click-pulse {
        pointer-events: none;
        position: fixed;
        left: 0;
        top: 0;
        width: 14px;
        height: 14px;
        z-index: 9998;
        border-radius: 999px;
        border: 1px solid rgba(214, 66, 56, .9);
        box-shadow: 0 0 24px rgba(214, 66, 56, .45);
        transform: translate3d(-50%, -50%, 0);
        will-change: transform, opacity;
      }

      @media (max-width: 767px), (prefers-reduced-motion: reduce) {
        .anime-atmosphere,
        .anime-scene-ambient,
        .anime-transition-veil {
          display: none;
        }
      }
    `;

    const layer = document.createElement("div");
    layer.className = "anime-atmosphere";
    layer.setAttribute("aria-hidden", "true");

    const particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
      const particle = document.createElement("span");
      particle.className = "anime-particle";
      particle.style.left = `${6 + ((index * 37) % 88)}vw`;
      particle.style.top = `${7 + ((index * 53) % 84)}vh`;
      layer.appendChild(particle);
      return particle;
    });

    const glints = Array.from({ length: 4 }, (_, index) => {
      const glint = document.createElement("span");
      glint.className = "anime-glint";
      glint.style.top = `${16 + index * 21}vh`;
      layer.appendChild(glint);
      return glint;
    });

    document.head.appendChild(style);
    document.body.appendChild(layer);

    const particleAnimation = anime({
      targets: particles,
      translateX: () => anime.random(-26, 26),
      translateY: () => anime.random(-32, 32),
      scale: () => [anime.random(58, 100) / 100, anime.random(115, 180) / 100],
      opacity: [
        { value: 0, duration: 0 },
        { value: () => anime.random(6, 18) / 100, duration: 2600 },
        { value: 0, duration: 2600 },
      ],
      easing: "easeInOutSine",
      duration: () => anime.random(8200, 13200),
      delay: anime.stagger(260),
      direction: "alternate",
      loop: true,
    });

    const glintAnimation = anime({
      targets: glints,
      translateX: "140vw",
      opacity: [
        { value: 0, duration: 0 },
        { value: 0.1, duration: 1400 },
        { value: 0, duration: 1800 },
      ],
      easing: "easeInOutQuad",
      duration: 9800,
      delay: anime.stagger(2600),
      loop: true,
    });

    const allSections = Array.from(document.querySelectorAll<HTMLElement>("section, footer")).filter(
      (section) => section.id !== "hero-sentinel" && section.id !== "hero",
    );
    const sections = allSections.filter((section) => !isInsideCustomScene(section));

    const ambientLayers: HTMLElement[] = [];
    const veils: HTMLElement[] = [];

    sections.forEach((section) => {
      section.classList.add("anime-motion-section");

      if (getComputedStyle(section).position === "static") {
        section.style.position = "relative";
      }

      anime.set(section, {
        opacity: 0.86,
        translateY: 22,
        scale: 0.996,
        filter: "blur(3px)",
      });

      const ambient = document.createElement("div");
      ambient.className = "anime-scene-ambient";
      section.prepend(ambient);
      ambientLayers.push(ambient);

      const veil = document.createElement("div");
      veil.className = "anime-transition-veil";
      section.append(veil);
      veils.push(veil);
    });

    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("section h1, section h2, section h3, section h4, footer h2, footer h3"),
    ).filter((heading) => !isInsideCustomScene(heading));

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>('[class*="rounded-2xl"], [class*="rounded-3xl"], [class*="rounded-[1.75rem]"], [class*="rounded-[2rem]"], [class*="rounded-[3rem]"]'),
    ).filter((card) => !isInsideCustomScene(card) && !card.closest(".about-img-3d") && isUsableCard(card));

    cards.forEach((card) => {
      card.classList.add("anime-depth-card");
      anime.set(card, { opacity: 0.82, translateY: 18, scale: 0.994, filter: "blur(2.5px)" });
    });

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const section = entry.target as HTMLElement;
          const localAmbient = section.querySelector(".anime-scene-ambient");
          const localHeadings = headings.filter((heading) => section.contains(heading));
          const localCards = cards.filter((card) => section.contains(card));

          const timeline = anime.timeline({
            easing: "easeOutExpo",
            duration: 1080,
          });

          timeline
            .add(
              {
                targets: section,
                opacity: 1,
                translateY: 0,
                scale: 1,
                filter: "blur(0px)",
              },
              0,
            )
            .add(
              {
                targets: localAmbient,
                opacity: [0, 1],
                scale: [1.01, 1.045],
                duration: 1450,
              },
              120,
            )
            .add(
              {
                targets: localHeadings,
                opacity: [0.16, 1],
                translateY: [20, 0],
                filter: ["blur(4px)", "blur(0px)"],
                delay: anime.stagger(64),
                duration: 960,
              },
              160,
            )
            .add(
              {
                targets: localCards,
                opacity: [0.8, 1],
                translateY: [18, 0],
                scale: [0.994, 1],
                filter: ["blur(2.5px)", "blur(0px)"],
                boxShadow: ["0 8px 30px rgba(0,0,0,.08)", "0 22px 64px rgba(0,0,0,.18)"],
                delay: anime.stagger(72, { grid: [localCards.length || 1, 1], from: "center" }),
                duration: 980,
              },
              300,
            );

          sectionObserver.unobserve(section);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    sections.forEach((section) => sectionObserver.observe(section));

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement;
          card.dataset.animeActive = entry.isIntersecting ? "true" : "false";

          anime({
            targets: card,
            opacity: entry.isIntersecting ? 1 : 0.72,
            scale: entry.isIntersecting ? 1 : 0.994,
            filter: entry.isIntersecting ? "blur(0px)" : "blur(1.2px)",
            easing: "easeOutQuad",
            duration: 620,
          });
        });
      },
      { threshold: 0.34 },
    );

    cards.forEach((card) => cardObserver.observe(card));

    const numberElements = Array.from(document.querySelectorAll<HTMLElement>("section, footer"))
      .flatMap((root) => Array.from(root.querySelectorAll<HTMLElement>("p, span, h2, h3, h4")))
      .filter(
        (el) =>
          /\d/.test(el.textContent || "") &&
          !isInsideCustomScene(el) &&
          !el.closest("form, nav, a, button") &&
          (el.textContent || "").trim().length <= 18,
      );

    const numberObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const el = entry.target as HTMLElement;
          const original = el.textContent || "";
          const match = original.match(/(\d+)/);

          if (!match) {
            numberObserver.unobserve(el);
            return;
          }

          const target = Number(match[1]);
          const state = { value: 0 };

          anime({
            targets: state,
            value: target,
            round: 1,
            easing: "easeOutExpo",
            duration: 1050,
            update: () => {
              el.textContent = original.replace(match[1], String(state.value));
            },
            complete: () => {
              el.textContent = original;
            },
          });

          numberObserver.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );

    numberElements.forEach((el) => numberObserver.observe(el));

    const magneticItems = supportsHoverPointer()
      ? Array.from(document.querySelectorAll<HTMLElement>("a, button, [role='button']")).filter(
          (el) => !el.closest("#services") && el.getBoundingClientRect().width <= 260,
        )
      : [];

    magneticItems.forEach((item) => {
      item.classList.add("anime-magnetic-ready");
    });

    let magneticFrame = 0;
    let magneticEvent: PointerEvent | null = null;

    const updateMagneticItems = () => {
      magneticFrame = 0;
      const event = magneticEvent;

      if (!event) {
        return;
      }

      magneticItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        const distance = Math.hypot(x, y);

        if (distance > 84) {
          if (item.dataset.magneticActive === "true") {
            item.dataset.magneticActive = "false";
            anime.remove(item);
            anime({ targets: item, translateX: 0, translateY: 0, scale: 1, duration: 580, easing: "easeOutExpo" });
          }
          return;
        }

        item.dataset.magneticActive = "true";
        anime.set(item, {
          translateX: x * 0.095,
          translateY: y * 0.095,
          scale: 1.008,
        });
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      magneticEvent = event;

      if (!magneticFrame) {
        magneticFrame = window.requestAnimationFrame(updateMagneticItems);
      }
    };

    const handlePointerLeave = () => {
      magneticItems.forEach((item) => {
        item.dataset.magneticActive = "false";
        anime.remove(item);
        anime({ targets: item, translateX: 0, translateY: 0, scale: 1, duration: 620, easing: "easeOutExpo" });
      });
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest("a, button, [role='button'], input, textarea, select")) {
        return;
      }

      const pulse = document.createElement("span");
      pulse.className = "anime-click-pulse";
      pulse.style.left = `${event.clientX}px`;
      pulse.style.top = `${event.clientY}px`;
      document.body.appendChild(pulse);

      anime({
        targets: pulse,
        scale: [0.35, 4.8],
        opacity: [0.62, 0],
        easing: "easeOutExpo",
        duration: 760,
        complete: () => pulse.remove(),
      });
    };

    if (magneticItems.length) {
      document.addEventListener("pointermove", handlePointerMove, { passive: true });
    }
    document.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("click", handleClick, true);

    let frame = 0;
    let scrollCurrent = 0;
    let scrollTarget = 0;
    let mouseCurrentX = 0;
    let mouseCurrentY = 0;
    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let isPageVisible = !document.hidden;

    const handleCameraPointer = (event: PointerEvent) => {
      mouseTargetX = event.clientX / window.innerWidth - 0.5;
      mouseTargetY = event.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("pointermove", handleCameraPointer, { passive: true });

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const updateScrollMotion = () => {
      if (!isPageVisible) {
        frame = window.requestAnimationFrame(updateScrollMotion);
        return;
      }

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollTarget = window.scrollY / maxScroll;
      scrollCurrent += (scrollTarget - scrollCurrent) * LERP;
      mouseCurrentX += (mouseTargetX - mouseCurrentX) * 0.045;
      mouseCurrentY += (mouseTargetY - mouseCurrentY) * 0.045;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < -window.innerHeight * VIEWPORT_BUFFER || rect.top > window.innerHeight * (1 + VIEWPORT_BUFFER)) {
          return;
        }

        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        const ambient = section.querySelector<HTMLElement>(".anime-scene-ambient");

        if (ambient) {
          ambient.style.setProperty("--anime-ambient-y", `${(clamped - 0.5) * (index % 2 === 0 ? -22 : 22)}px`);
        }
      });

      cards.forEach((card, index) => {
        if (card.dataset.animeActive !== "true") {
          return;
        }

        const rect = card.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const depth = (center - window.innerHeight / 2) / window.innerHeight;
        const image = card.querySelector<HTMLImageElement>("img");

        anime.set(card, {
          rotateX: depth * -1.4 + mouseCurrentY * -1.1,
          rotateY: mouseCurrentX * 1.7,
          translateZ: Math.max(-8, Math.min(14, (0.42 - Math.abs(depth)) * 18)),
        });

        if (image && !image.closest("#services")) {
          anime.set(image, {
            translateY: depth * -10 + (index % 2 === 0 ? -2 : 2),
            scale: 1.035,
          });
        }
      });

      frame = window.requestAnimationFrame(updateScrollMotion);
    };

    frame = window.requestAnimationFrame(updateScrollMotion);

    return () => {
      window.cancelAnimationFrame(frame);
      if (magneticFrame) {
        window.cancelAnimationFrame(magneticFrame);
      }
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("pointermove", handleCameraPointer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      sectionObserver.disconnect();
      cardObserver.disconnect();
      numberObserver.disconnect();
      particleAnimation.pause();
      glintAnimation.pause();
      anime.remove([...sections, ...headings, ...cards, ...magneticItems, ...particles, ...glints]);
      layer.remove();
      style.remove();
      ambientLayers.forEach((ambient) => ambient.remove());
      veils.forEach((veil) => veil.remove());
      document.querySelectorAll(".anime-click-pulse").forEach((pulse) => pulse.remove());
    };
  }, []);

  return null;
}
