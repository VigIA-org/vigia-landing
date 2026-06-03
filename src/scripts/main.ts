import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ─────────────── GLOBAL DEFAULTS ───────────────
gsap.defaults({ duration: 0.8, ease: "power3.out" });

document.addEventListener("DOMContentLoaded", () => {
  initHeroCanvas();
  initCursor();
  initLanguageToggle();
  initMobileMenu();
  initSmoothScroll();
  initScrollProgress();
  initCinematicAnimations();
  window.addEventListener("load", () => ScrollTrigger.refresh());
});

// ═══════════════════════════════════════════════
// SMOOTH SCROLL — Anchor navigation with GSAP
// ═══════════════════════════════════════════════
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href")!);
      if (!target) return;

      gsap.to(window, {
        scrollTo: { y: target, offsetY: 80 },
        duration: 1.2,
        ease: "power3.inOut",
      });
    });
  });
}

// ═══════════════════════════════════════════════
// SCROLL PROGRESS BAR
// ═══════════════════════════════════════════════
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  gsap.to(bar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
    },
  });
}

// ═══════════════════════════════════════════════
// CINEMATIC ANIMATIONS — Master orchestrator
// ═══════════════════════════════════════════════
function initCinematicAnimations() {
  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { isDesktop, reduceMotion } = (context.conditions as gsap.Conditions) || {};

      if (reduceMotion) {
        gsap.set(".section-panel", { autoAlpha: 1 });
        gsap.set(".reveal-line, .reveal-char", { autoAlpha: 1, clipPath: "none" });
        return;
      }

      heroEntrance();
      navbarCinematic();
      sectionReveals(isDesktop);
      statCountUp();
      cardTilt(isDesktop);
      magneticButtons();
      contactReveal();
    }
  );
}

// ═══════════════════════════════════════════════
// HERO ENTRANCE — Cinematic reveal sequence
// ═══════════════════════════════════════════════
function heroEntrance() {
  const tl = gsap.timeline({ delay: 0.2 });

  // Canvas fade + scale
  tl.from("#hero-canvas", {
    autoAlpha: 0,
    scale: 1.1,
    duration: 1.5,
    ease: "power2.out",
  });

  // Status badge — tactical pop
  tl.from(
    "#hero .pulse-dot",
    { scale: 0, duration: 0.5, ease: "back.out(3)" },
    "-=1"
  );
  tl.from(
    "#hero .pulse-dot + span",
    { autoAlpha: 0, x: -30, duration: 0.4, ease: "power2.out" },
    "-=0.3"
  );

  // Tagline — slide + fade
  tl.from(
    "#hero p:first-of-type",
    { autoAlpha: 0, y: 25, letterSpacing: "0.6em", duration: 0.6, ease: "power2.out" },
    "-=0.1"
  );

  // Headlines — cinematic clip-path reveal from bottom
  const lines = ["#hero-line-1", "#hero-line-2", "#hero-line-3", "#hero-line-4"];
  lines.forEach((sel, i) => {
    tl.from(
      sel,
      {
        autoAlpha: 0,
        y: 60,
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 0.7,
        ease: "power3.out",
      },
      i === 0 ? "-=0.2" : "-=0.45"
    );
  });

  // Subtitle — fade up
  tl.from(
    "#hero-sub",
    { autoAlpha: 0, y: 30, duration: 0.5, ease: "power2.out" },
    "-=0.2"
  );

  // CTA — scale + glow entrance
  tl.from(
    "#hero-cta",
    {
      autoAlpha: 0,
      y: 20,
      scale: 0.9,
      duration: 0.5,
      ease: "back.out(1.7)",
    },
    "-=0.15"
  );

  // HUD corners — fade in
  tl.from(
    "#hero .absolute.top-24",
    { autoAlpha: 0, x: 20, duration: 0.4 },
    "-=0.3"
  );
}

