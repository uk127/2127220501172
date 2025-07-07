import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import loggerMiddleware from './loggerMiddleware.js';

const app = express();
const PORT = 5000;

const urlDatabase = new Map();

app.use(cors());
app.use(bodyParser.json());
app.use(loggerMiddleware);

function generateShortcode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code;
  do {
    code = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  } while (urlDatabase.has(code));
  return code;
}

app.get('/', (req, res) => {
  res.send('Server is running');
});


app.post('/shorten', (req, res) => {
  const { url, validity, customCode } = req.body;
  const expiry = Date.now() + ((validity || 30) * 60 * 1000);
  const code = customCode || generateShortcode();

  if (customCode && urlDatabase.has(customCode)) {
    return res.status(409).json({ error: 'Custom shortcode already in use' });
  }

  urlDatabase.set(code, { url, expiry });
  res.json({ shortUrl: `http://localhost:5173/${code}` });
});

app.get('/lookup/:code', (req, res) => {
  const code = req.params.code;
  const entry = urlDatabase.get(code);

  if (!entry || Date.now() > entry.expiry) {
    return res.status(404).json({ error: 'URL expired or not found' });
  }

  res.json({ url: entry.url });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
