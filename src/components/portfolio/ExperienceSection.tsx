import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, FlaskConical, Users, Rocket, GraduationCap, Trophy } from "lucide-react";
import { Reveal, SectionHeader } from "../fx";
import { cn } from "@/lib/utils";

type Item = {
  date: string; title: string; org: string; icon: typeof Briefcase; tag: string; tagColor: string;
  points: string[]; tech?: string[]; now?: boolean;
};

const ITEMS: Item[] = [
  {
    date: "Since 2026", now: true, icon: Briefcase, tag: "Internship", tagColor: "text-sky-300 bg-sky-500/10 border-sky-400/30",
    title: "Data Engineering & BI Intern", org: "GIBA Group · IT Direction (Data Governance & BI)",
    points: [
      "I worked on the group's data governance framework and proposed how a new Data Department should be organised.",
      "I helped define the target pipeline: ERPs → Airbyte → Airflow → dbt → SQL Server → Power BI.",
      "I audited the existing star-schema warehouse (fed by Sage X3) and documented 11 structural problems.",
      "I'm building the production KPI dashboards, from plant level up to group management.",
    ],
    tech: ["SQL Server", "Power BI", "DAX", "dbt", "Airflow", "Airbyte", "Sage X3"],
  },
  {
    date: "2026/27", now: true, icon: FlaskConical, tag: "Research", tagColor: "text-violet-300 bg-violet-500/10 border-violet-400/30",
    title: "Research project: Graph Neural Networks", org: "ENSIA · supervised by Dr. Soumaya Lekehal",
    points: ["A one-year project where I use GNNs to design facility layouts that hold up when demand changes."],
    tech: ["GNNs", "Optimisation", "Python"],
  },
  {
    date: "Since Jul 2026", now: true, icon: Users, tag: "Leadership", tagColor: "text-amber-300 bg-amber-500/10 border-amber-400/30",
    title: "IT Lead Manager", org: "Skill&Tell Scientific Club",
    points: [
      "I lead the IT department (Dev & AI). We redesigned skillntell.com and built an HR Desk and the Missions platform.",
      "I co-designed Odyssea, a Kaggle datathon that was an affiliated event of World AI Week in Amsterdam (Oct 2026).",
    ],
    tech: ["Next.js", "TypeScript", "Kaggle"],
  },
  {
    date: "2025/26", icon: Rocket, tag: "Startup", tagColor: "text-emerald-300 bg-emerald-500/10 border-emerald-400/30",
    title: "Pre-incubation: Jibly", org: "ENSIA V2V Incubator",
    points: ["I took Jibly, a delivery app for Algeria, through pre-incubation at the school's incubator."],
    tech: ["Flutter", "Product"],
  },
  {
    date: "Sep 2025 to Jun 2026", icon: Users, tag: "Leadership", tagColor: "text-amber-300 bg-amber-500/10 border-amber-400/30",
    title: "HR Lead", org: "EBEC Scientific Club",
    points: ["I managed the club's teams and coordinated how events were run. I learned a lot about managing people."],
  },
  {
    date: "Since 2023", icon: GraduationCap, tag: "Education", tagColor: "text-orange-300 bg-orange-500/10 border-orange-400/30",
    title: "Engineering degree in Artificial Intelligence", org: "ENSIA, École Nationale Supérieure d'Intelligence Artificielle",
    points: ["Machine learning, deep learning, optimisation and data engineering.", "Plenty of hackathons and datathons along the way."],
  },
];

const ExperienceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" className="relative py-24 sm:py-32 overflow-x-clip">
      <div className="container mx-auto">
        <SectionHeader eyebrow="Journey" title="What I've been up to" highlight={["up", "to"]} subtitle="Work, research and the clubs I'm involved in." />

        <div ref={ref} className="relative mx-auto max-w-4xl">
          {/* rail */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/10" />
          <motion.div style={{ scaleY }} className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 origin-top bg-gradient-to-b from-primary via-orange-400 to-primary/0" />

          <ol className="space-y-10 md:space-y-14">
            {ITEMS.map((it, i) => {
              const right = i % 2 === 1;
              return (
                <li key={it.title} className="relative md:grid md:grid-cols-2 md:gap-12">
                  {/* dot */}
                  <div className="absolute left-[19px] md:left-1/2 top-1 -translate-x-1/2 z-10">
                    <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className={cn("grid h-10 w-10 place-items-center rounded-full border-2 bg-background", it.now ? "border-primary shadow-glow" : "border-white/20")}>
                      <it.icon className={cn("h-4 w-4", it.now ? "text-primary" : "text-muted-foreground")} />
                    </motion.div>
                    {it.now && <span className="absolute inset-0 rounded-full border border-primary animate-[pulse-ring_2s_ease-out_infinite]" />}
                  </div>

                  <div className={cn("pl-16 md:pl-0", right ? "md:col-start-2" : "md:col-start-1 md:text-right")}>
                    <Reveal x={right ? 40 : -40} y={0}>
                      <div className={cn("font-mono text-xs text-primary mb-2 flex items-center gap-2", !right && "md:justify-end")}>
                        {it.date}
                        {it.now && <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">current</span>}
                      </div>
                      <div className="group rounded-3xl glass p-5 sm:p-6 text-left transition-colors hover:border-primary/40">
                        <span className={cn("inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium", it.tagColor)}>{it.tag}</span>
                        <h3 className="mt-3 font-display text-lg sm:text-xl font-bold leading-snug group-hover:text-primary transition-colors">{it.title}</h3>
                        <p className="text-sm text-muted-foreground">{it.org}</p>
                        <ul className="mt-3 space-y-2">
                          {it.points.map((p) => (
                            <li key={p} className="flex gap-2 text-sm text-foreground/80 leading-relaxed"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />{p}</li>
                          ))}
                        </ul>
                        {it.tech && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {it.tech.map((t) => <span key={t} className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-muted-foreground">{t}</span>)}
                          </div>
                        )}
                      </div>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="relative mt-10 flex justify-start md:justify-center">
            <div className="ml-[3px] md:ml-0 grid h-9 w-9 place-items-center rounded-full gradient-bg shadow-glow"><Trophy className="h-4 w-4 text-primary-foreground" /></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
