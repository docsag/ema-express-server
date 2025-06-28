# EMA Express Server

This is a complete backend server for an Ecological Momentary Assessment (EMA) app, built with Node.js, Express, and Supabase.

## Features

- 🌐 RESTful API with Supabase Auth
- 🔐 Secure JWT authentication
- 📩 Push notification saving and broadcast via Expo
- 📊 Response history tracking per user
- 📤 CI/CD pipeline with GitHub Actions
- 🚀 Deployable to Render or Railway

## Project Structure

```
.
├── server.js
├── .env.example
├── routes/
│   ├── submit.js
│   ├── push.js
│   └── auth.js
├── utils/
│   └── authenticate.js
├── .github/
│   └── workflows/
│       └── deploy.yml
```

## Setup

1. Clone this repo:

```bash
git clone https://github.com/docsag/ema-express-server.git
cd ema-express-server
```

2. Create your `.env` file:

```bash
cp .env.example .env
```

Add your Supabase project URL and service role key.

3. Install dependencies:

```bash
npm install
```

4. Start server:

```bash
node server.js
```

## Deployment

### Render

- Deploy from GitHub
- Build Command: `npm install`
- Start Command: `node server.js`
- Add `.env` keys via dashboard

### Railway

- Connect GitHub repo
- Set `.env` variables via dashboard
- Auto-build and deploy

## CI/CD

This repo includes a GitHub Actions workflow:
- On push to `main`, it installs dependencies and optionally triggers Render deploy hook if configured.

To enable auto-deploy:
1. Enable deploy hooks in Render.
2. Add the hook URL as a GitHub Secret: `RENDER_DEPLOY_HOOK_URL`

## Observability

### Sentry (Backend Errors)

1. Create account at https://sentry.io
2. Get your DSN
3. Add to `server.js`:

```js
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'YOUR_SENTRY_DSN' });
```

4. Use in routes:

```js
Sentry.captureException(new Error('Issue occurred'));
```

### LogRocket (React Native App)

1. Install SDK in frontend
2. Add session capture

```js
import LogRocket from '@logrocket/react-native';
LogRocket.init('your-logrocket-id');
```

---

MIT License. Created for research-grade ecological momentary assessment apps.
