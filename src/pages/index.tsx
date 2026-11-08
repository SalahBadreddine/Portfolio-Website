import { MotionConfig } from "framer-motion";
import Navigation from "@/components/portfolio/Navigation";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import FederatedLab from "@/components/portfolio/FederatedLab";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";
import Preloader from "@/components/fx/Preloader";
import { CursorGlow, ScrollProgress } from "@/components/fx";

const Index = () => (
  <MotionConfig reducedMotion="user">
    <div className="noise relative min-h-screen bg-background">
      <Preloader />
      <ScrollProgress />
      <CursorGlow />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <FederatedLab />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  </MotionConfig>
);

export default Index;
