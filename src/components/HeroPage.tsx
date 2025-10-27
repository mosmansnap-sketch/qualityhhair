import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface HeroPageProps {
  onGetStarted: () => void;
}

export function HeroPage({ onGetStarted }: HeroPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1712641966810-611ff1503c6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXJseSUyMGhhaXIlMjB3b21hbnxlbnwxfHx8fDE3NjAyNzE1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1707161256491-e41eb204b571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwYWZybyUyMGhhaXJ8ZW58MXx8fHwxNzYwMzQ5MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1711454867327-4990937f8f18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhaWdodCUyMGhhaXIlMjBjYXJlfGVufDF8fHx8MTc2MDM0OTE5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1760038548850-bfc356d88b12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHJlYXRtZW50JTIwc2Fsb258ZW58MXx8fHwxNzYwMzExMzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwaGFpciUyMHByb2R1Y3RzfGVufDF8fHx8MTc2MDM0OTE5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1532171875345-9712d9d4f65a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBsb25nJTIwaGFpcnxlbnwxfHx8fDE3NjAzNDkxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      hairType: "Curly",
      rating: 5,
      text: "After just 4 weeks, my curls are more defined and healthier than ever. The personalized approach really works!",
      image: "https://images.unsplash.com/photo-1654539883562-ea24e487989e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXJseSUyMGhhaXIlMjB0ZXh0dXJlfGVufDF8fHx8MTc1OTkxOTExN3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Jordan K.",
      hairType: "Afro",
      rating: 5,
      text: "Finally, products that understand my hair texture. The advisor recommendations were spot-on!",
      image: "https://images.unsplash.com/photo-1758273238296-b0c2899338be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaGFpciUyMGNhcmUlMjB3b21hbnxlbnwxfHx8fDE3NjAwMTM0Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Emma L.",
      hairType: "Frizzy",
      rating: 5,
      text: "No more frizz! The step-by-step guidance made it so easy to see real results.",
      image: "https://images.unsplash.com/photo-1758315949140-1972ace0644e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHJhbnNmb3JtYXRpb258ZW58MXx8fHwxNzU5OTYwNzE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Marcus T.",
      hairType: "Afro",
      rating: 5,
      text: "This is the first time I've found products that truly nourish my hair. My coils have never looked better!",
      image: "https://images.unsplash.com/photo-1758273238296-b0c2899338be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaGFpciUyMGNhcmUlMjB3b21hbnxlbnwxfHx8fDE3NjAwMTM0Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Aaliyah B.",
      hairType: "Curly",
      rating: 5,
      text: "The organic ingredients make such a difference. My hair feels softer and more manageable every day.",
      image: "https://images.unsplash.com/photo-1654539883562-ea24e487989e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXJseSUyMGhhaXIlMjB0ZXh0dXJlfGVufDF8fHx8MTc1OTkxOTExN3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Destiny R.",
      hairType: "Straight",
      rating: 5,
      text: "I was skeptical at first, but the results speak for themselves. My hair has more volume and shine than ever.",
      image: "https://images.unsplash.com/photo-1758315949140-1972ace0644e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHJhbnNmb3JtYXRpb258ZW58MXx8fHwxNzU5OTYwNzE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Imani W.",
      hairType: "Curly",
      rating: 5,
      text: "The personalized touch made all the difference. They really took time to understand my hair's specific needs.",
      image: "https://images.unsplash.com/photo-1654539883562-ea24e487989e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXJseSUyMGhhaXIlMjB0ZXh0dXJlfGVufDF8fHx8MTc1OTkxOTExN3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Zara P.",
      hairType: "Afro",
      rating: 5,
      text: "Love that it's organic and actually works! My hair has been thriving since I started using these products.",
      image: "https://images.unsplash.com/photo-1758273238296-b0c2899338be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaGFpciUyMGNhcmUlMjB3b21hbnxlbnwxfHx8fDE3NjAwMTM0Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  useEffect(() => {
    // Initialize all images except the first one to be hidden
    imageRefs.current.forEach((img, index) => {
      if (img) {
        gsap.set(img, {
          opacity: index === 0 ? 1 : 0,
          scale: 1
        });
      }
    });

    // Hero section animations
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    timeline
      .from(badgeRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      })
      .from(headlineRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
      }, "-=0.5")
      .from(subheadlineRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, "-=0.6")
      .from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, "-=0.4");

    // Features animation on scroll
    if (featuresRef.current) {
      const featureCards = featuresRef.current.querySelectorAll('.feature-card');
      gsap.from(featureCards, {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    }

    // Steps animation on scroll
    if (stepsRef.current) {
      const stepCards = stepsRef.current.querySelectorAll('.step-card');
      gsap.from(stepCards, {
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 75%",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
      });
    }

    // Auto-advance hero images
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    // Auto-advance testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      clearInterval(imageInterval);
      clearInterval(testimonialInterval);
    };
  }, [testimonials.length, heroImages.length]);

  // Handle image transitions with GSAP
  useEffect(() => {
    const currentImage = imageRefs.current[currentImageIndex];
    const prevIndex = currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1;
    const prevImage = imageRefs.current[prevIndex];

    if (currentImage && prevImage) {
      const tl = gsap.timeline();
      
      // Animate new image in with zoom effect
      tl.fromTo(currentImage, 
        { 
          opacity: 0, 
          scale: 1.15 
        },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 2,
          ease: "power2.out" 
        }
      );

      // Fade out previous image
      tl.to(prevImage, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0);
    }
  }, [currentImageIndex, heroImages.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Image Carousel */}
      <div ref={heroRef} className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
        {/* Image carousel backgrounds */}
        {heroImages.map((imageSrc, index) => (
          <div
            key={index}
            ref={(el) => (imageRefs.current[index] = el)}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={imageSrc}
              alt={`Hero background ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        
        <div className="relative container max-w-6xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <div ref={badgeRef} className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 backdrop-blur-sm rounded-full mb-6 shadow-lg shadow-amber-500/30 border-2 border-amber-300/50 ring-2 ring-white/20">
              <span className="text-sm font-semibold text-amber-950 tracking-wide">LIMITED MONTHLY SUPPLY • ORGANIC PRODUCTS</span>
            </div>
            
            <h1 ref={headlineRef} className="mb-6 text-white">
              Your Hair, Perfected with Smart Personalized Solutions
            </h1>
            
            <p ref={subheadlineRef} className="mb-8 text-white/90 text-lg">
              Experience AI-powered hair analysis combined with expert human guidance. Get organic products tailored specifically for your unique hair texture and goals.
            </p>
            
            <div ref={ctaRef}>
              <Button onClick={onGetStarted} size="lg" className="px-8">
                Start Your Transformation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Clean, No Icons */}
      <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="mb-4">Smart. Personal. Simple.</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our automated system combines technology with human expertise to deliver results
          </p>
        </div>

        <div ref={featuresRef} className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="feature-card bg-accent/30 p-8 rounded-lg backdrop-blur-sm">
            <h3 className="mb-3">Personalized Analysis</h3>
            <p className="text-muted-foreground">
              Every recommendation is based on your unique hair profile, photos, and specific concerns
            </p>
          </div>
          
          <div className="feature-card bg-accent/30 p-8 rounded-lg backdrop-blur-sm">
            <h3 className="mb-3">Expert Advisors</h3>
            <p className="text-muted-foreground">
              Professional hair specialists review your submission and curate the perfect product selection
            </p>
          </div>
          
          <div className="feature-card bg-accent/30 p-8 rounded-lg backdrop-blur-sm">
            <h3 className="mb-3">Automated Delivery</h3>
            <p className="text-muted-foreground">
              Seamless ordering process with limited monthly batches to ensure quality and freshness
            </p>
          </div>
        </div>

        {/* How It Works - Creative Design */}
        <div className="mb-20">
          <h2 className="text-center mb-16">Your Journey to Better Hair</h2>
          
          <div ref={stepsRef} className="relative max-w-4xl mx-auto">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary/20 to-accent transform -translate-y-1/2 z-0" />
            
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="step-card relative">
                <div className="bg-card border-2 border-primary p-8 rounded-xl shadow-lg">
                  <div className="mb-4">
                    <span className="text-5xl opacity-20">01</span>
                  </div>
                  <h3 className="mb-3">Select Hair Type</h3>
                  <p className="text-muted-foreground text-sm">
                    Tell us about your hair - curly, straight, frizzy, or afro texture
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="step-card relative md:mt-12">
                <div className="bg-card border-2 border-primary p-8 rounded-xl shadow-lg">
                  <div className="mb-4">
                    <span className="text-5xl opacity-20">02</span>
                  </div>
                  <h3 className="mb-3">Upload Photos</h3>
                  <p className="text-muted-foreground text-sm">
                    Share clear images so our advisors can understand your hair's unique needs
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="step-card relative">
                <div className="bg-card border-2 border-primary p-8 rounded-xl shadow-lg">
                  <div className="mb-4">
                    <span className="text-5xl opacity-20">03</span>
                  </div>
                  <h3 className="mb-3">Get Your Products</h3>
                  <p className="text-muted-foreground text-sm">
                    Receive curated recommendations with detailed usage instructions and checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-center mb-12">Real Results from Real People</h2>
          <div className="relative max-w-4xl mx-auto px-4">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Card className="p-8 bg-card/80 backdrop-blur-sm">
                    <div className="flex gap-1 mb-6 justify-center">
                      {Array.from({ length: testimonials[currentSlide].rating }).map((_, i) => (
                        <div key={i} className="w-5 h-5 rounded-full bg-yellow-600" />
                      ))}
                    </div>
                    <p className="mb-8 text-center text-lg leading-relaxed max-w-2xl mx-auto">
                      "{testimonials[currentSlide].text}"
                    </p>
                    <div className="flex items-center justify-center gap-4 pt-6 border-t border-border">
                      <ImageWithFallback
                        src={testimonials[currentSlide].image}
                        alt={testimonials[currentSlide].name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="text-center">
                        <div className="font-medium">{testimonials[currentSlide].name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonials[currentSlide].hairType} Hair
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-primary w-8'
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-12">
          <h2 className="mb-4 text-primary-foreground">Ready to Transform Your Hair?</h2>
          <p className="mb-8 max-w-xl mx-auto opacity-90">
            Join thousands who've discovered their perfect organic hair care routine. Limited supply available this month.
          </p>
          <Button 
            onClick={onGetStarted} 
            size="lg" 
            className="px-8 bg-white text-primary hover:bg-white/90"
          >
            Start Your Journey Now
          </Button>
        </div>
      </div>
    </div>
  );
}
