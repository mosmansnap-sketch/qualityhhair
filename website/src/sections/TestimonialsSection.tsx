import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import testimonial screenshots
import testimonial1 from 'figma:asset/de6f4ebf54a65a70f47d1df109de171e952c8f06.png';
import testimonial2 from 'figma:asset/c056a5a8690c5c4f333d31ddb16b75b44769521d.png';
import testimonial3 from 'figma:asset/46c3af0261ba24c0718a8bfe19addcbd29915ec2.png';
import testimonial4 from 'figma:asset/d634ec9d01b981227f663ad0b87b9e4f3b3081c4.png';
import testimonial5 from 'figma:asset/b8dd34e7077b33bece443c5ab266c55ba073f3e1.png';
import testimonial6 from 'figma:asset/f6cc0652a4c5b483757bbffa859a9b8077a22258.png';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialImage {
  id: number;
  image: string;
  alt: string;
}

const testimonials: TestimonialImage[] = [
  {
    id: 1,
    image: testimonial1,
    alt: "Client testimonial - Amazing results with hair treatment"
  },
  {
    id: 2,
    image: testimonial2,
    alt: "Client review - Treatment revived my curls"
  },
  {
    id: 3,
    image: testimonial3,
    alt: "Customer feedback - Hair feels so soft"
  },
  {
    id: 4,
    image: testimonial4,
    alt: "Customer testimonial - Absolutely love the treatment results"
  },
  {
    id: 5,
    image: testimonial5,
    alt: "Client review - Hair feels so smooth and easy to style"
  },
  {
    id: 6,
    image: testimonial6,
    alt: "Customer feedback - Hair feels great and healthy"
  }
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
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

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <section ref={sectionRef} id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-background to-accent/5 overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-2 border-amber-500/20 rounded-full mb-4">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <span className="font-semibold">Real Results from Real Clients</span>
          </div>
          <h2 className="mb-4">
            What Our Customers Are Saying
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - see authentic testimonials from our satisfied customers
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="testimonial-carousel relative">
          <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
            {/* Navigation Arrows */}
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-xl border-2 border-primary/20 hidden md:flex"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-primary" />
            </Button>

            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-xl border-2 border-primary/20 hidden md:flex"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-primary" />
            </Button>

            {/* Carousel Items */}
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 }
                  }}
                  className="absolute w-full px-4 md:px-12 flex justify-center"
                >
                  <Card className="inline-block max-w-2xl bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 overflow-hidden shadow-2xl">
                    <div className="relative group">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Screenshot Image */}
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].alt}
                        className="w-full h-auto object-contain rounded-lg relative z-10"
                        style={{ maxHeight: '600px' }}
                      />
                      
                      {/* Verified Badge */}
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg z-20">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified Review
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Swipe Indicators */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              onClick={nextSlide}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          <Card className="p-6 text-center bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20">
            <div className="flex gap-1 justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-2xl font-semibold mb-1">4.9/5</div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <div className="text-2xl font-semibold mb-1">2,847+</div>
            <p className="text-sm text-muted-foreground">Happy Customers</p>
            <p className="text-xs text-muted-foreground mt-1">Across Europe</p>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20">
            <div className="text-2xl font-semibold mb-1">98%</div>
            <p className="text-sm text-muted-foreground">Would Recommend</p>
            <p className="text-xs text-muted-foreground mt-1">To Friends & Family</p>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Join thousands of satisfied customers who've transformed their hair naturally
          </p>
        </motion.div>
      </div>
    </section>
  );
}
