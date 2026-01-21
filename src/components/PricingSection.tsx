import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Check, Phone, Euro } from 'lucide-react';
import { Product } from '../App';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { openCalendlyPopup } from '../utils/calendly';
import { TrustBadges } from './TrustBadges';
import { UrgencyBanner } from './UrgencyBanner';
import { useLanguage } from '../contexts/LanguageContext';


interface PricingTier {
  id: string;
  nameKey: string;
  price: number;
  descKey: string;
  featureKeys: string[];
  highlighted?: boolean;
}

interface PricingSectionProps {
  onAddToCart: (product: Product) => void;
}

export function PricingSection({ onAddToCart }: PricingSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const pricingCards = cardsRef.current?.querySelectorAll('.pricing-card');
      if (pricingCards) {
        gsap.from(pricingCards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          },
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out"
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const pricingTiers: PricingTier[] = [
    {
      id: 'minimal',
      nameKey: 'pricing.minimal',
      price: 165,
      descKey: 'pricing.minimalDesc',
      featureKeys: [
        'pricing.feature.completeKit',
        'pricing.feature.applicationGuide',
        'pricing.feature.videoSupport',
        'pricing.feature.lasts'
      ]
    },
    {
      id: 'moderate',
      nameKey: 'pricing.moderate',
      price: 235,
      descKey: 'pricing.moderateDesc',
      featureKeys: [
        'pricing.feature.completeKit',
        'pricing.feature.applicationGuide',
        'pricing.feature.videoSupport',
        'pricing.feature.lasts'
      ],
      highlighted: true
    },
    {
      id: 'full',
      nameKey: 'pricing.full',
      price: 295,
      descKey: 'pricing.fullDesc',
      featureKeys: [
        'pricing.feature.completeKit',
        'pricing.feature.applicationGuide',
        'pricing.feature.videoSupport',
        'pricing.feature.lasts'
      ]
    },
    {
      id: 'maximum',
      nameKey: 'pricing.maximum',
      price: 375,
      descKey: 'pricing.maximumDesc',
      featureKeys: [
        'pricing.feature.completeKit',
        'pricing.feature.applicationGuide',
        'pricing.feature.videoSupport',
        'pricing.feature.lasts'
      ]
    }
  ];

  const addons = [
    {
      id: 'bundle',
      nameKey: 'pricing.bundle',
      price: 50,
      descKey: 'pricing.bundleDesc'
    },
    {
      id: 'mask',
      nameKey: 'pricing.maskOnly',
      price: 30,
      descKey: 'pricing.maskOnlyDesc'
    },
    {
      id: 'serum',
      nameKey: 'pricing.serumOnly',
      price: 30,
      descKey: 'pricing.serumOnlyDesc'
    }
  ];

  const handleAddProduct = (item: PricingTier | typeof addons[0]) => {
    const product: Product = {
      id: item.id,
      name: t(item.nameKey),
      price: item.price,
      description: t(item.descKey),
      stock: 10,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1739949154765-f2a23bdfa3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwaGFpciUyMGNhcmUlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NjA4MDExMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      recommended: 'highlighted' in item ? (item as any).highlighted || false : false
    };
    onAddToCart(product);
  };

  return (
    <section ref={sectionRef} id="pricing" className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4">{t('pricing.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            {t('pricing.subtitle')}
          </p>
          <UrgencyBanner variant="stock" className="justify-center mb-4" />
          <TrustBadges showPayment={false} className="mb-2" />
        </motion.div>

        {/* Main Treatment Pricing */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.id}
              className="pricing-card h-full"
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card 
                className={`h-full p-6 transition-all duration-300 flex flex-col ${
                  tier.highlighted 
                    ? 'glass-card border-2 border-primary/50 shadow-2xl shadow-primary/20 glow-accent' 
                    : 'bg-card hover:border-primary/50 hover:shadow-xl'
                }`}
              >
                <div className="min-h-[32px] mb-4">
                  {tier.highlighted && (
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                      {t('pricing.mostPopular')}
                    </Badge>
                  )}
                </div>
                <h3 className="mb-2">{t(tier.nameKey)}</h3>
                <div className="mb-4">
                  <span className="text-4xl">€{tier.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6 min-h-[80px]">
                  {t(tier.descKey)}
                </p>
                <ul className="space-y-3 mb-6 flex-grow">
                  {tier.featureKeys.map((featureKey, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{t(featureKey)}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => handleAddProduct(tier)}
                  className={`w-full mt-auto ${
                    tier.highlighted 
                      ? 'bg-gradient-to-r from-primary via-accent to-primary hover:opacity-90' 
                      : ''
                  }`}
                >
                  {t('pricing.addToCart')}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-center mb-8">{t('pricing.addons')}</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {addons.map((addon) => (
              <Card key={addon.id} className="p-6 bg-gradient-to-br from-accent/10 to-background hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <span className="text-2xl">€{addon.price}</span>
                </div>
                <h4 className="mb-2">{t(addon.nameKey)}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(addon.descKey)}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleAddProduct(addon)}
                >
                  {t('pricing.addToCart')}
                </Button>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Consultation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 rounded-2xl p-8 text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Phone className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="mb-4">{t('pricing.notSure')}</h3>
            <p className="text-muted-foreground mb-6">
              {t('pricing.consultationText')}
            </p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => openCalendlyPopup('quickConsultation')}
            >
              {t('pricing.bookConsultation')}
            </Button>
          </div>

          {/* Consultation Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">{t('pricing.sessionTitle')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('pricing.sessionDesc')}
              </p>
            </Card>

            <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">{t('pricing.planTitle')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('pricing.planDesc')}
              </p>
            </Card>

            <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Euro className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">{t('pricing.creditTitle')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('pricing.creditDesc')}
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}