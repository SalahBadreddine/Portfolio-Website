import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Preloader = () => {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("sb-loaded")) { setDone(true); return; }
    let v = 0;
    const id = window.setInterval(() => {
      v = Math.min(100, v + Math.random() * 18 + 6);
      setPct(Math.floor(v));
      if (v >= 100) {
        window.clearInterval(id);
        setTimeout(() => { setDone(true); try { sessionStorage.setItem("sb-loaded", "1"); } catch { /* noop */ } }, 250);
      }
    }, 90);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => { document.documentElement.style.overflow = done ? "" : "hidden"; }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 grid-bg" />
          <div className="relative flex flex-col items-center">
            <div className="overflow-hidden">
              <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl sm:text-7xl font-bold tracking-tight">
                <span className="text-muted-foreground">&lt;</span><span className="gradient-text">Salah</span><span className="text-muted-foreground"> /&gt;</span>
              </motion.div>
            </div>
            <div className="mt-6 h-[2px] w-56 overflow-hidden rounded bg-white/10">
              <motion.div className="h-full gradient-bg" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-3 font-mono text-xs text-muted-foreground tabular-nums">initialising model… {pct}%</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
