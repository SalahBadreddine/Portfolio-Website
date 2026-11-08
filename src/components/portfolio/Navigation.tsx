import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Journey" },
  { id: "lab", label: "Lab" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - (id === "home" ? 0 : 72);
  window.scrollTo({ top: y, behavior: "smooth" });
};

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id: string) => { setOpen(false); setTimeout(() => scrollToId(id), open ? 250 : 0); };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5 pt-3"
      >
        <nav
          className={cn(
            "mx-auto flex h-14 max-w-[1240px] items-center justify-between rounded-2xl px-4 sm:px-5 transition-all duration-500",
            scrolled ? "glass-strong shadow-card" : "bg-transparent border border-transparent"
          )}
        >
          <button onClick={() => go("home")} className="font-display text-lg font-bold tracking-tight group" aria-label="Home">
            <span className="text-muted-foreground group-hover:text-primary transition-colors">&lt;</span>
            <span className="gradient-text">Salah</span>
            <span className="text-muted-foreground group-hover:text-primary transition-colors"> /&gt;</span>
          </button>

          <ul className="hidden md:flex items-center gap-1 rounded-full p-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => go(n.id)}
                  className={cn("relative rounded-full px-4 py-1.5 text-sm transition-colors", active === n.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
                >
                  {active === n.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full gradient-bg" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                  )}
                  <span className="relative z-10 font-medium">{n.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToId("contact")}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-primary/40 px-3.5 py-1.5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Mail className="h-4 w-4" /> Let's talk
            </button>
            <button onClick={() => setOpen((o) => !o)} className="md:hidden grid h-10 w-10 place-items-center rounded-xl glass" aria-label="Toggle menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-xl"
            initial={{ clipPath: "circle(0% at 92% 40px)" }}
            animate={{ clipPath: "circle(150% at 92% 40px)" }}
            exit={{ clipPath: "circle(0% at 92% 40px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 grid-bg opacity-60" />
            <ul className="relative flex h-full flex-col justify-center gap-2 px-8">
              {NAV.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.06 }}>
                  <button onClick={() => go(n.id)} className="flex items-baseline gap-4 py-2 font-display text-4xl font-bold">
                    <span className="font-mono text-sm text-primary">0{i + 1}</span>
                    <span className={active === n.id ? "gradient-text" : ""}>{n.label}</span>
                  </button>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8">
                <button onClick={() => go("contact")} className="inline-flex items-center gap-2 rounded-xl gradient-bg px-5 py-3 font-medium text-primary-foreground">
                  <Mail className="h-4 w-4" /> Let's talk
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
