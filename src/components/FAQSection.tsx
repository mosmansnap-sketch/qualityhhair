import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Sparkles, Clock, Shield, Package, HelpCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

type FAQCategory = "all" | "treatment" | "safety" | "aftercare" | "ordering";

interface FAQ {
  questionKey: string;
  answerKey: string;
  category: FAQCategory;
}

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("all");
  const { t } = useLanguage();

  const categories = [
    { id: "all" as FAQCategory, labelKey: "faq.allQuestions", icon: HelpCircle },
    { id: "treatment" as FAQCategory, labelKey: "faq.treatment", icon: Sparkles },
    { id: "safety" as FAQCategory, labelKey: "faq.safety", icon: Shield },
    { id: "aftercare" as FAQCategory, labelKey: "faq.aftercare", icon: Clock },
    { id: "ordering" as FAQCategory, labelKey: "faq.ordering", icon: Package },
  ];

  const faqs: FAQ[] = [
    { questionKey: "faq.q1", answerKey: "faq.a1", category: "treatment" },
    { questionKey: "faq.q2", answerKey: "faq.a2", category: "treatment" },
    { questionKey: "faq.q3", answerKey: "faq.a3", category: "treatment" },
    { questionKey: "faq.q4", answerKey: "faq.a4", category: "safety" },
    { questionKey: "faq.q5", answerKey: "faq.a5", category: "safety" },
    { questionKey: "faq.q6", answerKey: "faq.a6", category: "safety" },
    { questionKey: "faq.q7", answerKey: "faq.a7", category: "aftercare" },
    { questionKey: "faq.q8", answerKey: "faq.a8", category: "aftercare" },
    { questionKey: "faq.q9", answerKey: "faq.a9", category: "aftercare" },
    { questionKey: "faq.q10", answerKey: "faq.a10", category: "ordering" },
    { questionKey: "faq.q11", answerKey: "faq.a11", category: "ordering" },
    { questionKey: "faq.q12", answerKey: "faq.a12", category: "ordering" },
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
            {t('faq.title')}
          </h2>
          <p className="text-muted-foreground">
            {t('faq.subtitle')}
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
                {t(cat.labelKey)}
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
                  <span className="pr-4">{t(faq.questionKey)}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 whitespace-pre-line">
                  {t(faq.answerKey)}
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
            {t('faq.stillQuestions')}
          </p>
          <a
            href="mailto:support@qualityhair.com"
            className="text-primary hover:underline"
          >
            {t('faq.contactSupport')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
