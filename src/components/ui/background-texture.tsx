import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface BackgroundTextureProps {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  dotSpacing?: number;
  opacity?: number;
  animated?: boolean;
}

export function BackgroundTexture({
  className = '',
  dotColor = 'rgba(107, 93, 82, 0.3)',
  dotSize = 2,
  dotSpacing = 24,
  opacity = 0.3,
  animated = true,
}: BackgroundTextureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawDots();
    };

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = dotColor;

      for (let x = 0; x < canvas.offsetWidth; x += dotSpacing) {
        for (let y = 0; y < canvas.offsetHeight; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [dotColor, dotSize, dotSpacing]);

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1.5 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {animated && (
        <>
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 600px 400px at 30% 40%, rgba(184, 166, 143, 0.15), transparent)`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 500px 300px at 70% 60%, rgba(212, 175, 55, 0.1), transparent)`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </>
      )}
    </motion.div>
  );
}
