
import React, { useState, useEffect } from 'react';
import Flower from '@/components/Flower';
import Rose from '@/components/Rose';
import MessageForm from '@/components/MessageForm';
import MessageBoard from '@/components/MessageBoard';
import ParticleEffect from '@/components/ParticleEffect';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Default romantic messages
const defaultMessages = [
  "Todo dia é especial ao seu lado",
  "Você é o amor da minha vida",
  "Meu coração bate mais forte por você",
  "Você ilumina meus dias mais sombrios",
  "Cada momento com você é um tesouro",
];

// Default flowers for the garden
const defaultFlowers = [
  { position: { x: 20, y: 40 }, color: '#FFB6C1', message: 'Te amo todos os dias', size: 'md' as const },
  { position: { x: 80, y: 60 }, color: '#D8BFD8', message: 'Você é minha paixão', size: 'lg' as const },
  { position: { x: 50, y: 30 }, color: '#BFEFFF', message: 'Meu amor por você é infinito', size: 'sm' as const },
  { position: { x: 30, y: 70 }, color: '#c1f0dd', message: 'Meu coração é seu', size: 'md' as const },
];

// Default roses for the garden
const defaultRoses = [
  { position: { x: 65, y: 35 }, color: '#FF6B81', message: 'Minha rosa mais linda é você', size: 'md' as const },
  { position: { x: 15, y: 55 }, color: '#E84A5F', message: 'Te amarei para sempre', size: 'lg' as const },
  { position: { x: 40, y: 65 }, color: '#FF7FAC', message: 'Cada rosa representa meu amor', size: 'sm' as const },
];

const Index = () => {
  const [flowers, setFlowers] = useState(defaultFlowers);
  const [roses, setRoses] = useState(defaultRoses);
  const [messages, setMessages] = useState(defaultMessages);
  const [showParticles, setShowParticles] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [entered, setEntered] = useState(false);

  // Create particle effect periodically
  useEffect(() => {
    if (!entered) return;
    
    const particleInterval = setInterval(() => {
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 2000);
    }, 15000);
    
    return () => clearInterval(particleInterval);
  }, [entered]);
  
  const handleAddMessage = (message: string) => {
    setMessages((prev) => [...prev, message]);
  };
  
  const handlePlantFlower = (color: string, message: string) => {
    // Decide between planting a rose or a regular flower (50% chance)
    const isRose = Math.random() > 0.5;
    
    const newPlant = {
      position: {
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
      },
      color,
      message,
      size: ['sm', 'md', 'lg'][Math.floor(Math.random() * 3)] as 'sm' | 'md' | 'lg',
    };
    
    if (isRose) {
      setRoses((prev) => [...prev, newPlant]);
    } else {
      setFlowers((prev) => [...prev, newPlant]);
    }
    
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 2000);
  };
  
  const enterGarden = () => {
    setShowIntro(false);
    setTimeout(() => setEntered(true), 500);
  };
  
  if (showIntro) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-love p-4">
        <div className="text-center max-w-md w-full bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-8 shadow-lg animate-float">
          <h1 className="text-4xl font-dancing-script mb-6 text-love-deep-purple">
            Meu Amor Digital
          </h1>
          
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16 text-red-500 animate-heart-beat" />
          </div>
          
          <p className="text-lg mb-8 text-gray-700">
            Bem-vinda ao nosso jardim especial, um lugar só nosso onde crescem flores e rosas do nosso amor.
          </p>
          
          <Button 
            onClick={enterGarden}
            className="bg-love-light-purple hover:bg-love-deep-purple text-white font-medium py-2 px-6 rounded-full text-lg"
          >
            Entrar no Jardim
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-love">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-love-pink rounded-full blur-3xl animate-pulse-gentle" />
        <div className="absolute top-[40%] right-[10%] w-44 h-44 bg-love-light-purple rounded-full blur-3xl animate-pulse-gentle" style={{animationDelay: "2s"}} />
        <div className="absolute bottom-[20%] left-[30%] w-36 h-36 bg-love-mint rounded-full blur-3xl animate-pulse-gentle" style={{animationDelay: "4s"}} />
      </div>

      <ParticleEffect active={showParticles} />

      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
        <header className="text-center mb-8 animate-grow">
          <h1 className="text-4xl font-dancing-script mb-2 text-love-deep-purple text-shadow-lg">
            Nosso Jardim Digital
          </h1>
          <p className="text-lg text-gray-600 font-quicksand">
            Um espaço cheio de amor para florescer sentimentos
          </p>
        </header>

        {entered && (
          <>
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="w-full md:w-1/3 animate-grow" style={{ animationDelay: "0.2s" }}>
                <MessageForm onAddMessage={handleAddMessage} onPlantFlower={handlePlantFlower} />
              </div>
              <div className="w-full md:w-2/3 animate-grow" style={{ animationDelay: "0.4s" }}>
                <MessageBoard messages={messages} />
              </div>
            </div>

            <div className="flex-grow relative border-4 border-dashed border-love-rose border-opacity-40 rounded-lg mb-8 min-h-[400px] animate-grow" style={{ animationDelay: "0.6s" }}>
              {flowers.map((flower, index) => (
                <Flower 
                  key={`flower-${index}`}
                  position={flower.position}
                  color={flower.color}
                  message={flower.message}
                  size={flower.size}
                  delay={index * 0.2}
                />
              ))}
              
              {roses.map((rose, index) => (
                <Rose
                  key={`rose-${index}`}
                  position={rose.position}
                  color={rose.color}
                  message={rose.message}
                  size={rose.size}
                  delay={index * 0.2 + 0.1}
                />
              ))}
            </div>
          </>
        )}

        <footer className="text-center text-gray-500 py-4">
          <p className="font-dancing-script text-lg">Com muito amor ❤️</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
