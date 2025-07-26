import { Section } from "./Section";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Card3D } from "./Card3D";

const experiences = [
  {
    role: "President",
    company: "Diseño Divino",
    date: "Nov 2024 - Present",
    category: "Leadership",
    description: "Leading the design and creative club, organizing events and fostering innovation in digital arts and design.",
    achievements: [
      "Led team of 50+ members",
      "Organized 5+ major events",
      "Increased club membership by 200%"
    ]
  },
  {
    role: "Web Developer",
    company: "Q-Bits",
    date: "Oct 2024 - Present",
    category: "Development",
    description: "Developing responsive web applications and contributing to open-source projects.",
    achievements: [
      "Built 10+ web applications",
      "Contributed to 5+ open source projects",
      "Earned Quant-A-Maze certification"
    ]
  },
  {
    role: "Custom Embedded Linux OS Developer Intern",
    company: "Loginware Softtec Private Limited",
    date: "Aug 2024 - Sep 2024",
    category: "Systems",
    description: "Developed custom embedded Linux operating systems for specialized hardware applications.",
    achievements: [
      "Optimized boot time by 40%",
      "Implemented custom drivers",
      "Reduced system footprint by 30%"
    ]
  },
  {
    role: "Member",
    company: "GDSC NMIT - Google Developer Student Club",
    date: "Nov 2024 - Present",
    category: "Community",
    description: "Active member contributing to Google technologies and community building.",
    achievements: [
      "Mentored 20+ students",
      "Organized 3+ workshops",
      "Led Android development sessions"
    ]
  }
];

export function ProfessionalExperience() {
  return (
    <Section
      id="experience"
      title="Professional Experience"
      subtitle="My journey through various roles, from leadership positions to technical internships."
      className="bg-transparent"
    >
      <div className="relative grid gap-12 before:absolute before:inset-0 before:ml-5 before:h-full before:w-px before:bg-border/50 md:before:mx-auto md:before:left-0 md:before:right-0">
        {experiences.map((exp, index) => (
          <div key={index} className="relative md:grid md:grid-cols-2 md:gap-8 items-start">
            {/* Date */}
            <div className={`hidden md:flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <div className={`${index % 2 === 0 ? 'text-right mr-8' : 'text-left ml-8'}`}>
                    <Badge variant="outline" className="text-sm font-bold border-primary/50 text-primary bg-primary/10">{exp.date}</Badge>
                </div>
            </div>

            {/* Timeline Dot */}
            <div 
              className="absolute left-5 top-2 h-5 w-5 rounded-full bg-primary border-4 border-background animate-pulse md:left-1/2 md:-translate-x-1/2"
            />

            {/* Card */}
            <Card3D 
              className="relative group"
              style={{
                gridColumn: index % 2 === 0 ? 2 : 1,
                gridRow: 1
              }}
            >
              <Card className="pl-12 md:pl-8 bg-card/50 border-primary/20 backdrop-blur-sm group-even:md:text-left group-odd:md:text-right">
                <CardHeader>
                  <div className="md:hidden text-sm text-foreground/90 font-medium mb-2">
                    <Badge variant="outline" className="text-sm font-bold border-primary/50 text-primary bg-primary/10">{exp.date}</Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 group-odd:md:flex-row-reverse">
                    <CardTitle className="font-headline text-xl text-primary flex-grow">{exp.role}</CardTitle>
                  </div>
                  <div className="flex items-center gap-4 group-odd:md:justify-end">
                    <div className="font-semibold text-foreground/90">{exp.company}</div>
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-none">{exp.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80">{exp.description}</p>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2 group-odd:md:flex-row-reverse group-odd:md:text-right">
                          <CheckCircle2 className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                          <span className="text-foreground/80">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </Card3D>
          </div>
        ))}
      </div>
    </Section>
  );
}
