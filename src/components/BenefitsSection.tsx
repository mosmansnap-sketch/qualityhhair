import { Card } from './ui/card';
import { motion } from 'framer-motion';
import { Sparkles, Shield, TrendingUp, Flame, Heart, Droplets } from 'lucide-react';

export function BenefitsSection() {

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

  return (
    <section
      id="benefits"
      className="py-16 md:py-24 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08
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