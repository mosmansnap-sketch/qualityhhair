import { useEffect, useRef, useState } from 'react';
import { Play, Clock, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface VideoTutorial {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  step: number;
  description: string;
}

export function VideoTutorialSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videos: VideoTutorial[] = [
    {
      id: '1',
      title: t('video.step1'),
      duration: '3:45',
      thumbnail: 'https://images.unsplash.com/photo-1565357419076-6acd4a10094e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHV0b3JpYWwlMjB2aWRlb3xlbnwxfHx8fDE3NjA3ODQ2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      step: 1,
      description: 'Learn the proper washing technique and preparation steps before treatment',
    },
    {
      id: '2',
      title: t('video.step2'),
      duration: '5:20',
      thumbnail: 'https://images.unsplash.com/photo-1653848067570-ccc640e5b3cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwaGFpciUyMGNhcmUlMjBtYWxlfGVufDF8fHx8MTc2MDc4NDY4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      step: 2,
      description: 'Master the sectioning and application method for best results',
    },
    {
      id: '3',
      title: t('video.step3'),
      duration: '4:10',
      thumbnail: 'https://images.unsplash.com/photo-1622265544955-56574abbce5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwaGFpciUyMGNhcmV8ZW58MXx8fHwxNzYwNzg0NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      step: 3,
      description: 'Essential aftercare tips to maintain your results for weeks',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate video cards
    const videoCards = section.querySelectorAll('.video-card');
    gsap.from(videoCards, {
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      },
      x: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });

    // Floating animation for play buttons
    const playButtons = section.querySelectorAll('.play-button');
    playButtons.forEach((button) => {
      gsap.to(button, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div id="tutorials" ref={sectionRef} className="bg-gradient-to-br from-accent/20 via-background to-accent/10 py-20">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-primary to-accent">
              <Play className="h-4 w-4 mr-2" />
              Video Tutorials
            </Badge>
            <h2 className="mb-4">{t('video.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('video.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              className="video-card"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Card 
                className="overflow-hidden cursor-pointer group bg-card/80 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-300"
                onClick={() => {
                  setSelectedVideo(video);
                  setIsPlaying(false);
                }}
              >
                {/* Video Thumbnail */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Step Number Badge */}
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-0 px-4 py-2">
                    Step {video.step}
                  </Badge>

                  {/* Duration Badge */}
                  <Badge className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white border-0">
                    <Clock className="h-3 w-3 mr-1" />
                    {video.duration}
                  </Badge>

                  {/* Play Button */}
                  <div className="play-button absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="bg-white/90 backdrop-blur-sm rounded-full p-5 shadow-2xl group-hover:bg-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Play className="h-8 w-8 text-primary fill-primary" />
                    </motion.div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <h3 className="mb-3 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {video.description}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full group/btn"
                  >
                    <span>Watch Tutorial</span>
                    <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Video Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Card className="overflow-hidden bg-gradient-to-r from-primary to-accent text-primary-foreground">
            <div className="grid md:grid-cols-2 gap-8 items-center p-8">
              <div>
                <Badge className="mb-4 bg-white/20 text-white border-0">
                  🎥 Full Tutorial Series
                </Badge>
                <h3 className="mb-4 text-primary-foreground">
                  Complete Hair Transformation Course
                </h3>
                <p className="mb-6 text-primary-foreground/90">
                  Access our complete 8-week transformation video series with daily tips, techniques, and expert advice. Available in all three languages.
                </p>
                <Button size="lg" variant="secondary" className="bg-white hover:bg-white/90 text-primary">
                  <Play className="h-5 w-5 mr-2" />
                  Watch Full Series
                </Button>
              </div>
              <div className="relative h-64 md:h-full">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1745141063798-7fa04698ea80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvcmdhbmljJTIwYmVhdXR5fGVufDF8fHx8MTc2MDc4NDY5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Full course"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="bg-white/20 backdrop-blur-sm rounded-full p-6"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="h-12 w-12 text-white fill-white" />
                  </motion.div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="bg-card rounded-2xl max-w-4xl w-full overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Player Area */}
              <div className="relative bg-black aspect-video">
                <ImageWithFallback
                  src={selectedVideo.thumbnail}
                  alt={selectedVideo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <motion.button
                    className="bg-white/90 backdrop-blur-sm rounded-full p-8"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    <Play className="h-16 w-16 text-primary fill-primary" />
                  </motion.button>
                </div>
                {isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center text-white text-2xl">
                    Video would play here
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge className="mb-3">Step {selectedVideo.step}</Badge>
                    <h3 className="mb-2">{selectedVideo.title}</h3>
                    <p className="text-muted-foreground">{selectedVideo.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedVideo(null)}
                  >
                    ✕
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {selectedVideo.duration}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
