import { Instagram, Mail } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  
  const footerSections = [
    {
      titleKey: "footer.quickLinks",
      links: [
        { labelKey: "footer.howItWorks", href: "#how-it-works" },
        { labelKey: "footer.pricing", href: "#pricing" },
        { labelKey: "footer.faq", href: "#faq" },
        { labelKey: "footer.testimonials", href: "#testimonials" }
      ]
    },
    {
      titleKey: "footer.learnMore",
      links: [
        { labelKey: "footer.benefits", href: "#benefits" },
        { labelKey: "footer.compareTreatments", href: "#comparison" },
        { labelKey: "footer.ourStory", href: "#about" },
        { labelKey: "footer.resultsGallery", href: "#results" }
      ]
    },
    {
      titleKey: "footer.support",
      links: [
        { labelKey: "footer.contactWhatsApp", href: "https://wa.me/46739689937", external: true },
        { labelKey: "footer.emailUs", href: "mailto:support@qualityhhair.com", external: true },
        { labelKey: "footer.bookConsultation", href: "#pricing" }
      ]
    },
    {
      titleKey: "footer.connect",
      links: [
        { labelKey: "footer.instagram", href: "https://instagram.com/qualityhair", external: true },
        { labelKey: "footer.tiktok", href: "https://tiktok.com/@qualityhair", external: true },
        { labelKey: "footer.snapchat", href: "https://snapchat.com/add/qualityhair", external: true }
      ]
    }
  ];

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.titleKey}>
              <h4 className="mb-4 text-foreground">
                {t(section.titleKey)}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.labelKey}>
                    <a
                      href={link.href}
                      target={'external' in link && link.external ? "_blank" : undefined}
                      rel={'external' in link && link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t(link.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
            <div className="px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">
                {t('footer.organicCertified')}
              </p>
            </div>
            <div className="px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-sm text-primary">
                {t('footer.safePregnancy')}
              </p>
            </div>
            <div className="px-6 py-3 bg-accent/10 border border-accent/30 rounded-lg">
              <p className="text-sm text-accent-foreground">
                {t('footer.noHeatDamage')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Quality Hair. {t('footer.rights')}
            </p>

            {/* Policies */}
            <div className="flex gap-4">
              <a href="#privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.privacyPolicy')}
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="#terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.termsOfService')}
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com/qualityhair"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="h-5 w-5 text-primary" />
              </a>
              <a
                href="mailto:support@qualityhair.com"
                className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
              >
                <Mail className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}