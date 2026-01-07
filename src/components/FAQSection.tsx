import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Sparkles, Clock, Shield, Package, HelpCircle } from "lucide-react";

type FAQCategory = "all" | "treatment" | "safety" | "aftercare" | "ordering";

interface FAQ {
  question: string;
  answer: string;
  category: FAQCategory;
}

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("all");

  const categories = [
    { id: "all" as FAQCategory, label: "All Questions", icon: HelpCircle },
    { id: "treatment" as FAQCategory, label: "Treatment", icon: Sparkles },
    { id: "safety" as FAQCategory, label: "Safety", icon: Shield },
    { id: "aftercare" as FAQCategory, label: "Aftercare", icon: Clock },
    { id: "ordering" as FAQCategory, label: "Ordering", icon: Package },
  ];

  const faqs: FAQ[] = [
    {
      question: "Will this straighten my hair?",
      answer: "NO - this is what makes us unique. Your curls stay, they just become healthier, more defined, and manageable. In the first few weeks, curls may appear looser due to added moisture, but they return to their natural pattern.",
      category: "treatment"
    },
    {
      question: "How long does the treatment last?",
      answer: "3-6 months depending on your hair type and aftercare. Unlike traditional treatments, there's no harsh demarcation line - it fades naturally.",
      category: "treatment"
    },
    {
      question: "How is this different from salon keratin treatments?",
      answer: "Traditional salon keratin uses heat and chemicals to break down hair bonds and straighten. Our organic formula works WITH your natural curl pattern, adding strength and reducing frizz without altering your texture.",
      category: "treatment"
    },
    {
      question: "Is it safe for children and pregnancy?",
      answer: "Yes! 100% organic with molecules naturally found in hair. No formaldehyde, no harmful chemicals. Safe for all ages and pregnancy.",
      category: "safety"
    },
    {
      question: "What ingredients are in the treatment?",
      answer: "Our formula contains organic keratin proteins, natural amino acids, argan oil, and plant-based conditioning agents. Zero formaldehyde, parabens, or sulfates.",
      category: "safety"
    },
    {
      question: "Can I use it on color-treated hair?",
      answer: "Absolutely! Our treatment is safe for all hair types including color-treated, highlighted, and chemically processed hair. It may even help extend your color's vibrancy.",
      category: "safety"
    },
    {
      question: "How often can I repeat the treatment?",
      answer: "Wait 3-4 months between treatments (sometimes 5-6 months). Your hair will tell you when it needs more - too much protein isn't recommended.",
      category: "aftercare"
    },
    {
      question: "What shampoo should I use after treatment?",
      answer: "Use a sulfate-free shampoo to maximize results. We recommend waiting 48 hours before the first wash. Any gentle, sulfate-free shampoo works well.",
      category: "aftercare"
    },
    {
      question: "Can I swim or exercise after treatment?",
      answer: "Wait 48-72 hours before swimming or heavy sweating. After that, you're good to go! Rinse hair with fresh water after swimming in chlorinated or salt water.",
      category: "aftercare"
    },
    {
      question: "What's included with my purchase?",
      answer: "• Your organic keratin treatment (size selected)\n• Detailed application guide\n• Access to video tutorials\n• Email support\n• 30-day satisfaction guarantee",
      category: "ordering"
    },
    {
      question: "How do I choose the right size?",
      answer: "Use our Hair Analysis tool for a personalized recommendation. Generally: Minimal (short/fine hair), Moderate (shoulder-length), Full (long/thick), Maximum (very long/very thick).",
      category: "ordering"
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day satisfaction guarantee. If you're not happy with your results, contact us for a full refund or exchange. Unopened products can be returned within 60 days.",
      category: "ordering"
    }
  ];

  const filteredFaqs = activeCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

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

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredFaqs.map((faq, index) => (
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
