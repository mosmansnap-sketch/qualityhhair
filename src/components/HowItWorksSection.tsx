import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Sparkles, Clock } from "lucide-react";

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

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
            Three Simple Steps
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
            Easy application process - no salon required
          </p>
          <p className="text-sm text-muted-foreground italic">
            Click on each step for detailed guidance (tap on mobile)
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
              <h3 className="mb-4 text-xl font-bold">Apply</h3>
              <p className="text-muted-foreground leading-relaxed">
                Wash with shampoo only • Dry completely • Apply section by section
              </p>
            </div>

            {/* Detailed Content - Shows on click (mobile) or hover (desktop) */}
            <div className={`absolute inset-0 bg-card rounded-3xl p-8 transition-all duration-300 overflow-y-auto z-20 ${
              activeStep === 1 ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover:opacity-100 md:group-hover:visible'
            }`}>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-foreground">1</span>
              </div>
              <h4 className="text-center mb-3 font-bold text-lg">Apply</h4>
              <p className="text-sm text-primary text-center italic mb-5 px-2 font-medium">
                You are able to book 30 min video call for guiding or read the script for applying
              </p>

              <div className="space-y-3 text-sm text-foreground/90 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Have a towel ready</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>2-3 different hair combs different size & gloves</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Wash your hair only with shampoo</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Before applying your hair needs to be 100% dry and no traces of Oil. Even wait 1 more day to be sure</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Hair type 1A - 3B your hair can airdry before applying make sure you comb it out properly</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Hair type 3C-4C you are able to blowdry your hair flat if it's easier to manage it like that</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Split your hair to 10-12 layers. Left side 5-6 layers and right side same. Start from the bottom</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Brush it out first properly</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Apply a small amount of the treatment and brush it with a small comb 5-6 times til you feel it's easier to comb and the treatment is in properly</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Now you are able to apply more protein on that side again</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>And move to the next side</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Make sure you don't apply the treatment on your scalp or massage it in to your scalp or your babyhair yet. But try go as near as you can</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Your time starts from when you have applied the whole treatment on your hair</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Hair type 1A - 3A - can have it in for 60-80 minutes</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Hair type 3B-4A - can have it in for 2 hours</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>4B-4C can have it in for 2 hours and 30 min</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>When you got 20 min left before washing your hair - you are able to tap your scalp so it reach the scalp and apply it on your babyhair</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>If it feels itchy don't scratch. It will disappear. (Reason of the itchy is dry skin)</span>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-border">
                <button 
                  className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground py-3 px-6 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
                  onClick={() => window.open("https://calendly.com", "_blank")}
                >
                  Book 30-Min Video Guidance
                </button>
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
              <h3 className="mb-4 text-xl font-bold">Rinse</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pure water only • No shampoo or conditioner • Let air dry naturally
              </p>
            </div>

            {/* Detailed Content - Shows on click (mobile) or hover (desktop) */}
            <div className={`absolute inset-0 bg-card rounded-3xl p-8 transition-all duration-300 overflow-y-auto z-20 ${
              activeStep === 2 ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover:opacity-100 md:group-hover:visible'
            }`}>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-foreground">2</span>
              </div>
              <h4 className="text-center mb-3 font-bold text-lg">Rinse</h4>
              <p className="text-sm text-primary text-center italic mb-5 px-2 font-medium">
                Rinse it only with water take a full bath. Make sure it's 100% out of the hair
              </p>

              <div className="space-y-3 text-sm text-foreground/90 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Rinse it only with water take a full bath. Make sure it's 100% out of the hair</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Hair type 1A - 3B let your hair fully AIR DRY</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>3C - 4C make one braid and let it airdry like that</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Don't use any oils or creams after. Even if your hair feels dry afterwards</span>
                </div>
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
              <h3 className="mb-4 text-xl font-bold">Maintain</h3>
              <p className="text-muted-foreground leading-relaxed">
                First wash after 4-7 days (mask only) • Use sulfate-free products • Enjoy healthier hair for months
              </p>
            </div>

            {/* Detailed Content - Shows on click (mobile) or hover (desktop) */}
            <div className={`absolute inset-0 bg-card rounded-3xl p-8 transition-all duration-300 overflow-y-auto z-20 ${
              activeStep === 3 ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover:opacity-100 md:group-hover:visible'
            }`}>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-foreground">3</span>
              </div>
              <h4 className="text-center mb-3 font-bold text-lg">Maintain</h4>
              <p className="text-sm text-primary text-center italic mb-5 px-2 font-medium">
                After 4-7 days you are able to wash your hair again but only with a hairmask
              </p>

              <div className="space-y-3 text-sm text-foreground/90 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>After 4-7 days you are able to wash your hair again but only with a hairmask</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>(sulphate free is our recommendation)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>And if you got the chance to try out the one I got. Make sure it stays in your hair 1h up to 2h rinse it out</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Now you are able to use oils and also style your hair with blowdry</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Third wash?</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>You can use shampoo and conditioner</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>I recommend sulphate free</span>
                </div>
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
            *Full application guide provided with purchase
          </p>
        </motion.div>
      </div>
    </section>
  );
}