import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Brain, Code2, Database, Github, Linkedin, Network, Smartphone, BarChart3, Trophy, GraduationCap } from "lucide-react";
import portrait from "@/assets/salah-portrait.webp";
import NeuralCanvas from "../fx/NeuralCanvas";
import { Magnetic } from "../fx";
import { scrollToId } from "./Navigation";

const ROLES = ["I build ML models.", "I build data pipelines.", "I build web and mobile apps.", "I do research on GNNs."];

const ORBIT = [
  { icon: Brain, label: "PyTorch" },
  { icon: Network, label: "GNNs" },
  { icon: Database, label: "SQL / DW" },
  { icon: BarChart3, label: "Power BI" },
  { icon: Smartphone, label: "Flutter" },
  { icon: Code2, label: "React" },
];

const TypeRole = () => {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = ROLES[i];
    const t = setTimeout(() => {
      if (!del) {
        const n = full.slice(0, txt.length + 1);
        setTxt(n);
        if (n === full) setTimeout(() => setDel(true), 1600);
      } else {
        const n = full.slice(0, txt.length - 1);
        setTxt(n);
        if (!n) { setDel(false); setI((i + 1) % ROLES.length); }
      }
    }, del ? 35 : 70);
    return () => clearTimeout(t);
  }, [txt, del, i]);
  return (
    <span className="font-mono text-primary">
      {txt}
      <span className="ml-0.5 inline-block w-[2px] h-[1em] translate-y-[3px] bg-primary animate-[caret_1s_steps(1)_infinite]" />
    </span>
  );
};

