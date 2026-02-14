import { useState, useRef, useEffect } from 'react';
import { OpeningMailboxScene } from './components/valentine/OpeningMailboxScene';
import { MovieTicketScene } from './components/valentine/MovieTicketScene';
import { ScratchFrameScene } from './components/valentine/ScratchFrameScene';
import { LoadingOverlay } from './components/valentine/LoadingOverlay';
import { BackgroundMusicControl } from './components/valentine/BackgroundMusicControl';
import { useAssetPreloader } from './hooks/useAssetPreloader';
import { useAmbientAudio } from './hooks/useAmbientAudio';

export default function App() {
  const [mailboxComplete, setMailboxComplete] = useState(false);
  const [ticketComplete, setTicketComplete] = useState(false);
  const { isLoading, progress } = useAssetPreloader();
  const { startAudio, toggleMute, isMuted, isReady } = useAmbientAudio();
  const hasAttemptedStartRef = useRef(false);

  const mailboxRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  // Attempt to start audio on first user gesture
  useEffect(() => {
    if (!isLoading && isReady && !hasAttemptedStartRef.current) {
      const handleFirstInteraction = () => {
        startAudio();
        hasAttemptedStartRef.current = true;
        // Remove listeners after first attempt
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      };

      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('keydown', handleFirstInteraction);
      document.addEventListener('touchstart', handleFirstInteraction);

      return () => {
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      };
    }
  }, [isLoading, isReady, startAudio]);

  const handleMailboxComplete = () => {
    setMailboxComplete(true);
  };

  const handleTicketComplete = () => {
    setTicketComplete(true);
  };

  const scrollToTicket = () => {
    ticketRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToFrame = () => {
    frameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isLoading) {
    return <LoadingOverlay progress={progress} />;
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-fun-pink-light">
      {/* Mailbox Scene - always mounted */}
      <div ref={mailboxRef}>
        <OpeningMailboxScene
          onComplete={handleMailboxComplete}
          onScrollNext={scrollToTicket}
          showContinue={mailboxComplete}
        />
      </div>

      {/* Ticket Scene - always mounted, but locked until mailbox complete */}
      <div ref={ticketRef}>
        <MovieTicketScene
          isUnlocked={mailboxComplete}
          onComplete={handleTicketComplete}
          onScrollNext={scrollToFrame}
          showContinue={ticketComplete}
        />
      </div>

      {/* Frame Scene - always mounted, but locked until ticket complete */}
      <div ref={frameRef}>
        <ScratchFrameScene isUnlocked={ticketComplete} />
      </div>

      {/* Background music control */}
      <BackgroundMusicControl isMuted={isMuted} onToggleMute={toggleMute} />
    </div>
  );
}
