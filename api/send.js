export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, userId } = req.body;

    const webhookUrl = 'https://discord.com/api/webhooks/あなたのURL';

    const payload = {
      content: `<@${userId}> ${message}`,
      allowed_mentions: {
        users: [userId]
      }
    };

    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!discordRes.ok) {
      const text = await discordRes.text();
      return res.status(500).json({ error: 'Discord Error', details: text });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
}
