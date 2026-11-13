// Meta Ads Pixel & Conversions API (CAPI) Integration

export const META_PIXEL_ID = '1449033993266566';
export const META_CAPI_TOKEN = 'EAAd9XrlRU6MBS7fUFZB5oNvpAX0gDyspyiyvB1ZACYaTr3fTqpRlRKKdjvb6Vu8hZAwIkSyZCIeHx6SiaoyKpAHURxwGbePomZCT1x3ML2xsn96Yeuv0KUKaeJyD3e3TyBmdImiaL0ZAVfCXZAf31Y8bTrUvn9hMHw7MWCZC76BjD5iG7WPyn1pZAvSYiT7GcfwZDZD';

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

// Read cookie by name
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : null;
}

// Generate Facebook Click ID (fbc) from URL query if cookie is not present
function getFbc(): string | null {
  const existingCookie = getCookie('_fbc');
  if (existingCookie) return existingCookie;

  if (typeof window !== 'undefined' && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get('fbclid');
    if (fbclid) {
      return `fb.1.${Date.now()}.${fbclid}`;
    }
  }
  return null;
}

// Generate unique event ID for deduplication between Pixel and CAPI
export function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
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

/**
 * Sends event both via Browser Pixel (fbq) and Conversions API (CAPI) with matching eventID.
 */
export async function trackMetaEvent(
  eventName: string,
  data?: EventData,
  customEventId?: string
) {
  const eventId = customEventId || generateEventId();
  const eventSourceUrl = typeof window !== 'undefined' ? window.location.href : 'https://packverso.shop';

  // 1. Fire Browser Pixel
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', eventName, data || {}, { eventID: eventId });
    } catch (e) {
      console.warn('Meta Pixel fbq track warning:', e);
    }
  }

  // 2. Fire Conversions API (CAPI)
  const fbp = getCookie('_fbp');
  const fbc = getFbc();
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';

  const payload = {
    event_name: eventName,
    event_id: eventId,
    event_source_url: eventSourceUrl,
    currency: data?.currency || 'BRL',
    value: data?.value,
    content_name: data?.content_name,
    fbp: fbp || undefined,
    fbc: fbc || undefined
  };

  try {
    // First try the serverless API proxy on Vercel
    const apiRes = await fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!apiRes.ok && apiRes.status !== 404) {
      // If serverless route is not deployed or fails, fallback to direct Graph API call
      throw new Error(`Proxy status ${apiRes.status}`);
    }
  } catch {
    // Direct Client-to-Graph API Fallback (CORS supported by Meta v21.0)
    try {
      const graphPayload = {
        data: [
          {
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId,
            event_source_url: eventSourceUrl,
            action_source: 'website',
            user_data: {
              client_user_agent: userAgent,
              ...(fbp ? { fbp } : {}),
              ...(fbc ? { fbc } : {})
            },
            custom_data: {
              currency: data?.currency || 'BRL',
              ...(typeof data?.value === 'number' ? { value: data.value } : {}),
              ...(data?.content_name ? { content_name: data.content_name } : {})
            }
          }
        ]
      };

      await fetch(`https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphPayload)
      });
    } catch (graphErr) {
      console.warn('Meta CAPI direct fallback notice:', graphErr);
    }
  }
}

// Standard Event Helpers
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

export function trackLead(contentName: string, value?: number) {
  trackMetaEvent('Lead', {
    content_name: contentName,
    value: value || 19.00,
    currency: 'BRL'
  });
}

export function trackCustom(eventName: string, data?: Record<string, any>) {
  trackMetaEvent(eventName, data);
}

/**
 * Appends current URL search parameters (UTMs, fbclid, etc.) to checkout links
 * ensuring Wiapy and UTMify receive full attribution parameters.
 */
export function getCheckoutUrl(baseUrl: string): string {
  if (typeof window === 'undefined') return baseUrl;

  try {
    const currentParams = new URLSearchParams(window.location.search);
    if (!currentParams.toString()) return baseUrl;

    const urlObj = new URL(baseUrl);
    currentParams.forEach((val, key) => {
      urlObj.searchParams.set(key, val);
    });

    // Gateway compatibility: ensure src & sck parameters are set if utm_source/utm_campaign exist
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

