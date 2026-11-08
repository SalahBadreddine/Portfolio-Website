import { motion } from "framer-motion";
import { Bike, Building2, Hospital, MessageCircle, Server } from "lucide-react";
import type { Cover } from "@/data/projects";
import scooter from "@/assets/jibly/scooter.webp";

const seeded = (n: number) => {
  let s = n;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
};

const Federated = () => {
  const hs = [0, 1, 2, 3, 4].map((i) => {
    const a = -Math.PI / 2 + (i / 5) * Math.PI * 2;
    return { x: 200 + Math.cos(a) * 120, y: 125 + Math.sin(a) * 88 };
  });
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full">
      {hs.map((h, i) => (
        <g key={i}>
          <line x1={200} y1={125} x2={h.x} y2={h.y} stroke="rgba(253,111,0,.35)" strokeDasharray="3 4" />
          <circle r={3.5} fill="#ffb26b" cx={h.x} cy={h.y}>
            <animate attributeName="cx" values={`${h.x};200;${h.x}`} dur="2.6s" begin={`${i * 0.45}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${h.y};125;${h.y}`} dur="2.6s" begin={`${i * 0.45}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="2.6s" begin={`${i * 0.45}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      <circle cx={200} cy={125} r={30} fill="none" stroke="#FD6F00" strokeOpacity={0.5}>
        <animate attributeName="r" values="26;44" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={200} cy={125} r={24} fill="url(#fg)" />
      <defs><radialGradient id="fg"><stop offset="0" stopColor="#ffb26b" /><stop offset="1" stopColor="#c24f00" /></radialGradient></defs>
      <foreignObject x={188} y={113} width={24} height={24}><Server className="h-6 w-6 text-white" /></foreignObject>
      {hs.map((h, i) => (
        <g key={`h${i}`}>
          <circle cx={h.x} cy={h.y} r={17} fill="#0f172a" stroke="rgba(52,211,153,.6)" />
          <foreignObject x={h.x - 9} y={h.y - 9} width={18} height={18}><Hospital className="h-[18px] w-[18px] text-emerald-400" /></foreignObject>
        </g>
      ))}
    </svg>
  );
};

const Graph = () => {
  const r = seeded(7);
  const nodes = Array.from({ length: 14 }, (_, i) => ({ x: 40 + (i % 5) * 80 + r() * 30, y: 40 + Math.floor(i / 5) * 80 + r() * 30 }));
  const edges: [number, number][] = [];
  nodes.forEach((a, i) => nodes.forEach((b, j) => { if (j > i && Math.hypot(a.x - b.x, a.y - b.y) < 105) edges.push([i, j]); }));
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full">
      {edges.map(([i, j], k) => (
        <motion.line key={k} x1={nodes[i].x} y1={nodes[i].y} x2={nodes[j].x} y2={nodes[j].y} stroke="#FD6F00"
          animate={{ strokeOpacity: [0.15, 0.7, 0.15] }} transition={{ duration: 3, repeat: Infinity, delay: k * 0.12 }} />
      ))}
      {nodes.map((n, i) => (
        <motion.rect key={i} x={n.x - 11} y={n.y - 11} width={22} height={22} rx={5} fill="#111827" stroke="#ffb26b" strokeOpacity={0.7}
          animate={{ x: [n.x - 11, n.x - 11 + (i % 2 ? 4 : -4), n.x - 11] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }} />
      ))}
    </svg>
  );
};

const TimeSeries = () => {
  const pts = Array.from({ length: 60 }, (_, i) => {
    const x = 20 + i * 6;
    const y = 150 + Math.sin(i / 2.2) * 34 * (1 - i / 120) + Math.cos(i / 0.9) * 8 + i * 0.35;
    return `${x},${y}`;
  });
  const demand = "20,200 380,70";
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full">
      {[60, 110, 160, 210].map((y) => <line key={y} x1={20} x2={380} y1={y} y2={y} stroke="rgba(255,255,255,.06)" />)}
      <motion.polyline points={pts.join(" ")} fill="none" stroke="#38bdf8" strokeWidth={2}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4 }} />
      <motion.polyline points={demand} fill="none" stroke="#FD6F00" strokeWidth={2.5} strokeDasharray="6 5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, delay: 0.6 }} />
      <circle cx={300} cy={98} r={6} fill="#FD6F00"><animate attributeName="r" values="5;10;5" dur="1.6s" repeatCount="indefinite" /><animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" /></circle>
      <text x={282} y={86} fill="#ffb26b" fontSize={11} fontFamily="monospace">2030?</text>
      <text x={24} y={234} fill="#38bdf8" fontSize={10} fontFamily="monospace">rainfall</text>
      <text x={90} y={234} fill="#FD6F00" fontSize={10} fontFamily="monospace">demand</text>
    </svg>
  );
};

