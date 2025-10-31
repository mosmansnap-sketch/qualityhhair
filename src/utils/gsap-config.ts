import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins once at app level
let isRegistered = false;

export function initializeGSAP() {
  if (!isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
    console.log('✅ GSAP ScrollTrigger plugin registered');
  }
}

export { gsap, ScrollTrigger };