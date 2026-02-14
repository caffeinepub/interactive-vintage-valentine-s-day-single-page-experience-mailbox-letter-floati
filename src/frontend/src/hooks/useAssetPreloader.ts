import { useState, useEffect } from 'react';
import { ASSETS } from '../components/valentine/assets';

export function useAssetPreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const imagePaths = [
      ASSETS.mailboxScene,
      ASSETS.envelope,
      ASSETS.letterPaper,
      ASSETS.movieTicket,
      ASSETS.goldFrame,
      ASSETS.scratchOverlay,
      ASSETS.coupleIllustration,
      ASSETS.paperTexture,
    ];

    let loadedCount = 0;
    const totalAssets = imagePaths.length + 1; // +1 for audio

    const updateProgress = () => {
      loadedCount++;
      setProgress((loadedCount / totalAssets) * 100);
      
      if (loadedCount === totalAssets) {
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    // Preload images
    imagePaths.forEach((path) => {
      const img = new Image();
      img.onload = updateProgress;
      img.onerror = updateProgress;
      img.src = path;
    });

    // Preload audio
    const audio = new Audio(ASSETS.audio);
    audio.addEventListener('canplaythrough', updateProgress, { once: true });
    audio.addEventListener('error', updateProgress, { once: true });
    audio.load();

  }, []);

  return { isLoading, progress };
}
