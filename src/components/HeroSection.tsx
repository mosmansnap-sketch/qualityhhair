import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import qualityHairLogo from "../../QH Logo v2.png";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onGetStarted: () => void;
  onViewPricing?: () => void;
}

export function HeroSection({ onGetStarted, onViewPricing }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1508204152195-1ce799200f89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXJseSUyMG5hdHVyYWwlMjBoYWlyJTIwd29tYW58ZW58MXx8fHwxNzYwODAxMTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1707161256491-e41eb204b571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwYWZybyUyMGhhaXJ8ZW58MXx8fHwxNzYwODAxMTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1712641966810-611ff1503c6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXJseSUyMGhhaXIlMjB3b21hbnxlbnwxfHx8fDE3NjAyNzE1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1739949154765-f2a23bdfa3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwaGFpciUyMGNhcmUlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NjA4MDExMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];

  const trustIndicators = [
    { icon: Check, text: "Safe for Pregnancy & Children" },
    { icon: Check, text: "100% Organic Formula" },
    { icon: Check, text: "No Heat Required" },
    { icon: Check, text: "Lasts 3-6 Months" },
  ];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline stagger animation
      if (headlineRef.current) {
        gsap.from(headlineRef.current.children, {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3
        });
      }

      // Badge animation
      if (badgeRef.current) {
        gsap.from(badgeRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.2
        });
      }

      // CTA button animation
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.8
        });
      }

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
    });

    // Auto-advance hero images
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      clearInterval(imageInterval);
    };
  }, [heroImages.length]);

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

  // Function is used in the Figma version but not in this implementation
  // const scrollToConsultation = () => {
  //   const consultationSection = document.getElementById("consultation");
  //   if (consultationSection) {
  //     const navHeight = 100;
  //     const elementPosition = consultationSection.getBoundingClientRect().top + window.pageYOffset;
  //     const offsetPosition = elementPosition - navHeight;
  //     window.scrollTo({
  //       top: offsetPosition,
  //       behavior: "smooth"
  //     });
  //   }
  // };

  return (
    <div id="hero" ref={heroRef} className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* Animated gradient overlay with GSAP */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse-slow pointer-events-none z-10" />

      {/* Image carousel backgrounds */}
      {heroImages.map((imageSrc, index) => (
        <div
          key={index}
          ref={(el) => (imageRefs.current[index] = el)}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageSrc})`,
            opacity: index === 0 ? 1 : 0,
            transform: index === 0 ? "scale(1)" : "scale(1.1)",
          }}
        />
      ))}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />

      {/* Floating particles effect for glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0
                ? 'radial-gradient(circle, rgba(251,191,36,0.8) 0%, rgba(251,191,36,0) 70%)'
                : 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)',
              boxShadow: i % 3 === 0
                ? '0 0 20px rgba(251,191,36,0.8)'
                : '0 0 15px rgba(255,255,255,0.6)',
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative container max-w-6xl mx-auto px-4 py-20 z-20">
        <div className="hero-content text-center text-white w-full">
          {/* Logo */}
          <div ref={badgeRef} className="mb-8">
            <h1 className="mb-4 flex justify-center">
              <motion.img
                src={qualityHairLogo}
                alt="Quality Hair"
                className="h-64 md:h-80 lg:h-96 w-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(251,191,36,0.6)) drop-shadow(0 0 60px rgba(251,191,36,0.4))',
                }}
                animate={{
                  filter: [
                    'drop-shadow(0 0 30px rgba(251,191,36,0.6)) drop-shadow(0 0 60px rgba(251,191,36,0.4))',
                    'drop-shadow(0 0 40px rgba(251,191,36,0.8)) drop-shadow(0 0 80px rgba(251,191,36,0.6))',
                    'drop-shadow(0 0 30px rgba(251,191,36,0.6)) drop-shadow(0 0 60px rgba(251,191,36,0.4))',
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </h1>
            <motion.p
              className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-sm tracking-widest uppercase"
              animate={{
                textShadow: [
                  '0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(251,191,36,0.3)',
                  '0 2px 8px rgba(0,0,0,0.8), 0 0 30px rgba(251,191,36,0.5)',
                  '0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(251,191,36,0.3)',
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Organic • Natural
            </motion.p>
          </div>

          {/* Main Content */}
          <div ref={headlineRef} className="space-y-6">
            {/* Tagline */}
            <motion.p
              className="text-amber-300 mb-6 text-lg md:text-xl tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              animate={{
                textShadow: [
                  '0 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(251,191,36,0.4)',
                  '0 2px 4px rgba(0,0,0,0.8), 0 0 25px rgba(251,191,36,0.6)',
                  '0 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(251,191,36,0.4)',
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              "Good Hair Is Defined by Hair Health, Not Hair Texture"
            </motion.p>

            {/* Main Heading */}
            <h2 className="mb-6 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] max-w-4xl mx-auto">
              The Only Organic Keratin Treatment That Maintains Your Natural Curls
            </h2>

            {/* Subheading */}
            <p className="text-white/90 mb-12 max-w-3xl mx-auto text-lg md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Transform your hair without changing who you are. No heat. No straightening. Just healthier, more manageable hair that stays true to your texture.
            </p>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12"
          >
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-4 shadow-xl"
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(251,191,36,0.2)'
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.3)",
                  boxShadow: "0 20px 40px rgba(251, 191, 36, 0.4), 0 0 40px rgba(251,191,36,0.5)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <indicator.icon className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {indicator.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg"
              >
                <span className="flex items-center gap-2">
                  Start Your Transformation
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Button>
            </motion.div>

            {onViewPricing && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={onViewPricing}
                  className="border-2 border-white text-white hover:bg-white hover:text-black backdrop-blur-md px-8 py-4 text-lg"
                >
                  View Pricing
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}