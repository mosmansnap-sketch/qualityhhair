import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SocialProofSection } from "./SocialProofSection";
import { VideoTutorialSection } from "./VideoTutorialSection";
import { BenefitsSection } from "./BenefitsSection";
import { ProductDetailsSection } from "./ProductDetailsSection";
import { FAQSection } from "./FAQSection";
import { PricingSection } from "./PricingSection";
import { useLanguage } from "../contexts/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
// Figma asset import replaced - using placeholder
const qualityHairLogo = "/placeholder-logo.png";

gsap.registerPlugin(ScrollTrigger);

interface EnhancedHeroPageProps {
  onGetStarted: () => void;
}

export function EnhancedHeroPage({ onGetStarted }: EnhancedHeroPageProps) {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
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
    "https://images.unsplash.com/photo-1653848067570-ccc640e5b3cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwaGFpciUyMGNhcmUlMjBtYWxlfGVufDF8fHx8MTc2MDc4NDY4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1711454867327-4990937f8f18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhaWdodCUyMGhhaXIlMjBjYXJlfGVufDF8fHx8MTc2MDM0OTE5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwaGFpciUyMHByb2R1Y3RzfGVufDF8fHx8MTc2MDM0OTE5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1622265544955-56574abbce5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwaGFpciUyMGNhcmV8ZW58MXx8fHwxNzYwNzg0NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
      name: "Marcus Johnson",
      hairType: "Afro",
      rating: 5,
      text: "Finally found products that work for my hair. The results are incredible and the process was so simple!",
      image: "https://images.unsplash.com/photo-1653848067570-ccc640e5b3cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwaGFpciUyMGNhcmUlMjBtYWxlfGVufDF8fHx8MTc2MDc4NDY4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Emma L.",
      hairType: "Frizzy",
      rating: 5,
      text: "No more frizz! The step-by-step guidance made it so easy to see real results.",
      image: "https://images.unsplash.com/photo-1758315949140-1972ace0644e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHJhbnNmb3JtYXRpb258ZW58MXx8fHwxNzU5OTYwNzE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Amina Hassan",
      hairType: "Afro",
      rating: 5,
      text: "The organic ingredients make such a difference. My hair has been thriving and I've never felt more confident!",
      image: "https://images.unsplash.com/photo-1622265544955-56574abbce5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwaGFpciUyMGNhcmV8ZW58MXx8fHwxNzYwNzg0NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Sofia Andersson",
      hairType: "Straight",
      rating: 5,
      text: "I was skeptical at first, but the results speak for themselves. My hair has more volume and shine than ever.",
      image: "https://images.unsplash.com/photo-1732247609999-52bb7c01fcf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBiZWF1dHklMjBwcm9kdWN0fGVufDF8fHx8MTc2MDc4NDY5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
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

    // Hero section animations with enhanced effects
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    timeline
      .from(badgeRef.current, {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
      })
      .from(headlineRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
      }, "-=0.5")
      .from(headlineRef.current?.children || [], {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
      }, "-=0.8")
      .from(ctaRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
      }, "-=0.4");

    // Parallax effect on hero content
    const heroContent = heroRef.current?.querySelector('.hero-content');
    if (heroContent) {
      gsap.to(heroContent, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 100,
        opacity: 0.5,
      });
    }

    // Features animation with 3D tilt
    if (featuresRef.current) {
      const featureCards = featuresRef.current.querySelectorAll('.feature-card');
      gsap.from(featureCards, {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        rotateX: -15,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.4)"
      });
    }

    // Steps animation
    if (stepsRef.current) {
      const stepCards = stepsRef.current.querySelectorAll('.step-card');
      gsap.from(stepCards, {
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 75%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.25,
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
      
      tl.fromTo(currentImage, 
        { 
          opacity: 0, 
          scale: 1.2 
        },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 2.5,
          ease: "power2.out" 
        }
      );

      tl.to(prevImage, {
        opacity: 0,
        duration: 2,
        ease: "power2.inOut"
      }, 0);
    }
  }, [currentImageIndex, heroImages.length]);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section with Enhanced Image Carousel */}
      <div id="hero" ref={heroRef} className="relative min-h-screen w-full overflow-hidden flex items-center">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse-slow pointer-events-none z-10" />
        
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
        
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="relative container max-w-6xl mx-auto px-4 py-20 z-20">
          <div className="hero-content text-center text-white w-full">
            <motion.div
              ref={badgeRef}
              className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 backdrop-blur-sm rounded-full mb-6 shadow-2xl shadow-amber-500/50 border-2 border-amber-300/50 ring-2 ring-white/20"
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="text-sm font-semibold text-amber-950 tracking-wide flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                {t('hero.badge')}
              </span>
            </motion.div>
            
            {/* Centered Logo/Brand Name */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="mb-4 flex justify-center">
                <img 
                  src={qualityHairLogo} 
                  alt="Quality Hair" 
                  className="h-64 md:h-96 w-auto object-contain"
                />
              </h1>
              <p className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-sm tracking-widest uppercase">
                Organic • Natural
              </p>
            </motion.div>

            {/* Power Words Grid */}
            <motion.div
              ref={headlineRef}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                'Maintains your curl pattern',
                'Manageability',
                'Less hair fall & breakage',
                'Growth support',
                'Heat-free treatment'
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-white/40 via-white/30 to-white/20 backdrop-blur-2xl border-2 border-white/50 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center justify-center min-h-[100px]"
                  whileHover={{ 
                    scale: 1.08,
                    backgroundColor: 'rgba(251, 191, 36, 0.4)',
                    borderColor: 'rgba(251, 191, 36, 0.8)',
                    boxShadow: '0 20px 60px rgba(251, 191, 36, 0.5)'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            

            
            <div ref={ctaRef}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={onGetStarted} 
                  size="lg" 
                  className="px-12 py-8 text-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-amber-950 transition-all duration-300 shadow-[0_0_40px_rgba(251,191,36,0.6)] hover:shadow-[0_0_60px_rgba(251,191,36,0.8)] border-2 border-amber-300 rounded-full relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative flex items-center gap-3">
                    <Sparkles className="h-6 w-6" />
                    {t('hero.cta')}
                    <ArrowRight className="h-6 w-6" />
                  </span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4">{t('features.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </motion.div>
        </div>

        <div ref={featuresRef} className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            className="feature-card group"
            whileHover={{ y: -5 }}
          >
            <Card className="bg-gradient-to-br from-accent/30 via-card to-accent/10 p-8 rounded-xl backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all h-full">
              <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-3">{t('features.personalized.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.personalized.desc')}
              </p>
            </Card>
          </motion.div>
          
          <motion.div 
            className="feature-card group"
            whileHover={{ y: -5 }}
          >
            <Card className="bg-gradient-to-br from-primary/10 via-card to-primary/5 p-8 rounded-xl backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all h-full">
              <div className="mb-4 inline-flex p-3 bg-accent/20 rounded-lg group-hover:scale-110 transition-transform">
                <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-3">{t('features.expert.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.expert.desc')}
              </p>
            </Card>
          </motion.div>
          
          <motion.div 
            className="feature-card group"
            whileHover={{ y: -5 }}
          >
            <Card className="bg-gradient-to-br from-accent/30 via-card to-accent/10 p-8 rounded-xl backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all h-full">
              <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="mb-3">{t('features.automated.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.automated.desc')}
              </p>
            </Card>
          </motion.div>
        </div>

        {/* How It Works */}
        <div id="howitworks" className="mb-20">
          <motion.h2
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('steps.title')}
          </motion.h2>
          
          <div ref={stepsRef} className="relative max-w-4xl mx-auto">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary/30 to-accent transform -translate-y-1/2 z-0" />
            
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {[1, 2, 3].map((step, index) => (
                <motion.div
                  key={step}
                  className="step-card relative"
                  style={{ marginTop: index === 1 ? '3rem' : '0' }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                >
                  <Card className="bg-card border-2 border-primary p-8 rounded-xl shadow-2xl hover:shadow-primary/20 transition-all">
                    <div className="mb-4 relative">
                      <span className="text-7xl opacity-10 absolute -top-4 -left-2">0{step}</span>
                      <div className="relative z-10 inline-flex p-4 bg-gradient-to-br from-primary to-accent rounded-full">
                        <span className="text-2xl text-primary-foreground">0{step}</span>
                      </div>
                    </div>
                    <h3 className="mb-3">{t(`steps.step${step}.title`)}</h3>
                    <p className="text-muted-foreground text-sm">
                      {t(`steps.step${step}.desc`)}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div id="testimonials" className="mb-16">
          <motion.h2
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('testimonials.title')}
          </motion.h2>
          <div className="relative max-w-4xl mx-auto px-4">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Card className="p-8 bg-gradient-to-br from-card via-accent/5 to-card backdrop-blur-sm border-2 border-border">
                    <div className="flex gap-1 mb-6 justify-center">
                      {Array.from({ length: testimonials[currentSlide].rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                        />
                      ))}
                    </div>
                    <p className="mb-8 text-center text-lg leading-relaxed max-w-2xl mx-auto">
                      "{testimonials[currentSlide].text}"
                    </p>
                    <div className="flex items-center justify-center gap-4 pt-6 border-t border-border">
                      <ImageWithFallback
                        src={testimonials[currentSlide].image}
                        alt={testimonials[currentSlide].name}
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20"
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
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-primary w-8'
                      : 'bg-primary/30 hover:bg-primary/50 w-3'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Product Details Section */}
      <ProductDetailsSection />

      {/* Social Proof Section */}
      <SocialProofSection />

      {/* Video Tutorial Section */}
      <VideoTutorialSection />

      {/* Pricing Section */}
      <PricingSection onAddToCart={() => {}} />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA */}
      <div className="container max-w-6xl mx-auto px-4 pb-20">
        <motion.div
          className="text-center bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground rounded-3xl p-12 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          <div className="relative z-10">
            <h2 className="mb-4 text-primary-foreground">{t('final.title')}</h2>
            <p className="mb-8 max-w-xl mx-auto opacity-90">
              {t('final.subtitle')}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onGetStarted} 
                size="lg" 
                className="px-8 py-6 text-lg bg-white text-primary hover:bg-white/90 shadow-2xl"
              >
                {t('final.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