const Forecast = () => {
  const r = seeded(11);
  const bars = Array.from({ length: 22 }, (_, i) => 70 + Math.sin(i / 1.6) * 28 + r() * 26 - (i % 5 === 4 ? 40 : 0));
  const pred = bars.map((b, i) => `${30 + i * 16 + 6},${215 - (b + (r() - 0.5) * 14)}`).join(" ");
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full">
      {[60, 110, 160, 210].map((y) => <line key={y} x1={20} x2={380} y1={y} y2={y} stroke="rgba(255,255,255,.06)" />)}
      {bars.map((b, i) => (
        <motion.rect key={i} x={30 + i * 16} width={12} rx={2} fill={i > 16 ? "rgba(253,111,0,.25)" : "rgba(56,189,248,.45)"}
          initial={{ y: 215, height: 0 }} animate={{ y: 215 - b, height: b }} transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }} />
      ))}
      <motion.polyline points={pred} fill="none" stroke="#FD6F00" strokeWidth={2.5}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, delay: 0.8 }} />
      <line x1={302} x2={302} y1={40} y2={215} stroke="rgba(255,178,107,.5)" strokeDasharray="4 4" />
      <text x={308} y={52} fill="#ffb26b" fontSize={11} fontFamily="monospace">tomorrow</text>
      <text x={24} y={238} fill="#38bdf8" fontSize={10} fontFamily="monospace">meals served</text>
      <text x={120} y={238} fill="#FD6F00" fontSize={10} fontFamily="monospace">cascade forecast</text>
    </svg>
  );
};

const Cells = () => {
  const r = seeded(3);
  const cols = ["#FD6F00", "#38bdf8", "#34d399", "#a78bfa", "#f472b6"];
  const centers = [[100, 80], [280, 70], [200, 170], [80, 190], [320, 190]];
  const cells = Array.from({ length: 180 }, (_, i) => {
    const c = i % 5; const [cx, cy] = centers[c];
    const a = r() * Math.PI * 2, d = Math.pow(r(), 0.7) * 70;
    return { x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d * 0.8, c };
  });
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full">
      {cells.map((p, i) => (
        <motion.circle key={i} cx={p.x} cy={p.y} r={3} fill={cols[p.c]}
          initial={{ fill: "#64748b", opacity: 0.4 }} animate={{ fill: cols[p.c], opacity: 0.85 }}
          transition={{ duration: 1, delay: 0.3 + (i % 30) * 0.03 }} />
      ))}
    </svg>
  );
};

