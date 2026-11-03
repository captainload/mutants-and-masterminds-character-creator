/**
 * Lightweight Local Web Server for Mutants & Masterminds 3e Character Creator
 * Zero external dependencies. Uses Node.js standard library with ES Modules.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);

  // Handle GitHub CLI auth status endpoint for local admin console
  if (reqPath === '/api/github-cli-auth') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    try {
      // Find gh.exe or gh in PATH / WinGet
      const wingetGh = 'C:\\Users\\admin\\AppData\\Local\\Microsoft\\WinGet\\Packages\\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\\bin\\gh.exe';
      const ghBin = fs.existsSync(wingetGh) ? `"${wingetGh}"` : 'gh';
      const token = execSync(`${ghBin} auth token`, { encoding: 'utf8', timeout: 3000 }).trim();
      const status = execSync(`${ghBin} auth status`, { encoding: 'utf8', timeout: 3000 });
      let username = 'captainload';
      const userMatch = status.match(/account\s+([a-zA-Z0-9_-]+)/i);
      if (userMatch) username = userMatch[1];

      res.writeHead(200);
      res.end(JSON.stringify({
        available: true,
        authenticated: true,
        username,
        token,
        projectOwner: 'captainload',
        repo: 'captainload/mutants-and-masterminds-character-creator'
      }));
    } catch (err) {
      res.writeHead(200);
      res.end(JSON.stringify({
        available: false,
        authenticated: false,
        error: err.message
      }));
    }
    return;
  }

  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const fullPath = path.join(PUBLIC_DIR, reqPath);

  // Security check: ensure path stays within PUBLIC_DIR
  if (!fullPath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Access Denied');
    return;
  }

  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });

    const stream = fs.createReadStream(fullPath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🦸 Mutants & Masterminds 3e Character Creator Active!`);
  console.log(`🌐 Local Web Server: http://localhost:${PORT}`);
  console.log(`🎯 Optimized for 1080px+ displays with Discord Echo`);
  console.log(`====================================================`);
});