// ═══════════════════════════════════════════════
// NAVBAR — Cinematic scroll behavior
// ═══════════════════════════════════════════════
function navbarCinematic() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  // Scroll-based transform
  ScrollTrigger.create({
    trigger: "#hero",
    start: "bottom top",
    onEnter: () => {
      gsap.to(navbar, {
        backgroundColor: "rgba(14,14,16,0.97)",
        borderBottomColor: "rgba(0,85,255,0.2)",
        duration: 0.4,
        ease: "power2.out",
      });
    },
    onLeaveBack: () => {
      gsap.to(navbar, {
        backgroundColor: "rgba(14,14,16,0.8)",
        borderBottomColor: "rgba(0,85,255,0.06)",
        duration: 0.4,
        ease: "power2.out",
      });
    },
  });

  // Active section highlight
  const sections = ["#engine", "#integration", "#contact"];
  sections.forEach((id) => {
    ScrollTrigger.create({
      trigger: id,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        if (self.isActive) {
          document.querySelectorAll(".nav-link").forEach((link) => {
            const isMatch = link.getAttribute("href") === id;
            gsap.to(link, {
              color: isMatch ? "#0055FF" : "#5a6a7a",
              duration: 0.3,
            });
          });
        }
      },
    });
  });
}

// ═══════════════════════════════════════════════
// SECTION REVEALS — Cinematic 3D depth transitions
// ═══════════════════════════════════════════════
function sectionReveals(isDesktop: boolean) {
  const sections = gsap.utils.toArray<HTMLElement>(".section-panel:not(#hero)");

  sections.forEach((section) => {
    // Section label (the "// SECTION" mono text)
    const label = section.querySelector(".font-mono.text-cobalt, .font-mono.text-emerald");
    // Section heading
    const heading = section.querySelector("h2");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: isDesktop ? "top 80%" : "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    if (isDesktop) {
      // Section — cinematic 3D entrance
      tl.from(section, {
        scale: 0.88,
        autoAlpha: 0,
        rotationX: 4,
        transformOrigin: "center bottom",
        duration: 1,
      });

      // Label — slide from left + clip
      if (label) {
        tl.from(
          label,
          {
            autoAlpha: 0,
            x: -40,
            clipPath: "inset(0% 100% 0% 0%)",
            duration: 0.5,
          },
          "-=0.6"
        );
      }

      // Heading — dramatic clip reveal
      if (heading) {
        tl.from(
          heading,
          {
            autoAlpha: 0,
            y: 50,
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }
    } else {
      // Mobile — clean fade up
      tl.from(section, {
        autoAlpha: 0,
        y: 50,
        duration: 0.8,
      });

      if (heading) {
        tl.from(heading, { autoAlpha: 0, y: 30, duration: 0.5 }, "-=0.4");
      }
    }
  });

  // Stat cards — dramatic count-up reveal
  ScrollTrigger.batch(".stat-card", {
    onEnter: (elements) => {
      gsap.from(elements, {
        autoAlpha: 0,
        y: 80,
        scale: 0.85,
        rotationX: 10,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    start: "top 85%",
    once: true,
  });

  // Feature cards — slide from left stagger
  ScrollTrigger.batch(".feat-card", {
    onEnter: (elements) => {
      gsap.from(elements, {
        autoAlpha: 0,
        x: -60,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
      });
    },
    start: "top 85%",
    once: true,
  });

  // Flow steps — scale + fade stagger
  ScrollTrigger.batch(".flow-step", {
    onEnter: (elements) => {
      gsap.from(elements, {
        autoAlpha: 0,
        scale: 0.8,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.4)",
      });
    },
    start: "top 85%",
    once: true,
  });

  // Integration cards — slide up
  ScrollTrigger.batch(".integ-card", {
    onEnter: (elements) => {
      gsap.from(elements, {
        autoAlpha: 0,
        y: 60,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    start: "top 85%",
    once: true,
  });
}

// ═══════════════════════════════════════════════
// STAT COUNT UP — Animate numbers on scroll
// ═══════════════════════════════════════════════
function statCountUp() {
  const statNums = document.querySelectorAll<HTMLElement>(".stat-card .text-4xl");

  statNums.forEach((el) => {
    const raw = el.textContent?.trim() || "";
    // Extract prefix, number, suffix
    const match = raw.match(/^([^\d]*?)([\d.]+)(.*)$/);
    if (!match) return;

    const prefix = match[1];
    const num = parseFloat(match[2]);
    const suffix = match[3];
    const hasDecimal = match[2].includes(".");
    const decimalPlaces = hasDecimal ? match[2].split(".")[1].length : 0;

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: num,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = prefix + obj.val.toFixed(decimalPlaces) + suffix;
          },
        });
      },
    });
  });
}

