import { useState, useRef } from 'react';
import { OpeningMailboxScene } from './components/valentine/OpeningMailboxScene';
import { MovieTicketScene } from './components/valentine/MovieTicketScene';
import { ScratchFrameScene } from './components/valentine/ScratchFrameScene';
import { LoadingOverlay } from './components/valentine/LoadingOverlay';
import { useAssetPreloader } from './hooks/useAssetPreloader';

export default function App() {
  const [mailboxComplete, setMailboxComplete] = useState(false);
  const [ticketComplete, setTicketComplete] = useState(false);
  const { isLoading, progress } = useAssetPreloader();

  const mailboxRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

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
    </div>
  );
}
