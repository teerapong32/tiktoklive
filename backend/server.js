import http from 'node:http';
import { TikTokLiveConnection, WebcastEvent, ControlEvent } from 'tiktok-live-connector';

const PORT = Number(process.env.PORT || 3000);
const allowedOrigins = (process.env.ALLOW_ORIGIN || '*').split(',').map(v => v.trim()).filter(Boolean);
const clients = new Set();
let connection = null;
let state = { status: 'idle', user: '' };

function cors(req, res) {
  const origin = req.headers.origin;
  const allow = allowedOrigins.includes('*') ? '*' : (allowedOrigins.includes(origin) ? origin : '');
  if (allow) res.setHeader('Access-Control-Allow-Origin', allow);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
function send(type, data = {}) {
  const payload = 'data: ' + JSON.stringify({ type, ...data }) + '\n\n';
  for (const client of clients) if (!client.destroyed) client.write(payload);
}
function setState(next) { state = { ...state, ...next }; send('status', state); }
const avatarOf = d => d.profilePictureUrl || d.user?.profilePictureUrl || d.user?.profilePicture?.urls?.[0] || '';
const nickOf = d => d.nickname || d.user?.nickname || d.user?.uniqueId || d.uniqueId || 'ผู้ชม';

async function connectTikTok(user) {
  if (connection) {
    const old = connection;
    connection = null;
    try { await old.disconnect(); } catch (e) { console.warn('Disconnect previous connection:', e.message); }
  }
  setState({ status: 'connecting', user, msg: '' });
  const options = {};
  if (process.env.SIGN_API_KEY) options.signApiKey = process.env.SIGN_API_KEY;
  const current = new TikTokLiveConnection(user, options);
  connection = current;

  current.on(WebcastEvent.CHAT, d => send('chat', { nick: nickOf(d), avatar: avatarOf(d), text: d.comment || '' }));
  current.on(WebcastEvent.GIFT, d => {
    const gift = d.giftDetails || d.gift || {};
    if ((d.giftType === 1 || gift.giftType === 1) && !d.repeatEnd) return;
    send('gift', { nick: nickOf(d), avatar: avatarOf(d), name: d.giftName || gift.giftName || 'ของขวัญ', count: d.repeatCount || 1 });
  });
  current.on(WebcastEvent.LIKE, d => send('like', { nick: nickOf(d), count: d.likeCount || 1 }));
  current.on(ControlEvent.DISCONNECTED, () => {
    if (connection === current) setState({ status: 'disconnected', user });
  });
  current.on(ControlEvent.ERROR, err => {
    console.error('TikTok connection error:', err);
    if (connection === current) setState({ status: 'error', user, msg: String(err?.message || err).slice(0, 240) });
  });

  try {
    const result = await current.connect();
    if (connection !== current) return;
    setState({ status: 'connected', user, msg: '' });
    const room = current.roomInfo || result?.roomInfo || {};
    const owner = room.owner || room.ownerInfo || {};
    send('profile', {
      nick: owner.nickname || user,
      id: owner.display_id || owner.unique_id || user,
      avatar: owner.avatar_thumb?.url_list?.[0] || '',
      followers: owner.follow_info?.follower_count
    });
  } catch (err) {
    console.error('TikTok connect failed:', err);
    if (connection === current) setState({ status: 'error', user, msg: String(err?.message || err).slice(0, 240) });
  }
}

const server = http.createServer((req, res) => {
  cors(req, res);
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  if (url.pathname === '/' || url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ ok: true, service: 'TikTok LIVE backend', status: state.status }));
  }
  if (url.pathname === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no'
    });
    res.write('retry: 3000\n');
    clients.add(res);
    res.write('data: ' + JSON.stringify({ type: 'status', ...state }) + '\n\n');
    req.on('close', () => clients.delete(res));
    return;
  }
  if (url.pathname === '/connect') {
    const user = (url.searchParams.get('user') || '').trim().replace(/^@/, '');
    if (!/^[\w.]{1,40}$/.test(user)) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ ok: false, error: 'กรุณาระบุชื่อ TikTok ให้ถูกต้อง' }));
    }
    res.writeHead(202, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, status: 'connecting', user }));
    void connectTikTok(user);
    return;
  }
  if (url.pathname === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify(state));
  }
  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ ok: false, error: 'Not found' }));
});
server.listen(PORT, '0.0.0.0', () => console.log('TikTok LIVE backend listening on port ' + PORT));
