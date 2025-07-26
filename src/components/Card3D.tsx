'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Card } from './ui/card';

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card3D({ children, className, ...props }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [glowStyle, setGlowStyle] = useState({});
  const [transformStyle, setTransformStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = (y / height - 0.5) * -20;
    const rotateY = (x / width - 0.5) * 20;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
    });
    setGlowStyle({
      '--glow-x': `${x}px`,
      '--glow-y': `${y}px`,
    });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setTransformStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' });
    setGlowStyle({});
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative transition-transform duration-300 ease-out will-change-transform',
        'before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-radial before:from-primary/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300',
        'hover:before:opacity-100',
        className
      )}
      style={{
        ...transformStyle,
        ...glowStyle,
        '--glow-x': '50%',
        '--glow-y': '50%',
      } as React.CSSProperties}
      {...props}
    >
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