const Darija = () => (
  <div className="relative flex h-full w-full flex-col justify-center gap-3 px-8">
    {[
      { me: true, t: "واش ناكل كي نكون حاملة؟" },
      { me: false, t: "Balanced meals, iron & folate. Here's a simple daily plan…" },
      { me: true, t: "Merci! w l'bebe ki ysker?" },
    ].map((m, i) => (
      <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.5 }}
        className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-xs ${m.me ? "self-end gradient-bg text-primary-foreground rounded-br-sm" : "self-start glass rounded-bl-sm"}`}>
        {m.t}
      </motion.div>
    ))}
    <MessageCircle className="absolute right-4 top-4 h-5 w-5 text-primary/60" />
  </div>
);

const Delivery = () => (
  <div className="relative h-full w-full overflow-hidden">
    <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full">
      <path d="M-10 190 C 80 150, 140 220, 220 170 S 360 120, 420 150" fill="none" stroke="rgba(253,111,0,.4)" strokeWidth={3} strokeDasharray="8 8">
        <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1s" repeatCount="indefinite" />
      </path>
    </svg>
    <motion.img src={scooter} alt="" className="absolute bottom-6 w-24" animate={{ x: ["-30%", "380%"] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
    <Bike className="absolute right-5 top-5 h-5 w-5 text-primary/70" />
  </div>
);

const Platform = () => (
  <div className="flex h-full w-full items-center justify-center p-6">
    <div className="w-full max-w-[300px] rounded-xl glass-strong p-3 shadow-card">
      <div className="mb-3 flex gap-1.5">{["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => <span key={c} className={`h-2 w-2 rounded-full ${c}`} />)}</div>
      {["Mission 001 · First Contact", "Membership review queue", "Departments · Dev & AI"].map((t, i) => (
        <motion.div key={t} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.25 }}
          className="mb-2 flex items-center gap-2 rounded-lg bg-white/5 px-2.5 py-2 text-[11px]">
          <Building2 className="h-3.5 w-3.5 text-primary" /> {t}
          <span className="ml-auto h-1.5 w-10 overflow-hidden rounded bg-white/10"><motion.span className="block h-full gradient-bg" initial={{ width: 0 }} animate={{ width: `${60 + i * 15}%` }} transition={{ delay: 0.6 + i * 0.2, duration: 1 }} /></span>
        </motion.div>
      ))}
    </div>
  </div>
);

const Agent = () => {
  const cells = Array.from({ length: 15 * 15 });
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="grid grid-cols-[repeat(15,10px)] gap-[2px] rotate-[8deg]">
        {cells.map((_, i) => {
          const r = Math.floor(i / 15), c = i % 15;
          const q = r < 6 && c < 6 ? "bg-red-500/60" : r < 6 && c > 8 ? "bg-green-500/60" : r > 8 && c < 6 ? "bg-blue-500/60" : r > 8 && c > 8 ? "bg-yellow-400/60" : (r >= 6 && r <= 8) || (c >= 6 && c <= 8) ? "bg-white/15" : "bg-white/5";
          return <div key={i} className={`h-[10px] w-[10px] rounded-[2px] ${q}`} />;
        })}
      </div>
      <motion.div className="absolute h-4 w-4 rounded-full gradient-bg shadow-glow" animate={{ x: [-40, 0, 40, 40, 0], y: [10, 10, 10, -30, -30] }} transition={{ duration: 4, repeat: Infinity }} />
    </div>
  );
};

const ProjectCover = ({ cover, title }: { cover: Cover; title: string }) => {
  if (cover.kind === "image") {
    if (cover.fit === "phone") {
      return (
        <div className="relative flex h-full w-full items-end justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_120%,rgba(253,111,0,.35),transparent_60%)]">
          <img src={cover.src} alt={title} loading="lazy"
            className="relative top-6 w-[42%] max-w-[170px] rounded-[1.4rem] border-[5px] border-slate-800 shadow-2xl transition-transform duration-700 group-hover:-translate-y-3 group-hover:rotate-[-2deg]" />
        </div>
      );
    }
    return <img src={cover.src} alt={title} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]" />;
  }
  const V = { federated: Federated, graph: Graph, timeseries: TimeSeries, cells: Cells, darija: Darija, delivery: Delivery, platform: Platform, agent: Agent, forecast: Forecast }[cover.variant];
  return (
    <div className="relative h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(253,111,0,.12),transparent_55%),linear-gradient(160deg,#0b1222,#060a14)]">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="relative h-full w-full"><V /></div>
    </div>
  );
};

export default ProjectCover;
