import { useEffect, useRef, useState } from 'react';
import { ASSETS } from './assets';
import { useScratchOffCanvas } from '../../hooks/useScratchOffCanvas';

interface ScratchFrameSceneProps {
  isUnlocked: boolean;
}

export function ScratchFrameScene({ isUnlocked }: ScratchFrameSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  
  const { canvasRef, scratchPercentage } = useScratchOffCanvas({
    overlayImage: ASSETS.scratchOverlay,
    enabled: isUnlocked,
  });

  useEffect(() => {
    if (scratchPercentage > 60 && !revealed) {
      setRevealed(true);
      setShowSparkles(true);
      // Hide sparkles after animation completes
      setTimeout(() => setShowSparkles(false), 1500);
    }
  }, [scratchPercentage, revealed]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center py-16 bg-gradient-to-br from-fun-red-light via-fun-pink-light to-fun-purple-light"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-float-slow opacity-20">✨</div>
        <div className="absolute top-20 right-20 text-5xl animate-float-medium opacity-20">💫</div>
        <div className="absolute bottom-20 left-20 text-7xl animate-float-fast opacity-20">⭐</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-float-slow opacity-20">🌟</div>
      </div>

      {/* Locked state */}
      {!isUnlocked && (
        <div className="text-center z-10">
          <div className="text-8xl mb-4 opacity-30">🖼️</div>
          <p className="text-fun-text/50 font-playful text-2xl">Keep scrolling to unlock...</p>
        </div>
      )}

      {/* Frame with scratch-off */}
      {isUnlocked && (
        <div className={`relative z-10 max-w-[90vw] max-h-[80vh] ${revealed ? 'animate-reveal-pop' : ''}`}>
          {/* Gold frame */}
          <div className="relative bg-gradient-to-br from-fun-gold via-fun-gold-light to-fun-gold rounded-3xl p-4 shadow-fun-xl">
            <div className="bg-white rounded-2xl p-2">
              {/* Image area inside frame */}
              <div className="relative aspect-[7/5] overflow-hidden rounded-xl">
                {/* Couple illustration (underneath) */}
                <img
                  src={ASSETS.coupleIllustration}
                  alt="Couple Illustration"
                  className="w-full h-full object-cover"
                />
                
                {/* Scratch-off canvas overlay */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full cursor-pointer touch-none"
                  style={{ touchAction: 'none' }}
                />

                {/* Sparkle burst overlay */}
                {showSparkles && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 text-4xl animate-sparkle-burst-1">✨</div>
                    <div className="absolute top-1/3 right-1/4 text-5xl animate-sparkle-burst-2">💫</div>
                    <div className="absolute bottom-1/3 left-1/3 text-4xl animate-sparkle-burst-3">⭐</div>
                    <div className="absolute bottom-1/4 right-1/3 text-5xl animate-sparkle-burst-4">🌟</div>
                    <div className="absolute top-1/2 left-1/2 text-6xl animate-sparkle-burst-center">💖</div>
                    <div className="absolute top-1/5 left-1/2 text-3xl animate-sparkle-burst-5">✨</div>
                    <div className="absolute bottom-1/5 left-1/2 text-3xl animate-sparkle-burst-6">💫</div>
                    <div className="absolute top-1/2 left-1/5 text-3xl animate-sparkle-burst-7">⭐</div>
                    <div className="absolute top-1/2 right-1/5 text-3xl animate-sparkle-burst-8">🌟</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Instruction hint */}
          {!revealed && (
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-gray-900 font-playful text-lg animate-pulse text-center">
              Scratch to reveal! ✨
            </div>
          )}

          {/* Completion message */}
          {revealed && (
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-gray-900 font-playful text-2xl animate-fade-in text-center">
              ❤️ Happy Valentine's Day ❤️
            </div>
          )}
        </div>
      )}
    </div>
  );
}
