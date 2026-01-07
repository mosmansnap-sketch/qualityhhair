import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BeforeAfterGallery } from './ui/before-after-gallery';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    id: '1',
    beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80',
    clientName: 'Maria S.',
    testimonial: 'My curls have never been this defined and healthy! The treatment maintained my natural texture while making it so much more manageable.',
    treatment: 'Moderate Treatment - €235',
  },
  {
    id: '2',
    beforeImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=600&q=80',
    clientName: 'Aisha K.',
    testimonial: 'I was worried about losing my natural curls, but this organic treatment enhanced them beautifully. My hair feels so soft now!',
    treatment: 'Full Treatment - €295',
  },
  {
    id: '3',
    beforeImage: 'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1605980776566-0527f0e22de8?w=600&q=80',
    clientName: 'Linda M.',
    testimonial: 'After years of struggling with frizzy hair, I finally found something that works. The results lasted over 4 months!',
    treatment: 'Minimal Treatment - €165',
  },
  {
    id: '4',
    beforeImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80',
    clientName: 'Jessica T.',
    testimonial: 'The organic formula made all the difference. No harsh chemicals, just beautiful, healthy hair that I can style effortlessly.',
    treatment: 'Maximum Treatment - €375',
  },
];

export function ResultsGallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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
            Before & After Transformations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See the incredible results our clients have achieved with our organic keratin treatments. 
            Natural curls enhanced, not changed.
          </p>
        </div>

        <BeforeAfterGallery
          items={galleryItems}
          autoAdvance={true}
          autoAdvanceInterval={6000}
        />
      </div>
    </section>
  );
}
