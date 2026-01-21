import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Sparkles, Clock } from "lucide-react";
import { openCalendlyPopup } from "../utils/calendly";
import { useLanguage } from "../contexts/LanguageContext";

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const { t } = useLanguage();

  const handleStepClick = (stepNumber: number) => {
    setActiveStep(activeStep === stepNumber ? null : stepNumber);
  };

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-background">
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
            {t('howItWorks.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
            {t('howItWorks.subtitle')}
          </p>
          <p className="text-sm text-muted-foreground italic">
            {t('howItWorks.clickInstruction')}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Step 1: Apply */}
          <motion.div
            className={`group relative bg-card border-2 border-border rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-visible step-card cursor-pointer ${
              activeStep === 1 ? 'ring-2 ring-primary' : ''
            }`}
            initial={{ opacity: 1 }}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => handleStepClick(1)}
            style={{
              backgroundImage: activeStep === 1 ? 'url(/images/Apply.png)' : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Step Number Badge - Original Position */}
            <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg z-20">
              <span className="text-primary-foreground">1</span>
            </div>

            {/* Default Content - Always visible on mobile, hides on desktop hover */}
            <div className={`relative z-10 transition-all duration-300 ${
              activeStep === 1 ? 'opacity-0 md:group-hover:opacity-0' : 'opacity-100'
            }`}>
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mt-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-4 text-xl font-bold">{t('howItWorks.step1.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('howItWorks.step1.short')}
              </p>
            </div>

            {/* Detailed Content - Shows on click (mobile) or hover (desktop) */}
            <div className={`absolute inset-0 bg-card rounded-3xl p-8 transition-all duration-300 overflow-y-auto z-20 ${
              activeStep === 1 ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover:opacity-100 md:group-hover:visible'
            }`}>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-foreground">1</span>
              </div>
              <h4 className="text-center mb-3 font-bold text-lg">{t('howItWorks.step1.title')}</h4>
              <p className="text-sm text-primary text-center italic mb-5 px-2 font-medium">
                {t('howItWorks.step1.intro')}
              </p>

              <div className="space-y-3 text-sm text-foreground/90 leading-relaxed">
                {['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12', 'd13', 'd14', 'd15', 'd16', 'd17', 'd18'].map((key) => (
                  <div key={key} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{t(`howItWorks.step1.${key}`)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border/50 text-center">
                <p className="text-xs text-muted-foreground">
                  {t('howItWorks.step1.helpText')}{' '}
                  <button 
                    className="text-primary hover:underline font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      openCalendlyPopup('videoGuidance');
                    }}
                  >
                    {t('howItWorks.step1.bookCall')}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 2: Rinse */}
          <motion.div
            className={`group relative bg-card border-2 border-border rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-visible step-card cursor-pointer ${
              activeStep === 2 ? 'ring-2 ring-primary' : ''
            }`}
            initial={{ opacity: 1 }}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => handleStepClick(2)}
            style={{
              backgroundImage: activeStep === 2 ? 'url(/images/Rinse.png)' : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Step Number Badge - Original Position */}
            <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg z-20">
              <span className="text-primary-foreground">2</span>
            </div>

            {/* Default Content - Always visible on mobile, hides on desktop hover */}
            <div className={`relative z-10 transition-all duration-300 ${
              activeStep === 2 ? 'opacity-0 md:group-hover:opacity-0' : 'opacity-100'
            }`}>
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mt-4">
                <Droplets className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-4 text-xl font-bold">{t('howItWorks.step2.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('howItWorks.step2.short')}
              </p>
            </div>

            {/* Detailed Content - Shows on click (mobile) or hover (desktop) */}
            <div className={`absolute inset-0 bg-card rounded-3xl p-8 transition-all duration-300 overflow-y-auto z-20 ${
              activeStep === 2 ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover:opacity-100 md:group-hover:visible'
            }`}>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-foreground">2</span>
              </div>
              <h4 className="text-center mb-3 font-bold text-lg">{t('howItWorks.step2.title')}</h4>
              <p className="text-sm text-primary text-center italic mb-5 px-2 font-medium">
                {t('howItWorks.step2.intro')}
              </p>

              <div className="space-y-3 text-sm text-foreground/90 leading-relaxed">
                {['d1', 'd2', 'd3', 'd4'].map((key) => (
                  <div key={key} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{t(`howItWorks.step2.${key}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Step 3: Maintain */}
          <motion.div
            className={`group relative bg-card border-2 border-border rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-visible step-card cursor-pointer ${
              activeStep === 3 ? 'ring-2 ring-primary' : ''
            }`}
            initial={{ opacity: 1 }}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => handleStepClick(3)}
          >
            {/* Step Number Badge - Original Position */}
            <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg z-20">
              <span className="text-primary-foreground">3</span>
            </div>

            {/* Default Content - Always visible on mobile, hides on desktop hover */}
            <div className={`relative z-10 transition-all duration-300 ${
              activeStep === 3 ? 'opacity-0 md:group-hover:opacity-0' : 'opacity-100'
            }`}>
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mt-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-4 text-xl font-bold">{t('howItWorks.step3.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('howItWorks.step3.short')}
              </p>
            </div>

            {/* Detailed Content - Shows on click (mobile) or hover (desktop) */}
            <div className={`absolute inset-0 bg-card rounded-3xl p-8 transition-all duration-300 overflow-y-auto z-20 ${
              activeStep === 3 ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover:opacity-100 md:group-hover:visible'
            }`}>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-foreground">3</span>
              </div>
              <h4 className="text-center mb-3 font-bold text-lg">{t('howItWorks.step3.title')}</h4>
              <p className="text-sm text-primary text-center italic mb-5 px-2 font-medium">
                {t('howItWorks.step3.intro')}
              </p>

              <div className="space-y-3 text-sm text-foreground/90 leading-relaxed">
                {['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7'].map((key) => (
                  <div key={key} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{t(`howItWorks.step3.${key}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground italic">
            {t('howItWorks.footer')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}