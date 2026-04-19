/**
 * National subscriber number (digits only, no leading 0) length bounds after country code.
 * Ranges follow common mobile patterns; adjust if you add landline-specific rules.
 */
export type PhoneCountry = { id: string; name: string; dial: string; nsnMin: number; nsnMax: number };

const RAW: PhoneCountry[] = [
  { id: 'AF', name: 'Afghanistan', dial: '+93', nsnMin: 9, nsnMax: 9 },
  { id: 'AL', name: 'Albania', dial: '+355', nsnMin: 9, nsnMax: 9 },
  { id: 'DZ', name: 'Algeria', dial: '+213', nsnMin: 9, nsnMax: 9 },
  { id: 'AR', name: 'Argentina', dial: '+54', nsnMin: 10, nsnMax: 11 },
  { id: 'AU', name: 'Australia', dial: '+61', nsnMin: 9, nsnMax: 9 },
  { id: 'AT', name: 'Austria', dial: '+43', nsnMin: 10, nsnMax: 13 },
  { id: 'BD', name: 'Bangladesh', dial: '+880', nsnMin: 10, nsnMax: 10 },
  { id: 'BE', name: 'Belgium', dial: '+32', nsnMin: 9, nsnMax: 9 },
  { id: 'BJ', name: 'Benin', dial: '+229', nsnMin: 8, nsnMax: 8 },
  { id: 'BR', name: 'Brazil', dial: '+55', nsnMin: 10, nsnMax: 11 },
  { id: 'BF', name: 'Burkina Faso', dial: '+226', nsnMin: 8, nsnMax: 8 },
  { id: 'CM', name: 'Cameroon', dial: '+237', nsnMin: 9, nsnMax: 9 },
  { id: 'CA', name: 'Canada', dial: '+1', nsnMin: 10, nsnMax: 10 },
  { id: 'CL', name: 'Chile', dial: '+56', nsnMin: 9, nsnMax: 9 },
  { id: 'CN', name: 'China', dial: '+86', nsnMin: 11, nsnMax: 11 },
  { id: 'CI', name: "Côte d'Ivoire", dial: '+225', nsnMin: 10, nsnMax: 10 },
  { id: 'DK', name: 'Denmark', dial: '+45', nsnMin: 8, nsnMax: 8 },
  { id: 'EG', name: 'Egypt', dial: '+20', nsnMin: 10, nsnMax: 10 },
  { id: 'ET', name: 'Ethiopia', dial: '+251', nsnMin: 9, nsnMax: 9 },
  { id: 'FI', name: 'Finland', dial: '+358', nsnMin: 9, nsnMax: 12 },
  { id: 'FR', name: 'France', dial: '+33', nsnMin: 9, nsnMax: 9 },
  { id: 'GM', name: 'Gambia', dial: '+220', nsnMin: 7, nsnMax: 7 },
  { id: 'GE', name: 'Georgia', dial: '+995', nsnMin: 9, nsnMax: 9 },
  { id: 'DE', name: 'Germany', dial: '+49', nsnMin: 10, nsnMax: 11 },
  { id: 'GH', name: 'Ghana', dial: '+233', nsnMin: 9, nsnMax: 9 },
  { id: 'GR', name: 'Greece', dial: '+30', nsnMin: 10, nsnMax: 10 },
  { id: 'IN', name: 'India', dial: '+91', nsnMin: 10, nsnMax: 10 },
  { id: 'ID', name: 'Indonesia', dial: '+62', nsnMin: 9, nsnMax: 12 },
  { id: 'IE', name: 'Ireland', dial: '+353', nsnMin: 9, nsnMax: 9 },
  { id: 'IL', name: 'Israel', dial: '+972', nsnMin: 9, nsnMax: 9 },
  { id: 'IT', name: 'Italy', dial: '+39', nsnMin: 9, nsnMax: 10 },
  { id: 'JP', name: 'Japan', dial: '+81', nsnMin: 10, nsnMax: 10 },
  { id: 'KE', name: 'Kenya', dial: '+254', nsnMin: 9, nsnMax: 9 },
  { id: 'MY', name: 'Malaysia', dial: '+60', nsnMin: 9, nsnMax: 10 },
  { id: 'MX', name: 'Mexico', dial: '+52', nsnMin: 10, nsnMax: 10 },
  { id: 'MA', name: 'Morocco', dial: '+212', nsnMin: 9, nsnMax: 9 },
  { id: 'NL', name: 'Netherlands', dial: '+31', nsnMin: 9, nsnMax: 9 },
  { id: 'NZ', name: 'New Zealand', dial: '+64', nsnMin: 8, nsnMax: 10 },
  { id: 'NG', name: 'Nigeria', dial: '+234', nsnMin: 10, nsnMax: 10 },
  { id: 'NO', name: 'Norway', dial: '+47', nsnMin: 8, nsnMax: 8 },
  { id: 'PK', name: 'Pakistan', dial: '+92', nsnMin: 10, nsnMax: 10 },
  { id: 'PH', name: 'Philippines', dial: '+63', nsnMin: 10, nsnMax: 10 },
  { id: 'PL', name: 'Poland', dial: '+48', nsnMin: 9, nsnMax: 9 },
  { id: 'PT', name: 'Portugal', dial: '+351', nsnMin: 9, nsnMax: 9 },
  { id: 'QA', name: 'Qatar', dial: '+974', nsnMin: 8, nsnMax: 8 },
  { id: 'RO', name: 'Romania', dial: '+40', nsnMin: 9, nsnMax: 9 },
  { id: 'RU', name: 'Russia', dial: '+7', nsnMin: 10, nsnMax: 10 },
  { id: 'RW', name: 'Rwanda', dial: '+250', nsnMin: 9, nsnMax: 9 },
  { id: 'SA', name: 'Saudi Arabia', dial: '+966', nsnMin: 9, nsnMax: 9 },
  { id: 'SN', name: 'Senegal', dial: '+221', nsnMin: 9, nsnMax: 9 },
  { id: 'SG', name: 'Singapore', dial: '+65', nsnMin: 8, nsnMax: 8 },
  { id: 'ZA', name: 'South Africa', dial: '+27', nsnMin: 9, nsnMax: 9 },
  { id: 'KR', name: 'South Korea', dial: '+82', nsnMin: 9, nsnMax: 10 },
  { id: 'ES', name: 'Spain', dial: '+34', nsnMin: 9, nsnMax: 9 },
  { id: 'SE', name: 'Sweden', dial: '+46', nsnMin: 9, nsnMax: 9 },
  { id: 'CH', name: 'Switzerland', dial: '+41', nsnMin: 9, nsnMax: 9 },
  { id: 'TZ', name: 'Tanzania', dial: '+255', nsnMin: 9, nsnMax: 9 },
  { id: 'TH', name: 'Thailand', dial: '+66', nsnMin: 9, nsnMax: 9 },
  { id: 'TG', name: 'Togo', dial: '+228', nsnMin: 8, nsnMax: 8 },
  { id: 'TR', name: 'Türkiye', dial: '+90', nsnMin: 10, nsnMax: 10 },
  { id: 'UG', name: 'Uganda', dial: '+256', nsnMin: 9, nsnMax: 9 },
  { id: 'UA', name: 'Ukraine', dial: '+380', nsnMin: 9, nsnMax: 9 },
  { id: 'AE', name: 'United Arab Emirates', dial: '+971', nsnMin: 9, nsnMax: 9 },
  { id: 'GB', name: 'United Kingdom', dial: '+44', nsnMin: 10, nsnMax: 10 },
  { id: 'US', name: 'United States', dial: '+1', nsnMin: 10, nsnMax: 10 },
  { id: 'VN', name: 'Vietnam', dial: '+84', nsnMin: 9, nsnMax: 9 },
  { id: 'ZM', name: 'Zambia', dial: '+260', nsnMin: 9, nsnMax: 9 },
  { id: 'ZW', name: 'Zimbabwe', dial: '+263', nsnMin: 9, nsnMax: 9 },
];

