import { useState, useRef, useEffect } from 'react';
import { ASSETS } from '../components/valentine/assets';

export function useAmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(ASSETS.audio);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startAudio = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch((error) => {
        console.warn('Audio playback failed:', error);
      });
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return { startAudio, stopAudio, isPlaying };
}
