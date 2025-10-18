export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;

  const webhook = 'https://discord.com/api/webhooks/ここにあなたのWebhookURLを貼る';

  const discordRes = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message })
  });

  if (discordRes.ok) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ error: 'Failed to send to Discord' });
  }
}
