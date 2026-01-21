import { Card } from './ui/card';
import { motion } from 'framer-motion';
import { Sparkles, Shield, TrendingUp, Flame, Heart, Droplets } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function BenefitsSection() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Sparkles,
      titleKey: 'benefits.qualityHair',
      descKey: 'benefits.qualityHairDesc',
      gradient: 'from-[#6b5d52] to-[#8b7355]' // Primary to darker primary
    },
    {
      icon: Droplets,
      titleKey: 'benefits.maintainsCurl',
      descKey: 'benefits.maintainsCurlDesc',
      gradient: 'from-[#b8a68f] to-[#a89680]' // Accent to darker accent
    },
    {
      icon: Heart,
      titleKey: 'benefits.manageability',
      descKey: 'benefits.manageabilityDesc',
      gradient: 'from-[#d4c5b0] to-[#c4b5a0]' // Secondary to darker secondary
    },
    {
      icon: Shield,
      titleKey: 'benefits.lessBreakage',
      descKey: 'benefits.lessBreakageDesc',
      gradient: 'from-[#8b7355] to-[#7a6d5f]' // Darker primary to muted
    },
    {
      icon: TrendingUp,
      titleKey: 'benefits.growthSupport',
      descKey: 'benefits.growthSupportDesc',
      gradient: 'from-[#a89680] to-[#968670]' // Accent variant to darker
    },
    {
      icon: Flame,
      titleKey: 'benefits.heatFree',
      descKey: 'benefits.heatFreeDesc',
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
            {t('benefits.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('benefits.subtitle')}
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
                <h3 className="mb-3 text-white font-semibold text-xl">{t(benefit.titleKey)}</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {t(benefit.descKey)}
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