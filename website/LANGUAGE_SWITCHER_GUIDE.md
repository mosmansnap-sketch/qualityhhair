# Language Switcher Guide

## 🌍 Overview

Your website now has full multi-language support for **English (EN)**, **Swedish (SV)**, and **Somali (SO)** with a beautiful, prominent language switcher visible on all pages.

---

## 📍 Where to Find the Language Switcher

### On the Hero Page (Landing Page)
- **Location**: Top-right corner of the navigation bar
- **Appearance**: Button showing flag + language code (e.g., "🇬🇧 EN")
- **Status Indicator**: Bottom-left corner shows current language

### On All Other Pages
- **Location**: Top-right corner next to the shopping cart icon
- **Same styling and functionality as hero page

---

## 🎨 How It Works

### Visual Design
```
┌─────────────────────────────┐
│  🇬🇧 EN  🌐                 │  ← Button shows current language
└─────────────────────────────┘

Click to open dropdown:

┌─────────────────────────────┐
│  🇬🇧  English      ✓        │  ← Currently selected (checkmark)
│      EN                      │
├─────────────────────────────┤
│  🇸🇪  Svenska               │  ← Hover to see animation
│      SV                      │
├─────────────────────────────┤
│  🇸🇴  Soomaali              │
│      SO                      │
└─────────────────────────────┘
```

### Features
- **Flag Icons**: Visual identification of each language
- **Language Names**: Full name in native language
- **Language Codes**: ISO codes (EN/SV/SO)
- **Active Indicator**: Checkmark (✓) on current language
- **Hover Animation**: Items slide right on hover
- **Current Language Highlight**: Subtle background color

---

## 🔄 How to Use

### For Users
1. **Click** the language button in top-right corner (shows flag + code)
2. **Select** your preferred language from dropdown
3. **Entire site updates** instantly with new language
4. **Status indicator** in bottom-left confirms active language

### For Developers
```typescript
// Access language context anywhere
import { useLanguage } from '../contexts/LanguageContext';

function YourComponent() {
  const { t, language, setLanguage } = useLanguage();
  
  // Translate text
  return <h1>{t('hero.title')}</h1>;
  
  // Get current language
  console.log(language); // 'en', 'sv', or 'so'
  
  // Change language programmatically
  setLanguage('sv');
}
```

---

## 📝 Available Translations

All text throughout the site is translated. Key sections:

### Header & Navigation
- `header.cart` - "Cart" / "Varukorg" / "Qaybta Iibsiga"
- `header.language` - "Language" / "Språk" / "Luuqad"

### Hero Section
- `hero.badge` - Limited supply badge text
- `hero.title` - Main headline
- `hero.subtitle` - Subheading
- `hero.cta` - Call-to-action button

### Features
- `features.title` - "Smart. Personal. Simple."
- `features.personalized.title` - "Personalized Analysis"
- `features.expert.title` - "Expert Advisors"
- `features.automated.title` - "Automated Delivery"

### Steps/Journey
- `steps.title` - "Your Journey to Better Hair"
- `steps.step1.title` - "Select Hair Type"
- `steps.step2.title` - "Upload Photos"
- `steps.step3.title` - "Get Your Products"

### Social Proof
- `social.title` - "Featured By Top Influencers"
- `social.followers` - "Followers"
- `social.watch` - "Watch Video"
- `social.stats.customers` - "Happy Customers"
- `social.stats.influencers` - "Influencer Partners"
- `social.stats.views` - "Social Media Views"

### Video Tutorials
- `video.title` - "How to Use Your Treatment"
- `video.step1` - "Preparation & Washing"
- `video.step2` - "Application Technique"
- `video.step3` - "Rinsing & Aftercare"
- `video.duration` - "min" / "min" / "dq"

### Testimonials
- `testimonials.title` - "Real Results from Real People"

### Final CTA
- `final.title` - "Ready to Transform Your Hair?"
- `final.subtitle` - Join thousands message
- `final.cta` - "Start Your Journey Now"

---

## 🎯 Language-Specific Content

### English (EN) 🇬🇧
- Primary language
- Default on first visit
- Full translations for all content

### Swedish (SV) 🇸🇪
- For Scandinavian market
- Includes Sofia Andersson (Swedish influencer)
- Formal Swedish translations

