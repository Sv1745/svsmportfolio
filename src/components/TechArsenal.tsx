
import { Section } from "./Section";
import { Card3D } from "./Card3D";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

const techStack = [
  { name: "Python", imgSrc: "/python.png", imgHint: "Python logo", category: "Backend" },
  { name: "C++", imgSrc: "/c++.png", imgHint: "C++ logo", category: "System" },
  { name: "JavaScript", imgSrc: "/js.png", imgHint: "JavaScript logo", category: "Frontend" },
  { name: "React", imgSrc: "/react.png", imgHint: "React logo", category: "Frontend" },
  { name: "Next.js", imgSrc: "/Next.js.png", imgHint: "Next.js logo", category: "Frontend" },
  { name: "Tailwind", imgSrc: "/Tailwind CSS.png", imgHint: "Tailwind CSS logo", category: "Frontend" },
  { name: "Blender", imgSrc: "/Blender.png", imgHint: "Blender logo", category: "3D Tools" },
];

export function TechArsenal() {
  return (
    <Section
      id="tech-arsenal"
      title="Tech Arsenal"
      subtitle="My Go-To Tools and Technologies"
      className="bg-transparent"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {techStack.map((tech) => (
          <Card3D key={tech.name} className="bg-card/50 border-primary/20 text-center">
            <CardContent className="p-6 flex flex-col items-center justify-center h-full">
              <div className="text-primary mb-4 h-12 w-12 flex items-center justify-center">
                <Image
                  src={tech.imgSrc}
                  alt={`${tech.name} logo`}
                  width={40}
                  height={40}
                  className="object-contain"
                  data-ai-hint={tech.imgHint}
                />
              </div>
              <CardTitle className="text-lg font-medium font-headline">{tech.name}</CardTitle>
            </CardContent>
          </Card3D>
        ))}
      </div>
    </Section>
  );
}
