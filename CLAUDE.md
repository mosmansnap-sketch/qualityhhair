# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production (output in dist/)
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint on TypeScript files
npm run type-check   # Run TypeScript compiler without emitting files
```

### Testing
No test framework is currently configured. When implementing tests, consider Vitest + React Testing Library for unit tests and Playwright for E2E tests.

## Architecture Overview

### Technology Stack
- **Frontend Framework**: React 18.3.1 with TypeScript 5.6.3
- **Build Tool**: Vite 6.0.1 with SWC for fast compilation
- **Styling**: Tailwind CSS 4.0.0 with CSS variables for design tokens
- **Animation**: GSAP 3.12.5 + ScrollTrigger for scroll animations, Motion (Framer Motion) 10.18.0 for React animations
- **UI Components**: Radix UI primitives + Shadcn/ui component library (46 components)
- **Icons**: Lucide React 0.487.0
- **State Management**: React Context (LanguageContext) + local component state

### Project Structure
```
src/
├── App.tsx                    # Main application component with cart state management
├── main.tsx                   # Application entry point
├── components/                # React components
│   ├── HeroSection.tsx        # Main hero section with carousel
│   ├── HairAnalysisFlow.tsx   # Multi-step hair analysis wizard
│   ├── PricingSection.tsx     # Pricing tiers with GSAP animations
│   ├── Header.tsx             # Navigation header with language switcher
│   ├── WhatsAppChat.tsx       # WhatsApp integration component
│   ├── ui/                    # Shadcn/ui components (46 files)
│   └── figma/                 # Figma-specific components
├── contexts/
│   └── LanguageContext.tsx    # Multi-language support (EN, SV, SO)
└── styles/
    └── globals.css            # Global styles + Tailwind CSS
```

### Key Features Architecture

**Hair Analysis Flow**: Multi-step wizard that guides users through hair type selection, photo upload, and provides personalized product recommendations. Uses local state management and preset image analysis.

**Cart System**: Simple cart state managed in App.tsx with add/remove functionality and toast notifications using Sonner.

**Multi-language Support**: Context-based i18n system supporting English, Swedish, and Somali. Translations stored in LanguageContext.tsx.

**Animation System**:
- GSAP for scroll-triggered animations and complex timeline sequences
- Motion (Framer Motion) for interactive UI animations
- CSS transitions for hover states and simple interactions

**Component Architecture**:
- Functional components with TypeScript
- Props-based component communication
- Refs for DOM manipulation (especially for GSAP animations)
- Custom hooks pattern for reusable logic

### Design System
- **Color Palette**: Earthy organic theme (warm browns, soft beiges, muted golds)
- **Typography**: System font stack with defined scale (12px-72px)
- **Spacing**: Consistent spacing system (0px-128px)
- **Responsive**: Mobile-first with breakpoints at 640px, 1024px, 1440px

### Path Aliases
```
@/              → src/
@/components/   → src/components/
@/contexts/     → src/contexts/
@/styles/       → src/styles/
```

### Build Configuration
- **Output**: `dist/` directory
- **Chunking**: Vendor libraries split into separate chunks (React, animations, UI components, icons)
- **Optimization**: Terser minification, source maps disabled in production
- **Deployment**: Pre-configured for Netlify and Vercel with SPA routing

### Important Implementation Notes

1. **WhatsApp Integration**: Update phone number in `WhatsAppChat.tsx` before production
2. **Image Assets**: Currently uses Unsplash placeholders - replace with production assets
3. **Payment Processing**: Not implemented - needs Stripe/PayPal integration
4. **Backend Integration**: Pure frontend application - needs API endpoints for order processing
5. **Form Validation**: Uses React Hook Form but needs backend validation
6. **Analytics**: Not configured - add Google Analytics or similar for production

### Animation Guidelines
- Hero section: Staggered entrance animations using GSAP
- Scroll triggers: Feature cards and pricing sections animate on scroll
- Carousel effects: Auto-advancing with Ken Burns zoom effect (5-second intervals)
- Button interactions: Scale hover (1.05) and tap (0.95) effects using Motion
- Card hover: 300ms lift + shadow transitions

### Performance Considerations
- Code splitting implemented via Vite's manual chunks
- Images should be optimized and served in modern formats (WebP)
- GSAP animations use will-change CSS property appropriately
- React components use proper memoization patterns where needed