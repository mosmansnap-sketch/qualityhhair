# Quality Hair - Animation Documentation

**Project:** Quality Hair - Organic Keratin Treatment E-commerce  
**Version:** 1.0.0  
**Last Updated:** October 23, 2025  
**Animation Libraries:** GSAP 3.x, Motion (Framer Motion), CSS Transitions

---

## Table of Contents

1. [Page Load Animations](#1-page-load-animations)
2. [Page Transitions](#2-page-transitions)
3. [Scroll Animations (GSAP ScrollTrigger)](#3-scroll-animations-gsap-scrolltrigger)
4. [Hover Animations](#4-hover-animations)
5. [Click/Tap Animations](#5-clicktap-animations)
6. [Modal & Dialog Animations](#6-modal--dialog-animations)
7. [Carousel & Auto-Advancing Content](#7-carousel--auto-advancing-content)
8. [Loading States](#8-loading-states)
9. [Background Animations](#9-background-animations)
10. [Navigation Animations](#10-navigation-animations)
11. [Form Interactions](#11-form-interactions)
12. [Custom Component Animations](#12-custom-component-animations)

---

## 1. Page Load Animations

### Hero Section Entry (GSAP Timeline)
**File:** `/components/HeroPage.tsx`

```javascript
timeline
  .from(badgeRef, {
    y: 30,
    opacity: 0,
    duration: 0.8,
  })
  .from(headlineRef, {
    y: 50,
    opacity: 0,
    duration: 1,
  }, "-=0.5")
  .from(subheadlineRef, {
    y: 30,
    opacity: 0,
    duration: 0.8,
  }, "-=0.6")
  .from(ctaRef, {
    y: 20,
    opacity: 0,
    duration: 0.6,
  }, "-=0.4")
```

**Specifications:**
- **Type:** Staggered fade + slide up
- **Easing:** `power3.out` (cubic-bezier equivalent: 0.215, 0.61, 0.355, 1)
- **Total Duration:** ~2.5 seconds (with overlaps)
- **Elements:**
  - Badge: 800ms, translateY(30px) → 0
  - Headline: 1000ms, translateY(50px) → 0, delay: -500ms
  - Subheadline: 800ms, translateY(30px) → 0, delay: -600ms
  - CTA Buttons: 600ms, translateY(20px) → 0, delay: -400ms
- **Opacity:** 0 → 1 for all elements

### Header Entry (Motion/Framer Motion)
**File:** `/components/Header.tsx`

```javascript
<motion.header
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
>
```

**Specifications:**
- **Type:** Spring slide down
- **Initial State:** translateY(-100px), off-screen
- **Final State:** translateY(0)
- **Transition:**
  - Type: Spring physics
  - Stiffness: 300
  - Damping: 30
  - Duration: ~600-800ms (calculated by spring)

### Logo Animations (GSAP)
**File:** `/components/Header.tsx`

**Floating Animation:**
```javascript
gsap.to(logoRef, {
  y: -2,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
})
```

**Specifications:**
- **Type:** Continuous floating (infinite loop)
- **Duration:** 2 seconds per cycle
- **Distance:** 2px up and down
- **Easing:** `power1.inOut` (ease-in-out)
- **Repeat:** Infinite with yoyo (reverses)

**Glow Pulse:**
```javascript
gsap.to(logoImg, {
  filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.6))',
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
})
```

**Specifications:**
- **Type:** Filter animation (glow pulse)
- **Duration:** 2 seconds per cycle
- **Filter:** drop-shadow from 8px to 12px blur
- **Color:** rgba(251, 191, 36, 0.6) - Amber glow
- **Repeat:** Infinite with yoyo

---

## 2. Page Transitions

### Modal Overlays (Radix UI)
**Files:** Various UI components (`dialog.tsx`, `sheet.tsx`, `alert-dialog.tsx`)

**Overlay Fade In/Out:**
```css
data-[state=open]:animate-in 
data-[state=closed]:animate-out 
data-[state=closed]:fade-out-0 
data-[state=open]:fade-in-0
```

**Specifications:**
- **Type:** Fade
- **Duration:** 200ms (default)
- **Easing:** ease-out (open), ease-in (close)
- **Opacity:** 0 → 1 (open), 1 → 0 (close)
- **Background:** rgba(0, 0, 0, 0.5)

### Dialog Content (Zoom + Fade)
```css
data-[state=closed]:zoom-out-95 
data-[state=open]:zoom-in-95
```

**Specifications:**
- **Type:** Scale + Fade
- **Duration:** 200ms
- **Scale:** 0.95 → 1 (open), 1 → 0.95 (close)
- **Opacity:** 0 → 1 (open), 1 → 0 (close)
- **Transform Origin:** Center
- **Easing:** cubic-bezier(0.16, 1, 0.3, 1) for open

### Sheet Slide Animations
```css
data-[state=closed]:slide-out-to-right 
data-[state=open]:slide-in-from-right
```

**Specifications:**
- **Type:** Slide
- **Duration:** 300ms (close), 500ms (open)
- **Direction:** From/to right, left, top, or bottom
- **Easing:** ease-in-out
- **Transform:** translateX(100%) → 0 (right/left)

### Mobile Menu (Motion)
**File:** `/components/Header.tsx`

```javascript
<motion.div
  initial={{ opacity: 0, y: -20, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: -20, scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
>
```

**Specifications:**
- **Type:** Fade + Slide + Scale
- **Initial:** opacity: 0, translateY(-20px), scale: 0.95
- **Animate:** opacity: 1, translateY(0), scale: 1
- **Exit:** Returns to initial state
- **Transition:** Spring (stiffness: 300, damping: 30)
- **Duration:** ~400-600ms

---

## 3. Scroll Animations (GSAP ScrollTrigger)

### Feature Cards Animation
**File:** `/components/HeroPage.tsx`

```javascript
gsap.from(featureCards, {
  scrollTrigger: {
    trigger: featuresRef.current,
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out"
})
```

**Specifications:**
- **Trigger Point:** When top of section reaches 80% from viewport top
- **Type:** Staggered fade + slide up
- **Initial State:** translateY(60px), opacity: 0
- **Final State:** translateY(0), opacity: 1
- **Duration:** 800ms per card
- **Stagger:** 200ms between cards
- **Easing:** `power2.out` (cubic-bezier: 0.165, 0.84, 0.44, 1)

### Step Cards Animation
**File:** `/components/HeroPage.tsx`

```javascript
gsap.from(stepCards, {
  scrollTrigger: {
    trigger: stepsRef.current,
    start: "top 75%",
  },
  y: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.3,
  ease: "power3.out"
})
```

**Specifications:**
- **Trigger Point:** When top of section reaches 75% from viewport top
- **Type:** Staggered fade + slide up
- **Initial State:** translateY(80px), opacity: 0
- **Final State:** translateY(0), opacity: 1
- **Duration:** 1000ms per card
- **Stagger:** 300ms between cards
- **Easing:** `power3.out`

### Pricing Cards Animation
**File:** `/components/PricingSection.tsx`

```javascript
gsap.from(pricingCards, {
  scrollTrigger: {
    trigger: cardsRef.current,
    start: "top 75%",
  },
  y: 60,
  opacity: 0,
  scale: 0.95,
  duration: 0.8,
  stagger: 0.12,
  ease: "power3.out"
})
```

**Specifications:**
- **Trigger Point:** Top 75%
- **Type:** Fade + Slide + Scale
- **Initial State:** translateY(60px), opacity: 0, scale: 0.95
- **Final State:** translateY(0), opacity: 1, scale: 1
- **Duration:** 800ms per card
- **Stagger:** 120ms between cards
- **Easing:** `power3.out`

### Standard ScrollTrigger Configuration
All scroll animations share these common patterns:
- **Start Point:** "top 75%" or "top 80%"
- **Once:** true (animations play once)
- **Toggles:** Play on scroll down
- **Markers:** false (disabled in production)

---

## 4. Hover Animations

### Button Hover (Motion)
**File:** `/components/Header.tsx` and throughout

```javascript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400 }}
>
```

**Specifications:**
- **Type:** Scale
- **Hover Scale:** 1.05 (5% larger)
- **Tap Scale:** 0.95 (5% smaller)
- **Transition:** Spring (stiffness: 400, damping: 10)
- **Duration:** ~200-300ms
- **Transform Origin:** Center

### Card Hover Effect (CSS Class)
**File:** `/styles/globals.css`

```css
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

**Specifications:**
- **Type:** Translate + Scale + Shadow
- **Duration:** 300ms
- **Easing:** cubic-bezier(0.4, 0, 0.2, 1) (ease-out)
- **Transform:** translateY(-8px), scale(1.02)
- **Shadow:** From none to 0 20px 40px rgba(0, 0, 0, 0.15)
- **Cursor:** pointer

### Interactive Card Hover
**Multiple components (pricing, products, features)**

**Specifications:**
- **Type:** Lift + Shadow increase
- **Transform:** translateY(-4px) to translateY(-8px)
- **Scale:** 1.0 to 1.01 or 1.02
- **Shadow:** Increases from base to lg/xl
- **Duration:** 200-300ms
- **Easing:** cubic-bezier(0.4, 0, 0.2, 1)

### Link Hover (CSS Transition)
**File:** Component styles

```css
transition: color 200ms ease;
hover:text-primary
```

**Specifications:**
- **Type:** Color change
- **Duration:** 200ms
- **Easing:** ease
- **Properties:** color, text-decoration
- **Underline:** Optional underline on hover
- **Underline Offset:** 4px

### Navigation Item Hover
**File:** `/components/Header.tsx`

```javascript
className="hover:text-foreground hover:bg-accent/50 transition-all"
whileHover={{ scale: 1.05 }}
```

**Specifications:**
- **CSS Transition:** all 200ms
- **Motion Scale:** 1.05
- **Background:** accent/50 opacity
- **Text Color:** Changes to foreground
- **Border Radius:** rounded-lg maintained

---

## 5. Click/Tap Animations

### Button Tap (Motion)
```javascript
whileTap={{ scale: 0.95 }}
```

**Specifications:**
- **Type:** Scale down
- **Scale:** 0.95 (95% of original size)
- **Duration:** Instantaneous with spring
- **Stiffness:** 400
- **Damping:** 10
- **Visual Feedback:** Press effect

### Active Button State (CSS)
```css
active:scale-98
active:bg-primary/90
```

**Specifications:**
- **Type:** Scale + Background
- **Duration:** 0ms (immediate)
- **Scale:** 0.98
- **Background:** Slightly darker
- **Shadow:** Inset shadow optional

### Mobile Menu Item Tap
**File:** `/components/Header.tsx`

```javascript
whileTap={{ scale: 0.98 }}
```

**Specifications:**
- **Type:** Scale
- **Scale:** 0.98
- **Duration:** Spring animation
- **Visual:** Subtle press feedback

---

## 6. Modal & Dialog Animations

### Alert Dialog
**File:** `/components/ui/alert-dialog.tsx`

**Overlay:**
```css
data-[state=open]:fade-in-0
data-[state=closed]:fade-out-0
```

**Content:**
```css
data-[state=open]:zoom-in-95
data-[state=closed]:zoom-out-95
```

**Specifications:**
- **Overlay Duration:** 200ms
- **Content Duration:** 200ms
- **Overlay Opacity:** 0 ↔ 1
- **Content Scale:** 0.95 ↔ 1
- **Easing:** ease-out (in), ease-in (out)
- **Position:** Fixed center (50% 50%)

### Dropdown Menu
**File:** `/components/ui/dropdown-menu.tsx`

```css
data-[state=open]:zoom-in-95
data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2
```

**Specifications:**
- **Type:** Zoom + Directional Slide
- **Duration:** 200ms
- **Scale:** 0.95 → 1
- **Slide Distance:** 2px (8px actual)
- **Easing:** cubic-bezier(0.16, 1, 0.3, 1)
- **Transform Origin:** Based on side

### Popover
**File:** `/components/ui/popover.tsx`

**Specifications:**
- **Entry:** fade-in + zoom-in-95
- **Exit:** fade-out + zoom-out-95
- **Duration:** 200ms
- **Side Slides:** 2px offset based on positioning
- **Shadow:** Medium shadow (md)

### WhatsApp Chat Popup
**File:** `/components/WhatsAppChat.tsx`

```javascript
<motion.div
  initial={{ opacity: 0, y: 20, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 20, scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
>
```

**Specifications:**
- **Type:** Fade + Slide + Scale
- **Entry:** From bottom (y: 20px)
- **Duration:** ~400ms (spring calculated)
- **Backdrop (Mobile):** Fade to black/20

---

## 7. Carousel & Auto-Advancing Content

### Hero Image Carousel
**File:** `/components/HeroPage.tsx`

**Auto-Advance:**
```javascript
const imageInterval = setInterval(() => {
  setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
}, 5000);
```

**Transition Animation:**
```javascript
// New image in
gsap.fromTo(currentImage, 
  { opacity: 0, scale: 1.15 },
  { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }
);

// Previous image out
gsap.to(prevImage, {
  opacity: 0,
  duration: 1.5,
  ease: "power2.inOut"
}, 0);
```

**Specifications:**
- **Auto-Advance Interval:** 5000ms (5 seconds)
- **Transition Duration:** 2000ms (in), 1500ms (out)
- **Overlap:** Both animations start simultaneously (0 offset)
- **New Image:**
  - Start: opacity: 0, scale: 1.15 (zoomed in)
  - End: opacity: 1, scale: 1 (normal)
  - Easing: power2.out
- **Previous Image:**
  - Start: opacity: 1
  - End: opacity: 0
  - Easing: power2.inOut
- **Effect:** Ken Burns style zoom + crossfade

### Testimonials Carousel
**File:** `/components/HeroPage.tsx`

```javascript
const testimonialInterval = setInterval(() => {
  setCurrentSlide((prev) => (prev + 1) % testimonials.length);
}, 4000);
```

**Motion Animation:**
```javascript
<AnimatePresence mode="wait">
  <motion.div
    key={currentSlide}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.5 }}
  >
```

**Specifications:**
- **Auto-Advance Interval:** 4000ms (4 seconds)
- **Transition Duration:** 500ms
- **Type:** Fade + Scale
- **Entry/Exit:** opacity: 0 ↔ 1, scale: 0.95 ↔ 1
- **Mode:** Wait (exit completes before enter)
- **Easing:** Default ease

### Navigation Dots Animation
**Manual transitions via dots/arrows:**
- **Duration:** Same as auto (500ms)
- **Type:** Same fade + scale effect
- **Resets:** Auto-advance timer on manual interaction

---

## 8. Loading States

### Skeleton Loader
**File:** `/components/ui/skeleton.tsx`

```tsx
className="bg-accent animate-pulse rounded-md"
```

**Specifications:**
- **Animation:** Pulse (opacity oscillation)
- **Duration:** 2000ms (Tailwind default)
- **Easing:** cubic-bezier(0.4, 0, 0.6, 1)
- **Background:** var(--accent)
- **Opacity Range:** 1 → 0.5 → 1
- **Infinite:** Yes

### CSS Pulse Animation
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

**Usage:**
- Product cards loading
- Image placeholders
- Text content loading
- Form fields pending

### Button Loading State
**Specifications:**
- **Cursor:** wait
- **Opacity:** 0.7
- **Pointer Events:** none
- **Optional Spinner:** Rotating icon
- **Transition:** 200ms to loading state

### Spinner Animation (if used)
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**Specifications:**
- **Duration:** 1000ms
- **Easing:** linear
- **Infinite:** Yes
- **Element:** SVG or icon element

### Input Caret Blink
**File:** `/components/ui/input-otp.tsx`

```css
animate-caret-blink duration-1000
```

**Specifications:**
- **Duration:** 1000ms
- **Type:** Opacity blink
- **Infinite:** Yes
- **Visual:** Cursor blink in input

---

## 9. Background Animations

### Animated Particle Background
**File:** `/components/AnimatedBackground.tsx`

**Particle Movement:**
```javascript
speedX: Math.random() * 0.5 - 0.25
speedY: Math.random() * 0.5 - 0.25
```

**Specifications:**
- **Type:** Canvas-based particle system
- **Particle Count:** 50
- **Particle Size:** 1-4px
- **Speed:** -0.25 to 0.25 pixels per frame
- **Colors:** ['#6b5d52', '#b8a68f', '#d4c5b0', '#8b7355']
- **Opacity:** 0.1 to 0.4
- **Connection Lines:**
  - Max Distance: 150px
  - Line Width: 1px
  - Opacity: (1 - distance/150) * 0.1
  - Color: #b8a68f
- **Animation Loop:** requestAnimationFrame (~60fps)
- **Global Opacity:** 30% (applied to entire canvas)
- **Z-Index:** 0 (behind all content)
- **Pointer Events:** none

### Gradient Animations (Optional)
If using CSS gradients:
```css
background: linear-gradient(45deg, color1, color2);
background-size: 400% 400%;
animation: gradient 15s ease infinite;
```

**Specifications:**
- **Duration:** 15000ms
- **Easing:** ease
- **Infinite:** Yes
- **Background Size:** 400% for smooth transition

---

## 10. Navigation Animations

### Smooth Scroll to Section
**File:** `/components/Header.tsx`

```javascript
window.scrollTo({
  top: offsetPosition,
  behavior: "smooth"
});
```

**Specifications:**
- **Type:** Native smooth scroll
- **Duration:** Browser-determined (~500-1000ms)
- **Easing:** Browser default (usually ease-in-out)
- **Offset:** 100px (nav height compensation)

### Mobile Menu Stagger
**File:** `/components/Header.tsx`

```javascript
{navItems.map((item, index) => (
  <motion.button
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
  >
))}
```

**Specifications:**
- **Type:** Fade + Slide from left
- **Initial:** opacity: 0, translateX(-20px)
- **Animate:** opacity: 1, translateX(0)
- **Stagger Delay:** 50ms per item
- **Total Duration:** ~300ms for 6 items

### Accordion Icon Rotation
**File:** `/components/ui/accordion.tsx`

```css
[&[data-state=open]>svg]:rotate-180
transition-transform duration-200
```

**Specifications:**
- **Type:** Rotate
- **Duration:** 200ms
- **Angle:** 0° → 180°
- **Property:** transform
- **Easing:** Default ease

### Tab Indicator Slide
**Custom tab implementations:**

**Specifications:**
- **Type:** Translate X/Y
- **Duration:** 300ms
- **Easing:** cubic-bezier(0.4, 0, 0.2, 1)
- **Width:** Matches active tab
- **Color:** Primary border color

---

## 11. Form Interactions

### Input Focus Animation
**File:** `/components/ui/input.tsx`

```css
transition-[color,box-shadow]
focus-visible:ring-[3px]
```

**Specifications:**
- **Properties:** color, box-shadow
- **Duration:** 200ms (implicit)
- **Easing:** ease
- **Ring:**
  - Width: 3px
  - Color: rgba(184, 166, 143, 0.5)
  - Timing: Instant with transition
- **Border Color:** Changes to ring color

### Checkbox Check Animation
**File:** `/components/ui/checkbox.tsx`

```css
transition-shadow
data-[state=checked]:bg-primary
```

**Specifications:**
- **Type:** Background color + check mark
- **Duration:** 200ms
- **Properties:** background-color, shadow
- **Check Mark:** SVG path draw (instant)
- **Background:** Transparent → Primary
- **Easing:** ease

### Radio Button Select
**File:** `/components/ui/radio-group.tsx`

```css
transition-[color,box-shadow]
```

**Specifications:**
- **Type:** Border + inner dot appearance
- **Duration:** 200ms
- **Inner Dot:** Scale 0 → 1 or opacity 0 → 1
- **Border:** Border-color change
- **Easing:** ease

### Switch Toggle Animation
**File:** `/components/ui/switch.tsx`

```css
transition-all
data-[state=checked]:translate-x-[calc(100%-2px)]
```

**Specifications:**
- **Type:** Translate + Background
- **Duration:** 200ms
- **Easing:** ease
- **Thumb Movement:** translateX(0) → translateX(calc(100% - 2px))
- **Background:** Switch-background → Primary
- **Properties:** All (transform, background-color)

### Select Dropdown Open
**File:** `/components/ui/select.tsx`

```css
data-[state=open]:zoom-in-95
data-[side=bottom]:slide-in-from-top-2
```

**Specifications:**
- **Type:** Zoom + Directional slide
- **Duration:** 200ms
- **Scale:** 0.95 → 1
- **Slide:** Based on placement side
- **Shadow:** Appears with fade

---

## 12. Custom Component Animations

### Product Card Entry
**Various product sections**

**Specifications:**
- **Type:** Fade + Slide up + Scale
- **Initial:** opacity: 0, y: 40-60px, scale: 0.95-0.98
- **Final:** opacity: 1, y: 0, scale: 1
- **Duration:** 600-800ms
- **Stagger:** 100-200ms between cards
- **Trigger:** ScrollTrigger at 75% viewport

### Price Counter Animation
**If implemented for dynamic pricing**

**Specifications:**
- **Type:** Number increment
- **Duration:** 1000-2000ms
- **Easing:** ease-out
- **Frame Rate:** 60fps
- **Format:** Maintains currency symbol and decimals

### Image Zoom on Hover
**Product images, gallery items**

**Specifications:**
- **Type:** Scale
- **Duration:** 300ms
- **Scale:** 1.0 → 1.1
- **Easing:** ease-out
- **Overflow:** hidden (on container)
- **Transform Origin:** center

### Badge Pulse
**"New", "Limited", notification badges**

```css
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}
```

**Specifications:**
- **Duration:** 2000ms
- **Infinite:** Yes
- **Type:** Opacity + Scale
- **Easing:** ease-in-out

### Tooltip Fade In
**File:** `/components/ui/tooltip.tsx`

**Specifications:**
- **Type:** Fade + Scale
- **Duration:** 150ms
- **Initial:** opacity: 0, scale: 0.95
- **Final:** opacity: 1, scale: 1
- **Delay:** 200ms (hover delay)
- **Easing:** ease-in-out

### Progress Bar Fill
**File:** `/components/ui/progress.tsx`

```css
transition-all
transform: translateX(-${100 - value}%)
```

**Specifications:**
- **Type:** TranslateX
- **Duration:** Default transition (200-300ms)
- **Easing:** ease
- **Range:** -100% to 0%
- **Smooth:** Updates smoothly on value change

### Toast Notification Entry
**File:** `/components/ui/sonner.tsx` (Sonner library)

**Specifications:**
- **Type:** Slide + Fade
- **Entry:** From top or bottom
- **Duration:** 300ms
- **Exit:** 200ms
- **Slide Distance:** 20-40px
- **Position:** Fixed top-right or bottom-right

---

## Animation Performance Guidelines

### Best Practices Used:

1. **GPU-Accelerated Properties:**
   - transform (translate, scale, rotate)
   - opacity
   - filter (sparingly)

2. **Avoided Properties:**
   - width/height animations (use scale)
   - top/left/right/bottom (use transform)
   - margin/padding

3. **RequestAnimationFrame:**
   - Used for canvas animations
   - Maintains 60fps target

4. **Will-Change Optimization:**
   - Applied to frequently animated elements
   - Removed after animation completes

5. **Reduced Motion Support:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

---

## Animation Timing Reference

### Standard Durations:
- **Instant Feedback:** 0-100ms
- **Fast Transitions:** 150-200ms (buttons, links)
- **Standard Transitions:** 200-300ms (cards, modals)
- **Slow Transitions:** 300-500ms (page sections)
- **Entrance Animations:** 600-1000ms (hero, features)
- **Auto-Advance:** 4000-5000ms (carousels)

### Standard Easing Functions:
- **Ease:** cubic-bezier(0.25, 0.1, 0.25, 1) - General purpose
- **Ease-In:** cubic-bezier(0.42, 0, 1, 1) - Exit animations
- **Ease-Out:** cubic-bezier(0, 0, 0.58, 1) - Entrance animations
- **Ease-In-Out:** cubic-bezier(0.42, 0, 0.58, 1) - Symmetrical
- **Power2.out:** cubic-bezier(0.165, 0.84, 0.44, 1) - GSAP standard
- **Power3.out:** cubic-bezier(0.215, 0.61, 0.355, 1) - Smooth deceleration

### Spring Physics:
- **Stiffness 300, Damping 30:** Standard UI interactions
- **Stiffness 400, Damping 10:** Snappy button interactions
- **Stiffness 100, Damping 20:** Loose, bouncy feel

---

## Browser Compatibility

All animations are tested and work in:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 90+)

**Fallbacks:**
- CSS animations degrade gracefully
- GSAP provides cross-browser consistency
- Motion/Framer Motion handles vendor prefixes

---

## Notes

1. **All GSAP animations** are cleaned up on component unmount to prevent memory leaks
2. **ScrollTrigger instances** are killed when components unmount
3. **Motion animations** use AnimatePresence for exit animations
4. **Spring animations** use physics-based timing instead of fixed durations
5. **Stagger delays** create visual hierarchy in grouped animations
6. **Canvas animations** run at 60fps using requestAnimationFrame
7. **Auto-advancing carousels** clear intervals on unmount
8. **Focus animations** provide accessibility feedback
9. **Reduced motion** is respected for accessibility

---

**Document Version:** 1.0.0  
**Last Updated:** October 23, 2025  
**Maintained By:** Quality Hair Development Team
