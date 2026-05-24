import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  const heroItems = gsap.utils.toArray<HTMLElement>("[data-scroll-hero-item]");
  if (heroItems.length) {
    gsap.from(heroItems, {
      autoAlpha: 0,
      y: 40,
      duration: 0.9,
      stagger: 0.11,
      ease: "power3.out",
      delay: 0.35,
    });
  }

  const heroBg = document.querySelector("[data-scroll-hero-bg]");
  if (heroBg) {
    gsap.to(heroBg, {
      y: 80,
      opacity: 0.35,
      ease: "none",
      scrollTrigger: {
        trigger: "#top",
        start: "top top",
        end: "bottom top",
        scrub: 1.4,
      },
    });
  }

  gsap.utils.toArray<HTMLElement>("[data-scroll-header]").forEach((header) => {
    const targets = header.querySelectorAll("[data-scroll-header-item]");
    const elements = targets.length
      ? gsap.utils.toArray<HTMLElement>(targets)
      : [header];

    gsap.from(elements, {
      autoAlpha: 0,
      y: 36,
      duration: 0.85,
      stagger: 0.09,
      ease: "power2.out",
      delay: 0.08,
      scrollTrigger: {
        trigger: header,
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-scroll-group]").forEach((group) => {
    const items = group.querySelectorAll("[data-scroll-item]");
    if (!items.length) return;

    gsap.from(items, {
      autoAlpha: 0,
      y: 48,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.1,
      scrollTrigger: {
        trigger: group,
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-scroll-reveal]").forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 32,
      duration: 0.85,
      ease: "power2.out",
      delay: 0.12,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  const timeline = document.querySelector("[data-scroll-timeline]");
  if (timeline) {
    const track = timeline.querySelector(".vision-timeline-track");
    const trackVertical = timeline.querySelector(
      ".vision-timeline-track-vertical",
    );

    if (track) {
      gsap.from(track, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: timeline,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });
    }

    if (trackVertical) {
      gsap.from(trackVertical, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: timeline,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }

    gsap.utils.toArray<HTMLElement>(".vision-timeline-dot").forEach((dot, i) => {
      gsap.from(dot, {
        scale: 0,
        autoAlpha: 0,
        duration: 0.45,
        delay: i * 0.06,
        ease: "back.out(2.2)",
        scrollTrigger: {
          trigger: timeline,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }

  const footer = document.querySelector("[data-scroll-footer]");
  if (footer) {
    gsap.from(footer, {
      autoAlpha: 0,
      y: 48,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    });
  }
}

export function refreshScrollAnimations() {
  ScrollTrigger.refresh();
}
