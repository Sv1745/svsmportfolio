import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { TechArsenal } from '@/components/TechArsenal';
import { ProfessionalExperience } from '@/components/ProfessionalExperience';
import { Education } from '@/components/Education';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Education />
        <TechArsenal />
        <Projects />
        <ProfessionalExperience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
