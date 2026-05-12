require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ── POST /api ──────────────────────────────────────────────
app.post('/api', (req, res) => {
  const { id, name } = req.body;

  if (id === 'a1b2c3' && name === 'xyz') {
    return res.json({
      status: 'success',
      error:  'no error',
    });
  }

  return res.json({
    status: 'failure',
    error:  'invalid id or name',
  });
});

// ── Health check ───────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
