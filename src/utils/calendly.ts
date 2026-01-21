// Calendly popup integration
export const CALENDLY_URLS = {
  // 10-minute quick consultation for sizing questions
  quickConsultation: 'https://calendly.com/s-aaara/30min',
  // 30-minute video guidance for application help
  videoGuidance: 'https://calendly.com/s-aaara/30min',
};

// Declare Calendly on window for TypeScript
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget: (options: { url: string; parentElement: HTMLElement | null }) => void;
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

