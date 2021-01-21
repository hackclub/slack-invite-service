export default async (req, res) => {
  const data = req.body || {}
  if (!data.key) {
    return res.status(403).json({ error: `You must include a key. It's called "Slack invite service key" in 1Password`})
  }
  if (data.key && data.key !== process.env.KEY) {
    return res.status(403).json({ error: `Incorrect Slack invite service key`})
  }

  if (req.method === 'POST') {
    let params
    if (data.fullmember) {
      params = [
        `email:${data.email}`,
        `token=${process.env.SLACK_LEGACY_TOKEN}`,
        `real_name=${data.name}`,
        `restricted=false`,
        `channels=C74HZS5A5,${data.channel}`,
        `resend=true`
      ].join('&')
    } else {
      params = [
        `email=${data.email}`,
        `token=${process.env.SLACK_LEGACY_TOKEN}`,
        `real_name=${data.name}`,
        `restricted=true`,
        `channels=C74HZS5A5`, // #lobby
        `resend=true`
      ].join('&') 
    }

    const url = `https://slack.com/api/users.admin.invite?${params}`
    await fetch(url, { method: 'POST' })
      .then(r => r.json())
      .then(r => console.log('Slack response', r))

    res.json({ status: 'success', message: `You've been invited to Slack!` })
  } else {
    return res.status(405).json({ error: 'Method not allowed, use POST'})
  }
}