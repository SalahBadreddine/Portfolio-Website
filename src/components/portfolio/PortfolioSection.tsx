import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Globe, FlaskConical, Sparkles, Images, X, Check } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { projects, archive, CATEGORY_LABEL, type Category, type Project } from "@/data/projects";
import { SectionHeader, TiltCard, Reveal } from "../fx";
import ProjectCover from "./ProjectCover";
import { scrollToId } from "./Navigation";
import { cn } from "@/lib/utils";

const FILTERS: (Category | "all")[] = ["all", "ai", "research", "data", "web", "mobile"];

const statusStyle: Record<string, string> = {
  Live: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  "In progress": "bg-sky-500/15 text-sky-300 border-sky-400/30",
  Research: "bg-violet-500/15 text-violet-300 border-violet-400/30",
  "Team project": "bg-amber-500/15 text-amber-300 border-amber-400/30",
  Competition: "bg-pink-500/15 text-pink-300 border-pink-400/30",
};

const ProjectCard = ({ p, onOpen, big }: { p: Project; onOpen: () => void; big?: boolean }) => (
  <TiltCard max={5} className="group h-full rounded-3xl">
    <article
      onClick={onOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
      tabIndex={0}
      role="button"
      aria-label={`Open ${p.title}`}
      className={cn(
        "relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl glass transition-colors duration-500 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        p.featured && "border-glow"
      )}
    >
      <div className={cn("relative overflow-hidden", big ? "h-56 sm:h-72" : "h-52")}>
        <ProjectCover cover={p.cover} title={p.title} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {p.status && <span className={cn("rounded-full border px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-md", statusStyle[p.status])}>{p.status}</span>}
          {p.featured && <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-0.5 text-[11px] font-medium text-primary backdrop-blur-md"><Sparkles className="h-3 w-3" />Featured</span>}
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-black/40 px-2.5 py-0.5 font-mono text-[11px] text-white/80 backdrop-blur-md">{p.year}</span>
      </div>

      <div className="relative z-[2] flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className={cn("font-display font-bold tracking-tight transition-colors group-hover:text-primary", big ? "text-2xl sm:text-3xl" : "text-xl")}>{p.title}</h3>
          <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-white/5 transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>
        {big && (
          <ul className="mt-4 hidden space-y-1.5 sm:block">
            {p.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex gap-2 text-sm text-foreground/80"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{h}</li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {p.tech.slice(0, big ? 6 : 4).map((t) => (
            <span key={t} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-muted-foreground">{t}</span>
          ))}
          {p.tech.length > (big ? 6 : 4) && <span className="px-1 font-mono text-[11px] text-muted-foreground">+{p.tech.length - (big ? 6 : 4)}</span>}
        </div>
      </div>
    </article>
  </TiltCard>
);

const ProjectModal = ({ p, onClose }: { p: Project | null; onClose: () => void }) => {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  useEffect(() => setIdx(0), [p?.id]);
  const g = p?.gallery ?? [];
  const go = (d: number) => { if (!g.length) return; setDir(d); setIdx((i) => (i + d + g.length) % g.length); };
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });

  return (
    <Dialog open={!!p} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-6xl w-[96vw] max-h-[92svh] overflow-y-auto overflow-x-hidden p-0 gap-0 border-white/10 bg-[#070b14]/95 backdrop-blur-2xl rounded-3xl sm:rounded-3xl [&>button]:hidden">
        {p && (
          <div className="grid lg:grid-cols-[1.35fr_1fr]">
            {/* media */}
            <div className="relative min-h-[300px] sm:min-h-[420px] lg:min-h-[560px] bg-[#04070e] overflow-hidden">
              {g.length ? (
                <>
                  <AnimatePresence initial={false} custom={dir} mode="popLayout">
                    <motion.img
                      key={idx}
                      src={g[idx]}
                      alt={`${p.title} screenshot ${idx + 1}`}
                      custom={dir}
                      initial={{ opacity: 0, x: dir * 80, scale: 0.96 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -dir * 80, scale: 0.96 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }}
                      className={cn("absolute inset-0 m-auto max-h-[calc(100%-5rem)] max-w-[calc(100%-2rem)] object-contain cursor-grab active:cursor-grabbing select-none",
                        p.phoneGallery ? "rounded-[1.6rem] border-[6px] border-slate-800 shadow-2xl" : "rounded-xl shadow-2xl")}
                      draggable={false}
                    />
                  </AnimatePresence>
                  {g.length > 1 && (
                    <>
                      <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full glass-strong hover:text-primary"><ChevronLeft className="h-5 w-5" /></button>
                      <button onClick={() => go(1)} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full glass-strong hover:text-primary"><ChevronRight className="h-5 w-5" /></button>
                      <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5">
                        {g.map((_, i) => (
                          <button key={i} onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }} aria-label={`Image ${i + 1}`}
                            className={cn("h-1.5 rounded-full transition-all", i === idx ? "w-6 bg-primary" : "w-1.5 bg-white/30 hover:bg-white/60")} />
                        ))}
                      </div>
                    </>
                  )}
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[11px] text-white/80"><Images className="h-3 w-3" />{idx + 1}/{g.length}</span>
                </>
              ) : (
                <div className="absolute inset-0"><ProjectCover cover={p.cover} title={p.title} /></div>
              )}
            </div>

            {/* details */}
            <div className="relative p-6 sm:p-8">
              <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full glass hover:text-primary"><X className="h-4 w-4" /></button>
              <div className="flex flex-wrap items-center gap-2 pr-10">
                {p.status && <span className={cn("rounded-full border px-2.5 py-0.5 text-[11px] font-medium", statusStyle[p.status])}>{p.status}</span>}
                <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                <span className="font-mono text-xs text-muted-foreground">· {p.categories.map((c) => CATEGORY_LABEL[c]).join(" · ")}</span>
              </div>
              <DialogTitle className="mt-3 font-display text-3xl font-bold tracking-tight gradient-text">{p.title}</DialogTitle>
              <DialogDescription className="mt-2 text-foreground/90 font-medium">{p.tagline}</DialogDescription>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <ul className="mt-5 space-y-2">
                {p.highlights.map((h, i) => (
                  <motion.li key={h} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{h}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {p.tech.map((t) => <span key={t} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-muted-foreground">{t}</span>)}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl gradient-bg px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:shadow-glow transition-shadow"><Globe className="h-4 w-4" />Live demo</a>}
                {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-medium hover:border-primary/50"><Github className="h-4 w-4" />Source code</a>}
                {p.labLink && <button onClick={() => { onClose(); setTimeout(() => scrollToId("lab"), 300); }} className="inline-flex items-center gap-2 rounded-xl gradient-bg px-4 py-2.5 text-sm font-semibold text-primary-foreground"><FlaskConical className="h-4 w-4" />Open the simulator</button>}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const PortfolioSection = () => {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [open, setOpen] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const list = useMemo(() => (filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter))), [filter]);
  const visible = filter === "all" && !showAll ? list.slice(0, 9) : list;
  const counts = useMemo(() => Object.fromEntries(FILTERS.map((f) => [f, f === "all" ? projects.length : projects.filter((p) => p.categories.includes(f as Category)).length])), []);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-40 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[140px]" />
      <div className="container relative mx-auto">
        <SectionHeader
          eyebrow={`${projects.length + archive.length}+ builds`}
          title="Things I've built"
          highlight={["built"]}
          subtitle="Research, web, mobile and data projects, some solo and some with my teams. Click a card to see screenshots and the code."
        />

        <Reveal>
          <div className="-mx-5 mb-10 flex justify-start sm:justify-center overflow-x-auto px-5 no-scrollbar">
            <div className="flex gap-1 rounded-2xl glass p-1.5">
              {FILTERS.map((f) => (
                <button key={f} onClick={() => { setFilter(f); setShowAll(false); }}
                  className={cn("relative whitespace-nowrap rounded-xl px-3.5 sm:px-4 py-2 text-sm transition-colors", filter === f ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
                  {filter === f && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-xl gradient-bg" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  <span className="relative z-10 font-medium">{CATEGORY_LABEL[f]}</span>
                  <span className={cn("relative z-10 ml-1.5 font-mono text-[10px]", filter === f ? "text-primary-foreground/70" : "text-muted-foreground/60")}>{counts[f]}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <motion.div layout className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => {
              const big = filter === "all" && p.featured;
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(big ? "md:col-span-1 lg:col-span-3" : "lg:col-span-2")}
                >
                  <ProjectCard p={p} big={big} onOpen={() => setOpen(p)} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filter === "all" && list.length > 10 && (
          <div className="mt-10 flex justify-center">
            <button onClick={() => setShowAll((s) => !s)} className="group inline-flex items-center gap-2 rounded-xl glass px-6 py-3 font-medium hover:border-primary/50">
              {showAll ? "Show less" : `Show ${list.length - 9} more projects`}
              <ChevronRight className={cn("h-4 w-4 text-primary transition-transform", showAll ? "-rotate-90" : "rotate-90")} />
            </button>
          </div>
        )}

        {/* archive */}
        <Reveal className="mt-20">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h3 className="font-display text-2xl sm:text-3xl font-bold">More from the <span className="gradient-text">archive</span></h3>
            <a href="https://github.com/SalahBadreddine?tab=repositories" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
              All repositories <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl glass divide-y divide-white/5">
            {archive.map((a, i) => (
              <motion.a key={a.title} href={a.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="group grid grid-cols-[1fr_auto] sm:grid-cols-[220px_1fr_auto_auto] items-center gap-x-6 gap-y-1 px-5 py-4 transition-colors hover:bg-primary/[0.06]">
                <span className="font-display font-semibold group-hover:text-primary transition-colors">{a.title}</span>
                <span className="hidden sm:block text-sm text-muted-foreground truncate">{a.desc}</span>
                <span className="hidden sm:block font-mono text-xs text-muted-foreground">{a.tech}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="col-span-2 sm:hidden text-xs text-muted-foreground">{a.tech} · {a.desc}</span>
              </motion.a>
            ))}
          </div>
        </Reveal>
      </div>

      <ProjectModal p={open} onClose={() => setOpen(null)} />
    </section>
  );
};

export default PortfolioSection;
