import { useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { motion } from 'motion/react';
import { Sparkles, Shield, TrendingUp, Flame, Heart, Droplets } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const benefits = [
    {
      icon: Sparkles,
      title: 'Quality Hair',
      description: 'Achieve healthy, radiant hair defined by its vitality and strength',
      gradient: 'from-amber-500 to-yellow-500'
    },
    {
      icon: Droplets,
      title: 'Maintains Your Curl Pattern',
      description: 'Keep your natural texture while enhancing definition and hydration',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Manageability',
      description: 'Easy detangling, smooth styling, and effortless daily care',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: Shield,
      title: 'Less Hair Fall & Breakage',
      description: 'Strengthen from within to reduce shedding and protect against damage',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      title: 'Growth Support',
      description: 'Create the perfect foundation for healthy, sustained hair growth',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      icon: Flame,
      title: 'Heat-Free Treatment',
      description: 'No heat, no flat irons, no damage — just natural balance',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.benefit-card');
    gsap.from(cards, {
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      },
      y: 80,
      opacity: 0,
      scale: 0.9,
      rotateX: -10,
      duration: 1,
      stagger: 0.15,
      ease: 'back.out(1.4)',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="benefits" ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">
            Why Choose Quality Hair
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full p-6 bg-gradient-to-br from-card via-card to-accent/5 hover:shadow-2xl transition-all border-2 border-border hover:border-primary/40 duration-300">
                <div className="mb-4">
                  <div className={`inline-flex p-3 bg-gradient-to-br ${benefit.gradient} rounded-xl group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">
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
