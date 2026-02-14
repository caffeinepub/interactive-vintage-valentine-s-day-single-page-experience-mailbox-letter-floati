import { useState, useRef, useEffect, useCallback } from 'react';
import { ASSETS } from '../components/valentine/assets';

export function useAmbientAudio() {
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Create persistent audio element
    audioRef.current = new Audio(ASSETS.audio);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    const handleCanPlay = () => {
      setIsReady(true);
    };

    audioRef.current.addEventListener('canplaythrough', handleCanPlay);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', handleCanPlay);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startAudio = useCallback(() => {
    if (audioRef.current && isReady && !hasStartedRef.current) {
      audioRef.current.play().catch((error) => {
        console.warn('Audio autoplay blocked, waiting for user gesture:', error);
      });
      hasStartedRef.current = true;
    }
  }, [isReady]);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  }, [isMuted]);

  return { startAudio, toggleMute, isMuted, isReady };
}
