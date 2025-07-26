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
      background: `radial-gradient(circle at ${x}px ${y}px, hsla(var(--primary) / 0.1), hsla(var(--primary) / 0) 50%)`,
    });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setTransformStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' });
    setGlowStyle({});
  };

  return (
    <Card
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn('relative transition-transform duration-300 ease-out will-change-transform', className)}
      style={transformStyle}
      {...props}
    >
      <div className="relative z-10 h-full">{children}</div>
      {isHovering && (
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-100 transition-opacity duration-300"
          style={glowStyle}
        />
      )}
    </Card>
  );
}