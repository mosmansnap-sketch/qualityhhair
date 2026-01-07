import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from './utils';

interface ExpandableCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  image?: string;
  highlighted?: boolean;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

export function ExpandableCard({
  title,
  price,
  description,
  features,
  image,
  highlighted = false,
  onAction,
  actionLabel = 'Select',
  className,
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className={cn(
        'relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500',
        'bg-gradient-to-br from-card to-background-card',
        'border border-border hover:border-accent/50',
        highlighted && 'ring-2 ring-accent shadow-lg',
        className
      )}
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(107, 93, 82, 0.15)',
      }}
      transition={{ duration: 0.3 }}
    >
      {highlighted && (
        <div className="absolute top-0 left-0 right-0 bg-accent text-accent-foreground text-center text-sm py-1 font-medium">
          Most Popular
        </div>
      )}
      
      <div className={cn('p-6', highlighted && 'pt-10')}>
        {image && (
          <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}
        
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </div>
        
        <p className="text-2xl font-bold text-primary mb-2">{price}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-border">
                <ul className="space-y-3 mb-6">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAction?.();
                  }}
                  className={cn(
                    'w-full py-3 px-6 rounded-xl font-medium transition-all duration-300',
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                    'shadow-md hover:shadow-lg'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {actionLabel}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(184, 166, 143, 0.1) 0%, transparent 50%)',
        }}
      />
    </motion.div>
  );
}
