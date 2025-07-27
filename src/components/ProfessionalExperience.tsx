"use client";

import { Section } from "./Section";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2, Cpu, Brain, Code, Users, ChevronRight, Calendar, Trophy, Award, Zap } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";

const experiences = [
  {
    role: "President",
    company: "Diseño Divino",
    date: "Nov 2024 - Present",
    category: "Leadership",
    icon: Users,
    color: "from-blue-600 to-blue-800",
    description: "Leading the design and creative club, organizing events and fostering innovation in digital arts and design.",
    achievements: [
      "Led team of 50+ members",
      "Organized 5+ major events",
      "Increased club membership by 200%"
    ]
  },
  {
    role: "1st Place Winner - Parallax Designation 2.0",
    company: "PES University - Mosaic Club",
    date: "Sep 2024",
    category: "Achievement",
    icon: Trophy,
    color: "from-emerald-600 to-emerald-800",
    description: "Secured 1st place at the Parallax Designation 2.0, a design hackathon. Transformed challenging problem statement into innovative design solution for Personalized Learning in Underprivileged Communities.",
    achievements: [
      "30 hours of intensive creativity and collaboration",
      "Innovative solution for underprivileged communities",
      "Team collaboration with Rohith Vishwanath and Sai Niranjan S",
      "Mentored by industry experts"
    ]
  },
  {
    role: "1st Place Winner - GEEKMAYHEM",
    company: "NMIT - Blockchain & Cybersecurity Club",
    date: "May 2024",
    category: "Achievement",
    icon: Award,
    color: "from-purple-600 to-purple-800",
    description: "Won first prize at GEEKMAYHEM tech fest. Team 'Codengers' excelled in quiz rounds, HackerRank challenges, and web development questions as part of NMIT's Anaadyanta annual fest.",
    achievements: [
      "Placed 4th out of 22 teams initially",
      "Split into sub-teams: The Wanderers and The Intellectuals",
      "Solved HackerRank challenges and web development problems",
      "Team collaboration under pressure"
    ]
  },
  {
    role: "Web Developer",
    company: "Q-Bits",
    date: "Oct 2024 - Present",
    category: "Development",
    icon: Code,
    color: "from-cyan-600 to-cyan-800",
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
    icon: Cpu,
    color: "from-orange-600 to-orange-800",
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
    icon: Brain,
    color: "from-indigo-600 to-indigo-800",
    description: "Active member contributing to Google technologies and community building.",
    achievements: [
      "Mentored 20+ students",
      "Organized 3+ workshops",
      "Led Android development sessions"
    ]
  }
];


