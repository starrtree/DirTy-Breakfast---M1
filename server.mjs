import { createServer } from 'node:http';
import { readFile, writeFile, access } from 'node:fs/promises';
import { extname, join } from 'node:path';

const PORT = process.env.PORT || 3000;
const ROOT = process.cwd();
const DB_PATH = join(ROOT, 'api', 'submissions.json');

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

async function ensureDb() {
  try { await access(DB_PATH); }
  catch { await writeFile(DB_PATH, '[]\n'); }
}

async function handleSubscribe(req, res) {
  let raw = '';
  req.on('data', chunk => raw += chunk);
  req.on('end', async () => {
    try {
      const body = JSON.parse(raw || '{}');
      if (!body.name || !body.email) throw new Error('invalid');

      const entries = JSON.parse(await readFile(DB_PATH, 'utf8'));
      entries.push({ ...body, createdAt: new Date().toISOString() });
      await writeFile(DB_PATH, JSON.stringify(entries, null, 2) + '\n');

      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    } catch {
      res.writeHead(400, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Invalid payload' }));
    }
  });
}

createServer(async (req, res) => {
  await ensureDb();

  if (req.method === 'POST' && req.url === '/api/subscribe') {
    return handleSubscribe(req, res);
  }

  const requested = req.url === '/' ? '/index.html' : req.url;
  const safePath = requested.replace(/\.\./g, '');
  const filePath = join(ROOT, safePath);

  try {
    const content = await readFile(filePath);
    const type = mime[extname(filePath)] || 'application/octet-stream';
    res.writeHead(200, { 'content-type': type });
    res.end(content);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
}).listen(PORT, () => {
  console.log(`Dirty Breakfast static/full-stack server listening on http://localhost:${PORT}`);
});
