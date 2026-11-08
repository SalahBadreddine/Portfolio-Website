import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Pause, Play, RotateCcw, ShieldCheck, Server, Hospital, Gauge, HeartPulse, ScanLine, Lock, StepForward, Info } from "lucide-react";
import { SectionHeader, Reveal } from "../fx";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Illustrative federated-learning simulator.                          */
/*  Curves are synthetic (deterministic + seeded noise) — they show HOW */
/*  FL behaves, not the project's measured results.                     */
/* ------------------------------------------------------------------ */

type Agg = "fedavg" | "fedqblend";
type Task = "cardio" | "xray";
type Phase = "idle" | "broadcast" | "train" | "upload" | "aggregate" | "done";

const ROUNDS = 20;
const HOSPITALS = [
  { name: "CHU Mustapha", city: "Algiers", n: 4200 },
  { name: "CHU Oran", city: "Oran", n: 2600 },
  { name: "CHU Constantine", city: "Constantine", n: 3100 },
  { name: "CHU Annaba", city: "Annaba", n: 1300 },
  { name: "CHU Tlemcen", city: "Tlemcen", n: 900 },
];
const TOTAL = HOSPITALS.reduce((s, h) => s + h.n, 0);
const TASKS: Record<Task, { label: string; icon: typeof HeartPulse; a0: number; amax: number; classes: string[]; colors: string[] }> = {
  cardio: { label: "Cardiovascular risk", icon: HeartPulse, a0: 0.56, amax: 0.87, classes: ["low", "medium", "high"], colors: ["#34d399", "#fbbf24", "#f87171"] },
  xray: { label: "Thoracic disease (X-ray)", icon: ScanLine, a0: 0.42, amax: 0.83, classes: ["normal", "pneumonia", "effusion", "other"], colors: ["#38bdf8", "#f472b6", "#a78bfa", "#fbbf24"] },
};
const DUR: Record<Exclude<Phase, "idle" | "done">, number> = { broadcast: 850, train: 1300, upload: 850, aggregate: 650 };

const rng = (seed: number) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

function curve(task: Task, agg: Agg, het: number) {
  const { a0, amax } = TASKS[task];
  const r = rng(task === "cardio" ? 11 : 23);
  const cap = agg === "fedavg" ? amax - 0.11 * het : amax - 0.035 * het;
  const k = agg === "fedavg" ? 0.2 * (1 - 0.45 * het) : 0.24 * (1 - 0.2 * het);
  const jitter = agg === "fedavg" ? 0.004 + 0.022 * het : 0.003 + 0.007 * het;
  const out = [a0];
  for (let t = 1; t <= ROUNDS; t++) out.push(Math.min(0.99, cap - (cap - a0) * Math.exp(-k * t) + (r() - 0.5) * 2 * jitter));
  return out;
}

function labelMix(i: number, het: number, k: number) {
  const base = Array(k).fill(1 / k);
  const dom = i % k;
  const skew = base.map((v, j) => (j === dom ? v + het * (1 - v) * 0.85 : v * (1 - het * 0.85)));
  const s = skew.reduce((a, b) => a + b, 0);
  return skew.map((v) => v / s);
}

const useNarrow = () => {
  const [n, setN] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(max-width: 639px)");
    const f = () => setN(m.matches); f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return n;
};

