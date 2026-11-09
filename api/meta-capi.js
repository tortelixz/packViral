export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { 
      event_name, 
      event_id, 
      event_source_url, 
      value, 
      currency, 
      content_name, 
      fbp, 
      fbc 
    } = body;

    const rawIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').toString();
    const clientIp = rawIp.split(',')[0].trim();
    const userAgent = req.headers['user-agent'] || '';

    const pixelId = process.env.META_PIXEL_ID || '1449033993266566';
    const accessToken = process.env.META_CAPI_TOKEN || 'EAAd9XrlRU6MBS7fUFZB5oNvpAX0gDyspyiyvB1ZACYaTr3fTqpRlRKKdjvb6Vu8hZAwIkSyZCIeHx6SiaoyKpAHURxwGbePomZCT1x3ML2xsn96Yeuv0KUKaeJyD3e3TyBmdImiaL0ZAVfCXZAf31Y8bTrUvn9hMHw7MWCZC76BjD5iG7WPyn1pZAvSYiT7GcfwZDZD';

    const eventPayload = {
      event_name: event_name || 'PageView',
      event_time: Math.floor(Date.now() / 1000),
      event_id: event_id || `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      event_source_url: event_source_url || 'https://packverso.shop',
      action_source: 'website',
      user_data: {
        ...(clientIp ? { client_ip_address: clientIp } : {}),
        ...(userAgent ? { client_user_agent: userAgent } : {}),
        ...(fbp ? { fbp } : {}),
        ...(fbc ? { fbc } : {})
      },
      custom_data: {
        currency: currency || 'BRL',
        ...(typeof value === 'number' ? { value } : {}),
        ...(content_name ? { content_name } : {})
      }
    };

    const fbRes = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [eventPayload] })
    });

    const fbData = await fbRes.json();
    return res.status(fbRes.ok ? 200 : 400).json(fbData);
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Server error' });
  }
}
