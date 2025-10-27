# Quality Hair - Component Specifications

**Project:** Quality Hair - Organic Keratin Treatment E-commerce
**Version:** 1.0.0  
**Last Updated:** October 23, 2025  
**Design System:** Earthy Organic Aesthetic

---

## Table of Contents
1. [Header Component](#1-header-component)
2. [Hero Section](#2-hero-section)
3. [Problem/Solution Section](#3-problemsolution-section)
4. [How It Works Section](#4-how-it-works-section)
5. [Benefits Section](#5-benefits-section)
6. [Comparison Section](#6-comparison-section)
7. [Pricing Section](#7-pricing-section)
8. [Social Proof Section](#8-social-proof-section)
9. [Testimonials Section](#9-testimonials-section)
10. [FAQ Section](#10-faq-section)
11. [Consultation Booking](#11-consultation-booking)
12. [Final CTA Section](#12-final-cta-section)
13. [Footer Component](#13-footer-component)
14. [WhatsApp Chat Widget](#14-whatsapp-chat-widget)
15. [Shopping Cart](#15-shopping-cart)
16. [Hair Analysis Flow](#16-hair-analysis-flow)

---

## 1. Header Component

**File:** `/components/Header.tsx`

### Dimensions
- **Desktop Height:** `6rem` (96px) - using `h-24`
- **Mobile Height:** `5rem` (80px) - using `h-20`
- **Max Width Container:** `1280px` (max-w-7xl)
- **Horizontal Padding:** `1rem` (16px) - using `px-4`

### Logo Specifications
- **Desktop Logo Height:** `5rem` (80px) - using `h-20`
- **Mobile Logo Height:** `4rem` (64px) - using `h-16`
- **Logo Width:** Auto (maintains aspect ratio)
- **Logo Glow Effect:** `drop-shadow(0 0 8px rgba(251,191,36,0.4))`
- **Animation:** Floating animation (y: -2px, 2s duration, infinite yoyo)
- **Hover Scale:** 1.05

### Navigation
- **Navigation Spacing (Desktop):** `0.25rem` gap between items - using `gap-1`
- **Nav Item Padding:** `1rem 0.5rem` (16px 8px) - using `px-4 py-2`
- **Nav Item Text Size:** `0.875rem` (14px) - using `text-sm`
- **Nav Item Border Radius:** `0.5rem` (8px) - using `rounded-lg`
- **Hover Scale:** 1.05
- **Tap Scale:** 0.95

### Cart Icon
- **Icon Size:** `1.25rem` (20px) - using `h-5 w-5`
- **Badge Size:** `1.25rem` (20px) - using `h-5 w-5`
- **Badge Position:** Absolute top-right with `-0.5rem` offset
- **Badge Background:** `linear-gradient(to-br, from-red-500, to-pink-500)`
- **Badge Scale Animation:** Spring effect (stiffness: 500, damping: 15)

### Mobile Menu
- **Menu Button Icon Size:** `1.25rem` (20px) - using `h-5 w-5`
- **Mobile Panel Top Offset:** `5rem` mobile, `6rem` desktop - using `top-20 md:top-24`
- **Mobile Panel Margins:** `1rem` on all sides - using `left-4 right-4`
- **Mobile Panel Padding:** `1rem` (16px) - using `p-4`
- **Mobile Panel Border Radius:** `1rem` (16px) - using `rounded-2xl`
- **Menu Item Padding:** `0.75rem 1rem` (12px 16px) - using `px-4 py-3`
- **Stagger Animation Delay:** 0.05s per item

### Behavior
- **Sticky:** Yes - using `sticky top-0`
- **Z-Index:** 50
- **Background:** `bg-background/80` with `backdrop-blur-xl`
- **Background Opacity on Scroll:** 60% with backdrop filter support
- **Border:** Bottom border with `border-border/40`
- **Initial Animation:** Slide from top (y: -100 to 0)
- **Scroll Offset for Smooth Scroll:** `100px` (nav height)

### Animations
- **Entry Animation:** Spring (stiffness: 300, damping: 30)
- **Logo Pulse Duration:** 2s infinite yoyo
- **Mobile Menu Backdrop:** Black 50% opacity with blur

---

## 2. Hero Section

**File:** `/components/HeroPage.tsx`

### Dimensions
- **Desktop Height:** `700px` (43.75rem) - using `h-[700px]`
- **Mobile Height:** `600px` (37.5rem) - using `h-[600px]`
- **Container Max Width:** `1536px` (96rem) - using `max-w-6xl`
- **Content Max Width:** `42rem` (672px) - using `max-w-2xl`
- **Horizontal Padding:** `1rem` (16px) - using `px-4`

### Background
- **Background Type:** Image carousel with gradient overlay
- **Gradient Overlay:** `from-black/70 via-black/50 to-transparent` (left to right)
- **Image Transition:** Fade with 1.5s duration
- **Image Animation Interval:** 5 seconds auto-rotation

### Badge Component
- **Padding:** `1.5rem 1rem` (24px 16px) - using `px-6 py-3`
- **Background:** `linear-gradient(to right, from-amber-500, via-amber-400, to-yellow-400)`
- **Border Radius:** `9999px` (full rounded) - using `rounded-full`
- **Shadow:** `shadow-lg shadow-amber-500/30`
- **Border:** `2px solid rgba(amber-300, 0.5)`
- **Ring:** `2px white/20`
- **Text Size:** `0.875rem` (14px) - using `text-sm`
- **Text Color:** `#831843` (amber-950)
- **Letter Spacing:** `wide`
- **Entry Animation:** y: 30px, opacity: 0, duration: 0.8s

### Heading (H1)
- **Font Size:** Inherits from h1 typography (text-5xl, 3rem/48px)
- **Font Weight:** 500 (medium)
- **Line Height:** 1.2
- **Text Color:** White
- **Margin Bottom:** `1.5rem` (24px) - using `mb-6`
- **Entry Animation:** y: 50px, opacity: 0, duration: 1s, delay: -0.5s

### Subheading (Paragraph)
- **Font Size:** `1.125rem` (18px) - using `text-lg`
- **Line Height:** 1.5
- **Opacity:** 90%
- **Margin Bottom:** `2rem` (32px) - using `mb-8`
- **Entry Animation:** y: 30px, opacity: 0, duration: 0.8s, delay: -0.6s

### CTA Buttons
- **Primary Button:**
  - Height: `3.5rem` (56px) - using `h-14`
  - Padding: `2rem 1rem` (32px 16px) - using `px-8 py-4`
  - Font Size: `1.125rem` (18px) - using `text-lg`
  - Border Radius: `9999px` (full)
  - Background: Primary color
  - Hover Scale: 1.05
  - Tap Scale: 0.95
  
- **Secondary Button:**
  - Height: `3.5rem` (56px) - using `h-14`
  - Padding: `2rem 1rem` (32px 16px) - using `px-8 py-4`
  - Font Size: `1.125rem` (18px) - using `text-lg`
  - Border: `2px solid white/30`
  - Background: `white/10` with backdrop blur
  - Hover Background: `white/20`

### Feature Cards Section
- **Section Padding Top/Bottom:** `4rem` mobile, `6rem` desktop - using `py-16 md:py-24`
- **Container Max Width:** `1536px` (96rem) - using `max-w-6xl`
- **Card Grid:** 3 columns on large screens
- **Card Gap:** `1.5rem` (24px) - using `gap-6`
- **Card Padding:** `2rem` (32px) - using `p-8`
- **Card Border Radius:** `1rem` (16px) - using `rounded-2xl`
- **Card Animation:** y: 60px, opacity: 0, stagger: 0.2s

### Steps Section
- **Section Padding Top/Bottom:** `4rem` (64px) - using `py-16`
- **Steps Container Max Width:** `64rem` (1024px) - using `max-w-4xl`
- **Step Number Circle:** `4rem` (64px) diameter - using `h-16 w-16`
- **Connecting Line:** 1px gradient line (desktop only)
- **Step Card Border Radius:** `1.5rem` (24px) - using `rounded-3xl`
- **Step Animation:** x: 60px, opacity: 0, stagger: 0.2s

### Testimonials Carousel
- **Container Max Width:** `64rem` (1024px) - using `max-w-4xl`
- **Image Size:** `6rem` (96px) - using `h-24 w-24`
- **Star Rating Size:** `1.25rem` (20px) - using `w-5 h-5`
- **Slide Transition:** Fade with scale (0.95 to 1)
- **Auto-advance Interval:** 5 seconds
- **Navigation Dots Size:** `0.75rem` (12px) - using `h-3 w-3`

---

## 3. Problem/Solution Section

**File:** `/components/ProblemSolutionSection.tsx`

### Dimensions
- **Section Padding:** `4rem 1rem` mobile, `6rem 1rem` desktop - using `py-16 md:py-24 px-4`
- **Container Max Width:** `1536px` (96rem) - using `max-w-6xl`
- **Content Max Width:** `56rem` (896px) - using `max-w-3xl` for intro text

### Section Title
- **Margin Bottom:** `1rem` (16px) - using `mb-4`
- **Text Alignment:** Center
- **Inherits h2 Styling:** Uppercase, bold, letter-spacing: 0.02em

### Problem Cards
- **Grid Layout:** 2 columns on desktop
- **Card Gap:** `1.5rem` (24px) - using `gap-6`
- **Icon Container:**
  - Size: `3rem` (48px) - using `h-12 w-12`
  - Border Radius: Full (circle)
  - Background: `bg-red-500/10` (10% opacity)
  - Icon Size: `1.5rem` (24px) - using `h-6 w-6`
  - Icon Color: `text-red-500`
- **Card Padding:** `1.5rem` (24px) - using `p-6`
- **Card Border Radius:** `1rem` (16px) - using `rounded-xl`
- **Animation:** y: 60px, opacity: 0, scale: 0.95, stagger: 0.15s

### Solution Section
- **Background:** `bg-primary/5`
- **Padding:** `2rem` (32px) - using `p-8`
- **Border Radius:** `1.5rem` (24px) - using `rounded-2xl`
- **Border:** `border-primary/20`

---

## 4. How It Works Section

**File:** `/components/HowItWorksSection.tsx`

### Dimensions
- **Section Padding:** `4rem 1rem` mobile, `6rem 1rem` desktop - using `py-16 md:py-24 px-4`
- **Container Max Width:** `1536px` (96rem) - using `max-w-6xl`
- **Title Margin Bottom:** `3rem` (48px) - using `mb-12`

### Step Cards
- **Grid Layout:** 3 columns on desktop (1 col mobile, 2 col tablet)
- **Card Gap:** `2rem` (32px) - using `gap-8`
- **Card Padding:** `2rem` (32px) - using `p-8`
- **Card Border Radius:** `1rem` (16px) - using `rounded-2xl`
- **Card Background:** `bg-card`
- **Card Border:** `border border-border`
- **Hover Transform:** translateY(-8px) with shadow increase

### Step Numbers
- **Circle Size:** `4rem` (64px) - using `h-16 w-16`
- **Font Size:** `1.5rem` (24px) - using `text-2xl`
- **Background:** `bg-primary`
- **Text Color:** `text-primary-foreground`
- **Border Radius:** Full (circle)
- **Margin Bottom:** `1.5rem` (24px) - using `mb-6`

### Animations
- **Card Entry:** y: 60px, opacity: 0, stagger: 0.2s
- **Scroll Trigger Start:** "top 75%"
- **Hover Duration:** 300ms cubic-bezier(0.4, 0, 0.2, 1)

---

## 5. Benefits Section

**File:** `/components/BenefitsSection.tsx`

### Dimensions
- **Section Padding:** `4rem 1rem` mobile, `6rem 1rem` desktop - using `py-16 md:py-24 px-4`
- **Container Max Width:** `1536px` (96rem) - using `max-w-6xl`
- **Content Max Width (Intro):** `42rem` (672px) - using `max-w-2xl`
- **Title Margin Bottom:** `1rem` (16px) - using `mb-4`

### Benefit Cards
- **Grid Layout:** 3 columns desktop, 2 columns tablet, 1 column mobile
- **Card Gap:** `1.5rem` (24px) - using `gap-6`
- **Card Padding:** `2rem` (32px) - using `p-8`
- **Card Border Radius:** `1rem` (16px) - using `rounded-2xl`
- **Card Background:** `bg-card/50` with backdrop blur
- **Card Border:** `border border-border/50`

### Icons
- **Icon Size:** `3rem` (48px) - using `h-12 w-12`
- **Icon Color:** `text-primary`
- **Icon Margin Bottom:** `1rem` (16px) - using `mb-4`
- **Icon Container Background:** Optional gradient or solid

### Animations
- **Card Entry:** y: 50px, opacity: 0, stagger: 0.15s
- **Scroll Trigger:** "top 75%"
- **Card Hover:** translateY(-4px), shadow-lg transition

---

## 6. Comparison Section

**File:** `/components/ComparisonSection.tsx`

### Dimensions
- **Section Padding:** `4rem 1rem` mobile, `6rem 1rem` desktop - using `py-16 md:py-24 px-4`
- **Container Max Width:** `1280px` (80rem) - using `max-w-5xl`
- **Table Max Width:** `64rem` (1024px) - using `max-w-4xl`

### Table Specifications
- **Header Background:** `bg-primary/10`
- **Row Padding:** `1rem` (16px) - using `p-4`
- **Row Border:** `border-b border-border`
- **Alternating Rows:** `even:bg-muted/20`
- **Column Widths:** 
  - Feature name: 50%
  - Traditional: 25%
  - Quality Hair: 25%

### Check/Cross Icons
- **Icon Size:** `1.5rem` (24px) - using `h-6 w-6`
- **Check Color:** `text-green-500`
- **Cross Color:** `text-red-500`
- **Icon Alignment:** Center

### Mobile Layout
- **Card-based Layout:** Each comparison as stacked card
- **Card Padding:** `1rem` (16px) - using `p-4`
- **Card Gap:** `1rem` (16px) - using `gap-4`

---

## 7. Pricing Section

**File:** `/components/PricingSection.tsx`

### Dimensions
- **Section Padding:** `4rem 1rem` mobile, `6rem 1rem` desktop - using `py-16 md:py-24 px-4`
- **Container Max Width:** `1536px` (96rem) - using `max-w-6xl`
- **Section ID:** `#pricing` for navigation

### Pricing Cards
- **Grid Layout:** 4 columns desktop, 2 columns tablet, 1 column mobile
- **Card Gap:** `1.5rem` (24px) - using `gap-6`
- **Card Padding:** `2rem` (32px) - using `p-8`
- **Card Border Radius:** `1.5rem` (24px) - using `rounded-2xl`
- **Highlighted Card Scale:** 1.05
- **Highlighted Card Border:** `border-2 border-primary`
- **Highlighted Card Shadow:** Enhanced shadow

### Price Display
- **Currency Symbol Size:** `1.5rem` (24px) - using `text-2xl`
- **Price Amount Size:** `3rem` (48px) - using `text-5xl`
- **Font Weight:** 700 (bold)
- **Margin Bottom:** `1rem` (16px) - using `mb-4`

### Features List
- **List Gap:** `0.75rem` (12px) - using `space-y-3`
- **Check Icon Size:** `1.25rem` (20px) - using `h-5 w-5`
- **Check Icon Color:** `text-primary`
- **Text Size:** `0.875rem` (14px) - using `text-sm`

### CTA Button
- **Width:** Full width
- **Height:** `2.75rem` (44px)
- **Border Radius:** `0.5rem` (8px) - using `rounded-lg`
- **Margin Top:** `1.5rem` (24px) - using `mt-6`

### Pricing Values
- **Minimal:** €165
- **Moderate:** €235 (Highlighted)
- **Full:** €295
- **Maximum:** €375

### Animations
- **Card Entry:** y: 60px, opacity: 0, scale: 0.95, stagger: 0.12s
- **Scroll Trigger:** "top 75%"
- **Hover Effect:** Scale 1.02, shadow increase

---

## 8. Social Proof Section

**File:** `/components/SocialProofSection.tsx`

### Dimensions
- **Section Padding:** `3rem 1rem` mobile, `5rem 1rem` desktop - using `py-12 md:py-20 px-4`
- **Container Max Width:** `1536px` (96rem) - using `max-w-6xl`

### Influencer Cards
- **Grid Layout:** 4 columns desktop, 2 columns tablet, 1 column mobile
- **Card Gap:** `1.5rem` (24px) - using `gap-6`
- **Card Padding:** `1.5rem` (24px) - using `p-6`
- **Card Border Radius:** `1rem` (16px) - using `rounded-xl`

### Profile Image
- **Image Size:** `5rem` (80px) - using `h-20 w-20`
- **Border Radius:** Full (circle)
- **Border:** `3px solid border-color`
- **Verified Badge:**
  - Position: Absolute bottom-right
  - Size: `1.5rem` (24px)
  - Background: `bg-blue-500`
  - Icon Color: White
  - Border Radius: Full

### Platform Badges
- **Background:** `bg-yellow-400`
- **Text Color:** Black
- **Padding:** `0.5rem 1rem` (8px 16px) - using `px-4 py-2`
- **Border Radius:** `9999px` (full)
- **Font Size:** `0.75rem` (12px) - using `text-xs`
- **Font Weight:** 600 (semibold)

### Stats Display
- **Number Size:** `2.25rem` (36px) - using `text-4xl`
- **Font Weight:** 700 (bold)
- **Label Size:** `0.875rem` (14px) - using `text-sm`
- **Color:** `text-muted-foreground`

---

## 9. Testimonials Section

**File:** `/components/TestimonialsSection.tsx`

### Dimensions
- **Section Padding:** `4rem 1rem` mobile, `6rem 1rem` desktop - using `py-16 md:py-24 px-4`
- **Container Max Width:** `1280px` (80rem) - using `max-w-5xl`

### Testimonial Cards
- **Grid Layout:** Masonry grid, 2-3 columns desktop
- **Card Gap:** `1.5rem` (24px) - using `gap-6`
- **Card Padding:** `1.5rem` (24px) - using `p-6`
- **Card Border Radius:** `1rem` (16px) - using `rounded-xl`
- **Card Background:** `bg-card`
- **Card Border:** `border border-border`

### Customer Info
- **Avatar Size:** `3rem` (48px) - using `h-12 w-12`
- **Avatar Border Radius:** Full (circle)
- **Name Font Size:** Inherits (base)
- **Name Font Weight:** 600 (semibold)
- **Hair Type Badge:**
  - Padding: `0.25rem 0.75rem` (4px 12px) - using `px-3 py-1`
  - Font Size: `0.75rem` (12px) - using `text-xs`
  - Background: `bg-primary/10`
  - Color: `text-primary`
  - Border Radius: `9999px` (full)

### Star Rating
- **Star Size:** `1rem` (16px) - using `h-4 w-4`
- **Star Color (Filled):** `text-yellow-400`
- **Star Color (Empty):** `text-gray-300`
- **Gap Between Stars:** `0.25rem` (4px) - using `gap-1`

### Quote Text
- **Font Size:** `0.875rem` (14px) - using `text-sm`
- **Line Height:** 1.6
- **Color:** `text-muted-foreground`
- **Margin Top:** `1rem` (16px) - using `mt-4`

---

## 10. FAQ Section

**File:** `/components/FAQSection.tsx`

### Dimensions
- **Section Padding:** `4rem 1rem` mobile, `6rem 1rem` desktop - using `py-16 md:py-24 px-4`
- **Container Max Width:** `56rem` (896px) - using `max-w-3xl`
- **Section ID:** `#faq` for navigation

### Accordion Items
- **Item Spacing:** `1rem` (16px) between items - using `space-y-4`
- **Item Padding:** `1.5rem` (24px) - using `p-6`
- **Item Border Radius:** `0.75rem` (12px) - using `rounded-lg`
- **Item Background:** `bg-card`
- **Item Border:** `border border-border`

### Question Header
- **Font Size:** `1rem` (16px) base
- **Font Weight:** 600 (semibold)
- **Padding:** `1rem` (16px) - using `p-4`
- **Icon Size:** `1.25rem` (20px) - using `h-5 w-5`
- **Icon Rotation (Open):** 180deg

### Answer Content
- **Padding:** `1rem 1.5rem` (16px 24px) - using `px-6 py-4`
- **Font Size:** `0.875rem` (14px) - using `text-sm`
- **Line Height:** 1.6
- **Color:** `text-muted-foreground`
- **Animation:** Smooth expand/collapse with height transition

### Animations
- **Entry Animation:** Fade up with stagger
- **Accordion Transition:** 200ms ease-in-out

---

## 11. Consultation Booking

**File:** `/components/ConsultationBooking.tsx`

### Dimensions
- **Section Padding:** `4rem 1rem` mobile, `6rem 1rem` desktop - using `py-16 md:py-24 px-4`
- **Container Max Width:** `56rem` (896px) - using `max-w-3xl`
- **Form Max Width:** `42rem` (672px) - using `max-w-2xl`

### Form Card
- **Padding:** `2rem` (32px) - using `p-8`
- **Border Radius:** `1rem` (16px) - using `rounded-2xl`
- **Background:** `bg-card`
- **Border:** `border border-border`
- **Shadow:** `shadow-lg`

### Form Fields
- **Label Font Weight:** 500 (medium)
- **Label Margin Bottom:** `0.5rem` (8px) - using `mb-2`
- **Input Height:** `2.5rem` (40px) - using `h-10`
- **Input Padding:** `0.75rem` (12px) - using `px-3`
- **Input Border Radius:** `0.5rem` (8px) - using `rounded-md`
- **Input Border:** `border border-input`
- **Input Background:** `bg-input-background`
- **Textarea Min Height:** `8rem` (128px) - using `min-h-[8rem]`

### Calendar Picker
- **Width:** Full width
- **Border Radius:** `0.5rem` (8px) - using `rounded-md`
- **Selected Date Background:** `bg-primary`
- **Selected Date Text:** `text-primary-foreground`

### Time Slots
- **Grid Layout:** 3 columns desktop, 2 columns mobile
- **Slot Gap:** `0.75rem` (12px) - using `gap-3`
- **Slot Padding:** `0.75rem 1rem` (12px 16px) - using `px-4 py-3`
- **Slot Border Radius:** `0.5rem` (8px) - using `rounded-lg`
- **Slot Border:** `border-2`
- **Selected Slot Border:** `border-primary`
- **Selected Slot Background:** `bg-primary/10`

### Submit Button
- **Width:** Full width
- **Height:** `3rem` (48px) - using `h-12`
- **Border Radius:** `0.5rem` (8px) - using `rounded-lg`
- **Font Size:** `1rem` (16px)
- **Font Weight:** 600 (semibold)

### Consultation Fee
- **Amount:** €10
- **Display:** Badge with accent color
- **Position:** Near submit button

---

## 12. Final CTA Section

**File:** `/components/FinalCTASection.tsx`

### Dimensions
- **Section Padding:** `4rem 1rem` mobile, `6rem 1rem` desktop - using `py-16 md:py-24 px-4`
- **Container Max Width:** `1280px` (80rem) - using `max-w-5xl`
- **Content Max Width:** `42rem` (672px) - using `max-w-2xl`

### CTA Card
- **Padding:** `3rem 2rem` mobile, `4rem 2rem` desktop - using `p-12 md:p-16`
- **Border Radius:** `1.5rem` (24px) - using `rounded-2xl`
- **Background:** `linear-gradient(to right, from-primary, to-primary/80)`
- **Text Color:** `text-primary-foreground`
- **Shadow:** `shadow-2xl`

### Heading
- **Font Size:** Inherits h2 (3rem/48px on desktop)
- **Color:** `text-primary-foreground`
- **Margin Bottom:** `1rem` (16px) - using `mb-4`
- **Text Alignment:** Center

### Description
- **Font Size:** `1.125rem` (18px) - using `text-lg`
- **Opacity:** 90%
- **Max Width:** `36rem` (576px) - using `max-w-xl`
- **Margin:** Auto (centered)
- **Margin Bottom:** `2rem` (32px) - using `mb-8`

### CTA Buttons
- **Button Height:** `3.5rem` (56px) - using `h-14`
- **Button Padding:** `2rem 1rem` (32px 16px) - using `px-8 py-4`
- **Button Font Size:** `1.125rem` (18px) - using `text-lg`
- **Primary Button Background:** White or light color
- **Primary Button Text:** Primary color
- **Secondary Button:** Outline with white border
- **Button Gap:** `1rem` (16px) - using `gap-4`
- **Border Radius:** `9999px` (full)

### Urgency Badge
- **Background:** `bg-yellow-400`
- **Text Color:** Black
- **Padding:** `0.5rem 2rem` (8px 32px) - using `px-8 py-2`
- **Border Radius:** `9999px` (full)
- **Font Weight:** 600 (semibold)
- **Shadow:** `shadow-xl`

---

## 13. Footer Component

**File:** `/components/Footer.tsx`

### Dimensions
- **Section Padding:** `3rem 1rem` mobile, `4rem 1rem` desktop - using `py-12 md:py-16 px-4`
- **Container Max Width:** `1536px` (96rem) - using `max-w-6xl`
- **Background:** `bg-secondary/50`
- **Border Top:** `border-t border-border`

### Footer Grid
- **Grid Layout:** 4 columns desktop, 2 columns mobile
- **Column Gap:** `2rem` (32px) - using `gap-8`
- **Section Margin Bottom:** `3rem` (48px) - using `mb-12`

### Column Headers (H4)
- **Font Size:** Inherits h4 (1.5rem/24px)
- **Font Weight:** 500 (medium)
- **Color:** `text-foreground`
- **Margin Bottom:** `1rem` (16px) - using `mb-4`

### Links
- **Font Size:** `0.875rem` (14px) - using `text-sm`
- **Color:** `text-muted-foreground`
- **Hover Color:** `text-primary`
- **Line Spacing:** `0.5rem` (8px) - using `space-y-2`
- **Transition:** 200ms colors

### Trust Badges
- **Display:** Flex row, wrapped, centered
- **Badge Padding:** `0.75rem 1.5rem` (12px 24px) - using `px-6 py-3`
- **Badge Border Radius:** `0.5rem` (8px) - using `rounded-lg`
- **Badge Gap:** `1.5rem` (24px) - using `gap-6`
- **Badge Backgrounds:**
  - Organic Certified: `bg-green-500/10` with `border-green-500/30`
  - Safe for Pregnancy: `bg-primary/10` with `border-primary/30`
  - No Heat Damage: `bg-accent/10` with `border-accent/30`

### Social Icons
- **Icon Size:** `1.5rem` (24px) - using `h-6 w-6`
- **Container Size:** `2.5rem` (40px) - using `h-10 w-10`
- **Border Radius:** Full (circle)
- **Background:** `bg-primary/10`
- **Hover Background:** `bg-primary/20`
- **Icon Color:** `text-primary`

### Copyright Section
- **Padding Top:** `2rem` (32px) - using `pt-8`
- **Border Top:** `border-t border-border`
- **Font Size:** `0.875rem` (14px) - using `text-sm`
- **Color:** `text-muted-foreground`
- **Text Alignment:** Center

---

## 14. WhatsApp Chat Widget

**File:** `/components/WhatsAppChat.tsx`

### Dimensions
- **Widget Position:** Fixed bottom-right
- **Bottom Offset:** `1.5rem` (24px) - using `bottom-6`
- **Right Offset:** `1rem` mobile, `1.5rem` desktop - using `right-4 md:right-6`
- **Z-Index:** 40 (button), 50 (popup)

### Chat Button
- **Button Size:** `3.5rem` (56px) - using `h-14 w-14`
- **Border Radius:** Full (circle) - using `rounded-full`
- **Background:** `bg-green-500` gradient
- **Hover Background:** `bg-green-600`
- **Icon Size:** `1.75rem` (28px)
- **Icon Color:** White
- **Shadow:** `shadow-2xl`
- **Hover Scale:** 1.05

### Chat Popup
- **Width:** `340px` (21.25rem) - using `w-[340px]`
- **Position:** Fixed, bottom-right
- **Bottom Offset:** `6rem` (96px) - using `bottom-24` (above button)
- **Right Offset:** `1rem` mobile, `1.5rem` desktop - using `right-4 md:right-6`
- **Border Radius:** `1rem` (16px) - using `rounded-2xl`
- **Border:** `2px solid border`
- **Shadow:** `shadow-2xl`
- **Background:** `bg-background`

### Popup Header
- **Background:** `linear-gradient(to right, from-green-500, to-green-600)`
- **Padding:** `1rem` (16px) - using `p-4`
- **Text Color:** White

### Support Avatar
- **Size:** `3rem` (48px) - using `h-12 w-12`
- **Border Radius:** Full (circle)
- **Background:** White
- **Icon Size:** `1.5rem` (24px) - using `h-6 w-6`
- **Icon Color:** `text-green-500`

### Quick Reply Buttons
- **Button Padding:** `0.75rem 1rem` (12px 16px) - using `px-4 py-3`
- **Button Width:** Full width
- **Button Text Alignment:** Left
- **Button Border Radius:** `0.5rem` (8px) - using `rounded-lg`
- **Button Background:** `bg-background`
- **Button Border:** `border border-border`
- **Button Hover:** `bg-accent/50`
- **Button Gap:** `0.5rem` (8px) - using `space-y-2`

### Contact Button (Send WhatsApp)
- **Width:** Full width
- **Height:** Default button height
- **Background:** `bg-green-500`
- **Hover Background:** `bg-green-600`
- **Text Color:** White
- **Margin Top:** `1rem` (16px) - using `mt-4`

### Animations
- **Popup Entry:** opacity, y: 20px, scale: 0.95
- **Transition:** Spring (stiffness: 300, damping: 30)
- **Backdrop (Mobile):** Black 20% opacity

### Phone Number Format
- **Expected Format:** Country code + number (e.g., 31612345678)
- **No "+" symbol in format**

---

## 15. Shopping Cart

**File:** `/components/ShoppingCart.tsx`

### Dimensions
- **Container Max Width:** `64rem` (1024px) - using `max-w-4xl`
- **Horizontal Padding:** `1rem` (16px) - using `px-4`
- **Vertical Padding:** `2rem` (32px) - using `py-8`

### Empty Cart
- **Card Padding:** `3rem` (48px) - using `p-12`
- **Icon Size:** `4rem` (64px) - using `h-16 w-16`
- **Icon Color:** `text-muted-foreground`
- **Text Alignment:** Center

### Cart Items
- **Item Spacing:** `1rem` (16px) - using `space-y-4`
- **Item Padding:** `1rem` (16px) - using `p-4`
- **Item Border:** `border border-border`
- **Item Border Radius:** `0.5rem` (8px) - using `rounded-lg`

### Product Image
- **Image Size:** `5rem` (80px) - using `h-20 w-20`
- **Border Radius:** `0.5rem` (8px) - using `rounded-lg`
- **Object Fit:** Cover

### Product Details
- **Product Name Font Size:** `1rem` (16px)
- **Product Name Font Weight:** 600 (semibold)
- **Price Font Size:** `1.125rem` (18px) - using `text-lg`
- **Price Font Weight:** 700 (bold)
- **Price Color:** `text-primary`

### Quantity Controls
- **Button Size:** `2rem` (32px) - using `h-8 w-8`
- **Button Border Radius:** `0.25rem` (4px) - using `rounded`
- **Quantity Display Width:** `3rem` (48px) - using `w-12`
- **Text Alignment:** Center

### Remove Button
- **Icon Size:** `1.25rem` (20px) - using `h-5 w-5`
- **Color:** `text-destructive`
- **Hover Background:** `bg-destructive/10`

### Summary Section
- **Background:** `bg-muted/30`
- **Padding:** `1.5rem` (24px) - using `p-6`
- **Border Radius:** `0.5rem` (8px) - using `rounded-lg`
- **Margin Top:** `1.5rem` (24px) - using `mt-6`

### Total Display
- **Font Size:** `1.5rem` (24px) - using `text-2xl`
- **Font Weight:** 700 (bold)
- **Color:** `text-foreground`

### Checkout Button
- **Width:** Full width
- **Height:** `3rem` (48px) - using `h-12`
- **Font Size:** `1.125rem` (18px) - using `text-lg`
- **Font Weight:** 600 (semibold)
- **Margin Top:** `1rem` (16px) - using `mt-4`

---

## 16. Hair Analysis Flow

**File:** `/components/HairAnalysisFlow.tsx`

### Dimensions
- **Container Max Width:** `64rem` (1024px) - using `max-w-4xl`
- **Top Padding:** `6rem` (96px) - using `pt-24` (accounts for fixed header)
- **Horizontal Padding:** `1rem` (16px) - using `px-4`
- **Vertical Padding:** `2rem` (32px) - using `py-8`

### Step Indicator
- **Width:** Full width
- **Padding:** `1.5rem 1rem` (24px 16px) - using `py-6 px-4`
- **Max Width:** `48rem` (768px) - using `max-w-3xl`

### Hair Type Selector
- **Grid Layout:** 2-3 columns responsive
- **Card Gap:** `1rem` (16px) - using `gap-4`
- **Card Padding:** `1.5rem` (24px) - using `p-6`
- **Card Border Radius:** `0.75rem` (12px) - using `rounded-lg`
- **Selected Card Border:** `2px solid primary`
- **Selected Card Background:** `bg-primary/10`

### Hair Type Images
- **Image Size:** `8rem` (128px) - using `h-32 w-32`
- **Border Radius:** Full (circle)
- **Object Fit:** Cover
- **Margin:** Auto (centered)

### Photo Upload
- **Upload Area Min Height:** `12rem` (192px) - using `min-h-[12rem]`
- **Upload Area Padding:** `2rem` (32px) - using `p-8`
- **Upload Area Border:** `2px dashed border`
- **Upload Area Border Radius:** `0.75rem` (12px) - using `rounded-lg`
- **Upload Area Background:** `bg-muted/20`
- **Hover Background:** `bg-muted/40`

### Photo Preview
- **Preview Size:** `10rem` (160px) - using `h-40 w-40`
- **Preview Border Radius:** `0.5rem` (8px) - using `rounded-lg`
- **Preview Object Fit:** Cover

### Analysis Results
- **Card Padding:** `2rem` (32px) - using `p-8`
- **Card Border Radius:** `1rem` (16px) - using `rounded-2xl`
- **Card Background:** `bg-card`
- **Card Border:** `border border-border`

### Warning/Info Boxes
- **Alert Padding:** `1rem` (16px) - using `p-4`
- **Alert Border Left Width:** `4px` - using `border-l-4`
- **Alert Border Radius:** `0.5rem` (8px) - using `rounded-lg`
- **Warning Background:** `bg-amber-50`
- **Warning Border:** `border-amber-400`
- **Success Background:** `bg-green-50`
- **Success Border:** `border-green-500`
- **Error Background:** `bg-red-50`
- **Error Border:** `border-red-500`

### Product Recommendations
- **Product Card Padding:** `1.5rem` (24px) - using `p-6`
- **Product Image Size:** `6rem` (96px) - using `h-24 w-24`
- **Price Font Size:** `1.5rem` (24px) - using `text-2xl`
- **Price Font Weight:** 700 (bold)

### Instructions Modal
- **Modal Max Width:** `64rem` (1024px) - using `max-w-4xl`
- **Modal Max Height:** `90vh` - using `max-h-[90vh]`
- **Modal Padding:** `1.5rem` (24px) - using `p-6`
- **Modal Border Radius:** `1rem` (16px) - using `rounded-2xl`
- **Modal Background:** `bg-card`
- **Modal Shadow:** Large shadow
- **Backdrop:** Black 50% opacity

### Navigation Buttons
- **Back Button:** Ghost variant
- **Next Button:** Primary variant
- **Button Height:** Default (2.5rem/40px)
- **Button Gap:** `0.75rem` (12px) - using `gap-3`
- **Button Margin Top:** `1.5rem` (24px) - using `mt-6`

---

## Global Component Patterns

### Motion/Animation Standards
- **Default Transition Duration:** 200ms
- **Slow Transition:** 300ms
- **Fast Transition:** 150ms
- **Easing Function:** cubic-bezier(0.4, 0, 0.2, 1)
- **Spring Stiffness:** 300
- **Spring Damping:** 30
- **Scroll Trigger Start:** "top 75%" (standard)

### Card Hover Effects
- **Transform:** translateY(-8px)
- **Scale:** 1.02
- **Shadow:** Increase from base to lg/xl
- **Transition:** 300ms ease

### Button Interactions
- **Hover Scale:** 1.05
- **Tap Scale:** 0.95
- **Transition:** Spring animation
- **Focus Ring:** 3px with 50% opacity

### Responsive Breakpoints Usage
- **Mobile First:** Default styles for mobile
- **Tablet:** `md:` prefix (768px)
- **Desktop:** `lg:` prefix (1024px)
- **Large Desktop:** `xl:` prefix (1280px)

### Common Spacing Patterns
- **Section Vertical Padding:** 4rem mobile, 6rem desktop
- **Card Internal Padding:** 1.5rem to 2rem
- **Element Margin Bottom:** 1rem to 1.5rem
- **Grid Gaps:** 1rem to 2rem depending on content

### Common Max Widths
- **Full Content:** max-w-7xl (1280px)
- **Standard Content:** max-w-6xl (1536px)
- **Reading Content:** max-w-4xl (1024px)
- **Narrow Content:** max-w-3xl (896px)
- **Form Content:** max-w-2xl (672px)

---

## Notes

1. **All measurements use Tailwind's spacing scale** which is based on 0.25rem (4px) increments
2. **Responsive design** follows mobile-first approach
3. **Animations** use Motion (Framer Motion) and GSAP libraries
4. **Colors** reference design tokens from `design-tokens.json`
5. **Typography** follows the system defined in `globals.css`
6. **All h2 elements** are uppercase, bold, with 0.02em letter spacing
7. **Focus states** use consistent ring styling for accessibility
8. **Images** use ImageWithFallback component for error handling
9. **Icons** primarily from lucide-react library
10. **Currency** is always EUR (€) with range €165-€375

---

**Document Version:** 1.0.0  
**Last Updated:** October 23, 2025  
**Maintained By:** Quality Hair Development Team