const FederatedLab = () => {
  const [agg, setAgg] = useState<Agg>("fedqblend");
  const [task, setTask] = useState<Task>("xray");
  const [het, setHet] = useState(0.7);
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timer = useRef<number>();
  const narrow = useNarrow();
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, amount: 0.5 });
  const autoStarted = useRef(false);

  const curves = useMemo(() => ({ fedavg: curve(task, "fedavg", het), fedqblend: curve(task, "fedqblend", het) }), [task, het]);
  const central = TASKS[task].amax + 0.012;
  const acc = curves[agg][round];

  const reset = useCallback(() => { window.clearTimeout(timer.current); setRunning(false); setRound(0); setPhase("idle"); }, []);
  useEffect(() => { reset(); }, [task, het, reset]);

  const advance = useCallback((p: Phase): Phase => {
    switch (p) {
      case "idle": case "aggregate": return "broadcast";
      case "broadcast": return "train";
      case "train": return "upload";
      case "upload": return "aggregate";
      default: return p;
    }
  }, []);

  useEffect(() => {
    if (!running) return;
    if (phase === "done") { setRunning(false); return; }
    const next = advance(phase);
    const d = phase === "idle" ? 200 : DUR[phase as keyof typeof DUR] / speed;
    timer.current = window.setTimeout(() => {
      if (phase === "aggregate") {
        setRound((r) => {
          const nr = r + 1;
          if (nr >= ROUNDS) { setPhase("done"); return ROUNDS; }
          setPhase(next);
          return nr;
        });
      } else setPhase(next);
    }, d);
    return () => window.clearTimeout(timer.current);
  }, [running, phase, speed, advance]);

  useEffect(() => {
    if (inView && !autoStarted.current) {
      autoStarted.current = true;
      const t = window.setTimeout(() => setRunning(true), 600);
      return () => window.clearTimeout(t);
    }
  }, [inView]);

  const toggle = () => {
    if (phase === "done") { setRound(0); setPhase("idle"); setRunning(true); return; }
    setRunning((r) => !r);
  };
  const stepRound = () => {
    if (round >= ROUNDS) return;
    setRunning(false); window.clearTimeout(timer.current);
    const nr = round + 1; setRound(nr); setPhase(nr >= ROUNDS ? "done" : "aggregate");
  };

  /* ---------- geometry ---------- */
  const W = narrow ? 400 : 640, H = narrow ? 520 : 500;
  const cx = W / 2, cy = narrow ? 270 : 262;
  const rx = narrow ? 140 : 235, ry = narrow ? 165 : 150;
  const nodes = HOSPITALS.map((h, i) => {
    const a = -Math.PI / 2 + (i / HOSPITALS.length) * Math.PI * 2;
    return { ...h, x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry, w: h.n / TOTAL, mix: labelMix(i, het, TASKS[task].classes.length) };
  });
  const localAcc = (i: number) => {
    const g = curves[agg][round];
    const drift = het * (0.06 + (i % 3) * 0.025);
    return Math.max(0.3, g - drift + (phase === "train" ? 0.02 : 0));
  };

  /* ---------- chart ---------- */
  const CW = 520, CH = 200, pad = 28;
  const lo = Math.min(TASKS[task].a0, 0.4) - 0.02, hi = 0.92;
  const px = (t: number) => pad + (t / ROUNDS) * (CW - pad * 1.4);
  const py = (v: number) => CH - pad + -((v - lo) / (hi - lo)) * (CH - pad * 1.6);
  const path = (arr: number[]) => arr.slice(0, round + 1).map((v, t) => `${t ? "L" : "M"}${px(t).toFixed(1)},${py(v).toFixed(1)}`).join(" ");
  const other: Agg = agg === "fedavg" ? "fedqblend" : "fedavg";
  const AGG_LABEL: Record<Agg, string> = { fedavg: "FedAvg", fedqblend: "FedQBlend" };

  const TaskIcon = TASKS[task].icon;
  const modelMB = task === "xray" ? 44.7 : 0.6;
  const exchanged = round * HOSPITALS.length * 2;

  return (
    <section id="lab" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.06] blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-primary/[0.08] blur-[130px]" />
      <div className="container relative mx-auto">
        <SectionHeader
          eyebrow="Interactive lab"
          title="Hospitals learning together, privately"
          highlight={["together", "privately"]}
          subtitle="I built this to show what our federated learning project is about. Five hospitals train one model together, and patient data never leaves any of them. Only the model weights are shared. Play with how different the hospitals' data is, and compare our FedQBlend method with FedAvg."
        />

        <Reveal>
          <div className="rounded-[2rem] glass-strong p-3 sm:p-5 shadow-card border-glow">
            {/* controls */}
            <div className="flex flex-col gap-3 rounded-2xl bg-white/[0.03] p-3 sm:p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={toggle} className="inline-flex h-10 items-center gap-2 rounded-xl gradient-bg px-5 font-semibold text-primary-foreground shadow-glow">
                  {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {running ? "Pause" : phase === "done" ? "Replay" : round ? "Resume" : "Start training"}
                </button>
                <button onClick={stepRound} className="grid h-10 w-10 place-items-center rounded-xl glass hover:text-primary" aria-label="Next round" title="Skip one round"><StepForward className="h-4 w-4" /></button>
                <button onClick={reset} className="grid h-10 w-10 place-items-center rounded-xl glass hover:text-primary" aria-label="Reset" title="Reset"><RotateCcw className="h-4 w-4" /></button>
                <button onClick={() => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 4 : 1))} className="inline-flex h-10 items-center gap-1.5 rounded-xl glass px-3 font-mono text-sm hover:text-primary" title="Speed">
                  <Gauge className="h-4 w-4" />{speed}×
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex rounded-xl glass p-1">
                  {(Object.keys(TASKS) as Task[]).map((t) => {
                    const I = TASKS[t].icon;
                    return (
                      <button key={t} onClick={() => setTask(t)} className={cn("relative inline-flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm transition-colors", task === t ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
                        {task === t && <motion.span layoutId="task-pill" className="absolute inset-0 rounded-lg gradient-bg" />}
                        <I className="relative z-10 h-4 w-4" /><span className="relative z-10">{t === "cardio" ? "Cardio" : "Chest X-ray"}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex rounded-xl glass p-1">
                  {(["fedavg", "fedqblend"] as Agg[]).map((a) => (
                    <button key={a} onClick={() => setAgg(a)} className={cn("relative rounded-lg px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-mono transition-colors", agg === a ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
                      {agg === a && <motion.span layoutId="agg-pill" className="absolute inset-0 rounded-lg gradient-bg" />}
                      <span className="relative z-10">{AGG_LABEL[a]}{a === "fedqblend" && <sup className="ml-0.5 text-[9px]">ours</sup>}</span>
                    </button>
                  ))}
                </div>
                <label className="flex items-center gap-2 rounded-xl glass px-3 py-2 text-xs sm:text-sm">
                  <span className="text-muted-foreground whitespace-nowrap">Non-IID</span>
                  <input type="range" min={0} max={1} step={0.05} value={het} onChange={(e) => setHet(+e.target.value)}
                    className="w-20 sm:w-28 accent-[#FD6F00]" aria-label="Data heterogeneity" />
                  <span className="w-8 font-mono text-primary">{Math.round(het * 100)}%</span>
                </label>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
              {/* network stage */}
              <div ref={stageRef} className="relative overflow-hidden rounded-2xl bg-[#050912] ring-1 ring-white/5">
                <div className="absolute left-4 top-4 z-10 flex items-center gap-2 font-mono text-[11px] sm:text-xs">
                  <span className={cn("h-2 w-2 rounded-full", running ? "bg-emerald-400 animate-pulse" : "bg-muted-foreground")} />
                  <span className="uppercase tracking-widest text-muted-foreground">
                    {phase === "idle" ? "ready" : phase === "done" ? "converged" : phase === "broadcast" ? "broadcasting global model" : phase === "train" ? "local training" : phase === "upload" ? "uploading updates" : "aggregating"}
                  </span>
                </div>
                <div className="absolute right-4 top-4 z-10 rounded-lg bg-white/5 px-2.5 py-1 font-mono text-xs">
                  round <span className="text-primary">{String(round).padStart(2, "0")}</span>/{ROUNDS}
                </div>

                <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
                  <defs>
                    <radialGradient id="srv"><stop offset="0" stopColor="#ffb26b" /><stop offset="1" stopColor="#b84a00" /></radialGradient>
                    <filter id="glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                  </defs>

                  {nodes.map((h, i) => (
                    <line key={`l${i}`} x1={cx} y1={cy} x2={h.x} y2={h.y} stroke={phase === "upload" || phase === "broadcast" ? "rgba(253,111,0,.45)" : "rgba(255,255,255,.08)"} strokeWidth={1.2} strokeDasharray="4 6">
                      <animate attributeName="stroke-dashoffset" from="0" to={phase === "upload" ? "20" : "-20"} dur="0.8s" repeatCount="indefinite" />
                    </line>
                  ))}

                  {/* packets */}
                  <AnimatePresence>
                    {(phase === "broadcast" || phase === "upload") && nodes.map((h, i) => {
                      const up = phase === "upload";
                      const r = up ? 4 + h.w * 16 : 6;
                      return (
                        <motion.circle key={`${phase}-${round}-${i}`} cx={up ? h.x : cx} cy={up ? h.y : cy} r={r} fill={up ? "#34d399" : "#ffb26b"} filter="url(#glow)"
                          initial={{ cx: up ? h.x : cx, cy: up ? h.y : cy, opacity: 0 }}
                          animate={{ cx: up ? cx : h.x, cy: up ? cy : h.y, opacity: [0, 1, 1, 0.2] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: (DUR[phase] / speed) / 1000 * 0.95, ease: "easeInOut", delay: up ? i * 0.04 : 0 }} />
                      );
                    })}
                  </AnimatePresence>

                  {/* server */}
                  <g>
                    {phase === "aggregate" && (
                      <motion.circle cx={cx} cy={cy} r={40} fill="none" stroke="#FD6F00" initial={{ r: 36, opacity: 0.9 }} animate={{ r: 70, opacity: 0 }} transition={{ duration: 0.7 / speed }} />
                    )}
                    <motion.circle cx={cx} cy={cy} r={36} fill="url(#srv)" animate={phase === "aggregate" ? { scale: [1, 1.12, 1] } : { scale: 1 }} style={{ transformOrigin: `${cx}px ${cy}px` }} transition={{ duration: 0.6 / speed }} />
                    <foreignObject x={cx - 13} y={cy - 19} width={26} height={26}><Server className="h-[26px] w-[26px] text-white" /></foreignObject>
                    <text x={cx} y={cy + 20} textAnchor="middle" fill="white" fontSize={11} fontWeight={700} fontFamily="JetBrains Mono Variable, monospace">{(acc * 100).toFixed(1)}%</text>
                    <text x={cx} y={cy + 56} textAnchor="middle" fill="#94a3b8" fontSize={11} fontFamily="JetBrains Mono Variable, monospace">global model</text>
                  </g>

                  {/* hospitals */}
                  {nodes.map((h, i) => {
                    const la = localAcc(i);
                    const C = 2 * Math.PI * 27;
                    const k = TASKS[task].classes.length;
                    let off = 0;
                    const labelBelow = h.y >= cy - 5;
                    return (
                      <g key={h.name}>
                        <circle cx={h.x} cy={h.y} r={27} fill="#0b1324" stroke="rgba(52,211,153,.35)" />
                        <circle cx={h.x} cy={h.y} r={27} fill="none" stroke="#34d399" strokeWidth={3} strokeLinecap="round"
                          strokeDasharray={`${C} ${C}`}
                          style={{ transition: `stroke-dashoffset ${phase === "train" ? DUR.train / speed : 300}ms ease`, transform: `rotate(-90deg)`, transformOrigin: `${h.x}px ${h.y}px` }}
                          strokeDashoffset={phase === "train" ? 0 : C} />
                        {phase === "train" && <circle cx={h.x} cy={h.y} r={27} fill="none" stroke="#34d399" strokeOpacity={0.5}>
                          <animate attributeName="r" from="27" to="42" dur="1s" repeatCount="indefinite" /><animate attributeName="stroke-opacity" from=".5" to="0" dur="1s" repeatCount="indefinite" />
                        </circle>}
                        <foreignObject x={h.x - 10} y={h.y - 15} width={20} height={20}><Hospital className="h-5 w-5 text-emerald-400" /></foreignObject>
                        <text x={h.x} y={h.y + 15} textAnchor="middle" fill="#e2e8f0" fontSize={9.5} fontFamily="JetBrains Mono Variable, monospace">{(la * 100).toFixed(0)}%</text>
                        {/* label distribution bar */}
                        <g transform={`translate(${h.x - 30}, ${labelBelow ? h.y + 34 : h.y - 46})`}>
                          {h.mix.map((m, j) => { const w = m * 60; const el = <rect key={j} x={off} y={0} width={Math.max(0, w - 1)} height={5} rx={1.5} fill={TASKS[task].colors[j % k]} />; off += w; return el; })}
                        </g>
                        <text x={h.x} y={labelBelow ? h.y + 52 : h.y - 52} textAnchor="middle" fill="#cbd5e1" fontSize={narrow ? 11 : 11.5} fontWeight={600}>{narrow ? h.city : h.name}</text>
                        <text x={h.x} y={labelBelow ? h.y + 65 : h.y - 65} textAnchor="middle" fill="#64748b" fontSize={10} fontFamily="JetBrains Mono Variable, monospace">{h.n.toLocaleString()} records{agg === "fedavg" ? ` · w=${h.w.toFixed(2)}` : ""}</text>
                      </g>
                    );
                  })}
                </svg>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/5 px-4 py-2.5 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#ffb26b]" />global weights ↓</span>
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-400" />local updates ↑ (size ∝ data)</span>
                  <span className="inline-flex items-center gap-1.5">
                    {TASKS[task].classes.map((c, j) => <span key={c} className="inline-flex items-center gap-1"><span className="h-1.5 w-3 rounded-sm" style={{ background: TASKS[task].colors[j] }} />{c}</span>)}
                  </span>
                </div>
              </div>

              {/* metrics + chart */}
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <Metric label="Global accuracy" value={`${(acc * 100).toFixed(1)}%`} accent />
                  <Metric label="Patient records shared" value="0" icon={<Lock className="h-3.5 w-3.5 text-emerald-400" />} />
                  <Metric label="Updates exchanged" value={exchanged.toString()} />
                  <Metric label="Weights transferred" value={`${(exchanged * modelMB).toFixed(exchanged * modelMB > 100 ? 0 : 1)} MB`} />
                </div>

                <div className="flex-1 rounded-2xl bg-[#050912] p-4 ring-1 ring-white/5">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-sm font-medium"><TaskIcon className="h-4 w-4 text-primary" />{TASKS[task].label}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">accuracy / round</span>
                  </div>
                  <svg viewBox={`0 0 ${CW} ${CH}`} className="h-auto w-full">
                    {[0.5, 0.6, 0.7, 0.8, 0.9].filter((v) => v > lo).map((v) => (
                      <g key={v}>
                        <line x1={pad} x2={CW - pad * 0.4} y1={py(v)} y2={py(v)} stroke="rgba(255,255,255,.06)" />
                        <text x={pad - 6} y={py(v) + 3} textAnchor="end" fill="#64748b" fontSize={10} fontFamily="monospace">{Math.round(v * 100)}</text>
                      </g>
                    ))}
                    <line x1={pad} x2={CW - pad * 0.4} y1={py(central)} y2={py(central)} stroke="#34d399" strokeDasharray="2 5" strokeOpacity={0.7} />
                    <text x={CW - pad * 0.4} y={py(central) - 5} textAnchor="end" fill="#34d399" fontSize={10} fontFamily="monospace">centralised (not private)</text>
                    <path d={path(curves[other])} fill="none" stroke="#64748b" strokeWidth={1.5} strokeDasharray="5 4" />
                    <path d={path(curves[agg])} fill="none" stroke="#FD6F00" strokeWidth={2.5} strokeLinejoin="round" />
                    {round > 0 && <circle cx={px(round)} cy={py(acc)} r={4.5} fill="#FD6F00" stroke="white" strokeWidth={1.5} />}
                    <text x={pad} y={CH - 6} fill="#64748b" fontSize={10} fontFamily="monospace">0</text>
                    <text x={CW - pad * 0.4} y={CH - 6} textAnchor="end" fill="#64748b" fontSize={10} fontFamily="monospace">{ROUNDS}</text>
                  </svg>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono">
                    <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 bg-primary" />{AGG_LABEL[agg]}</span>
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground"><span className="h-0.5 w-4 border-t border-dashed border-slate-500" />{AGG_LABEL[other]}</span>
                    {round > 0 && <span className="ml-auto text-muted-foreground">Δ {((curves[agg][round] - curves[other][round]) * 100).toFixed(1)} pts</span>}
                  </div>
                </div>

                <div className="flex gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4 text-sm">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">Privacy by design.</span> Raw scans and records stay inside each hospital.
                    The server only ever sees model parameters, then sends back an improved global model.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 flex items-start gap-2 px-1 text-[11px] text-muted-foreground/80">
              <Info className="mt-px h-3.5 w-3.5 shrink-0" />
              Interactive illustration built for this portfolio: hospital names, sizes and curves are simulated to show how federated training behaves under non-IID data. They are not the measured results from the research report.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Metric = ({ label, value, accent, icon }: { label: string; value: string; accent?: boolean; icon?: React.ReactNode }) => (
  <div className="rounded-2xl bg-white/[0.03] p-3.5 ring-1 ring-white/5">
    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">{icon}{label}</div>
    <motion.div key={value} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className={cn("mt-1 font-display text-2xl font-bold tabular-nums", accent && "gradient-text")}>{value}</motion.div>
  </div>
);

export default FederatedLab;
