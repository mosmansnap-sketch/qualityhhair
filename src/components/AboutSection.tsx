import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Target, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const storyCards = sectionRef.current?.querySelectorAll('.story-card');
      if (storyCards) {
        gsap.from(storyCards, {
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
          ease: "back.out(1.4)",
          clearProps: "all"
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const storyElements = [
    {
      icon: Heart,
      title: "MY JOURNEY",
      description: `Quality Hair started from my own struggle with damaged, lifeless hair.

For years, I used hair dyes that dried out my hair. I had to forget about hair growth.

I tried everything out there — nothing worked.

Then one day, I found a keratin product at a market that changed everything.

After just 7 months, my hair became healthy, longer, and easier to manage.

I managed to convince my stylist to sell the product.

One year later, she agreed.

I started presenting the treatment to friends, family members, and even strangers I met.
I performed it on them, and when they came back for a second treatment, a bell rang in my head.

I gained a client base that spread quite quickly.

What started as a hobby took me by storm.
I wanted to prove that my treatment was different — no heat, no harsh chemicals, just real results. And when my clients started coming back months later, I knew I had something special.`
    },
    {
      icon: Sparkles,
      title: "THE CREATOR",
      description: `I built this entire operation myself.
No funding. No investors. No team.
I chose the countries. I did the marketing. I handled bookings/deposits.
I met clients worldwide.
I did the work.
This is more than business –

Today, I've reached a point where demand is so high,
that flying like I do is no longer sustainable`
    },
    {
      icon: Target,
      title: "OUR MISSION",
      description: `I always say: good hair is defined by health, not texture.
My treatment works for kids, for pregnant women, and for anyone who wants to love their hair without changing it.
It brings moisture, reduces breakage, and restores curls — all without heat or damage.
At the end of the day, I want to remind women that beauty doesn't mean straightening your identity. It means taking care of what's already you.`
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-16 md:py-24 bg-gradient-to-b from-accent/5 to-background">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">
            Our Story
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
            Discover the passion and dedication behind Quality Hair
          </p>
          <p className="text-sm text-muted-foreground italic">
            MY JOURNEY • THE CREATOR • OUR MISSION
          </p>
        </motion.div>

        {/* Story Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {storyElements.map((element, index) => (
            <motion.div
              key={index}
              className="group relative bg-card border-2 border-border rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-visible story-card"
              initial={{ opacity: 1 }}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Icon Badge */}
              <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg z-20">
                <element.icon className="h-6 w-6 text-primary-foreground" />
              </div>

              {/* Default Content */}
              <div className="relative z-10 transition-opacity duration-300 group-hover:opacity-0">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mt-4">
                  <element.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-4">{element.title}</h3>
                <p className="text-muted-foreground leading-relaxed line-clamp-4">
                  {element.description}
                </p>
              </div>

              {/* Hover Content - Full Description */}
              <div className="absolute inset-0 bg-gradient-to-br from-card to-secondary/20 rounded-3xl p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-y-auto">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                  <element.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="text-center mb-4">{element.title}</h4>
                
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {element.description}
                </p>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute bottom-4 right-4 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity">
                <element.icon className="w-full h-full text-primary" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats/Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 rounded-2xl p-8 text-center max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  2,847+
                </p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
            </div>
            
            <div className="hidden md:block h-12 w-px bg-border" />
            
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  100%
                </p>
                <p className="text-sm text-muted-foreground">Natural Ingredients</p>
              </div>
            </div>
            
            <div className="hidden md:block h-12 w-px bg-border" />
            
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  15+
                </p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
