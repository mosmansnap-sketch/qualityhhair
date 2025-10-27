import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ComparisonSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (tableRef.current) {
        gsap.from(tableRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
          y: 80,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: "power3.out"
        });

        const rows = tableRef.current.querySelectorAll('.comparison-row');
        gsap.from(rows, {
          scrollTrigger: {
            trigger: tableRef.current,
            start: "top 65%",
          },
          x: -50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out"
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  const comparisons = [
    {
      traditional: "Straightens & flattens hair",
      ours: "Maintains natural texture"
    },
    {
      traditional: "Requires heat & flat iron",
      ours: "No heat needed"
    },
    {
      traditional: "Contains formaldehyde",
      ours: "100% organic formula"
    },
    {
      traditional: "Damages curl pattern",
      ours: "Enhances curl definition"
    },
    {
      traditional: "Not safe for pregnancy",
      ours: "Safe for pregnancy & kids"
    },
    {
      traditional: "Harsh demarcation line",
      ours: "Natural, seamless grow-out"
    },
    {
      traditional: "Hair gets drier over time",
      ours: "Progressive improvement"
    }
  ];

  return (
    <section ref={sectionRef} id="comparison" className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">
            What Makes It Different
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Not just another keratin treatment - a revolutionary approach to hair care
          </p>
        </motion.div>

        {/* Comparison Table */}
        <div
          ref={tableRef}
          className="bg-card border-2 border-border rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500"
        >
          {/* Table Header */}
          <div className="grid grid-cols-2 bg-gradient-to-r from-primary/10 to-accent/10 border-b-2 border-border">
            <div className="p-6 border-r border-border">
              <h3 className="text-center text-red-600 dark:text-red-400">
                Traditional Keratin
              </h3>
            </div>
            <div className="p-6">
              <h3 className="text-center text-green-600 dark:text-green-400">
                Our Organic Treatment
              </h3>
            </div>
          </div>

          {/* Comparison Rows */}
          {comparisons.map((comparison, index) => (
            <div
              key={index}
              className={`comparison-row grid grid-cols-2 ${index < comparisons.length - 1 ? 'border-b border-border' : ''} hover:bg-secondary/30 transition-colors`}
            >
              {/* Traditional Column */}
              <div className="p-6 border-r border-border flex items-center gap-3">
                <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-sm md:text-base text-muted-foreground">
                  {comparison.traditional}
                </span>
              </div>

              {/* Our Treatment Column */}
              <div className="p-6 flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm md:text-base">
                  {comparison.ours}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
