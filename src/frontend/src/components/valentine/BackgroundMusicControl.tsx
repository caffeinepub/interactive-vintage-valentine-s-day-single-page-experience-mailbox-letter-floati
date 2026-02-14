import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '../ui/button';

interface BackgroundMusicControlProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export function BackgroundMusicControl({ isMuted, onToggleMute }: BackgroundMusicControlProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onToggleMute}
        variant="outline"
        size="lg"
        className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-fun border-2 border-fun-red/20 rounded-full px-6 py-3 gap-2"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      >
        {isMuted ? (
          <>
            <VolumeX className="w-5 h-5 text-fun-red" />
            <span className="font-playful text-gray-900">Unmute</span>
          </>
        ) : (
          <>
            <Volume2 className="w-5 h-5 text-fun-red" />
            <span className="font-playful text-gray-900">Mute</span>
          </>
        )}
      </Button>
    </div>
  );
}
