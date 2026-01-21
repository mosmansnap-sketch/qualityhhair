import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, Mail, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

// Declare Calendly types
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement | null }) => void;
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function ConsultationSuccess() {
  const sessionId = new URLSearchParams(window.location.search).get('session_id');
  const calendlyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Load Calendly inline widget
    if (calendlyRef.current && !calendlyRef.current.querySelector('iframe')) {
      // Check if Calendly script is already loaded
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/s-aaara/30min',
          parentElement: calendlyRef.current,
        });
      } else {
        // Load Calendly script if not already loaded
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          if (window.Calendly && calendlyRef.current) {
            window.Calendly.initInlineWidget({
              url: 'https://calendly.com/s-aaara/30min',
              parentElement: calendlyRef.current,
            });
          }
        };
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12 text-center shadow-xl">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
            >
              <Check className="h-10 w-10 text-green-600" strokeWidth={3} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-3xl font-bold mb-2">Payment Successful! ✅</h1>
              <p className="text-muted-foreground mb-4">
                Your €10 consultation fee has been processed
              </p>
              <p className="text-primary font-medium mb-8">
                Now choose your preferred consultation time below
              </p>
            </motion.div>

            {/* Calendly Booking Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <div className="bg-primary/5 rounded-xl p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2 text-center">Book Your Consultation Time</h2>
                <p className="text-sm text-muted-foreground text-center">
                  Select a date and time that works for you. After booking, you'll receive a confirmation email with your discount code.
                </p>
              </div>
              <div 
                ref={calendlyRef}
                className="calendly-inline-widget min-h-[700px] w-full"
                style={{ minHeight: '700px' }}
              />
            </motion.div>

            {/* What happens next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-primary/5 rounded-xl p-6 mb-8 text-left"
            >
              <h2 className="text-lg font-semibold mb-4 text-center">What happens next?</h2>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Book your time</p>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred date and time using the calendar above
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Receive confirmation email</p>
                    <p className="text-sm text-muted-foreground">
                      You'll receive an email with your appointment details and <strong>unique discount code</strong>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Use your €10 discount</p>
                    <p className="text-sm text-muted-foreground">
                      Your discount code is valid for 48 hours after your consultation starts
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Discount Code Reminder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8"
            >
              <p className="text-amber-800 text-sm">
                <strong>💡 Important:</strong> Your discount code will be sent via email after you book your consultation time. The code activates on your consultation date and expires 48 hours later.
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <Button
                onClick={() => window.location.href = '/#pricing'}
                className="w-full"
                size="lg"
              >
                Browse Products
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                Return to Home
              </Button>
            </motion.div>

            {/* Session ID for reference */}
            {sessionId && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xs text-muted-foreground mt-6"
              >
                Booking reference: {sessionId.slice(0, 20)}...
              </motion.p>
            )}
          </Card>
        </motion.div>

        {/* Contact info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Questions? Contact us at{' '}
          <a href="mailto:support@qualityhhair.com" className="text-primary hover:underline">
            support@qualityhhair.com
          </a>
        </motion.p>
      </div>
    </div>
  );
}
