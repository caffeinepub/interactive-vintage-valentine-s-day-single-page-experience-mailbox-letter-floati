import { Heart } from 'lucide-react';

interface LoadingOverlayProps {
  progress: number;
}

export function LoadingOverlay({ progress }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-fun-pink-light via-fun-pink to-fun-red-light flex items-center justify-center z-50">
      <div className="text-center">
        <Heart className="w-16 h-16 text-fun-red mx-auto mb-4 animate-pulse" />
        <p className="text-fun-red font-playful text-3xl mb-4">
          Preparing your Valentine's experience...
        </p>
        <div className="w-64 h-3 bg-white/30 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-fun-red transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-fun-red/80 font-playful text-lg mt-2">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
