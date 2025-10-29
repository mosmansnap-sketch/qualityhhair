import { useEffect, useRef, useState } from 'react';
import { Users, TrendingUp, Eye, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface Influencer {
  id: string;
  name: string;
  handle: string;
  platform: 'snapchat' | 'tiktok' | 'instagram';
  followers: number;
  image: string;
  verified: boolean;
  videoThumbnail: string;
}

const influencers: Influencer[] = [
  {
    id: '1',
    name: 'Amina Hassan',
    handle: '@aminabeauty',
    platform: 'snapchat',
    followers: 2500000,
    image: 'https://images.unsplash.com/photo-1622265544955-56574abbce5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwaGFpciUyMGNhcmV8ZW58MXx8fHwxNzYwNzg0NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    videoThumbnail: 'https://images.unsplash.com/photo-1565357419076-6acd4a10094e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHV0b3JpYWwlMjB2aWRlb3xlbnwxfHx8fDE3NjA3ODQ2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    handle: '@marcushairking',
    platform: 'tiktok',
    followers: 1800000,
    image: 'https://images.unsplash.com/photo-1653848067570-ccc640e5b3cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwaGFpciUyMGNhcmUlMjBtYWxlfGVufDF8fHx8MTc2MDc4NDY4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    videoThumbnail: 'https://images.unsplash.com/photo-1745141063798-7fa04698ea80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvcmdhbmljJTIwYmVhdXR5fGVufDF8fHx8MTc2MDc4NDY5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '3',
    name: 'Sofia Andersson',
    handle: '@sofiaglowup',
    platform: 'instagram',
    followers: 950000,
    image: 'https://images.unsplash.com/photo-1732247609999-52bb7c01fcf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBiZWF1dHklMjBwcm9kdWN0fGVufDF8fHx8MTc2MDc4NDY5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    videoThumbnail: 'https://images.unsplash.com/photo-1472393365320-db77a5abbecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGluZmx1ZW5jZXJ8ZW58MXx8fHwxNzYwNjkxNjY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '4',
    name: 'Fatima Omar',
    handle: '@fatimaglowhair',
    platform: 'snapchat',
    followers: 3200000,
    image: 'https://images.unsplash.com/photo-1622265544955-56574abbce5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwaGFpciUyMGNhcmV8ZW58MXx8fHwxNzYwNzg0NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    videoThumbnail: 'https://images.unsplash.com/photo-1565357419076-6acd4a10094e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHV0b3JpYWwlMjB2aWRlb3xlbnwxfHx8fDE3NjA3ODQ2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function SocialProofSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState({ customers: 0, influencers: 0, views: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate influencer cards
    const cards = section.querySelectorAll('.influencer-card');
    gsap.from(cards, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // Animate stats with counter
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate counters
            gsap.to(counters, {
              customers: 50000,
              influencers: 127,
              views: 15000000,
              duration: 2.5,
              delay: 0.3,
              ease: 'power2.out',
              onUpdate: function() {
                setCounters({
                  customers: Math.floor(this.targets()[0].customers),
                  influencers: Math.floor(this.targets()[0].influencers),
                  views: Math.floor(this.targets()[0].views),
                });
              },
            });
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = section.querySelector('.stats-section');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'snapchat':
        return 'bg-yellow-400 text-black';
      case 'tiktok':
        return 'bg-black text-white';
      case 'instagram':
        return 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <section id="social-proof" className="py-12 md:py-20 px-4">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        {/* Section Header - Exact specifications */}
        <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground">
            <TrendingUp className="h-4 w-4 mr-2" />
            Viral on Social Media
          </Badge>
          <h2 className="mb-4 text-4xl font-bold uppercase tracking-[0.02em]">{t('social.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('social.subtitle')}
          </p>
        </motion.div>
      </div>

      {/* Stats Section - Exact specifications */}
      <div className="stats-section grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card className="p-6 text-center bg-card border border-border rounded-xl transform transition-all duration-300 hover:scale-105">
          <Users className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <div className="text-4xl font-bold mb-2 text-primary">{formatNumber(counters.customers)}+</div>
          <p className="text-muted-foreground text-sm font-medium">{t('social.stats.customers')}</p>
        </Card>
        <Card className="p-6 text-center bg-card border border-border rounded-xl transform transition-all duration-300 hover:scale-105">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 text-accent animate-pulse" />
          <div className="text-4xl font-bold mb-2 text-accent">{formatNumber(counters.influencers)}+</div>
          <p className="text-muted-foreground text-sm font-medium">{t('social.stats.influencers')}</p>
        </Card>
        <Card className="p-6 text-center bg-card border border-border rounded-xl transform transition-all duration-300 hover:scale-105">
          <Eye className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <div className="text-4xl font-bold mb-2 text-primary">{formatNumber(counters.views)}+</div>
          <p className="text-muted-foreground text-sm font-medium">{t('social.stats.views')}</p>
        </Card>
      </div>

      {/* Influencer Grid - Exact specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {influencers.map((influencer, index) => (
          <motion.div
            key={influencer.id}
            className="influencer-card"
            initial={{ y: 60, opacity: 0, scale: 0.95 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
          <Card className="overflow-hidden bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            {/* Profile Image - Exact specifications */}
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full border-3 border-border mx-auto overflow-hidden">
                <ImageWithFallback
                  src={influencer.image}
                  alt={influencer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {influencer.verified && (
                <div className="absolute bottom-0 right-1/2 translate-x-6 bg-blue-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Influencer Info */}
            <div className="text-center">
              <h3 className="mb-1 font-semibold">{influencer.name}</h3>
              <p className="text-muted-foreground text-sm mb-2">{influencer.handle}</p>

              {/* Platform Badge - Exact specifications */}
              <Badge className={`${getPlatformColor(influencer.platform)} px-4 py-2 text-xs font-semibold`}>
                {influencer.platform === 'snapchat' && '👻'}
                {influencer.platform === 'tiktok' && '🎵'}
                {influencer.platform === 'instagram' && '📸'}
                <span className="ml-1 capitalize">{influencer.platform}</span>
              </Badge>

              <div className="mt-3 text-sm text-muted-foreground">
                {formatNumber(influencer.followers)} followers
              </div>
            </div>
          </Card>
          </motion.div>
        ))}
      </div>

      {/* Snapchat Special Badge */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <div className="inline-flex items-center gap-3 bg-yellow-400 text-black px-8 py-4 rounded-full shadow-xl">
          <span className="text-3xl">👻</span>
          <div className="text-left">
            <div className="font-semibold">Featured on Snapchat Spotlight</div>
            <div className="text-sm opacity-80">Over 5M views on our transformation videos</div>
          </div>
        </div>
      </motion.div>
      </div>
    </section>
  );
}