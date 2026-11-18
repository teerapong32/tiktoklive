// เซิร์ฟเวอร์ตัวกลาง: รับคอมเมนต์/ของขวัญ/ไลก์จาก TikTok LIVE แล้วส่งต่อให้หน้าเว็บ
const http=require('http'),fs=require('fs'),path=require('path');
const lib=require('tiktok-live-connector');
const Conn=lib.WebcastPushConnection||lib.TikTokLiveConnection;
const EV=lib.WebcastEvent||{};
const PORT=process.env.PORT||3000;
const clients=new Set();let conn=null,state={status:'idle',user:''};
const send=(type,data)=>{const m='data: '+JSON.stringify({type,...data})+'\n\n';clients.forEach(r=>r.write(m))};
const av=d=>d.profilePictureUrl||(d.user&&(d.user.profilePictureUrl||(d.user.profilePicture&&d.user.profilePicture.urls&&d.user.profilePicture.urls[0])))||'';
const nick=d=>d.nickname||(d.user&&(d.user.nickname||d.user.uniqueId))||d.uniqueId||'ผู้ชม';

async function connect(user){
  if(conn){try{conn.disconnect()}catch(e){}}
  state={status:'connecting',user};send('status',state);
  const opt={};if(process.env.SIGN_API_KEY)opt.signApiKey=process.env.SIGN_API_KEY;
  conn=new Conn(user,opt);
  conn.on(EV.CHAT||'chat',d=>send('chat',{nick:nick(d),avatar:av(d),text:d.comment||''}));
  conn.on(EV.GIFT||'gift',d=>{
    const g=d.giftDetails||d.gift||{};
    if((d.giftType===1||g.giftType===1)&&!d.repeatEnd)return; // ของขวัญแบบต่อเนื่อง รอจนจบ
    send('gift',{nick:nick(d),avatar:av(d),name:d.giftName||g.giftName||'ของขวัญ',count:d.repeatCount||1});
  });
  conn.on(EV.LIKE||'like',d=>send('like',{nick:nick(d),count:d.likeCount||1}));
  conn.on(EV.DISCONNECTED||'disconnected',()=>{state={...state,status:'disconnected'};send('status',state)});
  try{
    const st=await conn.connect();state={status:'connected',user};
    const o=(st&&st.roomInfo&&st.roomInfo.owner)||{};
    send('profile',{nick:o.nickname||user,id:o.display_id||user,avatar:(o.avatar_thumb&&o.avatar_thumb.url_list&&o.avatar_thumb.url_list[0])||'',followers:o.follow_info&&o.follow_info.follower_count});
  }
  catch(e){state={status:'error',user,msg:String((e&&e.message)||e).slice(0,120)};console.error(e)}
  send('status',state);
}

http.createServer((req,res)=>{
  const u=new URL(req.url,'http://x');
  if(u.pathname==='/events'){
    res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache',Connection:'keep-alive'});
    res.write('data: '+JSON.stringify({type:'status',...state})+'\n\n');
    clients.add(res);req.on('close',()=>clients.delete(res));return;
  }
  if(u.pathname==='/connect'){
    const user=(u.searchParams.get('user')||'').replace(/^@/,'');
    if(!/^[\w.]{1,40}$/.test(user)){res.writeHead(400);return res.end('bad user')}
    connect(user);res.writeHead(200);return res.end('ok');
  }
  fs.readFile(path.join(__dirname,'index.html'),(e,b)=>{res.writeHead(e?500:200,{'Content-Type':'text/html; charset=utf-8'});res.end(b||'missing index.html')});
}).listen(PORT,()=>console.log('เปิดเบราว์เซอร์ที่ http://localhost:'+PORT));
