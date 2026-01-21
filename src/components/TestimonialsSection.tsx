import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Testimonial images organized by language
const testimonialsByLanguage = {
  swedish: [
    '/images/testimonials/swedish/testimonial-01.jpg',
    '/images/testimonials/swedish/testimonial-02.jpg',
    '/images/testimonials/swedish/testimonial-03.jpg',
    '/images/testimonials/swedish/testimonial-04.jpg',
    '/images/testimonials/swedish/testimonial-05.jpg',
    '/images/testimonials/swedish/testimonial-26.jpg',
    '/images/testimonials/swedish/testimonial-31.jpg',
    '/images/testimonials/swedish/testimonial-32.jpg',
    '/images/testimonials/swedish/testimonial-33.jpg',
    '/images/testimonials/swedish/testimonial-35.jpg',
    '/images/testimonials/swedish/testimonial-40.jpg',
    '/images/testimonials/swedish/testimonial-42.jpg',
    '/images/testimonials/swedish/testimonial-45.jpg',
  ],
  english: [
    '/images/testimonials/english/testimonial-06.jpg',
    '/images/testimonials/english/testimonial-07.jpg',
    '/images/testimonials/english/testimonial-08.jpg',
    '/images/testimonials/english/testimonial-09.jpg',
    '/images/testimonials/english/testimonial-11.jpg',
    '/images/testimonials/english/testimonial-12.jpg',
    '/images/testimonials/english/testimonial-13.jpg',
    '/images/testimonials/english/testimonial-14.jpg',
    '/images/testimonials/english/testimonial-15.jpg',
    '/images/testimonials/english/testimonial-16.jpg',
    '/images/testimonials/english/testimonial-18.jpg',
    '/images/testimonials/english/testimonial-19.jpg',
    '/images/testimonials/english/testimonial-20.jpg',
    '/images/testimonials/english/testimonial-21.jpg',
    '/images/testimonials/english/testimonial-22.jpg',
    '/images/testimonials/english/testimonial-23.jpg',
    '/images/testimonials/english/testimonial-24.jpg',
    '/images/testimonials/english/testimonial-25.jpg',
    '/images/testimonials/english/testimonial-27.jpg',
    '/images/testimonials/english/testimonial-28.jpg',
    '/images/testimonials/english/testimonial-29.jpg',
    '/images/testimonials/english/testimonial-30.jpg',
    '/images/testimonials/english/testimonial-34.jpg',
    '/images/testimonials/english/testimonial-36.jpg',
    '/images/testimonials/english/testimonial-38.jpg',
    '/images/testimonials/english/testimonial-39.jpg',
    '/images/testimonials/english/testimonial-43.jpg',
    '/images/testimonials/english/testimonial-44.jpg',
    '/images/testimonials/english/testimonial-46.jpg',
    '/images/testimonials/english/testimonial-47.jpg',
    '/images/testimonials/english/testimonial-48.jpg',
  ],
  somali: [
    '/images/testimonials/somali/testimonial-10.jpg',
    '/images/testimonials/somali/testimonial-17.jpg',
    '/images/testimonials/somali/testimonial-37.jpg',
    '/images/testimonials/somali/testimonial-41.jpg',
  ],
};

type LanguageTab = 'swedish' | 'english' | 'somali';

const tabs: { id: LanguageTab; label: string; flag: string }[] = [
  { id: 'swedish', label: 'Swedish', flag: '🇸🇪' },
  { id: 'english', label: 'English', flag: '🇬🇧' },
  { id: 'somali', label: 'Somali', flag: '🇸🇴' },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<LanguageTab>('swedish');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const currentImages = testimonialsByLanguage[activeTab];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const carousel = sectionRef.current?.querySelector('.testimonial-carousel');
      if (carousel) {
        gsap.from(carousel, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out"
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Auto-play functionality with pause-on-hover
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, activeTab]);

  // Reset index when switching tabs
  const handleTabChange = (tab: LanguageTab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
    setDirection(0);
  };

  // Touch handlers for swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setTouchStart(null);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section ref={sectionRef} id="testimonials" className="py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="mb-4 text-4xl font-bold uppercase tracking-[0.02em]">
            What People Say Around the World
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real feedback from our global community
          </p>
        </motion.div>

        {/* Language Tabs */}
        <div className="flex justify-center gap-2 md:gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="text-lg">{tab.flag}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="text-xs opacity-70">({testimonialsByLanguage[tab.id].length})</span>
            </button>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div 
          className="relative max-w-2xl mx-auto testimonial-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Carousel Controls */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full bg-white/80 backdrop-blur-sm border-2 border-primary/20 hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full bg-white/80 backdrop-blur-sm border-2 border-primary/20 hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Testimonial Display */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${activeTab}-${currentIndex}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="testimonial-card flex justify-center"
            >
              <img
                src={currentImages[currentIndex]}
                alt={`${activeTab} customer testimonial ${currentIndex + 1}`}
                className="max-h-[500px] w-auto rounded-2xl shadow-lg border border-border object-contain"
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>

          {/* Carousel Indicators */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <span className="text-sm text-muted-foreground mr-2">
              {currentIndex + 1} / {currentImages.length}
            </span>
            {currentImages.slice(0, 10).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
            {currentImages.length > 10 && (
              <span className="text-sm text-muted-foreground ml-1">...</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
