import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "Will this straighten my hair?",
      answer: "NO - this is what makes us unique. Your curls stay, they just become healthier, more defined, and manageable. In the first few weeks, curls may appear looser due to added moisture, but they return to their natural pattern."
    },
    {
      question: "How long does it last?",
      answer: "3-6 months depending on your hair type and aftercare. Unlike traditional treatments, there's no harsh demarcation line - it fades naturally."
    },
    {
      question: "Is it safe for children and pregnancy?",
      answer: "Yes! 100% organic with molecules naturally found in hair. No formaldehyde, no harmful chemicals. Safe for all ages and pregnancy."
    },
    {
      question: "How often can I repeat the treatment?",
      answer: "Wait 3-4 months between treatments (sometimes 5-6 months). Your hair will tell you when it needs more - too much protein isn't recommended."
    },
    {
      question: "What's included with my purchase?",
      answer: "• Your organic keratin treatment (size selected)\n• Detailed application guide\n• Access to video tutorials\n• Email support"
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about our organic keratin treatment
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border-2 border-border rounded-2xl px-6 hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:support@qualityhair.com"
            className="text-primary hover:underline"
          >
            Contact our support team →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
