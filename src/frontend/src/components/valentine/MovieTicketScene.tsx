import { useState, useRef } from 'react';
import { ContinuePrompt } from './ContinuePrompt';

interface MovieTicketSceneProps {
  isUnlocked: boolean;
  onComplete: () => void;
  onScrollNext: () => void;
  showContinue: boolean;
}

export function MovieTicketScene({ isUnlocked, onComplete, onScrollNext, showContinue }: MovieTicketSceneProps) {
  const [ticketRevealed, setTicketRevealed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [ticketPosition, setTicketPosition] = useState({ x: 0, y: 0 });
  const [isInTarget, setIsInTarget] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    if (ticketRevealed) return;
    setIsDragging(true);
    const rect = ticketRef.current?.getBoundingClientRect();
    if (rect) {
      dragStartPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || ticketRevealed) return;

    const container = ticketRef.current?.parentElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragStartPos.current.x;
    const newY = e.clientY - containerRect.top - dragStartPos.current.y;

    setTicketPosition({ x: newX, y: newY });

    // Check if ticket is in target
    const ticketRect = ticketRef.current?.getBoundingClientRect();
    const targetRect = targetRef.current?.getBoundingClientRect();

    if (ticketRect && targetRect) {
      const ticketCenterX = ticketRect.left + ticketRect.width / 2;
      const ticketCenterY = ticketRect.top + ticketRect.height / 2;

      const inTarget =
        ticketCenterX >= targetRect.left &&
        ticketCenterX <= targetRect.right &&
        ticketCenterY >= targetRect.top &&
        ticketCenterY <= targetRect.bottom;

      setIsInTarget(inTarget);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (isInTarget) {
      // Success! Reveal the ticket
      setTicketRevealed(true);
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      // Reset position if not in target
      setTicketPosition({ x: 0, y: 0 });
      setIsInTarget(false);
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

      {/* Drag-to-target game */}
      {isUnlocked && !ticketRevealed && (
        <div className="relative z-20 w-full max-w-4xl px-4">
          <div className="text-center mb-8">
            <p className="text-gray-900 font-playful text-2xl md:text-3xl animate-pulse">
              Drag the ticket to the box! 🎯
            </p>
          </div>

          <div className="relative h-[400px] md:h-[500px]">
            {/* Target drop zone */}
            <div
              ref={targetRef}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-3xl border-4 border-dashed transition-all duration-300 ${
                isInTarget
                  ? 'border-fun-red bg-fun-red/20 scale-105'
                  : 'border-fun-purple bg-fun-purple/10'
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl md:text-7xl mb-2">📦</div>
                  <p className="text-gray-900 font-playful text-lg md:text-xl">
                    Drop here!
                  </p>
                </div>
              </div>
            </div>

            {/* Draggable ticket */}
            <div
              ref={ticketRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className={`absolute left-8 top-8 cursor-grab active:cursor-grabbing touch-none transition-transform ${
                isDragging ? 'scale-110' : 'scale-100'
              }`}
              style={{
                transform: `translate(${ticketPosition.x}px, ${ticketPosition.y}px)`,
              }}
            >
              <div className="bg-white rounded-2xl shadow-fun p-6 animate-gentle-float">
                <div className="text-7xl">🎟️</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Revealed ticket - enlarged with details */}
      {ticketRevealed && (
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
