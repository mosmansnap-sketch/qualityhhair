import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Play, Pause } from 'lucide-react';
import { cn } from './utils';

interface GalleryItem {
  id: string;
  beforeImage: string;
  afterImage: string;
  clientName: string;
  testimonial: string;
  treatment: string;
}

interface BeforeAfterGalleryProps {
  items: GalleryItem[];
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
  className?: string;
}

export function BeforeAfterGallery({
  items,
  autoAdvance = true,
  autoAdvanceInterval = 5000,
  className,
}: BeforeAfterGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoAdvance);
  const [hoveredSide, setHoveredSide] = useState<'before' | 'after' | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, autoAdvanceInterval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, items.length, autoAdvanceInterval]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const currentItem = items[currentIndex];

  return (
    <div className={cn('relative w-full max-w-5xl mx-auto', className)}>
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Before Image */}
          <motion.div
            className="relative aspect-[4/5] overflow-hidden cursor-pointer"
            onHoverStart={() => setHoveredSide('before')}
            onHoverEnd={() => setHoveredSide(null)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={`before-${currentItem.id}`}
                src={currentItem.beforeImage}
                alt={`Before - ${currentItem.clientName}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                  opacity: 1, 
                  scale: hoveredSide === 'before' ? 1.05 : 1 
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <motion.div
              className="absolute bottom-4 left-4 right-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                Before
              </span>
            </motion.div>
          </motion.div>

          {/* After Image */}
          <motion.div
            className="relative aspect-[4/5] overflow-hidden cursor-pointer"
            onHoverStart={() => setHoveredSide('after')}
            onHoverEnd={() => setHoveredSide(null)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={`after-${currentItem.id}`}
                src={currentItem.afterImage}
                alt={`After - ${currentItem.clientName}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                  opacity: 1, 
                  scale: hoveredSide === 'after' ? 1.05 : 1 
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <motion.div
              className="absolute bottom-4 left-4 right-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="inline-block px-3 py-1 bg-accent/80 backdrop-blur-md rounded-full text-white text-sm font-medium">
                After
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Testimonial Overlay */}
        <motion.div
          className="p-6 bg-gradient-to-r from-card to-background"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start gap-4">
            <Quote className="w-8 h-8 text-accent flex-shrink-0 opacity-50" />
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentItem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-foreground italic mb-3"
                >
                  "{currentItem.testimonial}"
                </motion.p>
              </AnimatePresence>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{currentItem.clientName}</p>
                  <p className="text-sm text-muted-foreground">{currentItem.treatment}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/3 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/3 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full bg-muted hover:bg-accent/20 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-foreground" />
          ) : (
            <Play className="w-5 h-5 text-foreground" />
          )}
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'w-8 bg-accent'
                  : 'bg-muted hover:bg-accent/50'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
