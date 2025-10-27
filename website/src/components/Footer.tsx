import { Instagram, Mail } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Customer Care",
      links: [
        { label: "Contact Us", href: "#contact" },
        { label: "Track Order", href: "#track" },
        { label: "Returns & Refunds", href: "#returns" },
        { label: "Shipping Information", href: "#shipping" }
      ]
    },
    {
      title: "Learn",
      links: [
        { label: "Application Videos", href: "#videos" },
        { label: "Aftercare Guide", href: "#aftercare" },
        { label: "Hair Type Guide", href: "#hair-guide" },
        { label: "Blog", href: "#blog" }
      ]
    },
    {
      title: "About",
      links: [
        { label: "Our Story", href: "#story" },
        { label: "Ingredients", href: "#ingredients" },
        { label: "Certifications", href: "#certifications" },
        { label: "Reviews", href: "#reviews" }
      ]
    },
    {
      title: "Connect",
      links: [
        { label: "Instagram: @qualityhair", href: "https://instagram.com/qualityhair", external: true },
        { label: "Email: support@qualityhair.com", href: "mailto:support@qualityhair.com", external: true },
        { label: "WhatsApp Support", href: "https://wa.me/", external: true }
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
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
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
            <div className="px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                ✓ Safe for Pregnancy
              </p>
            </div>
            <div className="px-6 py-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <p className="text-sm text-amber-600 dark:text-amber-400">
                ✓ 30-Day Money-Back Guarantee
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
