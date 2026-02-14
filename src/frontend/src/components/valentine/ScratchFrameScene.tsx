import { useEffect, useRef, useState } from 'react';
import { ASSETS } from './assets';
import { useScratchOffCanvas } from '../../hooks/useScratchOffCanvas';

interface ScratchFrameSceneProps {
  isActive: boolean;
}

export function ScratchFrameScene({ isActive }: ScratchFrameSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  
  const { canvasRef, scratchPercentage } = useScratchOffCanvas({
    overlayImage: ASSETS.scratchOverlay,
    enabled: isActive,
  });

  useEffect(() => {
    if (scratchPercentage > 60 && !revealed) {
      setRevealed(true);
    }
  }, [scratchPercentage, revealed]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center py-16"
    >
      {/* Background with paper texture */}
      <div
        className="absolute inset-0 bg-vintage-dark"
        style={{
          backgroundImage: `url(${ASSETS.paperTexture})`,
          backgroundSize: '512px 512px',
          backgroundRepeat: 'repeat',
        }}
      />
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
      
      {/* Candlelight flicker overlay */}
      <div className="absolute inset-0 bg-vintage-glow/10 animate-candle-flicker pointer-events-none" />

      {/* Frame with scratch-off */}
      <div className="relative z-10 max-w-[90vw] max-h-[80vh]">
        {/* Gold frame */}
        <div className="relative">
          <img
            src={ASSETS.goldFrame}
            alt="Gold Frame"
            className="w-full h-auto drop-shadow-2xl"
          />
          
          {/* Image area inside frame */}
          <div className="absolute inset-[8%] flex items-center justify-center overflow-hidden">
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
          </div>
        </div>

        {/* Instruction hint */}
        {!revealed && (
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-vintage-gold text-sm font-handwritten animate-pulse text-center">
            Scratch to reveal
          </div>
        )}

        {/* Completion message */}
        {revealed && (
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-vintage-gold text-lg font-handwritten animate-fade-in text-center">
            ❤️ Happy Valentine's Day ❤️
          </div>
        )}
      </div>
    </div>
  );
}
