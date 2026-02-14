import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';

interface ContinuePromptProps {
  onContinue: () => void;
}

export function ContinuePrompt({ onContinue }: ContinuePromptProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce-slow">
      <Button
        onClick={onContinue}
        className="bg-fun-red hover:bg-fun-red-dark text-white font-playful text-lg px-8 py-6 rounded-full shadow-fun-xl flex items-center gap-2"
      >
        Continue
        <ChevronDown className="w-5 h-5" />
      </Button>
    </div>
  );
}
