import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Target, Users } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function AboutSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const { t } = useLanguage();

  const handleCardClick = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const storyElements = [
    {
      icon: Heart,
      titleKey: "about.journey.title",
      descKey: "about.journey.text"
    },
    {
      icon: Sparkles,
      titleKey: "about.creator.title",
      descKey: "about.creator.text"
    },
    {
      icon: Target,
      titleKey: "about.mission.title",
      descKey: "about.mission.text"
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-accent/5 to-background">
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
            {t('about.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
            {t('about.discoverSubtitle')}
          </p>
          <p className="text-sm text-muted-foreground italic">
            {t('about.journey.title')} • {t('about.creator.title')} • {t('about.mission.title')}
          </p>
        </motion.div>

        {/* Story Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {storyElements.map((element, index) => (
            <motion.div
              key={index}
              className={`group relative bg-card border-2 border-border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden story-card cursor-pointer h-[320px] md:h-[380px] ${
                activeCard === index ? 'ring-2 ring-primary' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => handleCardClick(index)}
            >
              {/* Icon Badge */}
              <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg z-30">
                <element.icon className="h-6 w-6 text-primary-foreground" />
              </div>

              {/* Default Content - Fades out on hover/click */}
              <div className={`relative z-10 transition-all duration-300 ${
                activeCard === index ? 'opacity-0' : 'opacity-100 md:group-hover:opacity-0'
              }`}>
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mt-4">
                  <element.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-lg font-semibold">{t(element.titleKey)}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm line-clamp-5">
                  {t(element.descKey)}
                </p>
                <p className="text-xs text-primary mt-4 italic">{t('about.readMore')}</p>
              </div>

              {/* Expanded Content - Shows on hover (desktop) or click (mobile) */}
              <div className={`absolute inset-0 bg-card rounded-3xl p-6 transition-all duration-300 overflow-y-auto z-20 ${
                activeCard === index ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover:opacity-100 md:group-hover:visible'
              }`}>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3">
                  <element.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h4 className="text-center mb-3 font-semibold">{t(element.titleKey)}</h4>
                
                <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                  {t(element.descKey)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Instruction text */}
        <p className="text-center text-sm text-muted-foreground italic mb-8">
          {t('about.tapInstruction')}
        </p>

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
                <p className="text-sm text-muted-foreground">{t('about.stats.customers')}</p>
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
                <p className="text-sm text-muted-foreground">{t('about.stats.natural')}</p>
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
                <p className="text-sm text-muted-foreground">{t('about.stats.experience')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
