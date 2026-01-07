import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnalysisAnimationProps {
  onComplete: () => void;
  hairType: string;
}

export function AnalysisAnimation({ onComplete, hairType }: AnalysisAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [detectedFeatures, setDetectedFeatures] = useState<string[]>([]);

  const phases = [
    { label: 'Initializing AI Scanner...', duration: 800 },
    { label: 'Analyzing Hair Structure...', duration: 1200 },
    { label: 'Detecting Curl Pattern...', duration: 1000 },
    { label: 'Measuring Hair Density...', duration: 1000 },
    { label: 'Calculating Treatment Plan...', duration: 1000 },
  ];

  const features = [
    { label: 'Hair Type', value: hairType, delay: 1500 },
    { label: 'Texture', value: 'Medium Porosity', delay: 2500 },
    { label: 'Condition', value: 'Good Health', delay: 3500 },
    { label: 'Recommendation', value: 'Ready', delay: 4500 },
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => {
        if (prev >= phases.length - 1) {
          clearInterval(phaseInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    features.forEach(feature => {
      setTimeout(() => {
        setDetectedFeatures(prev => [...prev, feature.label]);
      }, feature.delay);
    });

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 5500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phaseInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div className="relative min-h-[500px] flex flex-col items-center justify-center">
      {/* Scanning Ring */}
      <div className="relative w-64 h-64 mb-8">
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(184, 166, 143, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="rgba(107, 93, 82, 0.2)"
            strokeWidth="8"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={754}
            strokeDashoffset={754 - (754 * progress) / 100}
            style={{ filter: 'drop-shadow(0 0 10px rgba(184, 166, 143, 0.8))' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6b5d52" />
              <stop offset="100%" stopColor="#b8a68f" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {progress}%
          </motion.div>
          <p className="text-sm text-muted-foreground mt-2">Analyzing</p>
        </div>

        {/* Scanning line */}
        <motion.div
          className="absolute left-1/2 top-0 w-0.5 h-full -translate-x-1/2 origin-center"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(184, 166, 143, 0.8), transparent)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Particle effects */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-accent"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [0, Math.cos((i * 45 * Math.PI) / 180) * 140],
              y: [0, Math.sin((i * 45 * Math.PI) / 180) * 140],
              opacity: [1, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Phase label */}
      <motion.p
        key={currentPhase}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg text-foreground mb-8"
      >
        {phases[currentPhase]?.label}
      </motion.p>

      {/* Detected features */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {features.map((feature) => (
          <motion.div
            key={feature.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: detectedFeatures.includes(feature.label) ? 1 : 0.3,
              scale: detectedFeatures.includes(feature.label) ? 1 : 0.95,
            }}
            className={`p-4 rounded-xl border-2 transition-all ${
              detectedFeatures.includes(feature.label)
                ? 'border-accent bg-accent/10 glass-card'
                : 'border-border bg-muted/30'
            }`}
          >
            <p className="text-xs text-muted-foreground mb-1">{feature.label}</p>
            <p className="font-semibold text-foreground">
              {detectedFeatures.includes(feature.label) ? feature.value : '---'}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
