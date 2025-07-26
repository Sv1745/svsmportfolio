import { cn } from "@/lib/utils";
import React from "react";

type SectionProps = {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, title, subtitle, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="gradient-heading text-3xl md:text-4xl font-headline font-bold tracking-wider uppercase">{title}</h2>
          <p className="mt-2 text-lg text-foreground/70">{subtitle}</p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>
        {children}
      </div>
    </section>
  );
}
