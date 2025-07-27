import { BrainCircuit, Cuboid, Rocket, Binary, Telescope, DraftingCompass } from "lucide-react";
import Image from "next/image";
import { Section } from "./Section";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import React from "react";
import { Card3D } from "./Card3D";

const skills = [
  { icon: <BrainCircuit className="w-8 h-8 text-primary"/>, name: "AI & Machine Learning", description: "Leveraging deep learning and data to build intelligent systems that solve real-world problems." },
  { icon: <Cuboid className="w-8 h-8 text-primary"/>, name: "3D Modeling & Animation", description: "Bringing ideas to life with compelling visuals and stories using tools like Blender." },
  { icon: <Rocket className="w-8 h-8 text-primary"/>, name: "Embedded Systems", description: "Developing and programming hardware solutions, including work with Raspberry Pi and Linux." },
];

const infoCards = [
    { icon: <DraftingCompass className="w-8 h-8 text-primary"/>, title: "My Philosophy", content: "To innovate at the intersection of technology and art, creating solutions that are not only functional but also inspiring." },
    { icon: <Telescope className="w-8 h-8 text-primary"/>, title: "My Ambition", content: "To contribute to a team where technology is pushed to its limits and used to solve challenging, impactful problems." },
    { icon: <Binary className="w-8 h-8 text-primary"/>, title: "Fun Fact", content: "I'm fascinated by procedural generation and enjoy creating small scripts to generate unique digital art and patterns." }
]

export function About() {
  return (
    <Section
      id="about"
      title="About"
      subtitle="Fusing Technology with Cosmic Dreams"
      className="bg-card/20 backdrop-blur-sm"
    >
      <Card className="grid md:grid-cols-5 gap-12 items-center bg-card/80 border-primary/20 p-8 rounded-2xl">
        <div className="md:col-span-2 flex justify-center">
            <div className="relative">
                <div className="animated-border">
                    <Image
                        src="/SVSM.jpg"
                        alt="Srivathsa S Murthy"
                        width={300}
                        height={300}
                        className="relative rounded-full border-4 border-background object-cover"
                        data-ai-hint="man portrait"
                    />
                </div>
            </div>
        </div>
        <div className="md:col-span-3 space-y-6">
            <p className="text-lg text-foreground/90 leading-relaxed">
              Hi! I’m an engineering student from Bangalore, specializing in Artificial Intelligence and Machine Learning. I’m passionate about developing tech-driven solutions and love exploring the creative side of things through 3D modeling and animation. I enjoy working at the intersection of logic and design-solving problems, telling visual stories, and building what I imagine. I'm always looking for opportunities to work on projects that are ambitious, forward-thinking, and occasionally a little beyond the edge of what's here on Earth.
            </p>
        </div>
      </Card>
       <div className="grid md:grid-cols-3 gap-8 mt-20">
        {infoCards.map((card) => (
            <Card3D key={card.title} className="rounded-2xl">
                <Card className="bg-background/30 backdrop-blur-lg border border-primary/20 p-6 rounded-2xl text-center h-full">
                    <div className="flex justify-center mb-4">{card.icon}</div>
                    <h3 className="text-xl font-headline font-bold text-primary mb-2">{card.title}</h3>
                    <p className="text-foreground/80">{card.content}</p>
                </Card>
            </Card3D>
        ))}
      </div>
    </Section>
  );
}
