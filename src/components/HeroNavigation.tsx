import { useEffect, useRef, useState } from "react";
import { Sparkles, Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import gsap from "gsap";

export function HeroNavigation() {
  const logoRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { key: 'nav.home', href: '#hero' },
    { key: 'nav.benefits', href: '#benefits' },
    { key: 'nav.product', href: '#product' },
    { key: 'nav.influencers', href: '#influencers' },
    { key: 'nav.tutorials', href: '#tutorials' },
    { key: 'nav.pricing', href: '#pricing' },
    { key: 'nav.faq', href: '#faq' },
  ];

  useEffect(() => {
    if (logoRef.current) {
      // Subtle floating animation for logo
      gsap.to(logoRef.current, {
        y: -3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 64; // height of nav bar
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* iPhone-style glassmorphic navbar */}
        <div className="mx-4 mt-4 rounded-2xl bg-background/70 backdrop-blur-xl border border-border/40 shadow-2xl shadow-black/10">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <motion.button
                onClick={() => scrollToSection('#hero')}
                className="flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div ref={logoRef} className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary via-accent to-primary/80 shadow-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="absolute inset-0 h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent opacity-50 blur-md" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Quality Hair
                  </h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">Organic • Natural</p>
                </div>
              </motion.button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    className="px-4 py-2 text-sm rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t(item.key)}
                  </motion.button>
                ))}
              </div>

              {/* Right side: Language Switcher + Mobile Menu */}
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                
                {/* Mobile Menu Button */}
                <motion.button
                  className="md:hidden p-2 rounded-lg hover:bg-accent/50 transition-colors"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileTap={{ scale: 0.95 }}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Menu Panel */}
            <motion.div
              className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-xl rounded-2xl border border-border/40 shadow-2xl p-4"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    className="px-4 py-3 text-left rounded-lg hover:bg-accent/50 transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t(item.key)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
