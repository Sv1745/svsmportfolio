
'use client';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Send, Download } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const roles = ["Developer", "Designer", "Animator"];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentRole, setCurrentRole] = useState(roles[0]);

  useEffect(() => {
    if (subIndex === currentRole.length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }
    
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, currentRole]);
  
  useEffect(() => {
    setCurrentRole(roles[index]);
  }, [index])

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-start gap-6 p-4 md:p-8 max-w-4xl mx-auto w-full -mt-24">
        <div className="p-6 md:p-8 text-left">
            <p className="text-4xl md:text-5xl font-cursive text-primary mb-2">Hello, Universe. I'm</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tighter text-white whitespace-nowrap">
                Srivathsa S Murthy
            </h1>
            <div className="mt-4 text-3xl md:text-5xl text-primary font-headline font-extrabold h-14 drop-shadow-[0_0_10px_hsl(var(--primary))]">
              <span className="relative">
                {currentRole.substring(0, subIndex)}
                <span className="absolute -right-2.5 top-0 bottom-0 w-1 bg-primary animate-ping" />
              </span>
            </div>
        </div>
        <div className="flex items-center gap-6 px-6 md:px-8">
            <Link href="https://github.com/Sv1745" target="_blank" rel="noopener noreferrer" className="text-foreground/90 hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_5px_hsl(var(--primary))]">
                <Github className="h-8 w-8" />
                <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://www.linkedin.com/in/srivathsa-s-murthy/" target="_blank" rel="noopener noreferrer" className="text-foreground/90 hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_5px_hsl(var(--primary))]">
                <Linkedin className="h-8 w-8" />
                <span className="sr-only">LinkedIn</span>
            </Link>
        </div>
        <div className='mt-4 px-6 md:px-8 flex flex-col sm:flex-row gap-4'>
            <div className="animated-border-box rounded-md">
                <Button asChild variant="ghost" className="bg-background/80 hover:bg-background/90 text-primary hover:text-primary w-full sm:w-auto rounded-md">
                    <Link href="#contact">
                        <Send className="mr-2 h-4 w-4" /> Get in Touch
                    </Link>
                </Button>
            </div>
            <div className="animated-border-box rounded-md">
                <Button asChild variant="outline" className="bg-background/80 hover:bg-primary hover:text-primary-foreground text-primary w-full sm:w-auto rounded-md border-primary/50">
                    <Link href="/Srivathsa-RESUME.pdf" target="_blank" download>
                        <Download className="mr-2 h-4 w-4" /> Download Resume
                    </Link>
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
