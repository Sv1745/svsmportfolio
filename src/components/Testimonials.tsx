import { Section } from "./Section";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Quote } from "lucide-react";

const testimonialData = [
  {
    name: "Prof. Anand",
    title: "Dept. of AI/ML, PES University",
    avatar: "PA",
    image: "https://placehold.co/100x100.png",
    imageHint: "male professor",
    quote: "Srivathsa is an exceptionally quick learner with a remarkable talent for dissecting complex problems. His enthusiasm for AI is contagious and his contributions in class projects were always insightful.",
  },
  {
    name: "Jane Doe",
    title: "Design Hackathon Lead",
    avatar: "JD",
    image: "https://placehold.co/100x100.png",
    imageHint: "female professional",
    quote: "As a leader, Srivathsa brought both creative vision and technical expertise to our team. His 3D design skills were pivotal to our win, and he fostered a truly collaborative environment.",
  },
  {
    name: "John Smith",
    title: "Internship Mentor, TechCorp",
    avatar: "JS",
    image: "https://placehold.co/100x100.png",
    imageHint: "male professional",
    quote: "During his internship, Srivathsa demonstrated impressive initiative on our embedded Linux project. He's a proactive problem-solver who isn't afraid to tackle challenging tasks head-on.",
  },
];

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      title="Testimonials"
      subtitle="Words from Collaborators & Mentors"
      className="bg-card/20 backdrop-blur-sm"
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {testimonialData.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2">
              <div className="p-1">
                <Card className="h-full bg-card/80 border-primary/20 backdrop-blur-sm p-6 flex flex-col justify-between min-h-[300px]">
                    <CardContent className="p-0 space-y-4">
                        <Quote className="w-8 h-8 text-primary" />
                        <p className="text-foreground/90 italic">"{testimonial.quote}"</p>
                        <div className="flex items-center gap-4 pt-4">
                            <Avatar>
                                <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.imageHint} />
                                <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold font-headline text-primary">{testimonial.name}</p>
                                <p className="text-sm text-foreground/70">{testimonial.title}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-primary" />
        <CarouselNext className="text-primary"/>
      </Carousel>
    </Section>
  );
}
