
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Heart } from 'lucide-react';

interface MessageFormProps {
  onAddMessage: (message: string) => void;
  onPlantFlower: (color: string, message: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onAddMessage, onPlantFlower }) => {
  const [message, setMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FFB6C1');
  const { toast } = useToast();
  
  const colors = [
    { name: 'Rosa', value: '#FFB6C1' },
    { name: 'Lilás', value: '#D8BFD8' },
    { name: 'Azul', value: '#BFEFFF' },
    { name: 'Amarelo', value: '#FFFACD' },
    { name: 'Laranja', value: '#FFDAB9' },
    { name: 'Verde', value: '#c1f0dd' },
  ];
  
  const handleAddMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onAddMessage(message);
      toast({
        title: "Mensagem enviada",
        description: "Sua mensagem de amor foi adicionada ao jardim.",
      });
      setMessage('');
    }
  };
  
  const handlePlantFlower = () => {
    if (message.trim()) {
      onPlantFlower(selectedColor, message);
      toast({
        title: "Flor plantada!",
        description: "Uma nova flor cresceu no seu jardim com sua mensagem.",
      });
      setMessage('');
    } else {
      toast({
        title: "Ops!",
        description: "Por favor, escreva uma mensagem para plantar uma flor.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="bg-love-rose bg-opacity-70 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-dancing-script mb-4 text-love-deep-purple text-center">Adicione amor ao nosso jardim</h2>
      
      <form onSubmit={handleAddMessage} className="space-y-4">
        <Textarea 
          placeholder="Escreva uma mensagem de amor..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-white bg-opacity-70 border-love-light-purple focus:border-love-deep-purple min-h-[100px]"
        />
        
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          {colors.map((color) => (
            <button
              key={color.value}
              type="button"
              className={`w-8 h-8 rounded-full transition-transform ${selectedColor === color.value ? 'ring-2 ring-offset-2 ring-love-deep-purple scale-110' : 'hover:scale-110'}`}
              style={{ backgroundColor: color.value }}
              onClick={() => setSelectedColor(color.value)}
              title={color.name}
            />
          ))}
        </div>
        
        <div className="flex justify-between gap-4">
          <Button
            type="button"
            className="bg-love-mint hover:bg-love-soft-green text-love-deep-purple flex-1"
            onClick={handlePlantFlower}
          >
            <Heart className="mr-2 h-4 w-4" /> Plantar Flor
          </Button>
          
          <Button
            type="submit"
            className="bg-love-light-purple hover:bg-love-deep-purple flex-1"
          >
            Enviar Mensagem
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
