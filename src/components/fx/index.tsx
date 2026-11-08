import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform, animate } from "framer-motion";
import { ReactNode, useEffect, useRef, useState, MouseEvent as RMouseEvent, CSSProperties } from "react";
import { cn } from "@/lib/utils";

/* ---------- Reveal on scroll ---------- */
export const Reveal = ({
  children, delay = 0, y = 32, x = 0, className, once = true, as = "div",
}: { children: ReactNode; delay?: number; y?: number; x?: number; className?: string; once?: boolean; as?: "div" | "li" | "span" }) => {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, x, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
};

/* ---------- Word-by-word heading reveal ---------- */
export const SplitWords = ({ text, className, delay = 0, highlight = [] as string[] }: { text: string; className?: string; delay?: number; highlight?: string[] }) => {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]" aria-hidden>
          <motion.span
            className={cn("inline-block", highlight.includes(w.replace(/[.,!?]/g, "")) && "gradient-text")}
            initial={{ y: "110%", rotate: 4 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ---------- Section header ---------- */
export const SectionHeader = ({ eyebrow, title, highlight, subtitle, align = "center" }: { eyebrow: string; title: string; highlight: string[]; subtitle?: string; align?: "center" | "left" }) => (
  <div className={cn("mb-12 md:mb-16", align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl")}>
    <Reveal><span className="section-eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />{eyebrow}</span></Reveal>
    <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mt-5 mb-5 leading-[1.05]">
      <SplitWords text={title} highlight={highlight} />
    </h2>
    {subtitle && (
      <Reveal delay={0.15}>
        <p className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed">{subtitle}</p>
      </Reveal>
    )}
  </div>
);

/* ---------- Animated counter ---------- */
export const Counter = ({ to, decimals = 0, suffix = "", prefix = "", duration = 1.8 }: { to: number; decimals?: number; suffix?: string; prefix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(v) });
    return () => c.stop();
  }, [inView, to, duration]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
};

/* ---------- Magnetic wrapper ---------- */
export const Magnetic = ({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.3 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.3 });
  const onMove = (e: RMouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x, y }} className={cn("inline-block", className)}>
      {children}
    </motion.div>
  );
};

/* ---------- 3D tilt + spotlight card ---------- */
export const TiltCard = ({ children, className, max = 8, style }: { children: ReactNode; className?: string; max?: number; style?: CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  const onMove = (e: RMouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (window.matchMedia("(hover: hover)").matches) {
      ry.set((px - 0.5) * max * 2);
      rx.set(-(py - 0.5) * max * 2);
    }
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, ...style }}
      className={cn("spotlight will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
};

/* ---------- Infinite marquee ---------- */
export const Marquee = ({ children, reverse = false, speed = 40, className }: { children: ReactNode; reverse?: boolean; speed?: number; className?: string }) => (
  <div className={cn("relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]", className)}>
    <div
      className="flex w-max animate-marquee hover:[animation-play-state:paused]"
      style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
    >
      <div className="flex shrink-0 gap-4 pr-4">{children}</div>
      <div className="flex shrink-0 gap-4 pr-4" aria-hidden>{children}</div>
    </div>
  </div>
);

/* ---------- Scroll progress bar ---------- */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[70] gradient-bg" style={{ scaleX }} />;
};

/* ---------- Cursor glow (desktop only) ---------- */
export const CursorGlow = () => {
  const x = useSpring(-500, { stiffness: 300, damping: 40 });
  const y = useSpring(-500, { stiffness: 300, damping: 40 });
  const dx = useSpring(-500, { stiffness: 1200, damping: 60 });
  const dy = useSpring(-500, { stiffness: 1200, damping: 60 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;
    const mv = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY); dx.set(e.clientX); dy.set(e.clientY);
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a,button,[role=button],input,textarea"));
    };
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, [x, y, dx, dy]);
  if (!enabled) return null;
  return (
    <>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[1] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ x, y, background: "radial-gradient(circle, hsl(25 95% 53% / 0.07), transparent 60%)" }} />
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[80] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70 mix-blend-difference"
        animate={{ width: hovering ? 48 : 22, height: hovering ? 48 : 22, backgroundColor: hovering ? "hsl(25 95% 53% / 0.15)" : "hsl(25 95% 53% / 0)" }}
        transition={{ duration: 0.2 }}
        style={{ x: dx, y: dy }} />
    </>
  );
};

/* ---------- Parallax helper ---------- */
export const Parallax = ({ children, offset = 60, className }: { children: ReactNode; offset?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>;
};
