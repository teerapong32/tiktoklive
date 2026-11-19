import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || 'temple-source');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, content) => fs.writeFileSync(path.join(root, file), content);

const translations = [
  ['Chùa Linh Ứng Online', 'วัดหลินอึ๋งออนไลน์'],
  ['Bảng Điều Khiển', 'แผงควบคุม'],
  ['Kết Nối Phòng TikTok Live', 'เชื่อมต่อห้อง TikTok LIVE'],
  ['Nhập @username TikTok đang phát Live...', 'กรอกชื่อบัญชี TikTok ที่กำลัง LIVE'],
  ['Kết Nối Live', 'เชื่อมต่อ LIVE'],
  ['Ngắt Kết Nối', 'ยกเลิกการเชื่อมต่อ'],
  ['Âm Thanh Chùa & Giọng Đọc Khấn', 'เสียงวัดและเสียงอ่านคำอธิษฐาน'],
  ['Bật Âm Thanh Chùa & Giọng Đọc', 'เปิดเสียงวัดและเสียงอ่าน'],
  ['Giọng Đọc: BẬT', 'เสียงอ่าน: เปิด'],
  ['Nhạc Nền: BẬT', 'เพลงพื้นหลัง: เปิด'],
  ['Hiệu Ứng: BẬT', 'เอฟเฟกต์: เปิด'],
  ['Âm lượng Giọng đọc', 'ระดับเสียงอ่าน'],
  ['Đọc thử Giọng Mai Chi', 'ทดสอบเสียงภาษาไทย'],
  ['Gửi Lệnh Tương Tác', 'ส่งคำสั่งโต้ตอบ'],
  ['Hương đã thắp', 'จำนวนธูปที่จุดแล้ว'],
  ['Tổng Công Đức', 'บุญสะสมทั้งหมด'],
  ['Bình luận', 'ความคิดเห็น'],
  ['Thả tim', 'กดหัวใจ'],
  ['Chia sẻ', 'แชร์'],
  ['Tặng quà', 'ส่งของขวัญ'],
  ['Theo dõi', 'ติดตาม'],
  ['Thí Chủ Hữu Duyên', 'ผู้มีบุญร่วมสร้างกุศล'],
  ['Đọc lời cầu nguyện', 'อ่านคำอธิษฐาน'],
  ['Cầu gia đình bình an, vạn sự cát tường như ý', 'ขอให้ครอบครัวมีความสุข ปลอดภัย และสมปรารถนาทุกประการ'],
  ['Xin xăm', 'เสี่ยงเซียมซี'],
  ['Gieo quẻ', 'เสี่ยงทาย'],
  ['Thắp hương', 'จุดธูป'],
  ['Đức Phật A Di Đà', 'พระอมิตาภพุทธเจ้า'],
  ['Giọng Đọc ZeroTTS', 'เสียงอ่านภาษาไทย'],
  ['ZeroTTS', 'ระบบเสียงภาษาไทย'],
  ['Mai Chi', 'เสียงภาษาไทย'],
  ['Giọng đọc AI tiếng Việt', 'เสียง AI ภาษาไทย'],
  ['Tiếng Việt', 'ภาษาไทย'],
  ['tiếng Việt', 'ภาษาไทย'],
  ['Việt Nam', 'ประเทศไทย'],
  ['việt nam', 'ประเทศไทย'],
  ['BẬT', 'เปิด'],
  ['TẮT', 'ปิด'],
];

for (const file of ['public/index.html', 'public/admin.html']) {
  let html = read(file);
  html = html.replaceAll('lang="vi"', 'lang="th"');
  html = html.replaceAll('Be+Vietnam+Pro', 'Noto+Sans+Thai');
  html = html.replaceAll('Be Vietnam Pro', 'Noto Sans Thai');
  html = html.replaceAll('maichi', 'th-TH-PremwadeeNeural');
  for (const [from, to] of translations) html = html.replaceAll(from, to);
  html = html.replaceAll('zenfacts_vn', 'allaboutitscript');
  write(file, html);
}

let css = read('public/css/live.css').replaceAll('Be Vietnam Pro', 'Noto Sans Thai');
write('public/css/live.css', css);

let server = read('server.js');
server = server.replace(
  /const ALLOWED_VI_TEXT_RE = .*?;\nconst ALLOWED_VI_NAME_RE = .*?;\nconst VI_LETTER_RE = .*?;/s,
  "const ALLOWED_VI_TEXT_RE = /[^\\p{L}\\p{N}\\s.,!?'-]/gu;\nconst ALLOWED_VI_NAME_RE = /[^\\p{L}\\p{N}\\s._-]/gu;\nconst VI_LETTER_RE = /[\\p{L}]/gu;"
);
server = server.replaceAll("'maichi'", "'th-TH-PremwadeeNeural'");
server = server.replaceAll('"maichi"', '"th-TH-PremwadeeNeural"');
server = server.replaceAll('zeroweight-ai/ZeroTTS', 'Microsoft Edge Neural TTS (Thai)');
server = server.replaceAll('ZeroTTS (', 'Thai TTS (');
server = server.replaceAll('Mai Chi', 'เสียงภาษาไทย');
server = server.replaceAll('Giọng Đọc', 'เสียงอ่าน');
server = server.replaceAll('zenfacts_vn', 'allaboutitscript');
server = server.replaceAll('Thí Chủ Hữu Duyên', 'ผู้มีบุญร่วมสร้างกุศล');
write('server.js', server);

fs.copyFileSync(path.resolve('temple-thai/tts_worker.py'), path.join(root, 'tts_worker.py'));
console.log('ติดตั้งส่วนแปลภาษาไทยและระบบเสียงภาษาไทยแล้ว');
