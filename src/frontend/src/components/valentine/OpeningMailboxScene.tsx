import { useState, useEffect, useRef } from 'react';
import { ASSETS } from './assets';
import { LETTER_CONTENT } from './LetterContent';
import { useAmbientAudio } from '../../hooks/useAmbientAudio';
import { ChevronDown } from 'lucide-react';

interface OpeningMailboxSceneProps {
  isActive: boolean;
  onComplete: () => void;
  onScrollNext: () => void;
}

export function OpeningMailboxScene({ isActive, onComplete, onScrollNext }: OpeningMailboxSceneProps) {
  const [envelopeVisible, setEnvelopeVisible] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const { startAudio, isPlaying } = useAmbientAudio();
  const sceneRef = useRef<HTMLDivElement>(null);

  const handleMailboxClick = () => {
    if (!envelopeVisible) {
      setEnvelopeVisible(true);
      if (!isPlaying) {
        startAudio();
      }
    }
  };

  const handleEnvelopeClick = () => {
    if (envelopeVisible && !letterOpen) {
      setLetterOpen(true);
      setTimeout(() => {
        setShowScrollHint(true);
        onComplete();
      }, 1000);
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

  return (
    <div
      ref={sceneRef}
      className={`relative w-full min-h-screen flex items-center justify-center transition-opacity duration-1000 ${
        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
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

      {/* Mailbox scene background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={ASSETS.mailboxScene}
          alt=""
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Interactive mailbox */}
      {!envelopeVisible && (
        <button
          onClick={handleMailboxClick}
          className="relative z-10 cursor-pointer transition-all duration-700 hover:scale-105 animate-mailbox-glow focus:outline-none focus:ring-4 focus:ring-vintage-gold/50"
          aria-label="Click to open mailbox"
        >
          <div className="w-64 h-64 flex items-center justify-center">
            <div className="text-vintage-gold text-8xl animate-gentle-float drop-shadow-glow">
              📬
            </div>
          </div>
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-vintage-gold/80 text-sm font-handwritten animate-pulse">
            Click me
          </div>
        </button>
      )}

      {/* Envelope sliding out */}
      {envelopeVisible && !letterOpen && (
        <div
          className="relative z-20 cursor-pointer animate-envelope-slide"
          onClick={handleEnvelopeClick}
        >
          <div className="relative">
            <img
              src={ASSETS.envelope}
              alt="Envelope"
              className="w-[600px] max-w-[90vw] h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-vintage-ink font-handwritten text-3xl md:text-4xl">
                To: My Bestie 🤍
              </p>
            </div>
          </div>
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-vintage-gold/80 text-sm font-handwritten animate-pulse whitespace-nowrap">
            Click to open
          </div>
        </div>
      )}

      {/* Letter unfolding */}
      {letterOpen && (
        <div className="relative z-30 animate-letter-unfold">
          <div className="relative max-w-[800px] max-h-[80vh] overflow-y-auto mx-4">
            <img
              src={ASSETS.letterPaper}
              alt=""
              className="w-full h-auto"
            />
            <div className="absolute inset-0 p-8 md:p-16 flex items-center justify-center">
              <div className="text-vintage-ink font-handwritten text-base md:text-xl leading-relaxed whitespace-pre-wrap max-w-[600px]">
                {LETTER_CONTENT}
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