// ** FIX APPLIED HERE **
// This component now generates particles only on the client-side to prevent hydration errors.
const DustParticles = ({ count = 30 }) => {
    type Particle = {
        id: number;
        style: React.CSSProperties;
    };
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const generatedParticles = Array.from({ length: count }).map((_, i) => ({
            id: i,
            style: {
                left: `${Math.random() * 20}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDuration: `${Math.random() * 15 + 10}s`,
                animationDelay: `${Math.random() * 10}s`,
            },
        }));
        setParticles(generatedParticles);
    }, [count]);

    return (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
            {particles.map(p => (
                <div key={p.id} className="absolute bg-slate-600/70 rounded-full animate-dust" style={p.style} />
            ))}
        </div>
    );
};


export function ProfessionalExperience() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [cardsVisible, setCardsVisible] = useState<boolean[]>(new Array(experiences.length * 2).fill(false));
  
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const isPaused = useRef(false);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    isPaused.current = true;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = 'grabbing';
  };
  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    isPaused.current = false;
    setIsDragging(false);
    containerRef.current.style.cursor = 'grab';
  };
  const handleMouseUp = () => {
    if (!containerRef.current) return;
    isPaused.current = false;
    setIsDragging(false);
    containerRef.current.style.cursor = 'grab';
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cardTimers = experiences.map((_, index) =>
      setTimeout(() => {
        setCardsVisible(prev => {
          const newVisible = [...prev];
          newVisible[index] = true;
          newVisible[index + experiences.length] = true;
          return newVisible;
        });
      }, 500 + index * 200)
    );

    const initAndScroll = () => {
      container.scrollLeft = container.scrollWidth / 2;

      const autoScroll = () => {
        if (container && !isPaused.current) {
          container.scrollLeft -= 0.3; 
          if (container.scrollLeft <= 0) {
            container.scrollLeft = container.scrollWidth / 2;
          }
        }
        animationFrameId.current = requestAnimationFrame(autoScroll);
      };
      animationFrameId.current = requestAnimationFrame(autoScroll);
    };
    
    const startTimeout = setTimeout(initAndScroll, 1500);

    return () => {
      cardTimers.forEach(clearTimeout);
      clearTimeout(startTimeout);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const loopedExperiences = [...experiences, ...experiences];

  return (
    <Section
      id="experience"
      title="Professional Experience"
      subtitle="The Cosmic Genesis of a Career"
      className="bg-gradient-to-br from-[#020413]/[0.5] via-[#040822]/[0.5] to-black/[0.5] min-h-screen relative overflow-hidden flex flex-col justify-center"
    >
      <div className="absolute inset-y-0 left-0 w-1/3 z-0 bg-gradient-to-r from-indigo-900/40 via-indigo-900/10 to-transparent pointer-events-none animate-pulse-slow" />
      <div className="absolute inset-y-0 left-0 w-96 h-96 bg-indigo-700/30 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
      <DustParticles count={30} />

      <div
        ref={containerRef}
        className="relative z-20 w-full cursor-grab active:cursor-grabbing select-none py-20"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => (isPaused.current = true)}
        onMouseOut={() => (isPaused.current = false)}
      >
        <div className="relative flex gap-12 py-16 px-8 sm:px-16 md:px-24">
            <div className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-indigo-500/50 via-slate-500/30 to-transparent -translate-y-1/2" />
          
            {loopedExperiences.map((exp, index) => {
                const Icon = exp.icon;
                const originalIndex = index % experiences.length;
                const isActive = activeCard === index;
                const isEven = originalIndex % 2 === 0;

                return (
                    <div
                        key={index}
                        className={`
                            w-[350px] md:w-[400px] flex-shrink-0 transition-all duration-1000 ease-out
                            ${cardsVisible[index] ? 'opacity-100' : 'opacity-0'}
                            ${isEven ? 'self-start mt-[-60px]': 'self-end mb-[-60px]'}
                        `}
                        style={{ 
                            transform: cardsVisible[index] ? 'translateY(0)' : (isEven ? 'translateY(-30px)' : 'translateY(30px)'),
                            transitionDelay: `${100 + originalIndex * 150}ms` 
                        }}
                        onClick={() => setActiveCard(activeCard === index ? null : index)}
                    >
                      <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-indigo-400/80 rounded-full border-2 border-slate-900 -translate-x-1/2 -translate-y-1/2" />

                      <Card className={`relative h-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-600/50 rounded-2xl overflow-hidden cursor-pointer group transform-gpu transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-indigo-500/50 ${isActive ? 'scale-105 shadow-2xl shadow-indigo-500/20 border-indigo-500/70 ring-2 ring-indigo-500/30' : ''}`}>
                         <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none" />

                         <CardHeader className="relative z-10 pb-6">
                           <div className="flex items-start justify-between mb-6">
                             <div className={`p-4 rounded-xl bg-gradient-to-br ${exp.color} shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                               <Icon className="w-7 h-7 text-white" />
                             </div>
                             <Badge className="bg-slate-700/80 text-slate-200 border-slate-500/50 px-3 py-1 text-xs sm:text-sm">
                               <Calendar className="w-3 h-3 mr-2" />
                               {exp.date}
                             </Badge>
                           </div>
                           <CardTitle className="font-bold text-xl text-white mb-3 leading-tight group-hover:text-indigo-100 transition-colors">
                             {exp.role}
                           </CardTitle>
                           <div className="flex items-center gap-3 mb-4 flex-wrap">
                             <div className="text-sm text-slate-300 font-medium">{exp.company}</div>
                             <Badge className={`text-xs px-3 py-1 bg-gradient-to-r ${exp.color} text-white border-none shadow-md font-medium`}>
                               {exp.category}
                             </Badge>
                           </div>
                         </CardHeader>

                         <CardContent className="relative z-10 pt-0 pb-6">
                           <p className="text-slate-300 text-sm leading-relaxed mb-6">
                             {exp.description}
                           </p>
                           <div className={`transition-all duration-700 ease-out overflow-hidden ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                             <div className="border-t border-slate-600/50 pt-6">
                               <h4 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
                                 <Zap className="w-4 h-4 text-yellow-400" />
                                 Key Achievements
                               </h4>
                               <ul className="space-y-3">
                                 {exp.achievements.map((ach, i) => (
                                   <li
                                     key={i}
                                     className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
                                     style={{ animation: isActive ? `slideInRight 0.6s ease-out ${i * 0.1}s both` : 'none' }}
                                   >
                                     <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                     <span>{ach}</span>
                                   </li>
                                 ))}
                               </ul>
                             </div>
                           </div>
                           <div className="absolute bottom-4 right-4">
                             <div className={`p-2 rounded-full bg-slate-700/50 border border-slate-600/50 transition-all duration-300 group-hover:bg-indigo-600/20 group-hover:border-indigo-500/50 ${isActive ? 'bg-indigo-600/30 border-indigo-500/70' : ''}`}>
                               <ChevronRight className={`w-4 h-4 text-slate-400 transition-all duration-300 ${isActive ? 'rotate-90 text-indigo-400' : 'group-hover:translate-x-0.5 group-hover:text-indigo-300'}`} />
                             </div>
                           </div>
                         </CardContent>

                         <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                      </Card>
                    </div>
                );
            })}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-center">
        <p className="text-slate-400 text-sm font-medium animate-fade-in-slow">
          Drag to explore the timeline
        </p>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes dust {
          from {
            opacity: 0.7;
            transform: translateX(0vw) scale(1);
          }
          to {
            opacity: 0;
            transform: translateX(80vw) scale(0.5);
          }
        }
        .animate-dust {
          animation: dust linear infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes fade-in-slow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 2s ease-out 2s both;
        }

        .cursor-grab {
          overflow-x: scroll;
          scrollbar-width: none;
        }
        .cursor-grab::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </Section>
  );
}