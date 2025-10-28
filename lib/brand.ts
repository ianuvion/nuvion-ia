// lib/brand.ts
const LS_KEY = 'nuvion.brand.logoUrl';
const DEFAULT_LOGO = '/icon.png';

export function getBrandLogoUrl(): string {
  if (typeof window === 'undefined') return DEFAULT_LOGO;
  return localStorage.getItem(LS_KEY) || DEFAULT_LOGO;
}

export function setBrandLogoUrl(url: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LS_KEY, url);
  // Para que el Navbar se refresque sin F5
  window.dispatchEvent(new CustomEvent('brand:logo-updated'));
}

export function clearBrandLogo() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LS_KEY);
  window.dispatchEvent(new CustomEvent('brand:logo-updated'));
}
