import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card/30 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-headline text-md font-bold text-primary">
          Srivathsa S Murthy
        </div>
        <div className="flex gap-4">
            <Link href="https://github.com/Sv1745" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://www.linkedin.com/in/srivathsa-s-murthy/" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
            </Link>
        </div>
        <p className="text-sm text-foreground/60">&copy; {new Date().getFullYear()} Srivathsa S Murthy. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
