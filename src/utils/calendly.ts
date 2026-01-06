// Calendly popup integration
// Replace these URLs with your actual Calendly scheduling links

// TODO: Replace with your actual Calendly URLs after setting up your account
export const CALENDLY_URLS = {
  // 10-minute quick consultation for sizing questions
  quickConsultation: 'https://calendly.com/YOUR_USERNAME/10min-consultation',
  // 30-minute video guidance for application help
  videoGuidance: 'https://calendly.com/YOUR_USERNAME/30min-guidance',
};

// Declare Calendly on window for TypeScript
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

/**
 * Opens a Calendly popup widget
 * @param eventType - 'quickConsultation' or 'videoGuidance'
 */
export function openCalendlyPopup(eventType: keyof typeof CALENDLY_URLS) {
  const url = CALENDLY_URLS[eventType];
  
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url });
  } else {
    // Fallback to opening in new tab if widget not loaded
    console.warn('Calendly widget not loaded, opening in new tab');
    window.open(url, '_blank');
  }
}

