import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { 
  Code, 
  Smartphone, 
  Globe, 
  BarChart3,
  ArrowRight,
  Cpu,
  Shield
} from "lucide-react";

const ServicesSection = () => {
  const services = [
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Developing responsive, efficient, and user-friendly mobile applications.",
    features: ["Swift UI: Native iOS Development", "Flutter: Cross-Platform Apps", "Performance Optimization", "UI/UX Integration"]
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Designing scalable and modern web applications tailored to client needs.",
    features: ["React/Next.js", "Full-stack Development", "API Integration", "Database Design"]
  },
  {
    icon: Code,
    title: "AI & Data Exploration",
    description: "Exploring machine learning fundamentals and applying data-driven approaches.",
    features: ["Supervised & Unsupervised Models", "Basic Statistics", "Data Handling", "Prototyping"]
  },
  {
    icon: BarChart3,
    title: "Collaboration & Projects",
    description: "Working with teams and individuals to deliver meaningful tech solutions.",
    features: ["Hackathon Experience", "Team Projects", "Problem-Solving", "Result-Oriented Approach"]
  },
    {
    icon: Cpu,
    title: "System & Backend Development",
    description: "Building reliable backends and efficient system-level solutions.",
    features: ["C++ Programming", "APIs & REST", "Databases (SQL/NoSQL)", "Performance Tuning"]
  },
  {
    icon: Shield,
    title: "Software Security Basics",
    description: "Ensuring safe, reliable, and secure applications.",
    features: ["Authentication & Authorization", "Secure Coding Practices", "Data Protection", "Bug Fixing"]
  }
];

  return (
    <section id="services" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            I offer comprehensive development services to help bring 
            your digital vision to life with precision and creativity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="p-8 gradient-card border-0 shadow-card hover:shadow-hover transition-smooth group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                variant="ghost" 
                className="w-full justify-between group-hover:text-primary"
              >
                Learn More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;