import { motion } from "framer-motion";
import { AlertCircle, Sparkles } from "lucide-react";

export function ProblemSolutionSection() {

  return (
    <section id="problem-solution" className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Exact specifications */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold uppercase tracking-[0.02em]">The Problem With Traditional Treatments</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Keratin treatments out there today force you to choose between straight hair and your natural hair texture
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* The Problem - Exact specifications */}
          <motion.div
            className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 shadow-lg"
            initial={{ y: 60, opacity: 0, scale: 0.95 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-red-900">
                The treatment out there today in the salons.
              </h3>
            </div>
            
            <div className="space-y-4 text-foreground/80">
              <p>
                We can all agree it's beautiful in the beginning. After a couple of weeks, you start losing hair because the treatment made your hair straight. And it's because your hair is trying to stretch back.
              </p>
              <p>
                After 2-3 months, you end up with 2 different hair textures. Some even notice the new growing hair has a dryer texture. Traditional keratin needs heat and hair straightening, and it's not recommended for pregnancy or kids. Once you've had that treatment, I normally don't suggest mine until your natural hair has grown out all the way to your shoulders.
              </p>
            </div>
          </motion.div>

          {/* Our Solution - Exact specifications with green gradient */}
          <motion.div
            className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 shadow-lg"
            initial={{ y: 60, opacity: 0, scale: 0.95 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-green-800">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}