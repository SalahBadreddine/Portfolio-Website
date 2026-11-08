import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, Copy, Check, Loader2, ArrowUpRight } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { Magnetic, Reveal, SectionHeader } from "../fx";
import { cn } from "@/lib/utils";

const EMAIL = "salah.badreddine1@gmail.com";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
    {children}
  </label>
);

const inputCls = "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-primary/10";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send("service_1r0llzl", "template_2rui73r", { from_name: form.name, from_email: form.email, message: form.message }, "7QjuJHxvtOHwv7NNV");
      toast({ title: "Message sent!", description: "Thanks! I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
      setSent(true); setTimeout(() => setSent(false), 3000);
    } catch (err) {
      console.error("Email sending failed:", err);
      toast({ title: "Something went wrong", description: `Please try again or email me at ${EMAIL}.`, variant: "destructive" });
    }
    setSending(false);
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  };

  const socials = [
    { icon: Github, href: "https://github.com/SalahBadreddine", label: "GitHub", handle: "@SalahBadreddine" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/salah-badreddine-975890312/", label: "LinkedIn", handle: "Salah Badreddine" },
    { icon: Instagram, href: "https://www.instagram.com/salah_badd/", label: "Instagram", handle: "@salah_badd" },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.08] blur-[160px]" />
      <div className="container relative mx-auto">
        <SectionHeader
          eyebrow="Contact"
          title="Get in touch"
          highlight={["touch"]}
          subtitle="If you have an internship, a research idea or a project in mind, send me a message. I'm also happy to just talk tech."
        />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <form onSubmit={submit} className="relative h-full overflow-hidden rounded-3xl glass p-6 sm:p-8 border-glow">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name"><input name="name" value={form.name} onChange={onChange} required className={inputCls} placeholder="Your name" /></Field>
                <Field label="Email"><input name="email" type="email" value={form.email} onChange={onChange} required className={inputCls} placeholder="you@company.com" /></Field>
              </div>
              <div className="mt-5">
                <Field label="Message"><textarea name="message" value={form.message} onChange={onChange} required rows={6} className={cn(inputCls, "resize-none")} placeholder="Tell me about your project, role or idea…" /></Field>
              </div>
              <button type="submit" disabled={sending}
                className="group relative mt-6 inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl gradient-bg font-semibold text-primary-foreground shadow-glow disabled:opacity-70">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {sending ? <><Loader2 className="h-4 w-4 animate-spin" />Sending…</> : sent ? <><Check className="h-4 w-4" />Sent!</> : <>Send message<Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></>}
              </button>
            </form>
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal delay={0.1}>
              <div className="rounded-3xl glass p-6">
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Email me directly</div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <a href={`mailto:${EMAIL}`} className="font-display text-lg sm:text-xl font-bold break-all hover:text-primary transition-colors">{EMAIL}</a>
                  <button onClick={copy} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl glass hover:text-primary" aria-label="Copy email">
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="tel:+213672186755" className="group rounded-3xl glass p-5 hover:border-primary/40 transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                  <div className="mt-3 text-xs text-muted-foreground">Phone</div>
                  <div className="font-medium group-hover:text-primary transition-colors">+213 672 18 67 55</div>
                </a>
                <div className="rounded-3xl glass p-5">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div className="mt-3 text-xs text-muted-foreground">Based in</div>
                  <div className="font-medium">Ben Aknoun, Algiers</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2} className="flex-1">
              <div className="h-full rounded-3xl glass p-3">
                {socials.map((s, i) => (
                  <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className={cn("group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-primary/[0.07]", i && "mt-1")}>
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"><s.icon className="h-5 w-5" /></span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{s.label}</span>
                      <span className="block text-xs text-muted-foreground">{s.handle}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16 text-center">
          <Magnetic>
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary">
              <Mail className="h-4 w-4" /> Open to internships, research &amp; freelance work
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
