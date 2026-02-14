import { useState, useEffect, useRef } from 'react';
import { ASSETS } from './assets';
import { ChevronDown } from 'lucide-react';

interface MovieTicketSceneProps {
  isActive: boolean;
  onComplete: () => void;
  onScrollNext: () => void;
}

export function MovieTicketScene({ isActive, onComplete, onScrollNext }: MovieTicketSceneProps) {
  const [ticketCaught, setTicketCaught] = useState(false);
  const [ticketPosition, setTicketPosition] = useState({ x: 50, y: 50 });
  const [showScrollHint, setShowScrollHint] = useState(false);
  const animationRef = useRef<number | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef({ x: 2, y: 1.5 });

  useEffect(() => {
    if (isActive && !ticketCaught) {
      const animate = () => {
        setTicketPosition((prev) => {
          let newX = prev.x + velocityRef.current.x;
          let newY = prev.y + velocityRef.current.y;

          // Bounce off edges
          if (newX <= 5 || newX >= 85) {
            velocityRef.current.x *= -1;
            newX = Math.max(5, Math.min(85, newX));
          }
          if (newY <= 10 || newY >= 80) {
            velocityRef.current.y *= -1;
            newY = Math.max(10, Math.min(80, newY));
          }

          return { x: newX, y: newY };
        });

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isActive, ticketCaught]);

  const handleTicketClick = () => {
    if (!ticketCaught) {
      setTicketCaught(true);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      setTimeout(() => {
        setShowScrollHint(true);
        onComplete();
      }, 1500);
    }
  };

  const handleScroll = () => {
    if (showScrollHint && sceneRef.current) {
      const rect = sceneRef.current.getBoundingClientRect();
      if (rect.bottom < window.innerHeight / 2) {
        onScrollNext();
      }
    }
  };

  useEffect(() => {
    if (showScrollHint) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showScrollHint]);

  if (!isActive) return null;

  return (
    <div
      ref={sceneRef}
      className="relative w-full min-h-screen flex items-center justify-center"
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

      {/* Floating ticket */}
      {!ticketCaught && (
        <button
          onClick={handleTicketClick}
          className="absolute z-20 cursor-pointer transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-vintage-gold/50"
          style={{
            left: `${ticketPosition.x}%`,
            top: `${ticketPosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          aria-label="Click to catch the ticket"
        >
          <img
            src={ASSETS.movieTicket}
            alt="Movie Ticket"
            className="w-64 md:w-80 h-auto drop-shadow-2xl animate-gentle-float"
          />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-vintage-gold/80 text-sm font-handwritten animate-pulse whitespace-nowrap">
            Catch me!
          </div>
        </button>
      )}

      {/* Caught ticket - enlarged and revealed */}
      {ticketCaught && (
        <div className="relative z-30 animate-ticket-reveal">
          <div className="relative">
            <img
              src={ASSETS.movieTicket}
              alt="Movie Ticket"
              className="w-[500px] max-w-[90vw] h-auto drop-shadow-2xl animate-shimmer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-vintage-ink font-handwritten p-8">
                <div className="text-4xl md:text-5xl mb-4">🎬 Movie Night</div>
                <div className="text-xl md:text-2xl mb-2">February 14, 2026</div>
                <div className="text-lg md:text-xl mb-2">Movie: TBD</div>
                <div className="text-lg md:text-xl mb-6">Time: 10 PM (MT)</div>
                <div className="text-base md:text-lg italic text-vintage-gold mt-8">
                  "Front row seats to forever with you."
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to continue indicator */}
      {showScrollHint && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce-slow">
          <div className="flex flex-col items-center gap-2 text-vintage-gold">
            <span className="text-sm font-handwritten">Scroll to continue</span>
            <ChevronDown className="w-6 h-6 animate-glow" />
          </div>
        </div>
      )}
    </div>
  );
}
