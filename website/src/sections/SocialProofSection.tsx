import { useEffect, useRef, useState } from 'react';
import { Play, Users, TrendingUp, Eye, Video } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

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
  const [counters, setCounters] = useState({ customers: 50000, influencers: 127, views: 15000000 });

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
    <section id="social-proof" className="py-16 md:py-24 bg-background">
      <div ref={sectionRef} className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <TrendingUp className="h-4 w-4 mr-2" />
            Viral on Social Media
          </Badge>
          <h2 className="mb-4">{t('social.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('social.subtitle')}
          </p>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="stats-section grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-accent/20 border-2 border-primary/20">
          <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
          <div className="text-4xl mb-2">{formatNumber(counters.customers)}+</div>
          <p className="text-muted-foreground">{t('social.stats.customers')}</p>
        </Card>
        <Card className="p-8 text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/20">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 text-purple-600" />
          <div className="text-4xl mb-2">{formatNumber(counters.influencers)}+</div>
          <p className="text-muted-foreground">{t('social.stats.influencers')}</p>
        </Card>
        <Card className="p-8 text-center bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/20">
          <Eye className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
          <div className="text-4xl mb-2">{formatNumber(counters.views)}+</div>
          <p className="text-muted-foreground">{t('social.stats.views')}</p>
        </Card>
      </div>

      {/* Influencer Grid - Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {influencers.map((influencer, index) => (
          <motion.div
            key={influencer.id}
            className="influencer-card"
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Card className="overflow-hidden group cursor-pointer relative bg-gradient-to-br from-card to-accent/10 border-2 border-border hover:border-primary/50 transition-all duration-300">
              {/* Video Thumbnail Background */}
              <div className="relative h-72 overflow-hidden">
                <ImageWithFallback
                  src={influencer.videoThumbnail}
                  alt={influencer.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                    <Play className="h-12 w-12 text-white fill-white" />
                  </div>
                </div>

                {/* Platform Badge */}
                <Badge className={`absolute top-4 right-4 ${getPlatformColor(influencer.platform)} border-0`}>
                  {influencer.platform === 'snapchat' && '👻'}
                  {influencer.platform === 'tiktok' && '🎵'}
                  {influencer.platform === 'instagram' && '📸'}
                  <span className="ml-2 capitalize">{influencer.platform}</span>
                </Badge>

                {/* Profile Section */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="relative">
                      <ImageWithFallback
                        src={influencer.image}
                        alt={influencer.name}
                        className="w-16 h-16 rounded-full border-4 border-white/20 object-cover"
                      />
                      {influencer.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white mb-1">{influencer.name}</h3>
                      <p className="text-white/70 text-sm">{influencer.handle}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{formatNumber(influencer.followers)} {t('social.followers')}</span>
                    </div>
                    <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0">
                      <Video className="h-4 w-4 mr-2" />
                      {t('social.watch')}
                    </Button>
                  </div>
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
