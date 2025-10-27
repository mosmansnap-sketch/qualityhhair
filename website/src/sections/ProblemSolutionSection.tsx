import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { AlertCircle, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ProblemSolutionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (problemRef.current && solutionRef.current) {
        // Slide in from left (problem)
        gsap.from(problemRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        // Slide in from right (solution)
        gsap.from(solutionRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          x: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.2
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="problem-solution" className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* The Problem */}
          <div
            ref={problemRef}
            className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-2 border-red-200 dark:border-red-800 rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-red-900 dark:text-red-200">
                Why We Created Something Different
              </h3>
            </div>
            
            <div className="space-y-4 text-foreground/80">
              <p>
                Traditional keratin treatments force you to choose between healthy hair and your natural texture. They straighten, flatten, and damage your curl pattern with heat and chemicals.
              </p>
              <p>
                After 2-3 months, you're left with two different textures - straight treated hair and curly new growth. The result? More damage as your hair tries to stretch back.
              </p>
            </div>
          </div>

          {/* Our Solution */}
          <div
            ref={solutionRef}
            className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800 rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-green-900 dark:text-green-200">
                A New Beginning for Your Hair
              </h3>
            </div>
            
            <div className="space-y-4 text-foreground/80">
              <p>
                Our organic protein treatment works WITH your hair, not against it. Applied to dry hair and rinsed with pure water - no heat, no flat irons, no compromise.
              </p>
              <p>
                Your curls don't disappear - they come back more defined, hydrated, and alive. That first touch after rinsing - that moisture slip between your fingers - it's your hair saying thank you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
