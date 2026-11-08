import { Brain, Database, Globe, Smartphone, Languages, MapPin, Sparkles } from "lucide-react";
import { Counter, Marquee, Reveal, SectionHeader, TiltCard } from "../fx";

const STACK = [
  "Python", "PyTorch", "TensorFlow", "scikit-learn", "GNNs", "LLMs & RAG", "R", "SQL Server", "Power BI", "DAX", "dbt", "Airflow", "Airbyte",
  "TypeScript", "React", "Next.js", "NestJS", "Node.js", "Tailwind", "FastAPI", "Flask", "Flutter", "Dart", "SwiftUI", "Supabase", "Firebase", "PostgreSQL", "C++", "Java", "Git",
];

const SKILLS = [
  { icon: Brain, title: "AI & Machine Learning", color: "from-orange-500/20", items: ["Deep learning (CNNs, GNNs)", "Federated learning", "NLP · RAG · LLM fine-tuning", "Explainable ML", "Time-series (ARIMA/SARIMA)", "Search & optimisation"] },
  { icon: Database, title: "Data Engineering & BI", color: "from-sky-500/20", items: ["Star-schema data warehouses", "SQL Server · ETL / ELT", "Airbyte → Airflow → dbt", "Power BI · DAX · KPI design", "Data governance frameworks"] },
  { icon: Globe, title: "Web & SaaS", color: "from-violet-500/20", items: ["React · Next.js · TypeScript", "NestJS · Node · FastAPI · Flask", "Multi-tenant architecture", "Auth, REST APIs, PostgreSQL"] },
  { icon: Smartphone, title: "Mobile", color: "from-emerald-500/20", items: ["Flutter + BLoC", "SwiftUI (iOS)", "Supabase · Firebase · FCM", "i18n incl. Arabic RTL"] },
];

const AboutSection = () => (
  <section id="about" className="relative py-24 sm:py-32">
    <div className="container mx-auto">
      <SectionHeader
        eyebrow="About me"
        title="A bit about me"
        highlight={["me"]}
        subtitle="I'm in my 4th year at ENSIA, the national AI school in Algiers. I like the part where a model stops being a notebook and becomes something people actually use."
      />

      {/* Bento */}
      <div className="grid gap-4 sm:gap-5 md:grid-cols-6">
        <Reveal className="md:col-span-4">
          <TiltCard max={3} className="h-full rounded-3xl">
            <div className="relative h-full overflow-hidden rounded-3xl glass p-6 sm:p-8">
              <Sparkles className="absolute right-6 top-6 h-6 w-6 text-primary/40" />
              <h3 className="font-display text-2xl font-bold mb-4">My story</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I study AI engineering at <span className="text-foreground font-medium">ENSIA</span>. I learn best by building things,
                  so most of what I study ends up as a project.
                </p>
                <p>
                  Right now I'm working on <span className="text-foreground">federated learning for hospitals</span>, a research project on graph neural networks,
                  and my internship at <span className="text-foreground">GIBA Group</span>, where I work on their data warehouse and Power BI dashboards.
                </p>
                <p>
                  Outside class I lead IT at the <span className="text-foreground">Skill&amp;Tell Scientific Club</span>, so I build the club's websites and help organise datathons.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5"><MapPin className="h-3.5 w-3.5 text-primary" />Algiers, Algeria</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5"><Languages className="h-3.5 w-3.5 text-primary" />Arabic · French (C2) · English</span>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:col-span-2">
          {[
            { v: <Counter to={4} prefix="Y" duration={1} />, l: "AI engineering", s: "ENSIA, since 2023" },
            { v: <Counter to={3} duration={1} />, l: "Languages", s: "Arabic · French C2 · English" },
            { v: <Counter to={20} suffix="+" />, l: "Projects shipped", s: "AI · web · mobile · data" },
            { v: <Counter to={200} suffix="+" />, l: "Survey responses", s: "modelled in SomaTrack" },
          ].map((s, i) => (
            <Reveal key={i} delay={0.08 * i}>
              <TiltCard max={10} className="h-full rounded-3xl">
                <div className="flex h-full flex-col justify-between rounded-3xl glass p-4 sm:p-5">
                  <div className="font-display text-3xl sm:text-4xl font-bold gradient-text tabular-nums">{s.v}</div>
                  <div className="mt-3">
                    <div className="text-sm font-medium">{s.l}</div>
                    <div className="text-xs text-muted-foreground">{s.s}</div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {SKILLS.map((g, i) => (
          <Reveal key={g.title} delay={0.06 * i} className="md:col-span-3 lg:col-span-3 xl:col-span-3">
            <TiltCard max={4} className="h-full rounded-3xl">
              <div className={`relative h-full overflow-hidden rounded-3xl glass p-6`}>
                <div className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${g.color} to-transparent blur-2xl`} />
                <div className="relative flex items-center gap-3 mb-4">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 ring-1 ring-primary/30"><g.icon className="h-5 w-5 text-primary" /></div>
                  <h3 className="font-display text-lg font-bold">{g.title}</h3>
                </div>
                <ul className="relative flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs sm:text-sm text-foreground/85 transition-colors hover:border-primary/50 hover:text-primary">{it}</li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* stack marquee */}
      <div className="mt-14 space-y-3">
        <Marquee speed={45}>
          {STACK.map((t) => <span key={t} className="whitespace-nowrap rounded-xl glass px-4 py-2 font-mono text-sm text-muted-foreground">{t}</span>)}
        </Marquee>
        <Marquee speed={55} reverse>
          {[...STACK].reverse().map((t) => <span key={t} className="whitespace-nowrap rounded-xl border border-primary/20 bg-primary/[0.05] px-4 py-2 font-mono text-sm text-primary/80">{t}</span>)}
        </Marquee>
      </div>
    </div>
  </section>
);

export default AboutSection;
