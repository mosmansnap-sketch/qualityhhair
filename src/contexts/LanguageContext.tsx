import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'sv' | 'so';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'header.cart': 'Cart',
    'header.language': 'Language',
    
    // Navigation
    'nav.home': 'Home',
    'nav.benefits': 'Benefits',
    'nav.product': 'The Treatment',
    'nav.influencers': 'Influencers',
    'nav.tutorials': 'Tutorials',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    
    // Hero
    'hero.badge': 'LIMITED MONTHLY SUPPLY • ORGANIC PRODUCTS',
    'hero.title': 'Your Hair, Perfected with Smart Personalized Solutions',
    'hero.subtitle': 'Experience AI-powered hair analysis combined with expert human guidance. Get organic products tailored specifically for your unique hair texture and goals.',
    'hero.cta': 'Start Your Transformation',
    
    // Features
    'features.title': 'Smart. Personal. Simple.',
    'features.subtitle': 'Our automated system combines technology with human expertise to deliver results',
    'features.personalized.title': 'Personalized Analysis',
    'features.personalized.desc': 'Every recommendation is based on your unique hair profile, photos, and specific concerns',
    'features.expert.title': 'Expert Advisors',
    'features.expert.desc': 'Professional hair specialists review your submission and curate the perfect product selection',
    'features.automated.title': 'Automated Delivery',
    'features.automated.desc': 'Seamless ordering process with limited monthly batches to ensure quality and freshness',
    
    // How It Works
    'steps.title': 'Your Journey to Better Hair',
    'steps.step1.title': 'Select Hair Type',
    'steps.step1.desc': 'Tell us about your hair - curly, straight, frizzy, or afro texture',
    'steps.step2.title': 'Upload Photos',
    'steps.step2.desc': 'Share clear images so our advisors can understand your hair\'s unique needs',
    'steps.step3.title': 'Get Your Products',
    'steps.step3.desc': 'Receive curated recommendations with detailed usage instructions and checkout',
    
    // Social Proof
    'social.title': 'Featured By Top Influencers',
    'social.subtitle': 'Trusted by thousands and celebrated by social media\'s biggest voices',
    'social.followers': 'Followers',
    'social.watch': 'Watch Video',
    'social.stats.customers': 'Happy Customers',
    'social.stats.influencers': 'Influencer Partners',
    'social.stats.views': 'Social Media Views',
    
    // Video Section
    'video.title': 'How to Use Your Treatment',
    'video.subtitle': 'Step-by-step video guides to help you achieve the best results',
    'video.step1': 'Preparation & Washing',
    'video.step2': 'Application Technique',
    'video.step3': 'Rinsing & Aftercare',
    'video.duration': 'min',
    
    // Testimonials
    'testimonials.title': 'Real Results from Real People',
    
    // Final CTA
    'final.title': 'Ready to Transform Your Hair?',
    'final.subtitle': 'Join thousands who\'ve discovered their perfect organic hair care routine. Limited supply available this month.',
    'final.cta': 'Start Your Journey Now',
    
    // Hair Type
    'hairtype.curly': 'Curly',
    'hairtype.straight': 'Straight',
    'hairtype.frizzy': 'Frizzy',
    'hairtype.afro': 'Afro',
  },
  sv: {
    // Header
    'header.cart': 'Varukorg',
    'header.language': 'Språk',
    
    // Navigation
    'nav.home': 'Hem',
    'nav.benefits': 'Fördelar',
    'nav.product': 'Behandlingen',
    'nav.influencers': 'Influencers',
    'nav.tutorials': 'Handledningar',
    'nav.pricing': 'Priser',
    'nav.faq': 'FAQ',
    
    // Hero
    'hero.badge': 'BEGRÄNSAD MÅNADSLEVERANS • EKOLOGISKA PRODUKTER',
    'hero.title': 'Ditt Hår, Perfektionerat med Smarta Personliga Lösningar',
    'hero.subtitle': 'Upplev AI-driven håranalys kombinerad med expertvägledning. Få ekologiska produkter skräddarsydda specifikt för din unika hårstruktur och mål.',
    'hero.cta': 'Börja Din Transformation',
    
    // Features
    'features.title': 'Smart. Personlig. Enkel.',
    'features.subtitle': 'Vårt automatiserade system kombinerar teknologi med mänsklig expertis för att leverera resultat',
    'features.personalized.title': 'Personlig Analys',
    'features.personalized.desc': 'Varje rekommendation baseras på din unika hårprofil, foton och specifika bekymmer',
    'features.expert.title': 'Expertrådgivare',
    'features.expert.desc': 'Professionella hårspecialister granskar din inlämning och kurerar det perfekta produktvalet',
    'features.automated.title': 'Automatisk Leverans',
    'features.automated.desc': 'Sömlös beställningsprocess med begränsade månatliga partier för att säkerställa kvalitet och färskhet',
    
    // How It Works
    'steps.title': 'Din Resa Till Bättre Hår',
    'steps.step1.title': 'Välj Hårtyp',
    'steps.step1.desc': 'Berätta om ditt hår - lockigt, rakt, frissigt eller afro-struktur',
    'steps.step2.title': 'Ladda Upp Foton',
    'steps.step2.desc': 'Dela tydliga bilder så att våra rådgivare kan förstå ditt hårs unika behov',
    'steps.step3.title': 'Få Dina Produkter',
    'steps.step3.desc': 'Ta emot kurerade rekommendationer med detaljerade användningsinstruktioner och kassan',
    
    // Social Proof
    'social.title': 'Presenterad av Toppinfluenser',
    'social.subtitle': 'Pålitlig av tusentals och hyllad av sociala mediers största röster',
    'social.followers': 'Följare',
    'social.watch': 'Se Video',
    'social.stats.customers': 'Nöjda Kunder',
    'social.stats.influencers': 'Influencer-Partners',
    'social.stats.views': 'Visningar på Sociala Medier',
    
    // Video Section
    'video.title': 'Hur Du Använder Din Behandling',
    'video.subtitle': 'Steg-för-steg videoguider för att hjälpa dig uppnå bästa resultat',
    'video.step1': 'Förberedelse & Tvätt',
    'video.step2': 'Appliceringsteknik',
    'video.step3': 'Sköljning & Eftervård',
    'video.duration': 'min',
    
    // Testimonials
    'testimonials.title': 'Verkliga Resultat från Verkliga Människor',
    
    // Final CTA
    'final.title': 'Redo Att Transformera Ditt Hår?',
    'final.subtitle': 'Gå med tusentals som har upptäckt sin perfekta ekologiska hårvårdsrutin. Begränsat lager tillgängligt denna månad.',
    'final.cta': 'Börja Din Resa Nu',
    
    // Hair Type
    'hairtype.curly': 'Lockigt',
    'hairtype.straight': 'Rakt',
    'hairtype.frizzy': 'Frissigt',
    'hairtype.afro': 'Afro',
  },
  so: {
    // Header
    'header.cart': 'Qaybta Iibsiga',
    'header.language': 'Luuqad',
    
    // Navigation
    'nav.home': 'Guriga',
    'nav.benefits': 'Faa\'iidooyinka',
    'nav.product': 'Daawaynta',
    'nav.influencers': 'Saameeyayaal',
    'nav.tutorials': 'Tilmaamo',
    'nav.pricing': 'Qiimaha',
    'nav.faq': 'Su\'aalaha',
    
    // Hero
    'hero.badge': 'QADDAR BISHA XADDIDAN • ALAAB DABIICI AH',
    'hero.title': 'Timaha, La Hagaajiyey Xalal Gaarka Ah Oo Casri Ah',
    'hero.subtitle': 'Soo jiir AI-powered falanqaynta timaha oo ay la socdaan hagida khibradda dadka. Hel alaab dabiici ah oo loo qoondeeyey qaab-dhismeedkaaga timaha iyo yoolalkaaga.',
    'hero.cta': 'Bilow Beddelkaaga',
    
    // Features
    'features.title': 'Casri. Gaarka Ah. Fudud.',
    'features.subtitle': 'Nidaamkayaga otomaatig ah wuxuu isku darsadaa tignoolajiyada iyo khibradda dadka si loo gaaro natiijooyinka',
    'features.personalized.title': 'Falanqayn Gaarka Ah',
    'features.personalized.desc': 'Talo kasta waxay ku saleysan tahay astaantaada timaha ee gaarka ah, sawirrada, iyo welwelka gaarka ah',
    'features.expert.title': 'Lataliyayaasha Khibradda leh',
    'features.expert.desc': 'Xirfadlayaasha timaha ee xirfadda leh ayaa dib u eegaya soo-gudbimaadkaaga oo soo ururinaya doorashada alaabta ku habboon',
    'features.automated.title': 'Gaynta Otomaatig ah',
    'features.automated.desc': 'Hab aan dhib lahayn oo dalbasho ah oo leh xadaysan bishaale si loo hubiyo tayada iyo cusbaynta',
    
    // How It Works
    'steps.title': 'Socdaalkaaga Timaha Wanaagsan',
    'steps.step1.title': 'Dooro Nooca Timaha',
    'steps.step1.desc': 'Noo sheeg timahaaga - qallooc, toosan, jeexan, ama qaab afro',
    'steps.step2.title': 'Soo Rar Sawirrada',
    'steps.step2.desc': 'Wadaag sawiro cad si lataliyayaashayada ay u fahmi karaan baahiyaha gaarka ah ee timahaaga',
    'steps.step3.title': 'Hel Alaabta',
    'steps.step3.desc': 'Hel talo la soo xulay oo leh tilmaamo isticmaal oo faahfaahsan iyo lacag bixinta',
    
    // Social Proof
    'social.title': 'Lagu Soo Bandhigay Saameeyayaasha Ugu Sarreeya',
    'social.subtitle': 'Lagu kalsoonaaday kumanaan oo lagu ammaanay codadka ugu weyn ee warbaahinta bulshada',
    'social.followers': 'Raacayaal',
    'social.watch': 'Daaw Muuqaalka',
    'social.stats.customers': 'Macaamiil Faraxsan',
    'social.stats.influencers': 'Saameeyayaal Wadaag',
    'social.stats.views': 'Daawasho Warbaahinta Bulshada',
    
    // Video Section
    'video.title': 'Sida Loo Isticmaalo Daawaynta',
    'video.subtitle': 'Tilmaamo muuqaal tallaabo-tallaabo ah si loogu kaalmeeyo inaad hesho natiijooyinka ugu wanaagsan',
    'video.step1': 'Diyaarinta & Maydhaadka',
    'video.step2': 'Farsamada Codsashada',
    'video.step3': 'Maydhaadka & Daryeelka Kadib',
    'video.duration': 'dq',
    
    // Testimonials
    'testimonials.title': 'Natiijooyinka Runta ah Dadka Runta ah',
    
    // Final CTA
    'final.title': 'Diyaar U Tahay Inaad Beddesho Timaha?',
    'final.subtitle': 'Ku biir kumanaan soo ogaaday habka daryeelka timaha ee dabiiciga ah ee saxda ah. Qaddar xaddidan oo la heli karo bisha.',
    'final.cta': 'Bilow Socdaalkaaga Hadda',
    
    // Hair Type
    'hairtype.curly': 'Qallooc',
    'hairtype.straight': 'Toosan',
    'hairtype.frizzy': 'Jeexan',
    'hairtype.afro': 'Afro',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
