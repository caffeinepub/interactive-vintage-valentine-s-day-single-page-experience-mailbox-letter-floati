import { useState } from 'react';
import { ASSETS } from './assets';
import { LETTER_CONTENT } from './LetterContent';
import { useAmbientAudio } from '../../hooks/useAmbientAudio';
import { ContinuePrompt } from './ContinuePrompt';

interface OpeningMailboxSceneProps {
  onComplete: () => void;
  onScrollNext: () => void;
  showContinue: boolean;
}

export function OpeningMailboxScene({ onComplete, onScrollNext, showContinue }: OpeningMailboxSceneProps) {
  const [envelopeVisible, setEnvelopeVisible] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const { startAudio, isPlaying } = useAmbientAudio();

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
        onComplete();
      }, 1000);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-fun-pink-light via-fun-pink to-fun-red-light">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-float-slow opacity-20">💕</div>
        <div className="absolute top-20 right-20 text-5xl animate-float-medium opacity-20">💖</div>
        <div className="absolute bottom-20 left-20 text-7xl animate-float-fast opacity-20">💗</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-float-slow opacity-20">💝</div>
      </div>

      {/* Interactive mailbox */}
      {!envelopeVisible && (
        <button
          onClick={handleMailboxClick}
          className="relative z-10 cursor-pointer transition-all duration-700 hover:scale-110 animate-gentle-bounce focus:outline-none focus:ring-4 focus:ring-fun-red/50 rounded-full"
          aria-label="Click to open mailbox"
        >
          <div className="w-64 h-64 flex items-center justify-center">
            <div className="text-8xl animate-gentle-float drop-shadow-fun">
              📬
            </div>
          </div>
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-gray-900 font-playful text-lg animate-pulse">
            Click me!
          </div>
        </button>
      )}

      {/* Envelope sliding out */}
      {envelopeVisible && !letterOpen && (
        <div
          className="relative z-20 cursor-pointer animate-envelope-slide"
          onClick={handleEnvelopeClick}
        >
          <div className="relative bg-white rounded-2xl shadow-fun p-8 hover:scale-105 transition-transform duration-500">
            <div className="text-center">
              <div className="text-8xl mb-4">💌</div>
              <p className="text-gray-900 font-playful text-3xl md:text-4xl">
                To: My Bestie 🤍
              </p>
            </div>
          </div>
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-gray-900 font-playful text-lg animate-pulse whitespace-nowrap">
            Click to open!
          </div>
        </div>
      )}

      {/* Letter unfolding */}
      {letterOpen && (
        <div className="relative z-30 animate-letter-unfold max-w-[90vw] w-full px-4">
          <div className="bg-white rounded-3xl shadow-fun-xl p-6 md:p-12 max-w-3xl mx-auto max-h-[80vh] overflow-y-auto">
            <div className="text-fun-text font-script text-xl md:text-2xl leading-relaxed whitespace-pre-wrap">
              {LETTER_CONTENT}
            </div>
          </div>
        </div>
      )}

      {/* Continue prompt */}
      {showContinue && <ContinuePrompt onContinue={onScrollNext} />}
    </div>
  );
}
