import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || 'temple-source');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, content) => fs.writeFileSync(path.join(root, file), content);

for (const file of ['public/index.html', 'public/admin.html']) {
  let html = read(file);
  html = html.replaceAll('lang="vi"', 'lang="th"');
  html = html.replaceAll('Be+Vietnam+Pro', 'Noto+Sans+Thai');
  html = html.replaceAll('Be Vietnam Pro', 'Noto Sans Thai');
  html = html.replaceAll('Mai Chi', 'เสียงภาษาไทย');
  html = html.replaceAll('maichi', 'th-TH-PremwadeeNeural');
  write(file, html);
}

let css = read('public/css/live.css').replaceAll('Be Vietnam Pro', 'Noto Sans Thai');
write('public/css/live.css', css);

let server = read('server.js');
server = server.replaceAll("'maichi'", "'th-TH-PremwadeeNeural'");
server = server.replaceAll('ZeroTTS (zeroweight-ai/ZeroTTS)', 'Microsoft Edge Neural TTS (Thai)');
server = server.replaceAll('Giọng Mai Chi', 'เสียงภาษาไทย');
write('server.js', server);

fs.copyFileSync(path.resolve('temple-thai/tts_worker.py'), path.join(root, 'tts_worker.py'));
console.log('ปรับโปรเจกต์วัด TikTok LIVE เป็นภาษาไทยแล้ว');
