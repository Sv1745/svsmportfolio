
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from 'react';

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#tech-arsenal", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent">
      <div className="container mx-auto flex h-20 items-center justify-center px-4 md:px-6">
        <nav className="hidden items-center gap-6 md:flex">
          <div className="rounded-full border border-border/50 bg-card/50 p-px backdrop-blur-sm">
            <div className="flex items-center gap-2 rounded-full px-4 py-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary px-3 py-1.5 rounded-full">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
        <div className="md:hidden ml-auto">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/90">
              <div className="grid gap-4 p-4">
                <div className="flex items-center gap-2 font-headline text-lg font-bold text-primary mb-4" onClick={() => setOpen(false)}>
                  Srivathsa S Murthy
                </div>
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
