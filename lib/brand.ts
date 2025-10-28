// lib/brand.ts
export const BRAND_LOGO_KEY = 'brandLogoUrl';
const FALLBACK = '/icon.png';

export function getBrandLogoUrl(): string {
  if (typeof window === 'undefined') return FALLBACK;
  try {
    const v = window.localStorage.getItem(BRAND_LOGO_KEY);
    return v && v.length > 0 ? v : FALLBACK;
  } catch {
    return FALLBACK;
  }
}
