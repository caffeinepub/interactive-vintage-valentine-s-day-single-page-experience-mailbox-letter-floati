import { Heart } from 'lucide-react';

interface LoadingOverlayProps {
  progress: number;
}

export function LoadingOverlay({ progress }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-vintage-dark flex items-center justify-center z-50">
      <div className="text-center">
        <Heart className="w-16 h-16 text-vintage-gold mx-auto mb-4 animate-pulse" />
        <p className="text-vintage-gold font-handwritten text-2xl mb-4">
          Preparing your Valentine's experience...
        </p>
        <div className="w-64 h-2 bg-vintage-dark-lighter rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-vintage-gold transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-vintage-gold/60 font-handwritten text-sm mt-2">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
