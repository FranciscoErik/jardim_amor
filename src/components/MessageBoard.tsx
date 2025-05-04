
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from 'lucide-react';

interface MessageBoardProps {
  messages: string[];
}

const MessageBoard: React.FC<MessageBoardProps> = ({ messages }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextMessage = () => {
    setActiveIndex((prev) => (prev + 1) % messages.length);
  };
  
  const prevMessage = () => {
    setActiveIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };
  
  if (messages.length === 0) {
    return (
      <Card className="bg-white bg-opacity-80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-2xl font-dancing-script text-love-deep-purple">
            Mensagens de Amor
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-6">
          <p className="text-gray-500 italic">Ainda não há mensagens. Seja o primeiro a adicionar!</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-white bg-opacity-80 backdrop-blur-sm relative overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-2xl font-dancing-script text-love-deep-purple flex items-center justify-center gap-2">
          <Heart className="h-5 w-5 text-red-500 animate-pulse-gentle" />
          Mensagens de Amor
          <Heart className="h-5 w-5 text-red-500 animate-pulse-gentle" />
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center py-6 px-10">
        <div className="relative min-h-[120px] flex items-center justify-center">
          <div
            className="transition-all duration-500 absolute w-full"
            style={{
              opacity: 1,
              transform: 'translateY(0)',
            }}
          >
            <p className="text-lg font-dancing-script text-gray-800">{messages[activeIndex]}</p>
          </div>
        </div>
        
        {messages.length > 1 && (
          <div className="flex justify-center items-center gap-4 mt-4">
            <button 
              onClick={prevMessage} 
              className="w-8 h-8 rounded-full bg-love-light-purple text-white flex items-center justify-center hover:bg-love-deep-purple transition-colors"
              aria-label="Mensagem anterior"
            >
              ←
            </button>
            <span className="text-sm text-gray-500">
              {activeIndex + 1} / {messages.length}
            </span>
            <button 
              onClick={nextMessage} 
              className="w-8 h-8 rounded-full bg-love-light-purple text-white flex items-center justify-center hover:bg-love-deep-purple transition-colors"
              aria-label="Próxima mensagem"
            >
              →
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MessageBoard;
