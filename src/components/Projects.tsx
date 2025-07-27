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
    title: "Visitlytics",
    description: "A visitor tracking application designed to cater to a wide range of business requirements, built with Node.js and EJS.",
    image: "/Visitlytics.png",
    imageHint: "visitor analytics",
    tags: ["TypeScript", "Node.js", "EJS", "PLpgSQL"],
    link: "https://github.com/Sv1745/visitlytics",
  },
  {
    title: "Z3r0-tasks",
    description: "A simple and effective task management software built with Typescript to help you organize and track your tasks with ease.",
    image: "/z3r0.png",
    imageHint: "task list",
    tags: ["TypeScript", "CSS", "Task Management"],
    link: "https://github.com/Sv1745/z3r0-tasks",
  },
  {
    title: "Minimal Tiny Core Loginware",
    description: "A custom embedded Linux OS with a secure login system, developed as part of an internship at Loginware Softtec.",
    image: "/tiny2.jpg",
    imageHint: "embedded linux",
    tags: ["C++", "Linux", "Embedded Systems", "Shell Scripting"],
    link: "https://github.com/Sv1745/Minimal-Tiny-Core-Loginware",
  },
  {
    title: "design2sketchstudio",
    description: "An online drag-and-drop website generator that allows users to create and export websites with an intuitive interface.",
    image: "/websitegen.png",
    imageHint: "website builder interface",
    tags: ["TypeScript", "Drag & Drop", "Web Tools"],
    link: "https://github.com/Sv1745/sketch2shipstudio",
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
          <Card3D key={project.title} className="flex flex-col overflow-hidden bg-card/80 border-primary/20 backdrop-blur-sm rounded-lg">
            <CardHeader className="p-0">
                <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover object-top rounded-t-lg"
                    data-ai-hint={project.imageHint}
                />
            </CardHeader>
            <div className="p-6 flex flex-col flex-grow">
              <CardTitle className="font-headline text-xl mb-2 text-primary">{project.title}</CardTitle>
              <p className="text-foreground/80 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-none">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <CardFooter className="p-6 pt-0">
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full">
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
