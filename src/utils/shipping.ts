// Shipping zone configuration and rate calculation

export type ShippingZone = 'sweden' | 'eu' | 'uk' | 'world';

export interface ShippingRate {
  zone: ShippingZone;
  rate: number;
  label: string;
}

// Shipping rates in EUR
export const SHIPPING_RATES: Record<ShippingZone, number> = {
  sweden: 12.00,
  eu: 30.00,
  uk: 30.00,
  world: 50.00,
};

// Free shipping threshold in EUR
export const FREE_SHIPPING_THRESHOLD = 500;

// Country code to zone mapping
const SWEDEN_COUNTRIES = ['SE'];
const UK_COUNTRIES = ['GB'];
const EU_COUNTRIES = [
  'AT', // Austria
  'BE', // Belgium
  'BG', // Bulgaria
  'HR', // Croatia
  'CY', // Cyprus
  'CZ', // Czech Republic
  'DK', // Denmark
  'EE', // Estonia
  'FI', // Finland
  'FR', // France
  'DE', // Germany
  'GR', // Greece
  'HU', // Hungary
  'IE', // Ireland
  'IT', // Italy
  'LV', // Latvia
  'LT', // Lithuania
  'LU', // Luxembourg
  'MT', // Malta
  'NL', // Netherlands
  'NO', // Norway
  'PL', // Poland
  'PT', // Portugal
  'RO', // Romania
  'SK', // Slovakia
  'SI', // Slovenia
  'ES', // Spain
];

// Get shipping zone from country code
export function getShippingZone(countryCode: string): ShippingZone {
  const code = countryCode.toUpperCase();
  
  if (SWEDEN_COUNTRIES.includes(code)) return 'sweden';
  if (UK_COUNTRIES.includes(code)) return 'uk';
  if (EU_COUNTRIES.includes(code)) return 'eu';
  return 'world';
}

// Get shipping rate for a country
export function getShippingRate(countryCode: string): number {
  const zone = getShippingZone(countryCode);
  return SHIPPING_RATES[zone];
}

// Calculate shipping cost (with free shipping threshold)
export function calculateShipping(countryCode: string, subtotal: number): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }
  return getShippingRate(countryCode);
}

// Get zone label for display
export function getZoneLabel(zone: ShippingZone): string {
  const labels: Record<ShippingZone, string> = {
    sweden: 'Sweden',
    eu: 'Europe',
    uk: 'United Kingdom',
    world: 'International',
  };
  return labels[zone];
}

// List of countries for dropdown
export interface CountryOption {
  code: string;
  name: string;
  zone: ShippingZone;
}

export const COUNTRIES: CountryOption[] = [
  // Sweden first
  { code: 'SE', name: 'Sweden', zone: 'sweden' },
  
  // Nordic/EU countries
  { code: 'DK', name: 'Denmark', zone: 'eu' },
  { code: 'FI', name: 'Finland', zone: 'eu' },
  { code: 'NO', name: 'Norway', zone: 'eu' },
  
  // UK
  { code: 'GB', name: 'United Kingdom', zone: 'uk' },
  
  // Rest of EU alphabetically
  { code: 'AT', name: 'Austria', zone: 'eu' },
  { code: 'BE', name: 'Belgium', zone: 'eu' },
  { code: 'BG', name: 'Bulgaria', zone: 'eu' },
  { code: 'HR', name: 'Croatia', zone: 'eu' },
  { code: 'CY', name: 'Cyprus', zone: 'eu' },
  { code: 'CZ', name: 'Czech Republic', zone: 'eu' },
  { code: 'EE', name: 'Estonia', zone: 'eu' },
  { code: 'FR', name: 'France', zone: 'eu' },
  { code: 'DE', name: 'Germany', zone: 'eu' },
  { code: 'GR', name: 'Greece', zone: 'eu' },
  { code: 'HU', name: 'Hungary', zone: 'eu' },
  { code: 'IE', name: 'Ireland', zone: 'eu' },
  { code: 'IT', name: 'Italy', zone: 'eu' },
  { code: 'LV', name: 'Latvia', zone: 'eu' },
  { code: 'LT', name: 'Lithuania', zone: 'eu' },
  { code: 'LU', name: 'Luxembourg', zone: 'eu' },
  { code: 'MT', name: 'Malta', zone: 'eu' },
  { code: 'NL', name: 'Netherlands', zone: 'eu' },
  { code: 'PL', name: 'Poland', zone: 'eu' },
  { code: 'PT', name: 'Portugal', zone: 'eu' },
  { code: 'RO', name: 'Romania', zone: 'eu' },
  { code: 'SK', name: 'Slovakia', zone: 'eu' },
  { code: 'SI', name: 'Slovenia', zone: 'eu' },
  { code: 'ES', name: 'Spain', zone: 'eu' },
  
  // World (common destinations)
  { code: 'US', name: 'United States', zone: 'world' },
  { code: 'CA', name: 'Canada', zone: 'world' },
  { code: 'AU', name: 'Australia', zone: 'world' },
  { code: 'NZ', name: 'New Zealand', zone: 'world' },
  { code: 'JP', name: 'Japan', zone: 'world' },
  { code: 'KR', name: 'South Korea', zone: 'world' },
  { code: 'CN', name: 'China', zone: 'world' },
  { code: 'SG', name: 'Singapore', zone: 'world' },
  { code: 'AE', name: 'United Arab Emirates', zone: 'world' },
  { code: 'CH', name: 'Switzerland', zone: 'world' },
  { code: 'BR', name: 'Brazil', zone: 'world' },
  { code: 'MX', name: 'Mexico', zone: 'world' },
  { code: 'IN', name: 'India', zone: 'world' },
  { code: 'ZA', name: 'South Africa', zone: 'world' },
];

// Get country name from code
export function getCountryName(countryCode: string): string {
  const country = COUNTRIES.find(c => c.code === countryCode.toUpperCase());
  return country?.name || countryCode;
}
