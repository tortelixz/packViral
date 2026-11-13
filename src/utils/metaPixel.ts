// Meta Ads Pixel & LowTrack Attribution Integration
export const META_PIXEL_ID = '1449033993266566';

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
    pixelId?: string;
  }
}

interface EventData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  [key: string]: any;
}

export async function trackMetaEvent(
  eventName: string,
  data?: EventData
) {
  // Fire Browser Pixel if fbq is available on window
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', eventName, data || {});
    } catch (e) {
      console.warn('Meta Pixel track warning:', e);
    }
  }
}

export function trackPageView() {
  trackMetaEvent('PageView');
}

export function trackViewContent(contentName: string, value?: number) {
  trackMetaEvent('ViewContent', {
    content_name: contentName,
    value: value || 19.00,
    currency: 'BRL'
  });
}

export function trackInitiateCheckout(contentName: string, value: number) {
  trackMetaEvent('InitiateCheckout', {
    content_name: contentName,
    value,
    currency: 'BRL',
    content_type: 'product'
  });
}

export function getCheckoutUrl(baseUrl: string): string {
  if (typeof window === 'undefined') return baseUrl;

  try {
    const currentParams = new URLSearchParams(window.location.search);
    if (!currentParams.toString()) return baseUrl;

    const urlObj = new URL(baseUrl);
    currentParams.forEach((val, key) => {
      urlObj.searchParams.set(key, val);
    });

    if (!urlObj.searchParams.has('src') && urlObj.searchParams.has('utm_source')) {
      urlObj.searchParams.set('src', urlObj.searchParams.get('utm_source') || '');
    }
    if (!urlObj.searchParams.has('sck') && urlObj.searchParams.has('utm_campaign')) {
      urlObj.searchParams.set('sck', urlObj.searchParams.get('utm_campaign') || '');
    }

    return urlObj.toString();
  } catch {
    return baseUrl;
  }
}
