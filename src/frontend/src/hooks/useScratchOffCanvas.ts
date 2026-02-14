import { useRef, useEffect, useState } from 'react';

interface UseScratchOffCanvasOptions {
  overlayImage: string;
  enabled: boolean;
}

export function useScratchOffCanvas({ overlayImage, enabled }: UseScratchOffCanvasOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const overlayImageRef = useRef<HTMLImageElement | null>(null);
  const scratchedPixelsRef = useRef(0);
  const totalPixelsRef = useRef(0);

  useEffect(() => {
    if (!enabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Load overlay image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      overlayImageRef.current = img;
      
      // Set canvas size to match container
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Draw overlay
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Calculate total pixels
      totalPixelsRef.current = canvas.width * canvas.height;
    };
    img.src = overlayImage;

  }, [overlayImage, enabled]);

  useEffect(() => {
    if (!enabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const scratch = (x: number, y: number) => {
      if (!ctx) return;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();

      // Update scratch percentage (sample-based for performance)
      scratchedPixelsRef.current += 900; // Approximate area of circle
      const percentage = Math.min(100, (scratchedPixelsRef.current / totalPixelsRef.current) * 100);
      setScratchPercentage(percentage);
    };

    const handlePointerDown = (e: PointerEvent) => {
      e.preventDefault();
      setIsScratching(true);
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      scratch(x, y);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isScratching) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      scratch(x, y);
    };

    const handlePointerUp = () => {
      setIsScratching(false);
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerUp);
    };
  }, [enabled, isScratching]);

  return { canvasRef, scratchPercentage };
}
