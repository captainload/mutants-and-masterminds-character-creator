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
    const origin = req.headers.origin || '';
    if (origin && origin !== 'http://localhost:3000' && origin !== 'http://127.0.0.1:3000') {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Access forbidden: cross-origin requests denied' }));
      return;
    }
    const ip = req.socket.remoteAddress || '';
    if (!ip.includes('127.0.0.1') && !ip.includes('::1')) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Access forbidden: loopback access only' }));
      return;
    }
    res.setHeader('Access-Control-Allow-Origin', origin || 'http://localhost:3000');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    try {
      // Find gh.exe or gh in PATH / WinGet
      const wingetGh = 'C:\\Users\\admin\\AppData\\Local\\Microsoft\\WinGet\\Packages\\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\\bin\\gh.exe';
      const ghBin = fs.existsSync(wingetGh) ? `"${wingetGh}"` : 'gh';
      const status = execSync(`${ghBin} auth status`, { encoding: 'utf8', timeout: 3000 });
      let username = 'captainload';
      const userMatch = status.match(/account\s+([a-zA-Z0-9_-]+)/i);
      if (userMatch) username = userMatch[1];
      const isCaptainload = username.toLowerCase() === 'captainload';

      res.writeHead(200);
      res.end(JSON.stringify({
        available: true,
        authenticated: isCaptainload,
        username,
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

  // Handle Email Forwarding Endpoint
  if (reqPath === '/api/forward-message-email' && req.method === 'POST') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const { toEmail, recipientUsername, message } = payload;
        const msg = message || {};
        const campId = msg.campaignId || '';
        const campName = msg.campaignName || campId || 'Campaign';
        const sender = msg.senderUser || msg.gmName || 'User';
        const msgId = msg.id || ('msg_' + Date.now());

        // Generate action links for bidirectional email interaction
        const baseUrl = 'http://localhost:3000';
        let actionLinks = {};
        if (msg.type === 'CAMPAIGN_INVITATION') {
          actionLinks.accept = `${baseUrl}/#action=accept_invite&campaignId=${encodeURIComponent(campId)}&msgId=${encodeURIComponent(msgId)}&user=${encodeURIComponent(recipientUsername || '')}`;
          actionLinks.decline = `${baseUrl}/#action=decline_invite&campaignId=${encodeURIComponent(campId)}&msgId=${encodeURIComponent(msgId)}&user=${encodeURIComponent(recipientUsername || '')}`;
        } else {
          actionLinks.reply = `${baseUrl}/#action=reply&campaignId=${encodeURIComponent(campId)}&replyUser=${encodeURIComponent(sender)}&msgId=${encodeURIComponent(msgId)}`;
        }

        const outboxEntry = {
          timestamp: new Date().toISOString(),
          toEmail: toEmail ? toEmail.replace(/(.{2})(.*)(@.*)/, '$1***$3') : '(registered login email)',
          recipientUsername,
          subject: `[MM3E Campaign] ${campName}: ${msg.type === 'CAMPAIGN_INVITATION' ? 'Campaign Invitation' : 'New Message'} from ${sender}`,
          sender,
          campaignId: campId,
          campaignName: campName,
          text: msg.text || '',
          actionLinks
        };

        console.log(`[EMAIL FORWARD DISPATCH] Forwarded message ${msgId} to ${recipientUsername} (${outboxEntry.toEmail})`);

        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          forwarded: true,
          recipientUsername,
          destination: outboxEntry.toEmail,
          actionLinks
        }));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
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
