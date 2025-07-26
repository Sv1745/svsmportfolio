import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Testimonials } from '@/components/Testimonials';
import { Journey } from '@/components/Journey';
import { Contact } from '@/components/Contact';
import { ResumeRefiner } from '@/components/ResumeRefiner';
import { TechArsenal } from '@/components/TechArsenal';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <TechArsenal />
        <Projects />
        <Testimonials />
        <Journey />
        <ResumeRefiner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
