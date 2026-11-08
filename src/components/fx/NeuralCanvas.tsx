import { useEffect, useRef } from "react";

/**
 * Interactive "neural constellation": drifting nodes linked by proximity,
 * signal pulses travelling along edges, and nodes that lean toward the cursor.
 */
const NeuralCanvas = ({ className = "" }: { className?: string }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    const mouse = { x: -9999, y: -9999 };

    type N = { x: number; y: number; vx: number; vy: number; r: number; hot: number };
    type P = { a: number; b: number; t: number; s: number };
    let nodes: N[] = [];
    let pulses: P[] = [];

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, Math.max(36, (w * h) / 14000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8, hot: 0,
      }));
      pulses = [];
    };

    const LINK = () => Math.min(170, Math.max(110, w / 9));

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      const L = LINK();
      // move
      for (const n of nodes) {
        const dx = mouse.x - n.x, dy = mouse.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < 180) { n.vx += (dx / d) * 0.012; n.vy += (dy / d) * 0.012; n.hot = Math.min(1, n.hot + 0.08); }
        n.hot *= 0.96;
        n.vx *= 0.992; n.vy *= 0.992;
        const sp = Math.hypot(n.vx, n.vy);
        if (sp < 0.12) { n.vx += (Math.random() - 0.5) * 0.04; n.vy += (Math.random() - 0.5) * 0.04; }
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
      }
      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < L) {
            const o = (1 - d / L) * 0.35 + Math.max(a.hot, b.hot) * 0.35;
            ctx.strokeStyle = `rgba(253,111,0,${o * 0.55})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            if (!reduce && pulses.length < 26 && Math.random() < 0.0009) pulses.push({ a: i, b: j, t: 0, s: 0.008 + Math.random() * 0.014 });
          }
        }
      }
      // pulses
      pulses = pulses.filter((p) => {
        p.t += p.s;
        const a = nodes[p.a], b = nodes[p.b];
        if (!a || !b || p.t > 1 || Math.hypot(a.x - b.x, a.y - b.y) > L) return false;
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
        g.addColorStop(0, "rgba(255,190,120,0.95)"); g.addColorStop(1, "rgba(253,111,0,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
        if (p.t > 0.98) b.hot = 1;
        return true;
      });
      // nodes
      for (const n of nodes) {
        ctx.fillStyle = `rgba(255,${170 - n.hot * 60},${90 - n.hot * 60},${0.55 + n.hot * 0.45})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + n.hot * 1.8, 0, Math.PI * 2); ctx.fill();
      }
      if (visible) raf = requestAnimationFrame(step);
    };

    init();
    if (reduce) { step(); cancelAnimationFrame(raf); } else raf = requestAnimationFrame(step);

    const onResize = () => init();
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const io = new IntersectionObserver(([e]) => {
      const was = visible; visible = e.isIntersecting;
      if (visible && !was && !reduce) raf = requestAnimationFrame(step);
    });
    io.observe(canvas);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden />;
};

export default NeuralCanvas;
