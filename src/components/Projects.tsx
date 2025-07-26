import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "./Section";
import { Badge } from "./ui/badge";
import { CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Card3D } from "./Card3D";

const projectData = [
  {
    title: "Cosmic Anomaly Detector",
    description: "An AI-powered system that analyzes astronomical data to detect and classify celestial anomalies, leveraging deep learning models.",
    image: "https://placehold.co/600x400.png",
    imageHint: "galaxy space",
    tags: ["Python", "TensorFlow", "AstroPy", "AI/ML"],
    link: "https://github.com/Sv1745",
  },
  {
    title: "Embedded Door Monitoring System",
    description: "A secure monitoring system built on embedded Linux, using Raspberry Pi and various sensors to provide real-time door status updates.",
    image: "https://placehold.co/600x400.png",
    imageHint: "circuit board",
    tags: ["C++", "Embedded Linux", "Raspberry Pi", "Sensors"],
    link: "https://github.com/Sv1745",
  },
  {
    title: "3D Animated Short: 'Orbital'",
    description: "A short animated film designed and rendered in Blender, telling a story of a lone satellite's journey through space.",
    image: "https://placehold.co/600x400.png",
    imageHint: "3d animation",
    tags: ["Blender", "3D Modeling", "Animation", "Storytelling"],
    link: "https://github.com/Sv1745",
  },
  {
    title: "Portfolio Web Application",
    description: "A dynamic personal portfolio website built with Django to showcase projects, skills, and blog posts with a custom admin panel.",
    image: "https://placehold.co/600x400.png",
    imageHint: "web development",
    tags: ["Django", "Python", "HTML/CSS", "JavaScript"],
    link: "https://github.com/Sv1745",
  },
];

export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Creations from My Digital Universe"
      className="bg-card/20 backdrop-blur-sm"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {projectData.map((project) => (
          <Card3D key={project.title} className="flex flex-col overflow-hidden bg-card/80 border-primary/20 backdrop-blur-sm">
            <CardHeader className="p-0">
                <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover rounded-t-lg"
                    data-ai-hint={project.imageHint}
                />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="font-headline text-xl mb-2 text-primary">{project.title}</CardTitle>
              <p className="text-foreground/80">{project.description}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-none">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> View on GitHub
                </Link>
              </Button>
            </CardFooter>
          </Card3D>
        ))}
      </div>
    </Section>
  );
}
