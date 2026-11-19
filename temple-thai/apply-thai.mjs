import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || 'temple-source');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const write = (p, value) => fs.writeFileSync(path.join(root, p), value);

for (const file of ['public/index.html', 'public/admin.html']) {
  let html = read(file);
  html = html.replace('<html lang="vi">', '<html lang="th">');
  html = html.replace(/Be\\+Vietnam\\+Pro/g, 'Noto+Sans+Thai');
  html = html.replace(/family=Be\\+Vietnam\\+Pro/g, 'family=Noto+Sans+Thai');
  html = html.replace(/Be Vietnam Pro/g, 'Noto Sans Thai');
  html = html.replace(/ZeroTTS/g, 'เสียงภาษาไทย');
  html = html.replace(/Mai Chi/g, 'เสียงภาษาไทย');
  html = html.replace(/maichi/g, 'th-TH-PremwadeeNeural');
  write(file, html);
}
let css = read('public/css/live.css');
css = css.replace(/Be Vietnam Pro/g, 'Noto Sans Thai');
write('public/css/live.css', css);

let server = read('server.js');
server = server.replace(/ZeroTTS/g, 'Thai Edge TTS');
server = server.replace(/zeroweight-ai\\/ZeroTTS/g, 'Microsoft Edge Neural TTS');
server = server.replace(/maichi/g, 'th-TH-PremwadeeNeural');
server = server.replace(/Giọng Mai Chi/g, 'เสียงภาษาไทย');
write('server.js', server);
fs.copyFileSync(path.resolve('temple-thai/tts_worker.py'), path.join(root, 'tts_worker.py'));

console.log('ปรับโปรเจกต์วัด TikTok LIVE เป็นภาษาไทยแล้ว');
