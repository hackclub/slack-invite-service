import fetch from 'node-fetch'

export default async function invite(req, res) {
  // params: key, email, name, fullmember, channel

  const {
    body: { key, email, name, fullmember, channel }
  } = req

  if (!key) {
    return res.status(403).json({
      error:
        'You must include a key. It\'s called "Slack invite service key" in 1Password'
    })
  }

  if (key !== process.env.KEY) {
    return res.status(403).json({ error: 'Incorrect Slack invite service key' })
  }

  if (req.method === 'POST') {
    const params = [
      `email=${email}`,
      `token=${process.env.SLACK_LEGACY_TOKEN}`,
      `real_name=${name}`,
      `restricted=${fullmember ? 'false' : 'true'}`,
      `channels=C74HZS5A5${fullmember ? ',' + channel : ''}`,
      `resend=true`
    ].join('&')

    const url = `https://slack.com/api/users.admin.invite?${params}`
    await fetch(url, { method: 'POST' })
      .then((r) => r.json())
      .then((r) => console.log('Slack response', r))

    res
      .status(200)
      .json({ status: 'success', message: "You've been invited to Slack!" })
  } else {
    return res.status(405).json({ error: 'Method not allowed, use POST' })
  }
}
