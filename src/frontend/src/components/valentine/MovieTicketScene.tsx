import { useState, useEffect, useRef } from 'react';
import { ContinuePrompt } from './ContinuePrompt';

interface MovieTicketSceneProps {
  isUnlocked: boolean;
  onComplete: () => void;
  onScrollNext: () => void;
  showContinue: boolean;
}

export function MovieTicketScene({ isUnlocked, onComplete, onScrollNext, showContinue }: MovieTicketSceneProps) {
  const [ticketCaught, setTicketCaught] = useState(false);
  const [ticketPosition, setTicketPosition] = useState({ x: 50, y: 50 });
  const animationRef = useRef<number | null>(null);
  const velocityRef = useRef({ x: 2, y: 1.5 });

  useEffect(() => {
    if (isUnlocked && !ticketCaught) {
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
  }, [isUnlocked, ticketCaught]);

  const handleTicketClick = () => {
    if (!ticketCaught) {
      setTicketCaught(true);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-fun-purple-light via-fun-pink to-fun-red-light">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 text-6xl animate-float-slow opacity-20">🎬</div>
        <div className="absolute top-40 left-10 text-5xl animate-float-medium opacity-20">🍿</div>
        <div className="absolute bottom-20 right-20 text-7xl animate-float-fast opacity-20">🎥</div>
        <div className="absolute bottom-40 left-20 text-6xl animate-float-slow opacity-20">🎞️</div>
      </div>

      {/* Locked state */}
      {!isUnlocked && (
        <div className="text-center z-10">
          <div className="text-8xl mb-4 opacity-30">🎟️</div>
          <p className="text-fun-text/50 font-playful text-2xl">Keep scrolling to unlock...</p>
        </div>
      )}

      {/* Floating ticket */}
      {isUnlocked && !ticketCaught && (
        <button
          onClick={handleTicketClick}
          className="absolute z-20 cursor-pointer transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-fun-red/50 rounded-2xl"
          style={{
            left: `${ticketPosition.x}%`,
            top: `${ticketPosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          aria-label="Click to catch the ticket"
        >
          <div className="bg-white rounded-2xl shadow-fun p-6 animate-gentle-float">
            <div className="text-7xl">🎟️</div>
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-900 font-playful text-lg animate-pulse whitespace-nowrap">
            Catch me!
          </div>
        </button>
      )}

      {/* Caught ticket - enlarged and revealed */}
      {ticketCaught && (
        <div className="relative z-30 animate-ticket-reveal max-w-[90vw] w-full px-4">
          <div className="bg-white rounded-3xl shadow-fun-xl p-8 md:p-12 max-w-2xl mx-auto">
            <div className="text-center font-playful">
              <div className="text-6xl md:text-7xl mb-6">🎬 Movie Night</div>
              <div className="text-2xl md:text-3xl mb-3 text-gray-900 font-bold">February 14, 2026</div>
              <div className="text-xl md:text-2xl mb-2 text-gray-800">Movie: TBD</div>
              <div className="text-xl md:text-2xl text-gray-800">Time: 10 PM (MT)</div>
            </div>
          </div>
        </div>
      )}

      {/* Continue prompt */}
      {showContinue && <ContinuePrompt onContinue={onScrollNext} />}
    </div>
  );
}
