👋 This is a small API for inviting people to the Hack Club Slack.

## How to use

Make a POST request to `/api/invite`. Required parameters are `key`, `email`, and `name`.

The `key` is available in the Hack Club 1Password. If you don't have access to 1Password but need the key, DM `@matthew`.

By default, the user will be invited as a multi-channel guest in in `#lobby`. If you want to make them a full member and also invite them to another channel (for example, if they're a club leader), you can add the optional parameters `fullmember: true` and `channel`.

## Examples

### Multi-channel guest

```js
fetch('https://slack-invite-service.hackclub.dev/api/invite', {
  method: 'POST',
  body: JSON.stringify({
    key: process.env.KEY,
    email: 'toad@hackclub.com',
    name: 'Toad NoLastName'
  })
}).then(r => r.json())
```

### Full member

```js
fetch('https://slack-invite-service.hackclub.dev/api/invite', {
  method: 'POST',
  body: JSON.stringify({
    key: process.env.KEY,
    email: 'toad@hackclub.com',
    name: 'Toad NoLastName',
    fullmember: true,
    channel: 'C4RN4PLLW' // #westlafayette
  })
}).then(r => r.json())
```

Right now, you can only invite someone to a channel other than `#lobby` if you make them a full member, because this is an MVP and I'm lazy. PRs welcome if you want to add more features/account for more scenarios.
