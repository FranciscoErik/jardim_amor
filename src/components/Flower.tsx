
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlowerProps {
  position: { x: number; y: number };
  color: string;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
}

const Flower: React.FC<FlowerProps> = ({ 
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
        {/* Flower stem */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-20 bg-love-soft-green rounded-full"></div>
        
        {/* Flower petals */}
        <div className={cn(
          "relative transition-all duration-1000",
          sizeClass[size],
          isBlossomed ? "animate-grow" : "opacity-70 scale-90",
        )}>
          {[0, 1, 2, 3, 4, 5].map((petal) => (
            <div
              key={petal}
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-1000",
                sizeClass[size]
              )}
              style={{
                backgroundColor: color,
                opacity: isBlossomed ? 0.9 : 0.5,
                transform: isBlossomed 
                  ? `translate(-50%, -50%) rotate(${petal * 60}deg)`
                  : `translate(-50%, -50%) rotate(${petal * 60}deg) scale(0.4)`,
                transformOrigin: 'center',
              }}
            ></div>
          ))}
          
          {/* Flower center */}
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300 flex items-center justify-center",
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
          <div className="absolute top-0 -translate-y-full mt-2 bg-white bg-opacity-90 p-2 rounded-lg shadow-md animate-grow z-10 w-48 text-center">
            <p className="text-sm font-dancing-script">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flower;
