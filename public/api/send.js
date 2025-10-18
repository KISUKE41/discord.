export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const { message } = req.body;
    const webhook = 'https://discord.com/api/webhooks/…';
    const discordRes = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    });
    if (!discordRes.ok) {
      const text = await discordRes.text();
      console.error('Discord error:', discordRes.status, text);
      return res.status(500).json({ error: 'Failed to send to Discord', details: text });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
