import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BeforeAfterGallery } from './ui/before-after-gallery';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  // Video pairs
  {
    id: '1',
    beforeVideo: '/videos/results/client1-before.mp4',
    afterVideo: '/videos/results/client1-after.mp4',
    clientName: 'Client 1',
    testimonial: 'Amazing transformation! My hair has never looked this healthy and manageable.',
    treatment: 'Keratin Treatment',
  },
  {
    id: '4',
    beforeVideo: '/videos/results/client4-before.mp4',
    afterVideo: '/videos/results/client4-after.mp4',
    clientName: 'Client 4',
    testimonial: 'The organic treatment made my curls so defined and bouncy!',
    treatment: 'Full Treatment - €295',
  },
  {
    id: '5',
    beforeVideo: '/videos/results/client5-before.mp4',
    afterVideo: '/videos/results/client5-after.mp4',
    clientName: 'Client 5',
    testimonial: 'I was nervous about treatments but this one is completely natural and safe.',
    treatment: 'Moderate Treatment - €235',
  },
  {
    id: '6',
    beforeVideo: '/videos/results/client6-before.mp4',
    afterVideo: '/videos/results/client6-after.mp4',
    clientName: 'Client 6',
    testimonial: 'My frizzy hair is now smooth and shiny. Best decision ever!',
    treatment: 'Maximum Treatment - €375',
  },
  {
    id: '7',
    beforeVideo: '/videos/results/client7-before.mp4',
    afterVideo: '/videos/results/client7-after.mp4',
    clientName: 'Client 7',
    testimonial: 'The results lasted over 4 months. Absolutely worth it!',
    treatment: 'Full Treatment - €295',
  },
  {
    id: '9',
    beforeVideo: '/videos/results/client9-before.mp4',
    afterVideo: '/videos/results/client9-after.mp4',
    clientName: 'Client 9',
    testimonial: 'Natural ingredients and incredible results. My hair stylist was amazed!',
    treatment: 'Moderate Treatment - €235',
  },
  {
    id: '10',
    beforeVideo: '/videos/results/client10-before.mp4',
    afterVideo: '/videos/results/client10-after.mp4',
    clientName: 'Client 10',
    testimonial: 'Finally a treatment that works with my natural texture, not against it.',
    treatment: 'Full Treatment - €295',
  },
  {
    id: '11',
    beforeVideo: '/videos/results/client11-before.mp4',
    afterVideo: '/videos/results/client11-after.mp4',
    clientName: 'Client 11',
    testimonial: 'I can style my hair in minutes now instead of hours!',
    treatment: 'Minimal Treatment - €165',
  },
  {
    id: '12',
    beforeVideo: '/videos/results/client12-before.mp4',
    afterVideo: '/videos/results/client12-after.mp4',
    clientName: 'Client 12',
    testimonial: 'Safe during pregnancy was so important to me. Love the results!',
    treatment: 'Moderate Treatment - €235',
  },
  {
    id: '13',
    beforeVideo: '/videos/results/client13-before.mp4',
    afterVideo: '/videos/results/client13-after.mp4',
    clientName: 'Client 13',
    testimonial: 'My thick hair is finally manageable without losing my curls.',
    treatment: 'Maximum Treatment - €375',
  },
  {
    id: '14',
    beforeVideo: '/videos/results/client14-before.mp4',
    afterVideo: '/videos/results/client14-after.mp4',
    clientName: 'Client 14',
    testimonial: 'The video consultation helped me choose the perfect treatment size.',
    treatment: 'Full Treatment - €295',
  },
  // Photo pairs
  {
    id: '15',
    beforeImage: '/images/results/client15-before.jpg',
    afterImage: '/images/results/client15-after.jpg',
    clientName: 'Client 15',
    testimonial: 'From frizzy to fabulous! Cannot recommend this enough.',
    treatment: 'Moderate Treatment - €235',
  },
  {
    id: '16',
    beforeVideo: '/videos/results/client16-before.mp4',
    afterVideo: '/videos/results/client16-after.mp4',
    clientName: 'Client 16',
    testimonial: 'The organic formula smells amazing and works even better!',
    treatment: 'Full Treatment - €295',
  },
  {
    id: '17',
    beforeVideo: '/videos/results/client17-before.mp4',
    afterVideo: '/videos/results/client17-after.mp4',
    clientName: 'Client 17',
    testimonial: 'My hair has never been this soft and easy to manage.',
    treatment: 'Maximum Treatment - €375',
  },
  {
    id: '18',
    beforeImage: '/images/results/client18-before.jpg',
    afterImage: '/images/results/client18-after.jpg',
    clientName: 'Client 18',
    testimonial: 'Incredible shine and definition. My curls are alive again!',
    treatment: 'Full Treatment - €295',
  },
  {
    id: '19',
    beforeImage: '/images/results/client19-before.jpg',
    afterImage: '/images/results/client19-after.jpg',
    clientName: 'Client 19',
    testimonial: 'The best hair investment I have ever made.',
    treatment: 'Moderate Treatment - €235',
  },
  // Mixed - photo before, video after
  {
    id: '20',
    beforeImage: '/images/results/client20-before.jpg',
    afterVideo: '/videos/results/client20-after.mp4',
    clientName: 'Client 20',
    testimonial: 'Watch the difference! My hair moves so beautifully now.',
    treatment: 'Full Treatment - €295',
  },
  {
    id: '21',
    beforeVideo: '/videos/results/client21-before.mp4',
    afterVideo: '/videos/results/client21-after.mp4',
    clientName: 'Client 21',
    testimonial: 'Healthy, shiny, and so much easier to style every day.',
    treatment: 'Maximum Treatment - €375',
  },
];

export function ResultsGallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current.children, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="results"
      className="py-20 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('results.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('results.subtitle')}
          </p>
        </div>

        <BeforeAfterGallery
          items={galleryItems}
          autoAdvance={false}
        />
      </div>
    </section>
  );
}
