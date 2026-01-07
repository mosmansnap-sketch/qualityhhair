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
    'hero.viewPricing': 'View Pricing',
    
    // Trust Indicators
    'trust.safePregnancy': 'Safe for Pregnancy',
    'trust.organic': '100% Organic',
    'trust.noHeat': 'No Heat Required',
    'trust.lasts': 'Lasts 3-6 Months',
    
    // Problem/Solution
    'problem.title': 'Why Traditional Keratin Fails',
    'problem.subtitle': 'The Problem with Regular Treatments',
    'problem.text1': "We can all agree it's beautiful in the beginning. After a couple of weeks, you start losing hair because the treatment made your hair straight. And it's because your hair is trying to stretch back.",
    'problem.text2': "After 2-3 months, you end up with 2 different hair textures. Some even notice the new growing hair has a dryer texture. Traditional keratin needs heat and hair straightening, and it's not recommended for pregnancy or kids. Once you've had that treatment, I normally don't suggest mine until your natural hair has grown out all the way to your shoulders.",
    'solution.title': 'The Quality Hair Solution',
    'solution.subtitle': 'Organic Keratin That Works With Your Curls',
    'solution.text': 'Our treatment penetrates your hair shaft without breaking bonds. Your curls stay - they just become healthier, more defined, and manageable. No formaldehyde, no heat damage, safe for everyone.',
    
    // Pricing
    'pricing.title': 'Choose Your Treatment Size',
    'pricing.subtitle': 'Price based on hair length and thickness',
    'pricing.addToCart': 'Add to Cart',
    'pricing.popular': 'Most Popular',
    'pricing.short': 'Short Hair',
    'pricing.medium': 'Medium Hair',
    'pricing.long': 'Long Hair',
    'pricing.extraLong': 'Extra Long',
    'pricing.consultation': 'Not Sure? Book a Consultation',
    'pricing.consultationDesc': 'Get personalized advice from our hair experts',
    'pricing.bookCall': 'Book Free Call',
    
    // How It Works
    'steps.title': 'Your Journey to Better Hair',
    'steps.step1.title': 'Select Hair Type',
    'steps.step1.desc': 'Tell us about your hair - curly, straight, frizzy, or afro texture',
    'steps.step2.title': 'Upload Photos',
    'steps.step2.desc': "Share clear images so our advisors can understand your hair's unique needs",
    'steps.step3.title': 'Get Your Products',
    'steps.step3.desc': 'Receive curated recommendations with detailed usage instructions and checkout',
    
    // Benefits
    'benefits.title': 'Why Choose Quality Hair?',
    'benefits.maintains': 'Maintains Curl Pattern',
    'benefits.maintainsDesc': 'Your natural curls stay intact - just healthier and more defined',
    'benefits.organic': '100% Organic Formula',
    'benefits.organicDesc': 'No formaldehyde, no harsh chemicals - safe for pregnancy and kids',
    'benefits.noHeat': 'No Heat Required',
    'benefits.noHeatDesc': 'Unlike traditional keratin, no flat iron or blow dryer needed',
    'benefits.lasting': 'Long-Lasting Results',
    'benefits.lastingDesc': '3-6 months of beautiful, manageable hair',
    
    // Comparison
    'comparison.title': 'How We Compare',
    'comparison.us': 'Quality Hair',
    'comparison.traditional': 'Traditional Keratin',
    'comparison.maintainsCurls': 'Maintains Curls',
    'comparison.chemicalFree': 'Chemical Free',
    'comparison.pregnancySafe': 'Pregnancy Safe',
    'comparison.noHeat': 'No Heat Required',
    
    // Social Proof
    'social.title': 'Featured By Top Influencers',
    'social.subtitle': "Trusted by thousands and celebrated by social media's biggest voices",
    'social.followers': 'Followers',
    'social.watch': 'Watch Video',
    'social.stats.customers': 'Happy Customers',
    'social.stats.influencers': 'Influencer Partners',
    'social.stats.views': 'Social Media Views',
    
    // Testimonials
    'testimonials.title': 'Real Results from Real People',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.all': 'All',
    'faq.treatment': 'Treatment',
    'faq.safety': 'Safety',
    'faq.aftercare': 'Aftercare',
    'faq.ordering': 'Ordering',
    
    // About
    'about.title': 'Our Story',
    'about.subtitle': 'Founded by someone who understands your hair journey',
    
    // Final CTA
    'final.title': 'Ready to Transform Your Hair?',
    'final.subtitle': "Join thousands who've discovered their perfect organic hair care routine. Limited supply available this month.",
    'final.cta': 'Start Your Journey Now',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.quickLinks': 'Quick Links',
    'footer.support': 'Support',
    'footer.connect': 'Connect',
    
    // Hair Types
    'hairtype.curly': 'Curly',
    'hairtype.straight': 'Straight',
    'hairtype.frizzy': 'Frizzy',
    'hairtype.afro': 'Afro',
    
    // Common
    'common.learnMore': 'Learn More',
    'common.getStarted': 'Get Started',
    'common.viewAll': 'View All',
    'common.close': 'Close',
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
    'hero.viewPricing': 'Se Priser',
    
    // Trust Indicators
    'trust.safePregnancy': 'Säkert vid Graviditet',
    'trust.organic': '100% Ekologiskt',
    'trust.noHeat': 'Ingen Värme Krävs',
    'trust.lasts': 'Varar 3-6 Månader',
    
    // Problem/Solution
    'problem.title': 'Varför Traditionell Keratin Misslyckas',
    'problem.subtitle': 'Problemet med Vanliga Behandlingar',
    'problem.text1': 'Vi kan alla hålla med om att det är vackert i början. Efter ett par veckor börjar du tappa hår eftersom behandlingen gjorde ditt hår rakt. Och det beror på att ditt hår försöker sträcka sig tillbaka.',
    'problem.text2': 'Efter 2-3 månader får du 2 olika hårstrukturer. Vissa märker till och med att det nya växande håret har en torrare struktur. Traditionell keratin behöver värme och hårplattning, och det rekommenderas inte för graviditet eller barn.',
    'solution.title': 'Quality Hair Lösningen',
    'solution.subtitle': 'Ekologisk Keratin Som Fungerar Med Dina Lockar',
    'solution.text': 'Vår behandling tränger in i din hårstråle utan att bryta bindningar. Dina lockar stannar - de blir bara hälsosammare, mer definierade och hanterbara. Ingen formaldehyd, inga värmeskador, säker för alla.',
    
    // Pricing
    'pricing.title': 'Välj Din Behandlingsstorlek',
    'pricing.subtitle': 'Pris baserat på hårlängd och tjocklek',
    'pricing.addToCart': 'Lägg i Varukorg',
    'pricing.popular': 'Mest Populär',
    'pricing.short': 'Kort Hår',
    'pricing.medium': 'Medellångt Hår',
    'pricing.long': 'Långt Hår',
    'pricing.extraLong': 'Extra Långt',
    'pricing.consultation': 'Osäker? Boka en Konsultation',
    'pricing.consultationDesc': 'Få personlig rådgivning från våra hårexperter',
    'pricing.bookCall': 'Boka Gratis Samtal',
    
    // How It Works
    'steps.title': 'Din Resa Till Bättre Hår',
    'steps.step1.title': 'Välj Hårtyp',
    'steps.step1.desc': 'Berätta om ditt hår - lockigt, rakt, frissigt eller afro-struktur',
    'steps.step2.title': 'Ladda Upp Foton',
    'steps.step2.desc': 'Dela tydliga bilder så att våra rådgivare kan förstå ditt hårs unika behov',
    'steps.step3.title': 'Få Dina Produkter',
    'steps.step3.desc': 'Ta emot kurerade rekommendationer med detaljerade användningsinstruktioner',
    
    // Benefits
    'benefits.title': 'Varför Välja Quality Hair?',
    'benefits.maintains': 'Bevarar Lockmönster',
    'benefits.maintainsDesc': 'Dina naturliga lockar förblir intakta - bara hälsosammare och mer definierade',
    'benefits.organic': '100% Ekologisk Formel',
    'benefits.organicDesc': 'Ingen formaldehyd, inga hårda kemikalier - säkert för graviditet och barn',
    'benefits.noHeat': 'Ingen Värme Krävs',
    'benefits.noHeatDesc': 'Till skillnad från traditionell keratin behövs ingen plattång eller hårtork',
    'benefits.lasting': 'Långvariga Resultat',
    'benefits.lastingDesc': '3-6 månader av vackert, hanterbart hår',
    
    // Comparison
    'comparison.title': 'Hur Vi Jämför',
    'comparison.us': 'Quality Hair',
    'comparison.traditional': 'Traditionell Keratin',
    'comparison.maintainsCurls': 'Bevarar Lockar',
    'comparison.chemicalFree': 'Kemikaliefri',
    'comparison.pregnancySafe': 'Graviditetssäker',
    'comparison.noHeat': 'Ingen Värme Krävs',
    
    // Social Proof
    'social.title': 'Presenterad av Toppinfluenser',
    'social.subtitle': 'Pålitlig av tusentals och hyllad av sociala mediers största röster',
    'social.followers': 'Följare',
    'social.watch': 'Se Video',
    'social.stats.customers': 'Nöjda Kunder',
    'social.stats.influencers': 'Influencer-Partners',
    'social.stats.views': 'Visningar på Sociala Medier',
    
    // Testimonials
    'testimonials.title': 'Verkliga Resultat från Verkliga Människor',
    
    // FAQ
    'faq.title': 'Vanliga Frågor',
    'faq.all': 'Alla',
    'faq.treatment': 'Behandling',
    'faq.safety': 'Säkerhet',
    'faq.aftercare': 'Eftervård',
    'faq.ordering': 'Beställning',
    
    // About
    'about.title': 'Vår Berättelse',
    'about.subtitle': 'Grundad av någon som förstår din hårresa',
    
    // Final CTA
    'final.title': 'Redo Att Transformera Ditt Hår?',
    'final.subtitle': 'Gå med tusentals som har upptäckt sin perfekta ekologiska hårvårdsrutin. Begränsat lager tillgängligt denna månad.',
    'final.cta': 'Börja Din Resa Nu',
    
    // Footer
    'footer.rights': 'Alla rättigheter förbehållna',
    'footer.quickLinks': 'Snabblänkar',
    'footer.support': 'Support',
    'footer.connect': 'Kontakt',
    
    // Hair Types
    'hairtype.curly': 'Lockigt',
    'hairtype.straight': 'Rakt',
    'hairtype.frizzy': 'Frissigt',
    'hairtype.afro': 'Afro',
    
    // Common
    'common.learnMore': 'Läs Mer',
    'common.getStarted': 'Kom Igång',
    'common.viewAll': 'Visa Alla',
    'common.close': 'Stäng',
  },
  so: {
    // Header
    'header.cart': 'Gaariga',
    'header.language': 'Luuqad',
    
    // Navigation
    'nav.home': 'Guriga',
    'nav.benefits': "Faa'iidooyinka",
    'nav.product': 'Daawaynta',
    'nav.influencers': 'Saameeyayaal',
    'nav.tutorials': 'Tilmaamo',
    'nav.pricing': 'Qiimaha',
    'nav.faq': "Su'aalaha",
    
    // Hero
    'hero.badge': 'QADDAR BISHA XADDIDAN • ALAAB DABIICI AH',
    'hero.title': 'Timahaaga, La Hagaajiyey Xalal Gaarka Ah',
    'hero.subtitle': 'Ku raaxayso falanqaynta timaha ee AI-powered oo ay la socdaan hagida khibradda. Hel alaab dabiici ah oo loo qoondeeyey qaab-dhismeedkaaga timaha.',
    'hero.cta': 'Bilow Beddelkaaga',
    'hero.viewPricing': 'Arag Qiimaha',
    
    // Trust Indicators
    'trust.safePregnancy': 'Badbaado Uurka',
    'trust.organic': '100% Dabiici',
    'trust.noHeat': 'Kuleyl Looma Baahna',
    'trust.lasts': 'Waxay Raagtaa 3-6 Bilood',
    
    // Problem/Solution
    'problem.title': 'Sababta Keratin Caadiga ah U Guuldareysato',
    'problem.subtitle': 'Dhibaatada Daawaynta Caadiga ah',
    'problem.text1': 'Waxaan dhammaanteen ku heshiinaa inay qurux badan tahay bilowga. Todobaadyo ka dib, waxaad bilaabaysaa inaad lumiso timaha sababtoo ah daawayntu waxay timahaaga ka dhigtay toos. Maxaa yeelay timahaagu wuxuu isku dayaya inuu dib ugu laabmo.',
    'problem.text2': 'Ka dib 2-3 bilood, waxaad haysataa 2 qaab-dhismeed oo kala duwan. Qaar waxay xitaa arkaan timaha cusub ee koraya inuu leeyahay qaab-dhismeed engeg. Keratin caadiga ah wuxuu u baahan yahay kuleyl, lagumana talinayo uurka ama carruurta.',
    'solution.title': 'Xalka Quality Hair',
    'solution.subtitle': 'Keratin Dabiici Ah Oo La Shaqeeya Qaloocaadkaaga',
    'solution.text': 'Daawayntayadu waxay galataa timaha adiga oo aan jebin xidhiidhka. Qaloocaadkaagu wuu joogaa - waxay noqdaan caafimaad badan, cad, oo la maareeyo. Formaldehyde maleh, dhaawac kuleyl maleh, ammaan oo dhan.',
    
    // Pricing
    'pricing.title': 'Dooro Cabbirkaaga Daawaynta',
    'pricing.subtitle': 'Qiimaha wuxuu ku salaysan yahay dhererka timaha iyo qalafka',
    'pricing.addToCart': 'Ku Dar Gaariga',
    'pricing.popular': 'Ugu Caansan',
    'pricing.short': 'Timo Gaaban',
    'pricing.medium': 'Timo Dhexdhexaad',
    'pricing.long': 'Timo Dheer',
    'pricing.extraLong': 'Aad U Dheer',
    'pricing.consultation': 'Ma Hubin? Ballan La Tashi',
    'pricing.consultationDesc': 'Hel talo shaqsi ah khubarada timahayaga',
    'pricing.bookCall': 'Ballan Bilaash',
    
    // How It Works
    'steps.title': 'Safarkaaga Timaha Wanaagsan',
    'steps.step1.title': 'Dooro Nooca Timaha',
    'steps.step1.desc': 'Noo sheeg timahaaga - qallooc, toosan, jeexan, ama afro',
    'steps.step2.title': 'Soo Rar Sawirrada',
    'steps.step2.desc': 'Wadaag sawiro cad si lataliyayaashayada ay u fahmaan baahiyaha gaarka ah ee timahaaga',
    'steps.step3.title': 'Hel Alaabta',
    'steps.step3.desc': 'Hel talo la soo xulay oo leh tilmaamo isticmaal oo faahfaahsan',
    
    // Benefits
    'benefits.title': 'Maxay U Doorataa Quality Hair?',
    'benefits.maintains': 'Waxay Ilaalintaa Qaabka Qalooca',
    'benefits.maintainsDesc': 'Qaloocaadkaaga dabiiciga ah way jiraan - oo kaliya caafimaad badan oo cad',
    'benefits.organic': 'Qaab 100% Dabiici Ah',
    'benefits.organicDesc': 'Formaldehyde maleh, kimiko adag maleh - ammaan uurka iyo carruurta',
    'benefits.noHeat': 'Kuleyl Looma Baahna',
    'benefits.noHeatDesc': 'Si ka duwan keratin caadiga ah, flat iron ama blow dryer looma baahna',
    'benefits.lasting': 'Natiijooyin Raagaya',
    'benefits.lastingDesc': '3-6 bilood oo timo qurux badan, la maareeyo',
    
    // Comparison
    'comparison.title': 'Sideen U Isbarbardhignaa',
    'comparison.us': 'Quality Hair',
    'comparison.traditional': 'Keratin Caadiga ah',
    'comparison.maintainsCurls': 'Waxay Ilaalintaa Qaloocaadka',
    'comparison.chemicalFree': 'Kimiko Lacag',
    'comparison.pregnancySafe': 'Ammaan Uurka',
    'comparison.noHeat': 'Kuleyl Looma Baahna',
    
    // Social Proof
    'social.title': 'Lagu Soo Bandhigay Saameeyayaasha Ugu Sarreeya',
    'social.subtitle': 'Lagu kalsoonaaday kumanaan oo lagu ammaanay codadka ugu weyn ee warbaahinta bulshada',
    'social.followers': 'Raacayaal',
    'social.watch': 'Daaw Muuqaalka',
    'social.stats.customers': 'Macaamiil Faraxsan',
    'social.stats.influencers': 'Saameeyayaal Wadaag',
    'social.stats.views': 'Daawasho Warbaahinta',
    
    // Testimonials
    'testimonials.title': 'Natiijooyin Dhab ah oo Dad Dhab ah',
    
    // FAQ
    'faq.title': "Su'aalaha Inta Badan La Weydiiyo",
    'faq.all': 'Dhammaan',
    'faq.treatment': 'Daawaynta',
    'faq.safety': 'Badbaado',
    'faq.aftercare': 'Daryeelka Kadib',
    'faq.ordering': 'Dalabka',
    
    // About
    'about.title': 'Sheekadayada',
    'about.subtitle': 'Waxaa aasaasay qof fahmaya safarkaaga timaha',
    
    // Final CTA
    'final.title': 'Diyaar U Tahay Inaad Beddesho Timahaaga?',
    'final.subtitle': 'Ku biir kumanaan soo ogaaday habka daryeelka timaha ee dabiiciga ah. Qaddar xaddidan oo la heli karo bisha.',
    'final.cta': 'Bilow Safarkaaga Hadda',
    
    // Footer
    'footer.rights': 'Dhammaan xuquuqda way dhowran yihiin',
    'footer.quickLinks': 'Linkiyada Degdegga',
    'footer.support': 'Taageero',
    'footer.connect': 'Xiriir',
    
    // Hair Types
    'hairtype.curly': 'Qallooc',
    'hairtype.straight': 'Toosan',
    'hairtype.frizzy': 'Jeexan',
    'hairtype.afro': 'Afro',
    
    // Common
    'common.learnMore': 'Wax Badan Baro',
    'common.getStarted': 'Bilow',
    'common.viewAll': 'Arag Dhammaan',
    'common.close': 'Xir',
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
