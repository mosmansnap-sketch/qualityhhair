import { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { motion } from 'framer-motion';
import { Sparkles, Shield, TrendingUp, Flame, Heart, Droplets } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Simple visibility detection using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('BenefitsSection is visible');
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -100px 0px' // Trigger slightly earlier
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const benefits = [
    {
      icon: Sparkles,
      title: 'Quality Hair',
      description: 'Achieve healthy, radiant hair defined by its vitality and strength',
      gradient: 'from-[#6b5d52] to-[#8b7355]' // Primary to darker primary
    },
    {
      icon: Droplets,
      title: 'Maintains Your Curl Pattern',
      description: 'Keep your natural texture while enhancing definition and hydration',
      gradient: 'from-[#b8a68f] to-[#a89680]' // Accent to darker accent
    },
    {
      icon: Heart,
      title: 'Manageability',
      description: 'Easy detangling, smooth styling, and effortless daily care',
      gradient: 'from-[#d4c5b0] to-[#c4b5a0]' // Secondary to darker secondary
    },
    {
      icon: Shield,
      title: 'Less Hair Fall & Breakage',
      description: 'Strengthen from within to reduce shedding and protect against damage',
      gradient: 'from-[#8b7355] to-[#7a6d5f]' // Darker primary to muted
    },
    {
      icon: TrendingUp,
      title: 'Growth Support',
      description: 'Create the perfect foundation for healthy, sustained hair growth',
      gradient: 'from-[#a89680] to-[#968670]' // Accent variant to darker
    },
    {
      icon: Flame,
      title: 'Heat-Free Treatment',
      description: 'No heat, no flat irons, no damage — just natural balance',
      gradient: 'from-[#c55a4a] to-[#b54a3a]' // Destructive to darker destructive
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    console.log('BenefitsSection mounted, section:', section);

    const ctx = gsap.context(() => {
      // Enhanced GSAP animation for section header - with better timing
      const header = section.querySelector('.benefits-header');
      if (header) {
        console.log('Found header, animating...');
        gsap.from(header, {
          scrollTrigger: {
            trigger: section,
            start: 'top 90%', // Earlier trigger for better visibility
            toggleActions: 'play none none reverse',
            onEnter: () => console.log('Benefits section header animation triggered'),
            onLeave: () => console.log('Benefits section header animation reversed'),
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out'
        });
      }

      // Enhanced card animations - with immediate visibility
      const cards = section.querySelectorAll('.benefit-card');
      console.log('Found cards:', cards.length);
      gsap.from(cards, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%', // Earlier trigger
          toggleActions: 'play none none reverse',
          onEnter: () => console.log('Benefits cards animation triggered'),
        },
        y: 80,
        opacity: 0,
        scale: 0.9,
        rotateX: -10,
        duration: 1,
        stagger: 0.15,
        ease: 'back.out(1.4)',
      });

      // Add parallax effect to gradient background - more subtle
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -10, // Reduced parallax for better stability
        ease: 'none'
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="py-16 md:py-24 bg-background"
      style={{ minHeight: '400px' }} // Ensure minimum height
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header - Always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Quality Hair
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the transformation your hair deserves
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={index}
              className="benefit-card group"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 300
              }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className={`h-full p-6 bg-gradient-to-br ${benefit.gradient} hover:shadow-2xl transition-all border-2 border-white/20 hover:border-white/40 duration-300 text-white`}>
                <div className="mb-4">
                  <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="mb-3 text-white font-semibold text-xl">{benefit.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>
      </div>
    </section>
  );
}