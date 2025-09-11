import { Button } from "../ui/button";
import { ArrowDown, Download, Github, Linkedin } from "lucide-react";
import heroImage from "@/assets/professional_salah_1.jpg";
import { useState, useEffect } from "react";

const HeroSection = () => {
const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const texts = ["Salah Badreddine", "Exploring AI Frontiers", "Building Smarter Apps", "Driven by Innovation"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setIsVisible(true);
      }, 500);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen mt-24 md:mt-0 flex items-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-balance">
              Hi, I'm{" "}
              <span 
                className={`gradient-text transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
              >
                {texts[currentTextIndex]}
              </span>
            </h1>
            <h2 className="text-2xl lg:text-3xl text-muted-foreground mb-6">
              AI Engineer Student & Developer 
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg text-balance">
              Exploring the frontiers of artificial intelligence while building impactful mobile and web applications. 
              Passionate about solving real-world problems through innovation and technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => scrollToSection("portfolio")}
                className="group"
              >
                View My Work
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button variant="glass" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/SalahBadreddine" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Github className="h-5 w-5" />
                </Button>
              </a>

              <a 
                href="https://www.linkedin.com/in/salah-badreddine-975890312/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Hero image */}
          <div className="animate-scale-in delay-300">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-2xl opacity-50 scale-105"></div>
              <img
                src={heroImage}
                alt="Salah Badreddine"
                className="relative z-10 rounded-2xl shadow-card w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-primary" />
      </div>
    </section>
  );
};

export default HeroSection;