import { useLanguage } from '../contexts/LanguageContext';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export function LanguageDemo() {
  const { language } = useLanguage();

  const languageInfo = {
    en: { name: 'English', flag: '🇬🇧', nativeName: 'English' },
    sv: { name: 'Swedish', flag: '🇸🇪', nativeName: 'Svenska' },
    so: { name: 'Somali', flag: '🇸🇴', nativeName: 'Soomaali' },
  };

  const current = languageInfo[language];

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <Card className="p-4 bg-gradient-to-br from-card/95 via-primary/5 to-accent/5 backdrop-blur-xl border-2 border-primary/30 shadow-2xl hover:shadow-primary/20 transition-all">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="p-2 bg-primary/10 rounded-full"
          >
            <Globe className="h-5 w-5 text-primary" />
          </motion.div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{current.flag}</span>
              <span className="font-semibold">{current.nativeName}</span>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <span>Language:</span>
              <Badge variant="outline" className="text-xs px-2 py-0 h-5">
                {language.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <span>💡</span>
            <span>Switch language using top-right menu</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
