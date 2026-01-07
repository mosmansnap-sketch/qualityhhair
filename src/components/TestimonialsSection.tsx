import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Use placeholder images for testimonials since we don't have the Figma assets
const testimonialImages = [
  "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2ZpbGV8ZW58MXx8fHwxNzYwNzg0NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9maWxlfGVufDF8fHx8MTc2MDc4NDY5MXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1622265544955-56574abbce5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwaGFpciUyMGNhcmV8ZW58MXx8fHwxNzYwNzg0NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1653848067570-ccc640e5b3cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwaGFpciUyMGNhcmUlMjBtYWxlfGVufDF8fHx8MTc2MDc4NDY5MXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1732247609999-52bb7c01fcf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBiZWF1dHklMjBwcm9kdWN0fGVufDF8fHx8MTc2MDc4NDY5MXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1653848067570-ccc640e5b3cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwaGFpciUyMGNhcmUlMjBtYWxlfGVufDF8fHx8MTc2MDc4NDY5MXww&ixlib=rb-4.1.0&q=80&w=1080"
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    handle: "@sarahj_haircare",
    avatar: testimonialImages[0],
    hairType: "3B Curly",
    rating: 5,
    quote: "This treatment completely transformed my hair! My curls are more defined, bouncy, and so much easier to manage. I can't imagine going back to my old routine.",
    verified: true
  },
  {
    id: 2,
    name: "Marcus Chen",
    handle: "@marcushair",
    avatar: testimonialImages[1],
    hairType: "4C Coily",
    rating: 5,
    quote: "Finally found something that works for my 4C hair! The moisture retention is incredible and my coils feel so soft and healthy. Worth every penny.",
    verified: true
  },
  {
    id: 3,
    name: "Amina Hassan",
    handle: "@amina_beauty",
    avatar: testimonialImages[2],
    hairType: "3A Wavy",
    rating: 4,
    quote: "My waves have never looked this good! The treatment enhanced my natural pattern without making my hair feel heavy or greasy. Love the organic approach.",
    verified: false
  },
  {
    id: 4,
    name: "David Rodriguez",
    handle: "@david_r_style",
    avatar: testimonialImages[3],
    hairType: "2C Wavy",
    rating: 5,
    quote: "As someone who was skeptical about treatments, I'm blown away by the results. My hair feels stronger, looks healthier, and styling takes half the time now.",
    verified: true
  },
  {
    id: 5,
    name: "Lisa Park",
    handle: "@lisapark_hair",
    avatar: testimonialImages[4],
    hairType: "1C Straight",
    rating: 5,
    quote: "Even with straight hair, this treatment made a huge difference! My hair feels thicker, has amazing shine, and stays smooth even in humid weather.",
    verified: false
  },
  {
    id: 6,
    name: "Carlos Mendez",
    handle: "@carlos_curls",
    avatar: testimonialImages[5],
    hairType: "3C Coily",
    rating: 5,
    quote: "The best investment I've made for my hair! My coils are more defined, less frizzy, and the moisture lasts for weeks. Customer for life!",
    verified: true
  }
];


export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

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
  }, [currentIndex, isPaused]);

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
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
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
        {/* Section Header - Exact specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border-2 border-primary/20 rounded-full mb-4">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="font-semibold">Real Results from Real Clients</span>
          </div>
          <h2 className="mb-4 text-4xl font-bold uppercase tracking-[0.02em]">
            What Our Customers Are Saying
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - see authentic testimonials from our satisfied customers
          </p>
        </motion.div>

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
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="testimonial-card"
            >
              <Card className="p-8 bg-card border border-border rounded-xl shadow-lg">
                {/* Customer Info - Exact specifications */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{testimonials[currentIndex].name}</h3>
                      {testimonials[currentIndex].verified && (
                        <Star className="h-5 w-5 text-blue-500 fill-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{testimonials[currentIndex].handle}</p>
                    {/* Hair Type Badge - Exact specifications */}
                    <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full mt-2 inline-block">
                      {testimonials[currentIndex].hairType}
                    </span>
                  </div>
                </div>

                {/* Star Rating - Exact specifications */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>

                {/* Quote Text - Exact specifications */}
                <blockquote className="text-base text-muted-foreground leading-relaxed">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
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
          </div>
        </div>
      </div>
    </section>
  );
}