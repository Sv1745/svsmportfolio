import Image from "next/image";
import { Section } from "./Section";
import { Card, CardContent } from "./ui/card";
import { Card3D } from "./Card3D";

const educationData = [
  {
    degree: "Bachelors of Engineering in Artificial Intelligence and Machine Learning",
    institution: "Nitte Meenakshi Institute of Technology, Bangalore",
    banner: "/nmit.jpg",
    bannerHint: "abstract neural network",
    logo: "/NMIT Logo.png",
    logoHint: "NMIT logo",
    date: "2023 - 2027",
  },
  {
    degree: "Bachelors of Science in Data Science and Applications",
    institution: "IIT Madras, Chennai",
    banner: "/IITM.jpg",
    bannerHint: "data visualization",
    logo: "/IITM Logo.png",
    logoHint: "IIT Madras logo",
    date: "2024 - Present",
  },
];

export function Education() {
  return (
    <Section
      id="education"
      title="Education"
      subtitle="My Academic Journey and Foundation"
      className="bg-transparent"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {educationData.map((edu, index) => (
          <Card3D key={index} className="rounded-2xl">
            <Card className="bg-card/80 border-primary/20 rounded-2xl h-full overflow-hidden">
              <div className="relative">
                <Image
                    src={edu.banner}
                    alt={`${edu.institution} banner`}
                    width={600}
                    height={200}
                    className="w-full h-32 object-cover"
                    data-ai-hint={edu.bannerHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <div className="animated-border">
                        <Image
                            src={edu.logo}
                            alt={`${edu.institution} logo`}
                            width={80}
                            height={80}
                            className="rounded-full object-contain bg-background p-2 border-4 border-background"
                            data-ai-hint={edu.logoHint}
                        />
                    </div>
                </div>
              </div>
              <CardContent className="pt-16 text-center">
                <h3 className="text-xl font-headline font-bold text-primary mb-2">{edu.degree}</h3>
                <p className="text-foreground/80 font-semibold">{edu.institution}</p>
                <p className="text-foreground/60 mt-1">{edu.date}</p>
              </CardContent>
            </Card>
          </Card3D>
        ))}
      </div>
    </Section>
  );
}