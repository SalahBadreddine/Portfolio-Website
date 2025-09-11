import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, Github, ArrowRight, ChevronLeft, ChevronRight, X, Eye } from "lucide-react";
import algreeniaImage from "@/assets/algreenia/home.jpeg";
import Algreeniahome1Image from "@/assets/algreenia/home1.jpeg";
import Algreeniahome2Image from "@/assets/algreenia/home2.jpeg";
import AlgreeniacampaignsImage from "@/assets/algreenia/campaigns.jpeg";
import AlgreeniachatbotImage from "@/assets/algreenia/chatbot.jpeg";
import AlgreeniairrigationImage from "@/assets/algreenia/irrigation.jpeg";
import AlgreeniaregisterImage from "@/assets/algreenia/register.jpeg";
import KhedmataybacartImage from "@/assets/khedmatayba/cart.jpeg";
import KhedmataybachatImage from "@/assets/khedmatayba/chat.jpeg";
import KhedmataybahomeImage from "@/assets/khedmatayba/home.jpeg";
import KhedmataybaloginImage from "@/assets/khedmatayba/login.jpeg";
import KhedmataybaordersImage from "@/assets/khedmatayba/orders.jpeg";
import KhedmataybaprofileImage from "@/assets/khedmatayba/profile.jpeg";
import KhedmataybasplashImage from "@/assets/khedmatayba/splash.jpeg";
import KhedmataybatrackImage from "@/assets/khedmatayba/trackorder.jpeg";
import JobmatchingHome from "@/assets/jobmatching/home.jpeg";
import JobmatchingDashboard from "@/assets/jobmatching/dahboard.jpeg";
import JobmatchingEmployer from "@/assets/jobmatching/employer.jpeg";
import JobmatchingSeeker from "@/assets/jobmatching/seeker.jpeg";

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Algreenia",
      description: "A collaborative platform that connects Algerians to afforestation efforts through community-driven projects, personalized tree recommendations, and impact tracking. It also tracks newly planted trees.",
      image: algreeniaImage,
      gallery: [
        algreeniaImage,
        Algreeniahome1Image,
        Algreeniahome2Image,
        AlgreeniaregisterImage,
        AlgreeniacampaignsImage,
        AlgreeniachatbotImage,
        AlgreeniairrigationImage
      ],
      category: "web",
      technologies: ["Web Development", "HTML/CSS/JS", "Php", "MySQL"],
      liveUrl: "#",
      githubUrl: "https://github.com/SalahBadreddine/ALGREENIA"
    },
    {
      id: 2,
      title: "Khedma Tayba",
      description: "Khedma Tayba is a modern food delivery app built with Flutter, designed to make ordering meals simple, fast, and reliable. Users can browse nearby restaurants, explore menus, place secure orders, and track deliveries in real time.",
      image: KhedmataybasplashImage,
      gallery: [
        KhedmataybasplashImage,
        KhedmataybaloginImage,
        KhedmataybahomeImage,
        KhedmataybacartImage,
        KhedmataybaprofileImage,
        KhedmataybaordersImage,
        KhedmataybatrackImage,
        KhedmataybachatImage
      ],
      category: "mobile",
      technologies: ["Flutter", "Dart"],
      liveUrl: "#",
      githubUrl: "https://github.com/SalahBadreddine/KhedmaTayba"
    },
    {
      id: 3,
      title: "Job Matching Platform",
      description: "A smart job matching platform that uses AI search algorithms Genetic, Informed/Uninformed, Local search, and Constraint Satisfaction—to deliver accurate recommendations, connecting job seekers with employers",
      image: JobmatchingHome,
      gallery: [
        JobmatchingHome,
        JobmatchingDashboard,
        JobmatchingEmployer,
        JobmatchingSeeker
      ],
      category: "web",
      technologies: ["Vue.js", "D3.js", "PostgreSQL", "Express"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Apps" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "dashboard", label: "Dashboards" }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const openGallery = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Explore my latest projects showcasing innovative solutions across 
            web development, mobile apps, and data visualization.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "gradient" : "glass"}
              onClick={() => setActiveFilter(filter.id)}
              className="transition-smooth"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id} 
              className="group overflow-hidden gradient-card border-0 shadow-card hover:shadow-hover transition-smooth animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    <Button size="sm" variant="glass" onClick={() => openGallery(project)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <div className="flex gap-2">
                      <Button size="sm" variant="glass">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="glass">
                          <Github className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full justify-between group-hover:text-primary"
                  onClick={() => openGallery(project)}
                >
                  View Gallery
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Button variant="gradient" size="lg">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Gallery Modal */}
      <Dialog open={!!selectedProject} onOpenChange={closeGallery}>
        <DialogContent className="max-w-7xl w-[95vw] sm:w-full h-[95vh] sm:h-[90vh] p-0 bg-background/95 backdrop-blur-xl border-border/50">
          <DialogHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
            <DialogTitle className="text-lg sm:text-2xl gradient-text">
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedProject && (
            <div className="flex flex-col h-full overflow-hidden">
              {/* Main Image */}
              <div className="relative flex-1 px-2 sm:px-6 overflow-hidden">
                <div className="relative h-full flex items-center justify-center group">
                  <img
                    src={selectedProject.gallery[currentImageIndex]}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-lg"
                  />
                  
                  {/* Navigation Buttons */}
                  {selectedProject.gallery.length > 1 && (
                    <>
                      <Button
                        variant="glass"
                        size="sm"
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 opacity-70 sm:opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                      <Button
                        variant="glass"
                        size="sm"
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 opacity-70 sm:opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Image Counter & Thumbnails */}
              <div className="p-3 sm:p-6 pt-2 sm:pt-4 space-y-3 sm:space-y-4 flex-shrink-0">
                <div className="text-center text-xs sm:text-sm text-muted-foreground">
                  {currentImageIndex + 1} of {selectedProject.gallery.length}
                </div>
                
                {/* Thumbnail Navigation */}
                <div className="flex justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 px-2">
                  {selectedProject.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 w-12 h-9 sm:w-16 sm:h-12 rounded border-2 transition-all overflow-hidden ${
                        index === currentImageIndex 
                          ? 'border-primary shadow-glow' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Project Info */}
                <div className="flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-4 border-t border-border/50">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start">
                    {selectedProject.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 justify-center sm:justify-end">
                    <Button size="sm" variant="glass" className="text-xs sm:text-sm">
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Live Demo
                    </Button>
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="glass" className="w-full sm:w-auto text-xs sm:text-sm">
                        <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Code
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PortfolioSection;