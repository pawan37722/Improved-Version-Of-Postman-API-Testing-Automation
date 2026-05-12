# ApiTesting — JS API Test Runner

A full-stack API testing tool in LeetCode style, built with **React + Vite** (client) and **Node/Express** (server).

---

## Project Structure

```
api-tester/
├── .env                  ← environment variables (root)
├── .env.example          ← copy this to .env
├── vercel.json           ← Vercel deployment config
├── package.json          ← root scripts (runs both client + server)
│
├── client/               ← React + Vite frontend
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── index.jsx
│       ├── App.jsx
│       └── App.css
│
└── server/               ← Node/Express backend
    ├── index.js
    └── package.json
```

---

## Environment Variables

Copy `.env.example` to `.env` in the root:

```bash
cp .env.example .env
```

| Variable            | Default                   | Description                        |
|---------------------|---------------------------|------------------------------------|
| `PORT`              | `3000`                    | Express server port                |
| `VITE_API_BASE_URL` | `http://localhost:3000`   | Base URL used by the React client  |

> Vite only exposes variables prefixed with `VITE_` to the browser.

---

## Local Development

### 1. Install all dependencies

```bash
npm run install:all
```

This installs root, client, and server dependencies in one command.

### 2. Run both client + server together

```bash
npm run dev
```

- Server → `http://localhost:3000`
- Client → `http://localhost:5173`

### Or run separately

```bash
npm run dev:server   # Express on :3000
npm run dev:client   # Vite on :5173
```

---

## API Endpoint

### `POST /api`

Tests credential validation.

**Request body:**
```json
{
  "id": "a1b2c3",
  "name": "xyz"
}
```

**Success response:**
```json
{
  "status": "success",
  "error": "no error"
}
```

**Failure response:**
```json
{
  "status": "failure",
  "error": "invalid id or name"
}
```

### `GET /health`

Returns `{ "ok": true }` — used to verify the server is running.

---

## How the UI Works

### Fetch Template

Each test case shows a structured fetch template. Only the highlighted fields are editable:

```
const url = '[YOUR URL]';           ← editable
const data = { [YOUR BODY] };      ← editable (key:value pairs)
fetch(url, {
  method: '[METHOD]',              ← editable
  headers: {
    'Content-Type': 'application/json',   ← hardcoded
    [EXTRA HEADERS]                       ← editable
  },
  body: JSON.stringify(data)       ← hardcoded
})
```

### JSON Comparison

The tool uses **deep structural equality** to compare actual vs expected output:
1. Both sides are parsed with `JSON.parse()`
2. All keys are sorted alphabetically (recursively)
3. Re-serialized and compared as strings

This means **extra spaces, different indentation, and different key order all pass correctly**.

### Add Test Case

Clicking **+ Add Case** copies all data from the previous test case, so you can quickly create variants.

---

## Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
gh repo create my-api-tester --public --push
```

### 2. Import to Vercel

- Go to [vercel.com](https://vercel.com) → **Add New Project**
- Import your GitHub repo
- Set **Root Directory** to `/` (the root, not client or server)

### 3. Set Environment Variables in Vercel

In your Vercel project → **Settings → Environment Variables**, add:

| Key                  | Value                              |
|----------------------|------------------------------------|
| `PORT`               | `3000`                             |
| `VITE_API_BASE_URL`  | `https://your-project.vercel.app`  |

### 4. Deploy

Vercel auto-deploys on every push to `main`.

The `vercel.json` routes:
- `/api/*` → Express server
- `/health` → Express server
- `/*` → React client (static build)

---

## Scripts Reference

| Command              | Description                              |
|----------------------|------------------------------------------|
| `npm run dev`        | Run client + server together             |
| `npm run dev:client` | Run Vite dev server only                 |
| `npm run dev:server` | Run Express server only                  |
| `npm run build`      | Build React client for production        |
| `npm run start`      | Start Express server (production)        |
| `npm run install:all`| Install all dependencies (root+client+server) |

---

## Tech Stack

| Layer    | Tech                        |
|----------|-----------------------------|
| Frontend | React 18, Vite 5            |
| Backend  | Node.js, Express 4          |
| Styling  | Pure CSS (JetBrains Mono)   |
| Deploy   | Vercel                      |
| Config   | dotenv, .env                |
