import { motion } from 'framer-motion';
import { Shield, Truck, RotateCcw, Lock, CreditCard } from 'lucide-react';

interface TrustBadgesProps {
  variant?: 'horizontal' | 'vertical';
  showPayment?: boolean;
  className?: string;
}

export function TrustBadges({ 
  variant = 'horizontal', 
  showPayment = true,
  className = '' 
}: TrustBadgesProps) {
  const badges = [
    { icon: Shield, label: '30-Day Guarantee', color: 'text-green-600' },
    { icon: Truck, label: 'Free Shipping €500+', color: 'text-blue-600' },
    { icon: RotateCcw, label: 'Easy Returns', color: 'text-purple-600' },
    { icon: Lock, label: 'Secure Checkout', color: 'text-amber-600' },
  ];

  const paymentMethods = [
    { name: 'Visa', bg: 'bg-blue-600' },
    { name: 'MC', bg: 'bg-red-500' },
    { name: 'Klarna', bg: 'bg-pink-500' },
    { name: 'PayPal', bg: 'bg-blue-500' },
  ];

  return (
    <div className={className}>
      <div className={`flex ${variant === 'vertical' ? 'flex-col gap-3' : 'flex-wrap justify-center gap-4 md:gap-6'}`}>
        {badges.map((badge, index) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2"
          >
            <badge.icon className={`w-4 h-4 ${badge.color}`} />
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {badge.label}
            </span>
          </motion.div>
        ))}
      </div>

      {showPayment && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <CreditCard className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground mr-2">We accept:</span>
          <div className="flex gap-1">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className={`${method.bg} text-white text-[10px] font-bold px-2 py-0.5 rounded`}
              >
                {method.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