// ═══════════════════════════════════════════════
// CARD TILT — 3D perspective on hover
// ═══════════════════════════════════════════════
function cardTilt(isDesktop: boolean) {
  if (!isDesktop) return;

  document.querySelectorAll<HTMLElement>(".glass-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotationY: x * 8,
        rotationX: -y * 8,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    });
  });
}

// ═══════════════════════════════════════════════
// MAGNETIC BUTTONS — CTA cursor attraction
// ═══════════════════════════════════════════════
function magneticButtons() {
  document.querySelectorAll<HTMLElement>("#hero-cta, #contact-cta").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
      });
    });
  });
}

// ═══════════════════════════════════════════════
// CONTACT REVEAL — Cinematic CTA
// ═══════════════════════════════════════════════
function contactReveal() {
  const contact = document.getElementById("contact");
  if (!contact) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: contact,
      start: "top 70%",
      once: true,
    },
  });

  tl.from("#contact-cta", {
    autoAlpha: 0,
    y: 40,
    scale: 0.85,
    duration: 0.7,
    ease: "back.out(1.7)",
  });
}

// ═══════════════════════════════════════════════
// HERO CANVAS — Animated particle grid
// ═══════════════════════════════════════════════
function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas") as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  if (!ctx) return;

  let particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
  let animationId: number;

  function resize() {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    initParticles();
  }

  function initParticles() {
    particles = [];
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const count = Math.min(80, Math.floor((w * h) / 15000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }
  }

  function draw() {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,85,255,${0.08 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,85,255,${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }

    animationId = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", () => {
    cancelAnimationFrame(animationId);
    resize();
    draw();
  });
}

// ═══════════════════════════════════════════════
// CUSTOM CURSOR (gsap.quickTo for performance)
// ═══════════════════════════════════════════════
function initCursor() {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor || window.innerWidth < 769) return;

  const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

  document.addEventListener("mousemove", (e) => {
    xTo(e.clientX - 20);
    yTo(e.clientY - 20);
  });

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(cursor, { scale: 1.8, opacity: 0.6, duration: 0.25 });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.25 });
    });
  });
}

// ═══════════════════════════════════════════════
// LANGUAGE TOGGLE (ES / EN)
// ═══════════════════════════════════════════════
function initLanguageToggle() {
  const btnEs = document.getElementById("btn-es");
  const btnEn = document.getElementById("btn-en");
  if (!btnEs || !btnEn) return;

  let currentLang = "es";

  function switchLang(lang: string) {
    if (lang === currentLang) return;
    currentLang = lang;

    const updateDOM = () => {
      btnEs!.classList.toggle("active", lang === "es");
      btnEn!.classList.toggle("active", lang === "en");
      document.documentElement.lang = lang;

      document.querySelectorAll(".i18n, .nav-link").forEach((el) => {
        const text = el.getAttribute(`data-i18n-${lang}`);
        if (text) el.textContent = text;
      });
    };

    if (document.startViewTransition) {
      document.startViewTransition(() => updateDOM());
    } else {
      updateDOM();
    }
  }

  btnEs.addEventListener("click", () => switchLang("es"));
  btnEn.addEventListener("click", () => switchLang("en"));
}

// ═══════════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════════
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  let open = false;

  btn.addEventListener("click", () => {
    open = !open;
    btn.setAttribute("aria-expanded", String(open));
    if (open) {
      menu.classList.remove("hidden");
      menu.classList.add("flex");
      gsap.from(menu.children, {
        autoAlpha: 0,
        x: -30,
        stagger: 0.06,
        duration: 0.35,
        ease: "power2.out",
      });
    } else {
      gsap.to(menu.children, {
        autoAlpha: 0,
        x: -30,
        stagger: 0.03,
        duration: 0.25,
        onComplete: () => {
          menu.classList.add("hidden");
          menu.classList.remove("flex");
          gsap.set(menu.children, { clearProps: "all" });
        },
      });
    }
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      open = false;
      menu.classList.add("hidden");
      menu.classList.remove("flex");
    });
  });
}
