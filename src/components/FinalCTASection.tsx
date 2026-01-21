import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Sparkles, ArrowRight, ShoppingCart } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface FinalCTASectionProps {
  onGetStarted: () => void;
  onViewPricing?: () => void;
}

export function FinalCTASection({ onGetStarted, onViewPricing }: FinalCTASectionProps) {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-6">
            {t('final.title')}
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('final.subtitle')}
            <br />
            <span className="text-primary">{t('final.limitedSupply')}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onGetStarted}
                size="lg"
                className="px-12 py-8 text-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-amber-950 transition-all duration-300 shadow-[0_0_40px_rgba(251,191,36,0.6)] hover:shadow-[0_0_60px_rgba(251,191,36,0.8)] border-2 border-amber-300 rounded-full relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative flex items-center gap-3">
                  <Sparkles className="h-6 w-6" />
                  {t('final.getRecommendation')}
                  <ArrowRight className="h-6 w-6" />
                </span>
              </Button>
            </motion.div>

            {onViewPricing && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onViewPricing}
                  size="lg"
                  variant="outline"
                  className="px-8 py-8 text-lg hover:bg-accent/50"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {t('final.viewAllPricing')}
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
