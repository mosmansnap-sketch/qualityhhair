import { useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, Heart, Leaf, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ProductDetailsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.detail-card');
    gsap.from(cards, {
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div id="product" ref={sectionRef} className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 px-8 py-3 text-base bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-2xl">
              <Sparkles className="h-5 w-5 mr-2" />
              ORGANIC KERATIN PROTEIN TREATMENT
            </Badge>
            <h2 className="mb-6 text-4xl md:text-5xl">The Beginning of Your Hair's Transformation</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto mb-6" />
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Experience the complete benefits of organic keratin protein treatment. A new chapter for your hair — where balance, strength, and natural beauty restart.
            </p>
          </motion.div>
        </div>

        {/* Quote Banner */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-2 border-primary/30 p-12 shadow-2xl">
            <div className="absolute top-0 left-0 w-20 h-20 text-primary/10 text-9xl leading-none">"</div>
            <div className="absolute bottom-0 right-0 w-20 h-20 text-primary/10 text-9xl leading-none rotate-180">"</div>
            <p className="text-3xl md:text-5xl italic relative z-10 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Good hair is defined by hair health, not hair texture
            </p>
          </Card>
        </motion.div>

        {/* Main Content Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: A New Chapter */}
          <motion.div className="detail-card">
            <Card className="relative h-full p-10 bg-gradient-to-br from-accent/30 via-accent/10 to-background hover:shadow-2xl transition-all duration-300 border-2 border-accent/20 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="inline-flex p-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl mb-4 shadow-lg">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl">A New Chapter for Your Hair</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent" />
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Every head of hair tells a story — and sometimes, it just needs a new beginning. 
                    The Keratin Protein Treatment is where that story restarts.
                  </p>
                  <p>
                    It's applied to freshly washed, dry hair, and left to rest — giving the formula time 
                    to connect with your texture and bring your hair back to balance.
                  </p>
                  <p>
                    When it's rinsed with pure water, you'll feel it instantly. That first touch — 
                    that moisture slip between your fingers — it's your hair's way of saying thank you.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 2: No Heat No Damage */}
          <motion.div className="detail-card">
            <Card className="relative h-full p-10 bg-gradient-to-br from-primary/20 via-primary/5 to-background hover:shadow-2xl transition-all duration-300 border-2 border-primary/20 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="inline-flex p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4 shadow-lg">
                    <ShieldCheck className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl">No Heat. No Damage. Just Balance.</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent" />
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    No heat. No flat irons. No compromise. This is a treatment built on calm — 
                    on letting your hair find its balance again.
                  </p>
                  <p>
                    You'll notice less shedding, easier detangling, and a new kind of control. 
                    Your curls? They stay. They don't disappear — they just come back more defined, 
                    hydrated, and alive.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 3: The Strength You Can Feel */}
          <motion.div className="detail-card">
            <Card className="relative h-full p-10 bg-gradient-to-br from-amber/30 via-amber/10 to-background hover:shadow-2xl transition-all duration-300 border-2 border-amber/20 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="inline-flex p-4 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl mb-4 shadow-lg">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl">The Strength You Can Feel</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent" />
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Over the next weeks & months your hair begins to respond. It bends without breaking 
                    like before. It moves without resistance.
                  </p>
                  <p>
                    When you blow-dry or style, it holds its own — steady in warmth or cold weather. 
                    This protein treatment works from within — restoring strength and balance that reveal 
                    themselves each time you style.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 4: The Beginning of Growth */}
          <motion.div className="detail-card">
            <Card className="relative h-full p-10 bg-gradient-to-br from-emerald/30 via-emerald/10 to-background hover:shadow-2xl transition-all duration-300 border-2 border-emerald/20 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="inline-flex p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
                    <Leaf className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl">The Beginning of Growth</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent" />
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    This treatment isn't a quick fix. It's a quick start — a wake-up call for your hair.
                  </p>
                  <p>
                    If you nurture it with sulfate-free shampoos, deep masks, and patience, your hair 
                    will keep getting better. Health shows up in many ways: fewer tangles, balanced moisture, 
                    a natural shine — and yes, real growth.
                  </p>
                  <p>
                    Growth takes care. It takes trimming your ends, showing up for your own hair, 
                    and giving it love long after the treatment is done.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* What You Can Expect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="relative p-12 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-2 border-primary/20 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full -translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-primary/10 to-transparent rounded-full translate-x-32 translate-y-32" />
            
            <div className="relative z-10">
              <h3 className="mb-10 text-center text-3xl">What You Can Expect from This Treatment</h3>
              <div className="grid md:grid-cols-2 gap-6 text-muted-foreground mb-10">
                {[
                  "Moisture that lasts — you'll feel it, even when you don't see it",
                  "Curls that stay true, hydrated, and defined",
                  "Hair you enjoy brushing — with less shedding, fewer tangles, and a calm flow in every move",
                  "A feeling of balance that stays, long after styling"
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex gap-4 items-start bg-white/50 dark:bg-black/20 p-4 rounded-xl border border-primary/10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 mt-1.5">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg" />
                    </div>
                    <p className="leading-relaxed">{benefit}</p>
                  </motion.div>
                ))}
              </div>
              <div className="text-center pt-8 border-t border-primary/20">
                <p className="text-xl md:text-2xl leading-relaxed">
                  Because this isn&apos;t about changing your hair texture. <br />
                  <span className="text-2xl md:text-3xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent italic">
                    It&apos;s about letting your hair texture become everything it was meant to be.
                  </span>
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
