export async function onRequest(context) {
  const GOOGLE_URL = 'https://script.google.com/macros/s/AKfycbynClqBPichmvo6AeX5YzVEpISaR73bNJE1Jroo6nsfHzaFj03P_CSb-6IHGjfn4rpN/exec';

  const { request } = context;

  if (request.method === 'POST') {
    const body = await request.text();
    try {
      const resp = await fetch(GOOGLE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body,
      });
      const text = await resp.text();
      return new Response(text, {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    } catch (e) {
      return new Response(JSON.stringify({ success: false, error: e.message }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  }

  if (request.method === 'GET') {
    try {
      const resp = await fetch(GOOGLE_URL);
      const text = await resp.text();
      return new Response(text, {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    } catch (e) {
      return new Response(JSON.stringify([]), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' },
    });
  }

  return new Response('Method not allowed', { status: 405 });
}