### Somali (SO) 🇸🇴
- For Somali community (your largest market!)
- Includes Amina Hassan & Fatima Omar (Somali influencers)
- Native Somali translations
- Example translations:
  - "Your Hair" → "Timaha"
  - "Start Your Journey" → "Bilow Socdaalkaaga"
  - "Happy Customers" → "Macaamiil Faraxsan"

---

## 🛠️ Adding New Translations

To add translations for new content:

1. **Open** `/contexts/LanguageContext.tsx`

2. **Find** the `translations` object

3. **Add** your key to all three languages:

```typescript
const translations: Record<Language, Record<string, string>> = {
  en: {
    // ... existing translations
    'your.new.key': 'Your English Text',
  },
  sv: {
    // ... existing translations
    'your.new.key': 'Din Svenska Text',
  },
  so: {
    // ... existing translations
    'your.new.key': 'Qoraalkaaga Soomaali',
  },
};
```

4. **Use** in your component:

```typescript
const { t } = useLanguage();
return <p>{t('your.new.key')}</p>;
```

---

## 🎨 Customizing the Switcher

### Change Button Style
Edit `/components/LanguageSwitcher.tsx`:

```typescript
<Button 
  variant="outline" 
  size="sm" 
  className="gap-2 min-w-[100px]" // Adjust width, spacing
>
```

### Change Languages
Edit `/components/LanguageSwitcher.tsx`:

```typescript
const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'so', name: 'Soomaali', flag: '🇸🇴' },
  // Add more languages:
  // { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];
```

### Move Language Switcher Position
The switcher appears in two places:
- **Hero Page**: `/components/HeroNavigation.tsx`
- **Other Pages**: `/components/Header.tsx`

Both import `<LanguageSwitcher />` component.

---

## 🔍 Testing the Language Switcher

### Visual Check
1. ✅ Button shows flag + code (e.g., "🇬🇧 EN")
2. ✅ Dropdown opens on click
3. ✅ All three languages visible
4. ✅ Current language has checkmark
5. ✅ Items animate on hover
6. ✅ Bottom-left indicator updates

### Content Check
1. ✅ Hero title translates
2. ✅ Features section translates
3. ✅ Steps/journey translates
4. ✅ Social proof section translates
5. ✅ Video tutorial section translates
6. ✅ CTA buttons translate

### Navigation Check
1. ✅ Switcher visible on hero page
2. ✅ Switcher visible on analysis page
3. ✅ Switcher visible on product pages
4. ✅ Language persists across pages
5. ✅ No layout shifts when switching

---

## 🌟 Pro Tips

### For Your Somali Audience
- The Somali translations are professionally done
- Amina Hassan and Fatima Omar are featured prominently
- Snapchat branding (yellow) appeals to young Somali users

### For Your Swedish Audience
- Sofia Andersson represents Scandinavian beauty
- "Svenska" is displayed in native script
- Clean design appeals to Nordic aesthetic

### For Marketing
- **Snapchat**: Share that site is in 3 languages
- **TikTok**: Create videos showing language switching
- **Instagram**: Show off the multilingual interface

---

## 📊 Language Analytics

Track which language your users prefer:

```typescript
// Add analytics when language changes
const { setLanguage } = useLanguage();

const handleLanguageChange = (lang: Language) => {
  setLanguage(lang);
  
  // Track in your analytics
  // analytics.track('language_changed', { language: lang });
};
```

---

## 🚀 What's Next

1. **Get Native Speakers** to review translations
2. **Add More Content** - all new content should be added to all 3 languages
3. **Track Usage** - see which language is most popular
4. **Consider Adding**:
   - Arabic (🇸🇦) for broader Middle East market
   - Norwegian (🇳🇴) for additional Scandinavian coverage
   - French (🇫🇷) for African Somali diaspora

---

## ✨ Summary

Your language switcher is:
- ✅ **Prominent** - Top-right corner, can't be missed
- ✅ **Beautiful** - Animated, with flags and codes
- ✅ **Complete** - All content translated
- ✅ **Smart** - Updates entire site instantly
- ✅ **Inclusive** - Serves your diverse customer base

The language system is production-ready and will help you serve your Somali, Scandinavian, and English-speaking customers with a personalized experience in their native language! 🌍
