import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import qualityHairLogo from "/images/logo/QH Logo v2.png";

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
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const heroImages = [
    "/images/hero/hero-1-optimized.webp",
    "/images/hero/hero-2-optimized.webp",
    "/images/hero/hero-3-optimized.webp"
  ];

  const trustIndicators = [
    { icon: Check, text: "Safe for Pregnancy & Children" },
    { icon: Check, text: "100% Organic Formula" },
    { icon: Check, text: "No Heat Required" },
    { icon: Check, text: "Lasts 3-6 Months" },
  ];

  // Image preloading and loading state
  useEffect(() => {
    console.log('Starting hero image preloading...');
    let loadedCount = 0;

    const preloadImages = async () => {
      const loadPromises = heroImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            console.log('Hero image loaded:', src);
            loadedCount++;
            resolve(src);
          };
          img.onerror = () => {
            console.error('Hero image failed to load:', src);
            reject(src);
          };
        });
      });

      try {
        await Promise.all(loadPromises);
        console.log('All hero images loaded successfully');
        setImagesLoaded(true);
      } catch (error) {
        console.error('Some hero images failed to load:', error);
        setImagesLoaded(true); // Still show content even if some fail
      }
    };

    preloadImages();
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!imagesLoaded) return; // Don't start animations until images load

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
    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

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

      {/* Loading placeholder */}
      {!imagesLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 animate-pulse z-5">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-primary font-medium">Loading hero images...</p>
            </div>
          </div>
        </div>
      )}

      {/* Image carousel backgrounds */}
      {heroImages.map((imageSrc, index) => (
        <div
          key={index}
          ref={(el) => (imageRefs.current[index] = el)}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            imagesLoaded ? 'opacity-100' : 'opacity-0'
          }`}
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