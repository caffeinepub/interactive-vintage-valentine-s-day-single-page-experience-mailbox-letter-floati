import { useState, useEffect } from 'react';
import { OpeningMailboxScene } from './components/valentine/OpeningMailboxScene';
import { MovieTicketScene } from './components/valentine/MovieTicketScene';
import { ScratchFrameScene } from './components/valentine/ScratchFrameScene';
import { LoadingOverlay } from './components/valentine/LoadingOverlay';
import { useAssetPreloader } from './hooks/useAssetPreloader';

export default function App() {
  const [currentScene, setCurrentScene] = useState<'mailbox' | 'ticket' | 'frame'>('mailbox');
  const [mailboxComplete, setMailboxComplete] = useState(false);
  const [ticketComplete, setTicketComplete] = useState(false);
  const { isLoading, progress } = useAssetPreloader();

  // Reset state on mount to ensure fresh experience
  useEffect(() => {
    setCurrentScene('mailbox');
    setMailboxComplete(false);
    setTicketComplete(false);
  }, []);

  const handleMailboxComplete = () => {
    setMailboxComplete(true);
  };

  const handleTicketComplete = () => {
    setTicketComplete(true);
  };

  const handleScrollToTicket = () => {
    if (mailboxComplete) {
      setCurrentScene('ticket');
    }
  };

  const handleScrollToFrame = () => {
    if (ticketComplete) {
      setCurrentScene('frame');
    }
  };

  if (isLoading) {
    return <LoadingOverlay progress={progress} />;
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-vintage-dark">
      <OpeningMailboxScene
        isActive={currentScene === 'mailbox'}
        onComplete={handleMailboxComplete}
        onScrollNext={handleScrollToTicket}
      />
      {mailboxComplete && (
        <MovieTicketScene
          isActive={currentScene === 'ticket'}
          onComplete={handleTicketComplete}
          onScrollNext={handleScrollToFrame}
        />
      )}
      {ticketComplete && (
        <ScratchFrameScene
          isActive={currentScene === 'frame'}
        />
      )}
    </div>
  );
}
