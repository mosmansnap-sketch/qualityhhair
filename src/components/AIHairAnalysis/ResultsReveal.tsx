import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, ShoppingBag, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';

interface AnalysisResults {
  hairType: string;
  volume: string;
  bottleSize: string;
  price: string;
  description: string;
  confidence: number;
}

interface ResultsRevealProps {
  results: AnalysisResults;
  onCheckout: () => void;
  onStartOver: () => void;
}

export function ResultsReveal({ results, onCheckout, onStartOver }: ResultsRevealProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Success header */}
      <motion.div variants={itemVariants} className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-4"
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Analysis Complete!</h2>
        <p className="text-muted-foreground">Your personalized treatment plan is ready</p>
      </motion.div>

      {/* Results summary */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 gap-4"
      >
        <div className="glass-card rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Hair Type</p>
          <p className="font-semibold text-lg">{results.hairType}</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Volume</p>
          <p className="font-semibold text-lg">{results.volume}</p>
        </div>
      </motion.div>

      {/* Confidence meter */}
      <motion.div variants={itemVariants} className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">AI Confidence</p>
          <p className="font-semibold">{results.confidence}%</p>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${results.confidence}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          />
        </div>
      </motion.div>

      {/* Recommended product */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl border-2 border-primary bg-gradient-to-br from-card to-accent/10 p-6"
      >
        {/* Sparkle decoration */}
        <motion.div
          className="absolute top-4 right-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="w-6 h-6 text-accent" />
        </motion.div>

        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Recommended for You</p>
            <h3 className="text-2xl font-bold text-primary">{results.bottleSize}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Price</p>
            <p className="text-3xl font-bold">{results.price}</p>
          </div>
        </div>

        <p className="text-muted-foreground mb-6">{results.description}</p>

        {/* What's included */}
        <div className="bg-background/50 rounded-xl p-4 mb-6">
          <p className="font-medium mb-3">What's Included:</p>
          <ul className="space-y-2 text-sm">
            {[
              'Organic Keratin Treatment Formula',
              'Step-by-Step Application Guide',
              'Video Tutorial Access',
              'Email Support',
              '30-Day Satisfaction Guarantee',
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onCheckout}
            size="lg"
            className="w-full btn-premium bg-gradient-to-r from-primary to-accent text-white"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Get Your Treatment - {results.price}
          </Button>
          <Button
            onClick={onStartOver}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Start New Analysis
          </Button>
        </div>
      </motion.div>

      {/* Trust badges */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center gap-6 text-sm text-muted-foreground"
      >
        <span>✓ Free Shipping</span>
        <span>✓ Secure Payment</span>
        <span>✓ 30-Day Guarantee</span>
      </motion.div>
    </motion.div>
  );
}
