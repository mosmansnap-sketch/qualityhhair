import { Instagram, Mail } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { label: "How It Works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
        { label: "Testimonials", href: "#testimonials" }
      ]
    },
    {
      title: "Learn More",
      links: [
        { label: "Benefits", href: "#benefits" },
        { label: "Compare Treatments", href: "#comparison" },
        { label: "Our Story", href: "#about" },
        { label: "Results Gallery", href: "#results" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Contact via WhatsApp", href: "https://wa.me/31612345678", external: true },
        { label: "Email Us", href: "mailto:support@qualityhhair.com", external: true },
        { label: "Book Consultation", href: "#pricing" }
      ]
    },
    {
      title: "Connect",
      links: [
        { label: "Instagram", href: "https://instagram.com/qualityhair", external: true },
        { label: "TikTok", href: "https://tiktok.com/@qualityhair", external: true },
        { label: "Snapchat", href: "https://snapchat.com/add/qualityhair", external: true }
      ]
    }
  ];

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={'external' in link && link.external ? "_blank" : undefined}
                      rel={'external' in link && link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
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
                ✓ 100% Organic Certified
              </p>
            </div>
            <div className="px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-sm text-primary">
                ✓ Safe for Pregnancy
              </p>
            </div>
            <div className="px-6 py-3 bg-accent/10 border border-accent/30 rounded-lg">
              <p className="text-sm text-accent-foreground">
                ✓ No Heat Damage
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Quality Hair. All rights reserved.
            </p>

            {/* Policies */}
            <div className="flex gap-4">
              <a href="#privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="#terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
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