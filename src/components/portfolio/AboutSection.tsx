import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Award, Coffee, Users, Zap } from "lucide-react";

const AboutSection = () => {
  const stats = [
    { icon: Award, value: "1+", label: "Years Experience" },
    { icon: Users, value: "1", label: "Happy Clients" },
    { icon: Coffee, value: "10+", label: "Projects Done" },
    { icon: Zap, value: "99%", label: "Success Rate" },
  ];

  const skills = [
    "Artificial Intelligence", "iOS & Mobile Development", "Machine Learning",
    "Flutter", "Python", "C++", 
    "React", "Next.js", "Tailwind CSS",  
    "Node.js", "PostgreSQL", "Problem Solving", "Community Leadership"
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Passionate about artificial intelligence and development, 
            I build mobile and web applications that combine innovation with 
            real-world impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* About content */}
          <div className="animate-slide-up">
            <h3 className="text-2xl font-semibold mb-6">My Journey</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
               I am an AI student and developer passionate about creating impactful digital 
              solutions. My focus lies in building intelligent systems, mobile applications, 
              and scalable web platforms that solve real-world problems. 
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I’ve worked on diverse projects, from AI-driven prototypes to full-stack 
              applications, and participated in team competitions where collaboration and 
              problem-solving were key to success. I approach every challenge with discipline, 
              creativity, and a commitment to delivering results. 
            </p>
            
            <Button variant="gradient" size="lg">
              Let's Work Together
            </Button>
          </div>

          {/* Skills */}
          <div className="animate-slide-up delay-300">
            <h3 className="text-2xl font-semibold mb-6">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-3 mb-8">
              {skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-smooth cursor-default"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center gradient-card border-0 shadow-card hover:shadow-hover transition-smooth group">
              <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold mb-2 gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;