import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface StickyMobileCTAProps {
  onGetStarted: () => void;
  show?: boolean;
}

export function StickyMobileCTA({ onGetStarted, show = true }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;
      
      // Show after scrolling past hero, hide when scrolling up fast
      if (currentScrollY > heroHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          <div className="bg-background/95 backdrop-blur-lg border-t border-border shadow-2xl px-4 py-3 safe-area-bottom">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  Transform Your Hair Today
                </p>
                <p className="text-xs text-muted-foreground">
                  From €165 • Free shipping over €200
                </p>
              </div>
              <Button
                onClick={onGetStarted}
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg flex-shrink-0 px-4"
              >
                <ShoppingBag className="w-4 h-4 mr-1" />
                Get Started
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
