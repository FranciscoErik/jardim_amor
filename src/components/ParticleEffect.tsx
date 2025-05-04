
import React, { useEffect, useState } from 'react';

interface ParticleProps {
  active: boolean;
}

const ParticleEffect: React.FC<ParticleProps> = ({ active }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; duration: number; image: string; rotation: number; size: number }>>([]);
  
  const flowerEmojis = ["🌸", "🌹", "🌷", "💐", "🌺", "🌻", "🌼", "💮", "🏵️", "💝", "💖", "🥀"];
  
  useEffect(() => {
    if (!active) return;
    
    const intervalId = setInterval(() => {
      const newParticle = {
        id: Math.random(),
        x: Math.random() * 100,
        duration: 5 + Math.random() * 5,
        image: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
        rotation: Math.random() * 360,
        size: 0.8 + Math.random() * 0.6, // Size between 0.8 and 1.4
      };
      
      setParticles((prev) => [...prev, newParticle]);
      
      // Clean up old particles to prevent memory leaks
      setParticles((prev) => prev.filter((p) => document.getElementById(`particle-${p.id}`)));
    }, 300);
    
    return () => clearInterval(intervalId);
  }, [active]);
  
  useEffect(() => {
    // Remove particles after animation completes
    particles.forEach((particle) => {
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== particle.id));
      }, particle.duration * 1000);
    });
  }, [particles]);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <div
          id={`particle-${particle.id}`}
          key={particle.id}
          className="flower-particle text-3xl"
          style={{
            left: `${particle.x}%`,
            animationDuration: `${particle.duration}s`,
            transform: `rotate(${particle.rotation}deg)`,
            fontSize: `${particle.size * 3}rem`,
          }}
        >
          {particle.image}
        </div>
      ))}
    </div>
  );
};

export default ParticleEffect;
