import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Droplets, Sparkles, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepCards = sectionRef.current?.querySelectorAll('.step-card');
      if (stepCards) {
        gsap.from(stepCards, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          scale: 0.8,
          opacity: 0,
          y: 60,
          rotateX: -15,
          duration: 1,
          stagger: 0.25,
          ease: "back.out(1.4)"
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  const steps = [
    {
      number: 1,
      title: "Apply",
      icon: Droplets,
      items: [
        "Wash with shampoo only",
        "Dry completely",
        "Apply treatment section by section",
        "Leave in 60-150 min (based on hair type)"
      ]
    },
    {
      number: 2,
      title: "Rinse",
      icon: Sparkles,
      items: [
        "Pure water only",
        "No shampoo or conditioner",
        "Let air dry naturally"
      ]
    },
    {
      number: 3,
      title: "Maintain",
      icon: Clock,
      items: [
        "First wash after 4-7 days (mask only)",
        "Use sulfate-free products",
        "Enjoy healthier hair for months"
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="how-it-works" className="py-16 md:py-24 bg-background">
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
            Three Simple Steps
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Easy application process - no salon required
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="step-card relative"
            >
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-accent" />
              )}

              {/* Step Card */}
              <motion.div 
                className="bg-card border-2 border-border rounded-3xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl relative z-10 h-full min-h-[400px] flex flex-col"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mt-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>

                {/* Title */}
                <h3 className="mb-4">
                  {step.title}
                </h3>

                {/* Items List */}
                <ul className="space-y-3 flex-1">
                  {step.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground italic">
            *Full application guide provided with purchase
          </p>
        </motion.div>
      </div>
    </section>
  );
}
