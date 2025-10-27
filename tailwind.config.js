/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background Colors
        background: '#f5f1eb',
        'background-card': '#faf8f4',
        'background-popover': '#faf8f4',
        'background-input': '#ebe3d8',

        // Foreground Colors
        foreground: '#3d3027',
        'foreground-muted': '#7a6d5f',

        // Primary Colors
        primary: '#6b5d52',
        'primary-foreground': '#faf8f4',

        // Secondary Colors
        secondary: '#d4c5b0',
        'secondary-foreground': '#3d3027',

        // Accent Colors
        accent: '#b8a68f',
        'accent-foreground': '#3d3027',

        // Muted Colors
        muted: '#e8dfd4',
        'muted-foreground': '#7a6d5f',

        // Destructive Colors
        destructive: '#c55a4a',
        'destructive-foreground': '#faf8f4',

        // Border and Ring
        border: 'rgba(107, 93, 82, 0.15)',
        ring: '#b8a68f',

        // Status Colors
        success: '#22c55e',
        'success-light': '#dcfce7',
        'success-dark': '#166534',

        warning: '#f59e0b',
        'warning-light': '#fef3c7',
        'warning-dark': '#92400e',
        'warning-amber-50': '#fffbeb',
        'warning-amber-400': '#fbbf24',

        error: '#c55a4a',
        'error-light': '#fee2e2',
        'error-dark': '#991b1b',

        info: '#3b82f6',
        'info-light': '#dbeafe',
        'info-dark': '#1e40af',

        verified: '#eab308',

        // Neutral Colors
        'neutral-muted': '#e8dfd4',
        'neutral-muted-foreground': '#7a6d5f',
        'neutral-border': 'rgba(107, 93, 82, 0.15)',
        'neutral-switch': '#d4c5b0',

        // Chart Colors
        'chart-1': '#8b7355',
        'chart-2': '#a89680',
        'chart-3': '#6b5d52',
        'chart-4': '#d4c5b0',
        'chart-5': '#b8a68f',

        // Sidebar Colors
        'sidebar-background': '#faf8f4',
        'sidebar-foreground': '#3d3027',
        'sidebar-primary': '#6b5d52',
        'sidebar-primary-foreground': '#faf8f4',
        'sidebar-accent': '#e8dfd4',
        'sidebar-accent-foreground': '#3d3027',
        'sidebar-border': '#d4c5b0',
        'sidebar-ring': '#b8a68f',

        // Special Colors
        'special-ring': '#b8a68f',
        'special-input': 'transparent',

        // Gradients (as utility classes)
        'gradient-primary': 'linear-gradient(135deg, #6b5d52, #b8a68f)',
        'gradient-warm': 'linear-gradient(to right, #6b5d52, #b8a68f)',
        'gradient-shimmer': 'linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
        'gradient-glass': 'rgba(255, 255, 255, 0.1)',
      },
      borderRadius: {
        DEFAULT: '0.625rem',
        'none': '0px',
        'sm': '0.225rem',
        'md': '0.425rem',
        'lg': '0.625rem',
        'xl': '1.025rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      spacing: {
        // Custom spacing values from design tokens
        'tight': '0.5rem',
        'relaxed': '1.5rem',
        'loose': '2rem',
      },
      boxShadow: {
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(251,191,36,0.2)',
      },
      fontSize: {
        // Typography scale from design tokens
        'tiny': '0.75rem',
      },
      fontFamily: {
        'sans': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      },
      zIndex: {
        'whatsapp': '40',
        'header': '50',
      },
    },
  },
  plugins: [],
}