const line = { hidden: { y: "110%" }, show: (d: number) => ({ y: "0%", transition: { duration: 1, delay: d, ease: [0.22, 1, 0.36, 1] } }) };

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-[100svh] overflow-hidden pt-28 pb-16 lg:pt-24 flex items-center">
      {/* backgrounds */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-bg" />
      <NeuralCanvas className="opacity-70" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full bg-orange-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

      <div className="container relative z-10 mx-auto">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
          {/* TEXT */}
          <motion.div style={{ y: yText, opacity: fade }} className="order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs sm:text-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-muted-foreground">4th-year AI engineer @ <span className="text-foreground font-medium">ENSIA</span> · Data intern @ <span className="text-foreground font-medium">GIBA Group</span></span>
            </motion.div>

            <h1 className="font-display font-bold tracking-tight leading-[0.95] text-[clamp(2.75rem,8vw,6.25rem)]">
              <span className="block overflow-hidden pb-2"><motion.span className="block" variants={line} initial="hidden" animate="show" custom={0.35}>Hi, I'm</motion.span></span>
              <span className="block overflow-hidden pb-2"><motion.span className="block gradient-text" variants={line} initial="hidden" animate="show" custom={0.5}>Salah</motion.span></span>
              <span className="block overflow-hidden pb-3"><motion.span className="block" variants={line} initial="hidden" animate="show" custom={0.65}>Badreddine<span className="text-primary">.</span></motion.span></span>
            </h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-5 text-lg sm:text-2xl h-8 sm:h-9">
              <TypeRole />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7 }}
              className="mx-auto lg:mx-0 mt-5 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed text-balance"
            >
              I'm an AI engineering student in Algiers. Lately I've been working on
              <span className="text-foreground"> federated learning for hospitals</span>, a car rental SaaS, a few mobile apps, and
              <span className="text-foreground"> a data warehouse</span> for the company where I intern.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: 0.7 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <Magnetic>
                <button onClick={() => scrollToId("projects")} className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl gradient-bg px-7 font-semibold text-primary-foreground shadow-glow">
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">Explore my work</span>
                  <ArrowDown className="relative h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </button>
              </Magnetic>
              <Magnetic>
                <button onClick={() => scrollToId("lab")} className="group inline-flex h-12 items-center gap-2 rounded-xl glass px-6 font-medium hover:border-primary/50 transition-colors">
                  Try the FL simulator <ArrowUpRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Magnetic>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.55 }} className="mt-8 flex items-center justify-center lg:justify-start gap-3">
              {[
                { href: "https://github.com/SalahBadreddine", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/salah-badreddine-975890312/", icon: Linkedin, label: "LinkedIn" },
              ].map((s) => (
                <Magnetic key={s.label} strength={0.5}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-xl glass text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                    <s.icon className="h-5 w-5" />
                  </a>
                </Magnetic>
              ))}
              <span className="ml-2 hidden sm:inline font-mono text-xs text-muted-foreground">Algiers, DZ · UTC+1</span>
            </motion.div>
          </motion.div>

          {/* PORTRAIT */}
          <motion.div style={{ y: yImg }} className="order-1 lg:order-2 relative mx-auto w-full max-w-[264px] min-[400px]:max-w-[300px] sm:max-w-[400px] lg:max-w-[480px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square"
              style={{ containerType: "inline-size" }}
            >
              {/* orbit rings */}
              <div className="absolute inset-[-6%] rounded-full border border-dashed border-primary/25 animate-orbit" />
              <div className="absolute inset-[6%] rounded-full border border-primary/10" />
              {/* orbiting chips */}
              <div className="absolute inset-[-6%] animate-orbit" style={{ animationDuration: "40s" }}>
                {ORBIT.map((o, i) => {
                  const a = (i / ORBIT.length) * Math.PI * 2;
                  return (
                    <div key={o.label} className="absolute left-1/2 top-1/2" style={{ transform: `translate(-50%,-50%) translate(${Math.cos(a) * 56}cqw, ${Math.sin(a) * 56}cqw)` }}>
                      <div className="animate-orbit-rev" style={{ animationDuration: "40s" }}>
                        <div className="flex items-center gap-1.5 rounded-full glass-strong px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium whitespace-nowrap shadow-card">
                          <o.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" /> {o.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* disc + pop-out photo */}
              <div className="absolute inset-[10.5%] rounded-full bg-[conic-gradient(from_200deg,#ff9a3d,#FD6F00,#7a2e00,#c24f00,#ff9a3d)] animate-orbit opacity-90 blur-[3px]" />
              <div className="absolute inset-[12%] rounded-full bg-gradient-to-b from-[#ff8a1f] via-[#e85f00] to-[#5a2200] shadow-[0_0_120px_-10px_rgba(253,111,0,0.65),inset_0_-30px_60px_rgba(0,0,0,0.35)]" />
              <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.28),transparent_50%)]" />
              <div className="absolute inset-[12%] rounded-full grid-bg opacity-30 mix-blend-overlay" />
              <div className="absolute inset-x-[12%] bottom-[12%] top-[-8%] overflow-hidden" style={{ borderRadius: "0 0 38cqw 38cqw" }}>
                <img
                  src={portrait}
                  alt="Portrait of Salah Badreddine"
                  className="absolute bottom-0 left-1/2 w-[110%] max-w-none -translate-x-1/2 drop-shadow-[0_18px_30px_rgba(0,0,0,0.5)]"
                />
              </div>
              <div className="pointer-events-none absolute inset-[12%] rounded-full ring-1 ring-inset ring-white/15" />

              {/* floating badges */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.8 }}
                className="absolute z-20 -left-4 sm:-left-6 bottom-[0%] sm:bottom-[4%] animate-float">
                <div className="flex items-center gap-3 rounded-2xl glass-strong p-2.5 sm:p-3 pr-4 shadow-card">
                  <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl gradient-bg"><Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" /></div>
                  <div className="text-left leading-tight">
                    <div className="font-display text-sm sm:text-base font-bold">20+ projects</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">AI · web · mobile · data</div>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6, duration: 0.8 }}
                className="absolute z-20 hidden sm:block -right-4 top-[6%] animate-float" style={{ animationDelay: "-2.5s" }}>
                <div className="flex items-center gap-3 rounded-2xl glass-strong p-2.5 sm:p-3 pr-4 shadow-card">
                  <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl bg-emerald-500/15 border border-emerald-400/30"><GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" /></div>
                  <div className="text-left leading-tight">
                    <div className="font-display text-sm sm:text-base font-bold">AI Engineering</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">4th year · ENSIA</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={() => scrollToId("about")}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground hover:text-primary md:flex"
        aria-label="Scroll down"
      >
        Scroll
        <span className="relative h-10 w-6 rounded-full border border-muted-foreground/40">
          <motion.span className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-primary" animate={{ y: [0, 14, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} />
        </span>
      </motion.button>
    </section>
  );
};

export default HeroSection;
