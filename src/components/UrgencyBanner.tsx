import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Flame } from 'lucide-react';

interface UrgencyBannerProps {
  variant?: 'countdown' | 'stock' | 'viewers';
  className?: string;
}

export function UrgencyBanner({ variant = 'stock', className = '' }: UrgencyBannerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 32 });
  const [stock] = useState(17);
  const [viewers, setViewers] = useState(12);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    // Simulate viewer count changes
    const viewerInterval = setInterval(() => {
      setViewers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newVal = prev + change;
        return Math.max(8, Math.min(24, newVal));
      });
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(viewerInterval);
    };
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (variant === 'countdown') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-4 ${className}`}
      >
        <div className="flex items-center justify-center gap-3">
          <Clock className="w-5 h-5 text-amber-600" />
          <span className="text-sm font-medium text-amber-800">
            Monthly batch ends in:
          </span>
          <div className="flex gap-1 font-mono font-bold text-amber-700">
            <span className="bg-amber-100 px-2 py-1 rounded">{pad(timeLeft.hours)}</span>
            <span>:</span>
            <span className="bg-amber-100 px-2 py-1 rounded">{pad(timeLeft.minutes)}</span>
            <span>:</span>
            <span className="bg-amber-100 px-2 py-1 rounded">{pad(timeLeft.seconds)}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'viewers') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`flex items-center gap-2 text-sm ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <Users className="w-4 h-4 text-muted-foreground" />
        <span className="text-muted-foreground">
          <strong className="text-foreground">{viewers}</strong> people viewing this right now
        </span>
      </motion.div>
    );
  }

  // Stock variant (default)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center gap-2 ${className}`}
    >
      <Flame className="w-4 h-4 text-orange-500" />
      <span className="text-sm">
        <strong className="text-orange-600">{stock} kits</strong>
        <span className="text-muted-foreground"> left this month</span>
      </span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[100px]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(stock / 50) * 100}%` }}
          className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
        />
      </div>
    </motion.div>
  );
}
