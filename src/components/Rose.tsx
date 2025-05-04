
import React, { useState } from 'react';
import { Heart, Flower } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoseProps {
  position: { x: number; y: number };
  color: string;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
}

const Rose: React.FC<RoseProps> = ({ 
  position, 
  color, 
  message = '',
  size = 'md',
  delay = 0
}) => {
  const [isBlossomed, setIsBlossomed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  
  const sizeClass = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };
  
  const handleClick = () => {
    if (!isBlossomed) {
      setIsBlossomed(true);
      setTimeout(() => {
        setShowMessage(true);
      }, 500);
    } else {
      setShowMessage(!showMessage);
    }
  };
  
  const petalSpacing = isBlossomed ? 12 : 3;
  
  return (
    <div 
      className="absolute cursor-pointer transition-all duration-500"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        animationDelay: `${delay}s`
      }}
      onClick={handleClick}
    >
      <div className="relative">
        {/* Rose stem with leaves */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-24 bg-love-soft-green rounded-full">
          {/* Left leaf */}
          <div className="absolute -left-4 top-8 w-6 h-3 bg-love-soft-green rounded-full -rotate-45"></div>
          {/* Right leaf */}
          <div className="absolute -right-4 top-14 w-6 h-3 bg-love-soft-green rounded-full rotate-45"></div>
        </div>
        
        {/* Rose petals */}
        <div className={cn(
          "relative transition-all duration-1000",
          sizeClass[size],
          isBlossomed ? "animate-grow" : "opacity-70 scale-90",
        )}>
          {[...Array(12)].map((_, petal) => {
            const angle = (petal * 30) % 360;
            const offsetDistance = isBlossomed ? petal % 4 * 2 : 0;
            const scale = isBlossomed ? 0.8 - (petal % 4 * 0.1) : 0.5;
            
            return (
              <div
                key={petal}
                className={cn(
                  "absolute top-1/2 left-1/2 rounded-full transition-all duration-1000",
                  "rose-petal"
                )}
                style={{
                  backgroundColor: color,
                  opacity: isBlossomed ? 0.95 - (petal % 4 * 0.1) : 0.5,
                  width: `${85 - (petal % 4 * 10)}%`,
                  height: `${85 - (petal % 4 * 10)}%`,
                  transform: isBlossomed 
                    ? `translate(-50%, -50%) rotate(${angle}deg) translateX(${offsetDistance}px) scale(${scale})`
                    : `translate(-50%, -50%) rotate(${angle}deg) scale(0.4)`,
                  transformOrigin: 'center',
                  zIndex: 20 - petal,
                }}
              ></div>
            );
          })}
          
          {/* Rose center */}
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300 flex items-center justify-center z-30",
              isBlossomed ? "animate-pulse-gentle" : "",
              {
                'w-6 h-6': size === 'sm',
                'w-8 h-8': size === 'md',
                'w-10 h-10': size === 'lg',
              }
            )}
          >
            {isBlossomed && (
              <Heart 
                className={cn(
                  "text-red-500 animate-heart-beat",
                  {
                    'w-3 h-3': size === 'sm',
                    'w-4 h-4': size === 'md',
                    'w-5 h-5': size === 'lg',
                  }
                )}
              />
            )}
          </div>
        </div>
        
        {/* Message */}
        {message && showMessage && (
          <div className="absolute top-0 -translate-y-full mt-2 bg-white bg-opacity-90 p-2 rounded-lg shadow-md animate-grow z-40 w-48 text-center">
            <p className="text-sm font-dancing-script">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rose;