export const PHONE_COUNTRIES: PhoneCountry[] = [...RAW].sort((a, b) =>
  a.name.localeCompare(b.name, 'en'),
);

export const DEFAULT_PHONE_COUNTRY_ID = 'GH';

export function findCountryById(id: string): PhoneCountry | undefined {
  return PHONE_COUNTRIES.find((c) => c.id === id);
}

/** Digits only, strip leading zeros (national format habit). */
export function normalizeNationalDigits(input: string): string {
  let d = input.replace(/\D/g, '');
  while (d.startsWith('0')) d = d.slice(1);
  return d;
}

export function clampNationalDigits(digits: string, maxLen: number): string {
  return digits.slice(0, maxLen);
}

export function nationalLengthOk(digits: string, min: number, max: number): boolean {
  const n = digits.length;
  return n >= min && n <= max;
}

export function nationalLengthHint(c: PhoneCountry): string {
  return c.nsnMin === c.nsnMax ? `${c.nsnMax} digits` : `${c.nsnMin}–${c.nsnMax} digits`;
}

/** Raster flags (emoji regional indicators often fail on Windows). Uses flagcdn.com (`w20` / `w40`). */
export function countryFlagSrc(iso2: string, w: 20 | 40 = 40): string {
  return `https://flagcdn.com/w${w}/${iso2.toLowerCase()}.png`;
}
