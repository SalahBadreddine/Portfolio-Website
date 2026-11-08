import { ArrowUp, Github, Linkedin, Instagram } from "lucide-react";
import { Marquee } from "../fx";
import { NAV, scrollToId } from "./Navigation";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/5 pt-14">
      <Marquee speed={35} className="mb-12">
        {["AI Engineering", "Machine Learning", "Federated Learning", "Data & BI", "Full-Stack", "Mobile", "Research"].map((w) => (
          <span key={w} className="flex items-center gap-4 whitespace-nowrap font-display text-4xl sm:text-6xl font-bold text-white/[0.07]">
            {w}<span className="text-primary/40">✦</span>
          </span>
        ))}
      </Marquee>

      <div className="container mx-auto pb-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="font-display text-2xl font-bold"><span className="gradient-text">Salah Badreddine</span></div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">AI engineering student at ENSIA. I build ML, data and app projects, mostly in Algiers.</p>
            <div className="mt-5 flex gap-2">
              {[
                { icon: Github, href: "https://github.com/SalahBadreddine", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/salah-badreddine-975890312/", label: "LinkedIn" },
                { icon: Instagram, href: "https://www.instagram.com/salah_badd/", label: "Instagram" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl glass text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollToId(n.id)} className="text-left text-sm text-muted-foreground hover:text-primary transition-colors">{n.label}</button>
            ))}
          </nav>

          <button onClick={() => scrollToId("home")} className="group inline-flex items-center gap-2 self-start rounded-xl glass px-4 py-2.5 text-sm hover:border-primary/50">
            Back to top <ArrowUp className="h-4 w-4 text-primary transition-transform group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {year} Salah Badreddine. All rights reserved.</span>
          <span className="font-mono">Designed & built in Algiers · React · Framer Motion</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
