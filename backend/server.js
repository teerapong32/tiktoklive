
import http from 'node:http';
import {
  TikTokLiveConnection,
  WebcastEvent,
  ControlEvent,
  RoomIdRouteConfig,
  IsLiveRouteConfig
} from 'tiktok-live-connector';

const PORT = Number(process.env.PORT || 3000);
const clients = new Set();

let connection = null;
let state = {
  status: 'idle',
  user: '',
  msg: '',
  roomId: ''
};

// ปิด Euler fallback หากไม่ได้ตั้ง API Key
if (!process.env.SIGN_API_KEY) {
  RoomIdRouteConfig.skipFetchRoomIdFromEulerRoute = true;
  IsLiveRouteConfig.skipFetchRoomIdFromEulerRoute = true;
}

const allowedOrigins = (
  process.env.ALLOW_ORIGIN || '*'
).split(',').map(x => x.trim()).filter(Boolean);

function cors(req, res) {
  const origin = req.headers.origin;
  const allow = allowedOrigins.includes('*')
    ? '*'
    : allowedOrigins.includes(origin) ? origin : '';

  if (allow) {
    res.setHeader('Access-Control-Allow-Origin', allow);
  }

  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function send(type, data = {}) {
  const payload = `data: ${JSON.stringify({
    type,
    ...data
  })}\n\n`;

  for (const client of clients) {
    if (!client.destroyed) {
      client.write(payload);
    }
  }
}

function setState(next) {
  state = { ...state, ...next };
  send('status', state);
}

function errorDetails(err) {
  const errors = err?.config?.requestErrs ||
    err?.errors;

  if (Array.isArray(errors) && errors.length) {
    return errors.map((item, i) => {
      const name = item?.routeId ||
        item?.name ||
        `Source ${i + 1}`;

      const cause = item?.error ||
        item?.cause ||
        item;

      return `${name}: ${cause?.message || String(cause)}`;
    }).join(' | ');
  }

  return err?.message || String(err);
}

function nickOf(data) {
  const user = data?.user || data?.member?.user || data?.operator || {};
  const member = data?.member || {};
  return data?.nickname ||
    data?.displayName ||
    data?.display_name ||
    data?.displayId ||
    data?.display_id ||
    data?.uniqueId ||
    data?.unique_id ||
    user.nickname ||
    user.displayName ||
    user.display_name ||
    user.displayId ||
    user.display_id ||
    user.uniqueId ||
    user.unique_id ||
    member.nickname ||
    member.displayName ||
    member.display_name ||
    member.displayId ||
    member.display_id ||
    member.uniqueId ||
    member.unique_id ||
    'ผู้ชม';
}

function avatarOf(data) {
  return data.profilePictureUrl ||
    data.profilePicture?.urls?.[0] ||
    data.avatar_thumb?.url_list?.[0] ||
    data.avatarThumb?.urlList?.[0] ||
    data.user?.profilePictureUrl ||
    data.user?.profilePicture?.urls?.[0] ||
    '';
}

async function connectTikTok(user, roomId = '') {
  if (connection) {
    const old = connection;
    connection = null;

    try {
      await old.disconnect();
    } catch (e) {
      console.warn('Disconnect:', e.message);
    }
  }

  setState({
    status: 'connecting',
    user,
    roomId,
    msg: roomId
      ? 'กำลังเชื่อมต่อด้วย Room ID โดยตรง'
      : 'กำลังค้นหา Room ID จาก TikTok'
  });

  const options = {};

  if (process.env.SIGN_API_KEY) {
    options.signApiKey = process.env.SIGN_API_KEY;
  }

  const current = new TikTokLiveConnection(user, options);
  connection = current;

  current.on(WebcastEvent.MEMBER, data => {
    const nick = nickOf(data);
    console.log('TikTok MEMBER event:', JSON.stringify({
      nick,
      topLevelKeys: data && typeof data === 'object' ? Object.keys(data) : [],
      userKeys: data?.user && typeof data.user === 'object' ? Object.keys(data.user) : [],
      memberKeys: data?.member && typeof data.member === 'object' ? Object.keys(data.member) : [],
      user: data?.user,
      member: data?.member,
      uniqueId: data?.uniqueId || data?.unique_id,
      nickname: data?.nickname || data?.displayName || data?.display_name,
      memberCount: data?.memberCount
    }));
    send('member', {
      nick,
      avatar: avatarOf(data),
      memberCount: data.memberCount
    });
  });

  current.on(WebcastEvent.CHAT, data => {
    send('chat', {
      nick: nickOf(data),
      avatar: avatarOf(data),
      text: data.comment || ''
    });
  });

  current.on(WebcastEvent.GIFT, data => {
    const gift = data.giftDetails || data.gift || {};

    if (
      (data.giftType === 1 || gift.giftType === 1) &&
      !data.repeatEnd
    ) return;

    send('gift', {
      nick: nickOf(data),
      avatar: avatarOf(data),
      name: data.giftName || gift.giftName || 'ของขวัญ',
      count: data.repeatCount || 1
    });
  });

  current.on(WebcastEvent.LIKE, data => {
    send('like', {
      nick: nickOf(data),
      count: data.likeCount || 1
    });
  });

  current.on(ControlEvent.DISCONNECTED, () => {
    if (connection === current) {
      setState({
        status: 'disconnected',
        user,
        msg: 'การเชื่อมต่อถูกตัด'
      });
    }
  });

  current.on(ControlEvent.ERROR, err => {
    console.error('TikTok error:', err);

    if (connection === current) {
      setState({
        status: 'error',
        user,
        msg: errorDetails(err).slice(0, 700)
      });
    }
  });

  try {
    // หากมี Room ID จะข้ามขั้นตอนค้นหา Room ID
    const result = roomId
      ? await current.connect(roomId)
      : await current.connect();

    if (connection !== current) return;

    const actualRoomId = current.roomId ||
      roomId ||
      '';

    setState({
      status: 'connected',
      user,
      roomId: actualRoomId,
      msg: 'เชื่อมต่อสำเร็จ'
    });

    const room = current.roomInfo ||
      result?.roomInfo ||
      {};

    const owner = room.owner ||
      room.ownerInfo ||
      {};

    send('profile', {
      nick: owner.nickname || owner.displayName || user,
      id: owner.display_id ||
        owner.displayId ||
        owner.unique_id ||
        owner.uniqueId ||
        user,
      avatar: avatarOf(owner),
      followers: owner.follow_info?.follower_count ??
        owner.followInfo?.followerCount
    });

    console.log('Connected:', user, actualRoomId);

  } catch (err) {
    const detail = errorDetails(err);

    console.error('TikTok connection failed:', detail);

    if (connection === current) {
      setState({
        status: 'error',
        user,
        roomId,
        msg: detail.slice(0, 700)
      });
    }
  }
}

const server = http.createServer((req, res) => {
  cors(req, res);

  const url = new URL(req.url, 'http://localhost');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (
    url.pathname === '/' ||
    url.pathname === '/health'
  ) {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    });

    return res.end(JSON.stringify({
      ok: true,
      service: 'TikTok LIVE backend',
      status: state.status,
      user: state.user,
      roomId: state.roomId
    }));
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

    res.write(`data: ${JSON.stringify({
      type: 'status',
      ...state
    })}\n\n`);

    req.on('close', () => {
      clients.delete(res);
    });

    return;
  }

  if (url.pathname === '/connect') {
    const user = (
      url.searchParams.get('user') || ''
    ).trim().replace(/^@/, '');

    // รับ Room ID จาก URL หรือ Environment Variable
    const roomId = (
      url.searchParams.get('roomId') ||
      process.env.TIKTOK_ROOM_ID ||
      ''
    ).trim();

    if (!/^[\w.]{1,40}$/.test(user)) {
      res.writeHead(400, {
        'Content-Type': 'application/json; charset=utf-8'
      });

      return res.end(JSON.stringify({
        ok: false,
        error: 'ชื่อ TikTok ไม่ถูกต้อง'
      }));
    }

    if (roomId && !/^\d+$/.test(roomId)) {
      res.writeHead(400, {
        'Content-Type': 'application/json; charset=utf-8'
      });

      return res.end(JSON.stringify({
        ok: false,
        error: 'Room ID ต้องเป็นตัวเลขเท่านั้น'
      }));
    }

    res.writeHead(202, {
      'Content-Type': 'application/json; charset=utf-8'
    });

    res.end(JSON.stringify({
      ok: true,
      status: 'connecting',
      user,
      roomId: roomId || null
    }));

    void connectTikTok(user, roomId);

    return;
  }

  if (url.pathname === '/status') {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    });

    return res.end(JSON.stringify(state));
  }

  res.writeHead(404, {
    'Content-Type': 'application/json; charset=utf-8'
  });

  res.end(JSON.stringify({
    ok: false,
    error: 'Not found'
  }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`TikTok LIVE backend listening on ${PORT}`);
});
