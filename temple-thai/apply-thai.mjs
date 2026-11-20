import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(process.argv[2] || 'temple-source');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, content) => fs.writeFileSync(path.join(root, file), content);

const translations = [
  ['Dâng Mâm Ngũ Quả','ถวายพานผลไม้มงคลห้าชนิด'],
  ['Đại Lễ Kim Long','พิธีมังกรทองถวายพระพุทธเจ้า'],
  ['🔌 4. บันทึก Phản Hồi JSON-RPC 2.0 (`/rpc`)','🔌 4. บันทึกการตอบกลับ JSON-RPC 2.0 (`/rpc`)'],
  ['Phản Hồi','การตอบกลับ'],
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
  ["CHÙA LINH ỨNG", "วัดหลินอึ๋ง"],
  ["CHÙA ONLINE", "วัดออนไลน์"],
  ["CHÙA LINH ỨNG ONLINE", "วัดหลินอึ๋งออนไลน์"],
  ["ĐỨC PHẬT A DI ĐÀ", "พระอมิตาภพุทธเจ้า"],
  ["ĐẠI HÙNG BẢO ĐIỆN", "พระมหาวิหาร"],
  ["TẤM LÒNG THÀNH", "ผู้มีจิตศรัทธา"],
  ["Thỉnh Chuông", "สั่นระฆัง"],
  ["Gõ Mõ", "เคาะไม้สวดมนต์"],
  ["Xin Xăm", "เสี่ยงเซียมซี"],
  ["Cầu phúc", "ขอพร"],
  ["Dâng hương", "ถวายธูป"],
  ["Hoa sen", "ดอกบัว"],
  ["NGHI LỄ", "พิธีกรรม"],
  ["CÚNG DƯỜNG", "ถวายเครื่องสักการะ"],
  ["SANCTUARY INTERACTION", "กิจกรรมภายในวัด"],
  ["Mở Admin Đầy Đủ", "เปิดหน้าผู้ดูแลระบบ"],
  ["Điều Khiển Live & RPC", "ควบคุมไลฟ์และ RPC"],
  ["Âm lượng Nhạc nền", "ระดับเสียงเพลงพื้นหลัง"],
  ["Âm lượng Giọng đọc", "ระดับเสียงอ่าน"],
  ["Âm lượng Hiệu ứng", "ระดับเสียงเอฟเฟกต์"],
  ["Nhạc Nền", "เพลงพื้นหลัง"],
  ["Hiệu Ứng", "เอฟเฟกต์"],
  ["Giọng Đọc", "เสียงอ่าน"],
  ["BẬT", "เปิด"],
  ["TẮT", "ปิด"],
  ["Kết Nối PHÒNG TIKTOK LIVE", "เชื่อมต่อห้อง TikTok LIVE"],
  ["Kết Nối Live", "เชื่อมต่อ LIVE"],
  ["Kết Nối", "เชื่อมต่อ"],
  ["Ngắt Kết Nối", "ตัดการเชื่อมต่อ"],
  ["Ngắt", "ตัดการเชื่อมต่อ"],
  ["Nhập @username TikTok đang phát Live...", "กรอกชื่อบัญชี TikTok ที่กำลังถ่ายทอดสด"],
  ["Nhập @username hoặc link TikTok Live...", "กรอกชื่อบัญชีหรือ链接 TikTok LIVE"],
  ["Tự động Giả lập Người Xem", "จำลองผู้ชมอัตโนมัติ"],
  ["Kích Hoạt Nghi Thức Tương Tác", "เริ่มกิจกรรมโต้ตอบ"],
  ["Tên người xem / Thí chủ...", "ชื่อผู้ชม / ผู้ร่วมทำบุญ"],
  ["Lời cầu nguyện...", "คำอธิษฐาน"],
  ["Thắp 3 Nén Hương", "ถวายธูป 3 ดอก"],
  ["Thả Đèn Hoa Đăng", "ปล่อยโคมอธิษฐาน"],
  ["Gõ Mõ (+5)", "เคาะไม้สวดมนต์ (+5)"],
  ["Thỉnh Chuông Chùa", "สั่นระฆังวัด"],
  ["Xin Xăm / Gieo Quẻ", "เสี่ยงเซียมซี / เสี่ยงทาย"],
  ["Dâng Hoa Sen Vàng", "ถวายดอกบัวทอง"],
  ["Đại Lễ Kim Long Chầu Phật", "พิธีมังกรทองถวายพระพุทธเจ้า"],
  ["Nhật Ký Tương Tác Gần Nhất", "บันทึกกิจกรรมล่าสุด"],
  ["Màn Hình OBS", "หน้าจอ OBS"],
  ["Màn Hình Live Chính", "หน้าจอไลฟ์หลัก"],
  ["Mở Màn Hình", "เปิดหน้าจอ"],
  ["Đang tải trạng thái hệ thống...", "กำลังโหลดสถานะระบบ..."],
  ["Hương đã thắp", "จำนวนธูปที่ถวายแล้ว"],
  ["Tổng Công Đức", "บุญสะสมทั้งหมด"],
  ["mắt", "ผู้ชม"],
  ["Bảng Điều Khiển", "แผงควบคุม"],
  ["Giả Lập Bình Luận Người Xem TikTok", "จำลองความคิดเห็นจากผู้ชม TikTok"],
  ["Nhập nội dung bình luận TikTok...", "กรอกความคิดเห็น TikTok..."],
  ["Gửi Comment", "ส่งความคิดเห็น"],
  ["Từ khóa tự động nhận diện:", "คำสำคัญที่ระบบตรวจจับอัตโนมัติ:"],
  ["Đọc thử Giọng Mai Chi", "ทดสอบเสียงภาษาไทย"],
  ["Đọc thử Giọng", "ทดสอบเสียงอ่าน"],
  ["Gửi Lệnh Tương Tác", "ส่งคำสั่งโต้ตอบ"],
  ["Đặt Lại Bảng Công Đức", "รีเซ็ตตารางบุญ"],
  ["Sẵn sàng nhận lệnh JSON-RPC 2.0", "พร้อมรับคำสั่ง JSON-RPC 2.0"],
  ["Đang kết nối", "กำลังเชื่อมต่อ"],
  ["Đã kết nối", "เชื่อมต่อแล้ว"],
  ["Đã ngắt kết nối", "ตัดการเชื่อมต่อแล้ว"],
  ["Thí Chủ Minh Tâm", "ผู้ร่วมทำบุญ"],
  ["Đại Thí Chủ", "ผู้มีจิตศรัทธา"],
  ["Thí Chủ Hữu Duyên", "ผู้มีบุญสัมพันธ์"],
  ["Thí chủ xin quẻ", "ผู้เสี่ยงเซียมซี"],
  ["Thí chủ", "ผู้ร่วมทำบุญ"],
  ["thí chủ", "ผู้ร่วมทำบุญ"],
  ["Cầu gia đình bình an, vạn sự cát tường như ý", "ขอให้ครอบครัวอยู่เย็นเป็นสุข และสมปรารถนาทุกประการ"],
  ["Cầu gia đạo bình an, tài lộc vượng phát", "ขอให้ครอบครัวสงบสุข การเงินรุ่งเรือง"],
  ["Nam mô A Di Đà Phật", "นะโม อมิตาภพุทธ"],
  ["Nam Mô A Di Đà Phật", "นะโม อมิตาภพุทธ"],
  ["Công Đức", "บุญกุศล"],
  ["Công đức", "บุญกุศล"],
  ["Bình luận", "ความคิดเห็น"],
  ["Tặng quà", "ส่งของขวัญ"],
  ["Thả tim", "กดหัวใจ"],
  ["Chia sẻ", "แชร์"],
  ["Theo dõi", "ติดตาม"],
  ["Quẻ Số", "เซียมซีหมายเลข"],
  ["THƯỢNG THƯỢNG CÁT", "มหามงคล"],
  ["Đang tải", "กำลังโหลด"],
  ["Không tìm thấy", "ไม่พบ"],
  ["Lỗi kết nối", "ข้อผิดพลาดในการเชื่อมต่อ"],
  ["Phòng TikTok Live", "ห้อง TikTok LIVE"],
  ["Giọng Đọc ZeroTTS", "เสียงอ่านภาษาไทย"],
  ["Mai Chi", "เสียงภาษาไทย"],
  ["ZeroTTS", "ระบบเสียงภาษาไทย"],
  ["Bật Âm Thanh Chùa & Giọng Đọc", "เปิดเสียงวัดและเสียงอ่าน"],
  ["Âm Thanh Chùa & Giọng Đọc Khấn", "เสียงวัดและเสียงอ่านคำอธิษฐาน"],
  ["Gửi Lệnh", "ส่งคำสั่ง"],
  ["Nhật Ký", "บันทึก"],
  ["Trạng thái hệ thống", "สถานะระบบ"],
  ["Giọng:", "เสียง:"],
  ["Hương đã thắp:", "ธูปที่ถวายแล้ว:"],
];

const EXTRA_TRANSLATIONS = [
  [
    "Bấm để Thắp Hương Dâng Phật",
    "กดเพื่อถวายธูปบูชาพระ"
  ],
  [
    "Thỉnh Đại Hồng Chung",
    "สั่นระฆังธรรม"
  ],
  [
    "Bấm để Thỉnh Đại Hồng Chung",
    "กดเพื่อสั่นระฆังธรรม"
  ],
  [
    "Bấm để Gõ Mõ Tích Công Đức",
    "กดเพื่อเคาะไม้สวดมนต์สะสมบุญ"
  ],
  [
    "Bấm để Xin Xăm / Gieo Quẻ",
    "กดเพื่อเสี่ยงเซียมซี / เสี่ยงทาย"
  ],
  [
    "Thắp hương",
    "ถวายธูป"
  ],
  [
    "Thắp Hương",
    "ถวายธูป"
  ],
  [
    "Gõ Mõ",
    "เคาะไม้สวดมนต์"
  ],
  [
    "Thỉnh Chuông",
    "สั่นระฆัง"
  ],
  [
    "Xin Xăm",
    "เสี่ยงเซียมซี"
  ],
  [
    "Dâng hương cầu bình an",
    "ถวายธูปขอพรให้ปลอดภัย"
  ],
  [
    "Dâng Hoa Sen Vàng",
    "ถวายดอกบัวทอง"
  ],
  [
    "Cầu phúc & Thả hoa đăng",
    "ขอพรและปล่อยโคม"
  ],
  [
    "Cầu phúc",
    "ขอพร"
  ],
  [
    "Thả hoa đăng",
    "ปล่อยโคม"
  ],
  [
    "Đại Lễ Kim Long Chầu Phật",
    "พิธีมังกรทองถวายพระพุทธเจ้า"
  ],
  [
    "Công đức vô lượng: Đại Thí Chủ dâng lễ",
    "บุญกุศลไม่มีประมาณ: ผู้มีจิตศรัทธาถวายเครื่องสักการะ"
  ],
  [
    "Công đức vô lượng",
    "บุญกุศลไม่มีประมาณ"
  ],
  [
    "Đại Thí Chủ dâng lễ",
    "ผู้มีจิตศรัทธาถวายเครื่องสักการะ"
  ],
  [
    "Quẻ Số",
    "เซียมซีหมายเลข"
  ],
  [
    "Nhật Xuất Đông Phương",
    "ตะวันขึ้นทางทิศบูรพา"
  ],
  [
    "Thí chủ xin quẻ:",
    "ผู้เสี่ยงเซียมซี:"
  ],
  [
    "Thí Chủ Minh Tâm",
    "ผู้มีจิตศรัทธา"
  ],
  [
    "Quỳnh_Finn",
    "ผู้ร่วมทำบุญ"
  ],
  [
    "Cầu cho gia đình bình an, tài lộc hanh thông, vạn sự như ý",
    "ขอให้ครอบครัวสงบสุข การเงินคล่องตัว และสมปรารถนาทุกประการ"
  ],
  [
    "Cầu gia đạo bình an, tài lộc vượng phát",
    "ขอให้ครอบครัวสงบสุข การเงินรุ่งเรือง"
  ],
  [
    "Nam mô A Di Đà Phật. Chùa Linh Ứng Online xin kính chào quý thí chủ thập phương.",
    "นะโม อมิตาภพุทธ วัดหลินอึ๋งออนไลน์ขอต้อนรับผู้มีจิตศรัทธาทุกท่าน"
  ],
  [
    "Thắp 3 Nén Hương",
    "ถวายธูป 3 ดอก"
  ],
  [
    "Thả Đèn Hoa Đăng",
    "ปล่อยโคมอธิษฐาน"
  ],
  [
    "Gõ Mõ (+5)",
    "เคาะไม้สวดมนต์ (+5)"
  ],
  [
    "Thỉnh Chuông Chùa",
    "สั่นระฆังวัด"
  ],
  [
    "Xin Xăm / Gieo Quẻ",
    "เสี่ยงเซียมซี / เสี่ยงทาย"
  ],
  [
    "Dâng Hoa Sen Vàng",
    "ถวายดอกบัวทอง"
  ],
  [
    "Mở Màn Hình OBS 9:16 Sạch (?obs=1)",
    "เปิดหน้าจอ OBS 9:16 แบบไม่มีแถบควบคุม"
  ],
  [
    "Mở Màn Hình Live Chính",
    "เปิดหน้าจอไลฟ์หลัก"
  ],
  [
    "Mở Admin Đầy Đủ",
    "เปิดหน้าผู้ดูแลระบบ"
  ],
  [
    "Điều Khiển Live & RPC",
    "ควบคุมไลฟ์และ RPC"
  ],
  [
    "Âm Thanh Chùa & Giọng Đọc Khấn",
    "เสียงวัดและเสียงอ่านคำอธิษฐาน"
  ],
  [
    "Bật Âm Thanh Chùa & Giọng Đọc",
    "เปิดเสียงวัดและเสียงอ่าน"
  ],
  [
    "Giọng Đọc: BẬT",
    "เสียงอ่าน: เปิด"
  ],
  [
    "Nhạc Nền: BẬT",
    "เพลงพื้นหลัง: เปิด"
  ],
  [
    "Hiệu Ứng: BẬT",
    "เอฟเฟกต์: เปิด"
  ],
  [
    "Âm lượng Nhạc nền",
    "ระดับเสียงเพลงพื้นหลัง"
  ],
  [
    "Âm lượng Giọng đọc",
    "ระดับเสียงอ่าน"
  ],
  [
    "Âm lượng Hiệu ứng",
    "ระดับเสียงเอฟเฟกต์"
  ],
  [
    "Kết Nối PHÒNG TIKTOK LIVE",
    "เชื่อมต่อห้อง TikTok LIVE"
  ],
  [
    "Nhập @username hoặc link TikTok Live...",
    "กรอกชื่อบัญชีหรือ URL TikTok LIVE"
  ],
  [
    "Tự động Giả lập Người Xem: TẮT",
    "จำลองผู้ชมอัตโนมัติ: ปิด"
  ],
  [
    "Kích Hoạt Nghi Thức Tương Tác (RPC)",
    "เริ่มกิจกรรมโต้ตอบ (RPC)"
  ],
  [
    "Tên người xem / Thí chủ...",
    "ชื่อผู้ชม / ผู้ร่วมทำบุญ"
  ],
  [
    "Lời cầu nguyện...",
    "คำอธิษฐาน"
  ],
  [
    "Nhật Ký Tương Tác Gần Nhất",
    "บันทึกกิจกรรมล่าสุด"
  ],
  [
    "NGHI LỄ",
    "พิธีกรรม"
  ],
  [
    "CÚNG DƯỜNG",
    "ถวายเครื่องสักการะ"
  ],
  [
    "SANCTUARY INTERACTION",
    "กิจกรรมภายในวัด"
  ],
  [
    "TẤM LÒNG THÀNH",
    "ผู้มีจิตศรัทธา"
  ],
  [
    "THƯỢNG THƯỢNG CÁT",
    "มหามงคล"
  ],
  [
    "BẢNG ĐIỀU KHIỂN NHANH RPC & GIẢ LẬP TRỰC TIẾP (ẨN KHI ?obs=1)",
    "แผงควบคุม RPC และจำลองกิจกรรม (ซ่อนเมื่อใช้ ?obs=1)"
  ],
  [
    "BẢNG ĐIỀU KHIỂN CHÙA ONLINE TIKTOK LIVE RPC (BUN.JS + ZEROTTS MAI CHI)",
    "แผงควบคุมวัดออนไลน์ TikTok LIVE RPC"
  ],
  [
    "Mở Màn Hình OBS 9:16 Sạch",
    "เปิดหน้าจอ OBS 9:16 แบบไม่มีแถบควบคุม"
  ],
  [
    "Mở Màn Hình Live Chính",
    "เปิดหน้าจอไลฟ์หลัก"
  ],
  [
    "Nhập @username TikTok đang phát Live...",
    "กรอกชื่อบัญชี TikTok ที่กำลังถ่ายทอดสด"
  ],
  [
    "Kết Nối Live",
    "เชื่อมต่อ LIVE"
  ],
  [
    "Đọc thử Giọng Mai Chi",
    "ทดสอบเสียงภาษาไทย"
  ],
  [
    "Gửi Lệnh Tương Tác JSON-RPC 2.0",
    "ส่งคำสั่งโต้ตอบ JSON-RPC 2.0"
  ],
  [
    "Giả Lập Bình Luận Người Xem TikTok",
    "จำลองความคิดเห็นจากผู้ชม TikTok"
  ],
  [
    "Nhập nội dung bình luận TikTok...",
    "กรอกความคิดเห็น TikTok..."
  ],
  [
    "Gửi Comment",
    "ส่งความคิดเห็น"
  ],
  [
    "Từ khóa tự động nhận diện:",
    "คำสำคัญที่ระบบตรวจจับอัตโนมัติ:"
  ],
  [
    "Sẵn sàng nhận lệnh JSON-RPC 2.0",
    "พร้อมรับคำสั่ง JSON-RPC 2.0"
  ],
  [
    "Hương đã thắp:",
    "จำนวนธูปที่ถวายแล้ว:"
  ],
  [
    "Tổng Công Đức:",
    "บุญสะสมทั้งหมด:"
  ],
  [
    "Đang tải trạng thái hệ thống...",
    "กำลังโหลดสถานะระบบ..."
  ],
  [
    "Đang kết nối",
    "กำลังเชื่อมต่อ"
  ],
  [
    "Đã kết nối",
    "เชื่อมต่อแล้ว"
  ],
  [
    "Đã ngắt kết nối",
    "ตัดการเชื่อมต่อแล้ว"
  ],
  [
    "Vui lòng nhập @username hoặc link TikTok Live cần kết nối",
    "กรุณากรอกชื่อบัญชีหรือ URL TikTok LIVE ที่ต้องการเชื่อมต่อ"
  ],
  [
    "Không tìm thấy @username hợp lệ từ dữ liệu nhập vào",
    "ไม่พบชื่อบัญชี TikTok ที่ถูกต้องจากข้อมูลที่กรอก"
  ],
  [
    "Không thể kết nối phòng Live (kiểm tra tài khoản đang phát Live chưa)",
    "ไม่สามารถเชื่อมต่อ LIVE ได้ (โปรดตรวจสอบว่าบัญชีกำลังถ่ายทอดสดอยู่หรือไม่)"
  ],
  [
    "Thành tâm dâng hương bái Phật, cầu bình an cát tường",
    "ตั้งจิตถวายธูปบูชาพระ ขอพรให้สงบสุขและเป็นสิริมงคล"
  ],
  [
    "Thỉnh chuông Bát Nhã, phiền não tiêu tan, trí tuệ sáng ngời",
    "สั่นระฆังปัญญา ขจัดความทุกข์ เพิ่มพูนสติปัญญา"
  ],
  [
    "Cầu cho quốc thái dân an, gia đình mạnh khỏe hạnh phúc",
    "ขอให้บ้านเมืองสงบสุข ประชาชนร่มเย็น ครอบครัวแข็งแรงมีความสุข"
  ],
  [
    "Lời cầu nguyện của thí chủ",
    "คำอธิษฐานของผู้ร่วมทำบุญ"
  ],
  [
    "Cảm tạ thí chủ",
    "ขออนุโมทนาบุญกับ"
  ],
  [
    "Nam mô A Di Đà Phật",
    "นะโม อมิตาภพุทธ"
  ],
  [
    "Thành tâm dâng",
    "ตั้งใจถวาย"
  ],
  [
    "lễ vật",
    "เครื่องสักการะ"
  ],
  [
    "Công đức",
    "บุญกุศล"
  ],
  [
    "Thí chủ",
    "ผู้ร่วมทำบุญ"
  ],
  [
    "thí chủ",
    "ผู้ร่วมทำบุญ"
  ],
  [
    "Bình an",
    "ความสงบสุข"
  ],
  [
    "Gia đạo",
    "ครอบครัว"
  ],
  [
    "Tài lộc",
    "โชคลาภ"
  ],
  [
    "Người xem",
    "ผู้ชม"
  ],
  [
    "Đã vào Chánh Điện lễ Phật",
    "เข้าร่วมสักการะพระในพระวิหารแล้ว"
  ],
  [
    "quà chưa rõ tên",
    "ของขวัญไม่ระบุชื่อ"
  ],
  [
    "Gửi",
    "ส่ง"
  ],
  [
    "Ngắt",
    "ตัดการเชื่อมต่อ"
  ],
  [
    "Mở",
    "เปิด"
  ],
  [
    "Đóng",
    "ปิด"
  ]
];

const COMPLETE_THAI_TRANSLATIONS = [
  ['Nhật Xuất Đông Phương — Mặt Trời Mọc Phương Đông','ตะวันขึ้นทางทิศบูรพา — แสงอาทิตย์ยามรุ่งอรุณ'],
  ['Đông phương nhật xuất chiếu Càn Khôn\nHoa nở đầy cành rạng sắc xuân\nCông danh tài lộc đều viên mãn\nGia đạo bình an phúc lộc tồn.','ตะวันขึ้นส่องหล้าทั่วฟ้าไกล\nดอกไม้บานสะพรั่งรับฤดูใหม่\nการงานเงินทองสมหวังดังตั้งใจ\nครอบครัวสุขใจมีโชคและร่มเย็น'],
  ['Mọi sự mưu cầu đều đại cát đại lợi. Công việc hanh thông, quý nhân phù trợ, gia đình hòa thuận ấm êm.','ทุกสิ่งที่มุ่งหวังมีเกณฑ์สมปรารถนา การงานราบรื่น มีผู้ใหญ่เกื้อหนุน ครอบครัวรักใคร่กลมเกลียว'],
  ['Quẻ số 1, Thượng Thượng Cát, Nhật Xuất Đông Phương. Mọi sự mưu cầu đều đại cát đại lợi, công danh tài lộc viên mãn, quý nhân phù trợ.','เซียมซีหมายเลข 1 มหามงคล ตะวันขึ้นทางทิศบูรพา สิ่งที่ปรารถนามีเกณฑ์สำเร็จ การงานและการเงินสมบูรณ์ มีผู้เกื้อหนุน'],
  ['Kim Liên Khai Nở — Sen Vàng Tỏa Ngát','ดอกบัวทองเบ่งบาน — กลิ่นหอมแผ่ไกล'],
  ['Sen vàng nở rộ giữa hồ trong\nHương thơm lan tỏa khắp non sông\nLòng thành thắp nén nhang cầu nguyện\nTrời Phật chứng tri thỏa ước mong.','ดอกบัวทองเบ่งบานกลางสระใส\nกลิ่นหอมแผ่ไกลทั่วแดนดิน\nตั้งจิตถวายธูปอธิษฐาน\nขอพรสมหวังดังตั้งใจ'],
  ['Tâm thiện lành ắt gặp phước báu. Cầu tài đắc tài, cầu bình an đắc bình an, bệnh tật tiêu trừ.','ผู้มีจิตเมตตาย่อมพบสิ่งดี ขอทรัพย์ย่อมมีทรัพย์ ขอความสงบย่อมพบความสงบ โรคภัยค่อยคลี่คลาย'],
  ['Quẻ số 8, Thượng Cát, Kim Liên Khai Nở. Tâm thiện lành ắt gặp phước báu, cầu tài đắc tài, cầu bình an đắc bình an.','เซียมซีหมายเลข 8 มงคล ดอกบัวทองเบ่งบาน ผู้มีจิตดีงามย่อมพบสิ่งดี ปรารถนาทรัพย์มีเกณฑ์สมหวัง ปรารถนาความสงบย่อมพบความสงบ'],
  ['Long Vân Tương Hội — Rồng Mây Gặp Gỡ','มังกรพบเมฆา — โอกาสดีมาถึง'],
  ['Rồng thiêng gặp hội tầng mây xanh\nVượt Vũ Môn Quan rạng rỡ danh\nThí chủ kiên tâm hành thiện đạo\nPhúc dày lộc vượng khắp gia đình.','มังกรพบเมฆาครามงามสง่า\nข้ามด่านฟ้าชื่อเสียงเลื่องลือไกล\nผู้มีศรัทธามั่นทำความดี\nบุญหนุนนำโชคดีสู่ครอบครัว'],
  ['Thời vận đang lên mạnh mẽ. Thi cử đỗ đạt, kinh doanh phát đạt, gặp cơ hội lớn đổi đời.','ดวงชะตากำลังรุ่งเรือง การศึกษาและการงานมีโอกาสก้าวหน้า ธุรกิจพบช่องทางที่ดี'],
  ['Quẻ số 12, Đại Cát, Long Vân Tương Hội. Thời vận đang lên mạnh mẽ, thi cử đỗ đạt, kinh doanh phát đạt.','เซียมซีหมายเลข 12 มหามงคล มังกรพบเมฆา ดวงชะตากำลังรุ่งเรือง มีโอกาสประสบความสำเร็จทั้งการเรียนและการค้า'],
  ['Xuân Phong Đắc Ý — Gió Xuân Thuận Buồm','ลมวสันต์พัดพา — เดินทางราบรื่น'],
  ['Thuận buồm xuôi gió vượt trùng khơi\nBến giác bình yên nắng rạng ngời\nTài lộc dồi dào nhân duyên tốt\nBốn mùa hưng thịnh rộn niềm vui.','ล่องเรือฝ่าคลื่นลมไปได้ไกล\nถึงฝั่งปลอดภัยแสงทองส่องสดใส\nทรัพย์สินเพิ่มพูนพบมิตรที่ดี\nตลอดสี่ฤดูมีแต่ความสุข'],
  ['Đi xa gặp may, buôn bán thuận lợi, tình duyên êm đẹp, người thân mạnh khỏe.','เดินทางมีโชค การค้าราบรื่น ความรักสดใส คนในครอบครัวแข็งแรง'],
  ['Quẻ số 18, Thượng Cát, Xuân Phong Đắc Ý. Thuận buồm xuôi gió, tài lộc dồi dào, nhân duyên tốt đẹp.','เซียมซีหมายเลข 18 มงคล ลมวสันต์พัดพา ทุกสิ่งดำเนินไปอย่างราบรื่น การเงินดีและมีมิตรสัมพันธ์งดงาม'],
  ['Vũ Quá Thiên Thanh — Mưa Tạnh Trời Trong','ฝนผ่านฟ้าใส — อุปสรรคคลี่คลาย'],
  ['Mưa qua trời lại sáng trong ngần\nGian khó lùi xa đón phúc phần\nGiữ vững lòng thành đừng nản chí\nHoa thơm trái ngọt đến mười phân.','เมื่อฝนผ่านฟ้ากลับสดใส\nความยากลำบากผ่านไปพบสิ่งดี\nมั่นคงในความดีอย่าท้อถอย\nผลแห่งความเพียรจะงอกงาม'],
  ['Khó khăn cũ sắp qua đi, vận may mới đang tới. Hãy kiên nhẫn và giữ tâm bình tĩnh.','อุปสรรคเก่ากำลังผ่านพ้น โชคใหม่กำลังมาถึง ขอให้อดทนและรักษาใจให้สงบ'],
  ['Quẻ số 24, Trung Cát, Vũ Quá Thiên Thanh. Mưa qua trời lại sáng trong, gian khó lùi xa để đón phúc phần mới.','เซียมซีหมายเลข 24 มงคลปานกลาง ฝนผ่านฟ้าใส ปัญหากำลังคลี่คลายและสิ่งดีใหม่กำลังเข้ามา'],
  ['Phúc Tinh Cao Chiếu — Sao Phúc Chiếu Mệnh','ดาวบุญส่องนำทาง — โชคดีคุ้มครอง'],
  ['Phúc tinh rực sáng giữa đêm rằm\nTừ bi Phật độ suốt quanh năm\nTài lộc tự nhiên về gõ cửa\nTrăm điều như ý vạn điều lành.','ดาวมงคลส่องสว่างกลางคืนเพ็ญ\nพระเมตตาคุ้มครองตลอดปี\nทรัพย์สินเงินทองมาเยือนถึงเรือนชาน\nร้อยพันสิ่งสมหวังมีแต่ความดี'],
  ['Sao Phúc chiếu mạng, tai qua nạn khỏi, tiền tài sung túc, gia đạo hưng long.','ดาวมงคลคุ้มครองให้พ้นภัย การเงินอุดมสมบูรณ์ ครอบครัวเจริญรุ่งเรือง'],
  ['Quẻ số 36, Thượng Thượng Cát, Phúc Tinh Cao Chiếu. Sao Phúc chiếu mạng, tài lộc tự nhiên gõ cửa, trăm điều như ý.','เซียมซีหมายเลข 36 มหามงคล ดาวบุญส่องนำทาง มีสิ่งดีคุ้มครอง การเงินมีเกณฑ์รุ่งเรืองและสมหวังหลายประการ'],
  ['Ngọc Xuất Côn Sơn — Ngọc Quý Phát Sáng','หยกจากคุนซาน — คุณค่าปรากฏเด่นชัด'],
  ['Ngọc quý Côn Sơn tỏa ánh ngời\nBấy lâu rèn giũa nay gặp thời\nTri âm tương ngộ cùng nâng đỡ\nSự nghiệp thăng hoa rạng rỡ đời.','หยกงามเปล่งประกายจับแสงทอง\nผ่านการฝึกฝนจนถึงวันสดใส\nพบกัลยาณมิตรคอยเกื้อหนุน\nหน้าที่การงานก้าวหน้ารุ่งเรือง'],
  ['Nỗ lực bấy lâu nay sắp được đền đáp xứng đáng. Có người tốt nâng đỡ trong công việc và cuộc sống.','ความพยายามที่ผ่านมาใกล้ได้รับผลตอบแทน มีคนดีคอยช่วยเหลือทั้งการงานและชีวิต'],
  ['Quẻ số 52, Thượng Cát, Ngọc Xuất Côn Sơn. Nỗ lực bấy lâu sắp được đền đáp xứng đáng, sự nghiệp thăng hoa.','เซียมซีหมายเลข 52 มงคล หยกจากคุนซาน ความพยายามกำลังผลิดอกออกผล การงานมีโอกาสก้าวหน้า'],
  ['Lộc Mã Đồng Hương — Lộc Tài Cùng Tới','โชคลาภมาถึง — ทรัพย์สินเพิ่มพูน'],
  ['Lộc Mã song hành đến tận nhà\nLàm ăn buôn bán nở như hoa\nTâm thành bố thí thêm công đức\nPhú quý vinh hoa khắp một nhà.','โชคลาภเดินทางมาถึงบ้าน\nการค้าขายเติบโตงดงาม\nมีจิตแบ่งปันเพิ่มพูนบุญกุศล\nครอบครัวมั่งคั่งผาสุกทั่วหน้า'],
  ['Quẻ đại lợi về tài lộc và kinh doanh. Nên làm nhiều việc thiện để phúc đức càng thêm bền vững.','เซียมซีนี้ส่งเสริมด้านการเงินและการค้า ควรทำความดีอย่างสม่ำเสมอเพื่อให้บุญกุศลมั่นคง'],
  ['Quẻ số 68, Đại Cát, Lộc Mã Đồng Hương. Đại lợi về tài lộc và buôn bán, phú quý vinh hoa khắp một nhà.','เซียมซีหมายเลข 68 มหามงคล โชคลาภมาถึง การเงินและการค้าดี มีความมั่งคั่งทั่วครอบครัว'],
  ['Nguyệt Nhập Trung Thiên — Trăng Rằm Giữa Đỉnh','จันทร์เพ็ญกลางนภา — สว่างไสวทั่วทิศ'],
  ['Trăng tròn vằng vặc giữa trời thu\nSoi sáng muôn phương sạch mây mù\nTình duyên viên mãn gia đình thuận\nTâm an vạn sự chẳng ưu tư.','จันทร์เต็มดวงส่องกลางฟ้าฤดูสารท\nแสงสว่างขจัดเมฆหมอกทั่วทิศา\nความรักสมบูรณ์ครอบครัวร่มเย็น\nจิตใจสงบไร้ความกังวล'],
  ['Tình duyên và gia đạo vô cùng tốt đẹp. Người độc thân dễ gặp ý trung nhân, gia đình thêm tin vui.','ความรักและครอบครัวมีแนวโน้มดี ผู้ที่ยังโสดอาจพบคนถูกใจ ครอบครัวมีข่าวดี'],
  ['Quẻ số 81, Thượng Cát, Nguyệt Nhập Trung Thiên. Tình duyên viên mãn, gia đình hòa thuận, tâm an vạn sự lành.','เซียมซีหมายเลข 81 มงคล จันทร์เพ็ญกลางนภา ความรักสมหวัง ครอบครัวสามัคคี จิตใจสงบและพบสิ่งดี'],
  ['Vạn Sự Viên Thành — Cửu Cửu Đại Cát','ทุกสิ่งสำเร็จ — มหามงคลยิ่ง'],
  ['Chín tầng mây trắng ánh hào quang\nTừ bi Phật Tổ độ nhân gian\nThí chủ lòng thành dâng lễ bái\nTrọn đời trường thọ hưởng vinh khang.','เมฆาขาวเก้าชั้นเปล่งประกาย\nพระเมตตาคุ้มครองผู้คนทั่วหล้า\nผู้มีศรัทธาตั้งใจถวายสักการะ\nอายุยืนยาวผาสุกและรุ่งเรือง'],
  ['Quẻ tối thượng cát tường. Sức khỏe trường thọ, công danh hiển đạt, vạn sự viên thành.','เซียมซีมงคลสูงสุด สุขภาพแข็งแรงอายุยืน การงานก้าวหน้า ทุกสิ่งสำเร็จสมปรารถนา'],
  ['Quẻ số 99, Thượng Thượng Cát, Vạn Sự Viên Thành. Quẻ tối thượng cát tường, sức khỏe trường thọ, vạn sự như ý.','เซียมซีหมายเลข 99 มหามงคลยิ่ง ทุกสิ่งสำเร็จ สุขภาพแข็งแรงอายุยืน และสมปรารถนาทุกประการ'],
  ['Đang tải trạng thái hệ thống...','กำลังโหลดสถานะระบบ...'],
  ['BẢNG ĐIỀU KHIỂN CHÙA ONLINE TIKTOK LIVE RPC (BUN.JS + ZEROTTS MAI CHI)','แผงควบคุมวัดออนไลน์ TikTok LIVE RPC'],
  ['BẢNG ĐIỀU KHIỂN NHANH RPC & GIẢ LẬP TRỰC TIẾP (ẨN KHI ?obs=1)','แผงควบคุม RPC และจำลองกิจกรรม (ซ่อนเมื่อใช้ ?obs=1)'],
  ['📡 1. Kết Nối Phòng TikTok Live & Giọng Đọc ZeroTTS (Mai Chi)','📡 1. เชื่อมต่อห้อง TikTok LIVE และระบบเสียงภาษาไทย'],
  ['📡 Kết Nối PHÒNG TIKTOK LIVE','📡 เชื่อมต่อห้อง TikTok LIVE'],
  ['🎛️ Điều Khiển Live & RPC','🎛️ ควบคุม LIVE และ RPC'],
  ['Mở Màn Hình OBS 9:16 Sạch (?obs=1)','เปิดหน้าจอ OBS 9:16 แบบไม่มีแถบควบคุม'],
  ['Mở Màn Hình OBS 9:16 Sạch','เปิดหน้าจอ OBS 9:16 แบบไม่มีแถบควบคุม'],
  ['Mở Màn Hình Live Chính','เปิดหน้าจอ LIVE หลัก'],
  ['Mở Admin Đầy Đủ','เปิดหน้าแอดมินเต็มรูปแบบ'],
  ['Giả Lập Bình Luận Người Xem TikTok','จำลองความคิดเห็นจากผู้ชม TikTok'],
  ['Nhập nội dung bình luận TikTok...','กรอกข้อความความคิดเห็น TikTok...'],
  ['Từ khóa tự động nhận diện:','คำสำคัญที่ระบบตรวจจับอัตโนมัติ:'],
  ['Đặt Lại Bảng Công Đức','รีเซ็ตตารางบุญกุศล'],
  ['Hương đã thắp','จำนวนธูปที่ถวายแล้ว'],
  ['Tổng Công Đức','บุญสะสมทั้งหมด'],
  ['Thí chủ xin quẻ:','ผู้เสี่ยงเซียมซี:'],
  ['Thí chủ xin quẻ','ผู้เสี่ยงเซียมซี'],
  ['Đang kết nối','กำลังเชื่อมต่อ'],
  ['Đã kết nối','เชื่อมต่อแล้ว'],
  ['Đã ngắt kết nối','ยกเลิกการเชื่อมต่อแล้ว'],
  ['Không tìm thấy @username hợp lệ từ dữ liệu nhập vào','ไม่พบชื่อบัญชี TikTok ที่ถูกต้องจากข้อมูลที่กรอก'],
  ['Không thể kết nối phòng Live (kiểm tra tài khoản đang phát Live chưa)','ไม่สามารถเชื่อมต่อห้อง LIVE ได้ โปรดตรวจสอบว่าบัญชีกำลังถ่ายทอดสดอยู่หรือไม่'],
  ['Vui lòng nhập @username hoặc link TikTok Live cần kết nối','กรุณากรอกชื่อบัญชีหรือ URL TikTok LIVE ที่ต้องการเชื่อมต่อ'],
  ['Thiếu nội dung text cần đọc','ไม่มีข้อความสำหรับอ่านออกเสียง'],
  ['Không tìm thấy phương thức JSON-RPC:','ไม่พบคำสั่ง JSON-RPC:'],
  ['Không đọc được merit-state.json, dùng mặc định:','ไม่สามารถอ่านไฟล์สถานะบุญได้ จึงใช้ค่าเริ่มต้น:'],
  ['Lỗi lưu file:','เกิดข้อผิดพลาดในการบันทึกไฟล์:'],
  ['ZeroTTS đang ở trạng thái:','ระบบเสียงอยู่ในสถานะ:'],
  ['Sẵn sàng sau','พร้อมใช้งานหลังจาก'],
  ['Giọng mặc định: Mai Chi','เสียงเริ่มต้น: ภาษาไทย'],
  ['Giọng:','เสียง:'],
  ['Đã vào Chánh Điện lễ Phật','เข้ามาสักการะพระประธานในวิหารแล้ว'],
  ['Hữu duyên tương ngộ nơi cửa Phật, cầu bình an may mắn','มีวาสนาได้พบกัน ณ พุทธสถาน ขอให้สงบสุขและโชคดี'],
  ['Con xin gieo quẻ cầu tài lộc đầu tháng ạ','ขอเสี่ยงเซียมซีเพื่อขอพรด้านโชคลาภในต้นเดือน'],
  ['Cầu tháng mới công việc thuận buồm xuôi gió, tài lộc hanh thông','ขอให้เดือนใหม่นี้การงานราบรื่น การเงินคล่องตัว'],
  ['Nam Mô A Di Đà Phật, nguyện cầu thế giới hòa bình chúng sinh an lạc','นะโม อมิตาภพุทธ ขอให้โลกสงบสุขและสรรพชีวิตร่มเย็น'],
  ['Cầu thi cử đỗ đạt điểm cao, sự nghiệp rộng mở','ขอให้สอบผ่านได้คะแนนดีและหน้าที่การงานก้าวหน้า'],
  ['Cầu gia đạo êm ấm, con cái ngoan ngoãn học giỏi','ขอให้ครอบครัวอบอุ่น บุตรหลานเป็นเด็กดีและเรียนเก่ง'],
  ['Cầu gia đình bình an, vạn sự cát tường như ý','ขอให้ครอบครัวสงบสุข ปลอดภัย และสมปรารถนาทุกประการ'],
  ['Cầu cho quốc thái dân an, gia đình mạnh khỏe hạnh phúc','ขอให้บ้านเมืองสงบสุข ประชาชนร่มเย็น ครอบครัวแข็งแรงและมีความสุข'],
  ['Thành tâm dâng hương bái Phật, cầu bình an cát tường','ตั้งจิตถวายธูปบูชาพระ ขอพรให้สงบสุขและเป็นสิริมงคล'],
  ['Thỉnh chuông Bát Nhã, phiền não tiêu tan, trí tuệ sáng ngời','สั่นระฆังปัญญา ขจัดความทุกข์ เพิ่มพูนสติปัญญา'],
  ['Lời cầu nguyện của thí chủ','คำอธิษฐานของผู้ร่วมทำบุญ'],
  ['Cảm tạ thí chủ','ขออนุโมทนาบุญกับผู้ร่วมทำบุญ'],
  ['Thành tâm dâng','ตั้งใจถวาย'],
  ['Công đức vô lượng','บุญกุศลไม่มีประมาณ'],
  ['Đại Thí Chủ dâng lễ','ผู้มีจิตศรัทธาถวายเครื่องสักการะ'],
  ['Đại Lễ Kim Long Chầu Phật','พิธีมังกรทองถวายสักการะพระพุทธเจ้า'],
  ['Mâm Ngũ Quả Cát Tường','พานผลไม้มงคลห้าชนิด'],
  ['Đèn Lưu Ly Trí Tuệ','โคมแก้วแห่งปัญญา'],
  ['Đài Hoa Sen Vàng','แท่นดอกบัวทอง'],
  ['Hoa Sen Vàng Tinh Khiết','ดอกบัวทองบริสุทธิ์'],
  ['Bấm để Thắp Hương Dâng Phật','กดเพื่อถวายธูปบูชาพระ'],
  ['Bấm để Thỉnh Đại Hồng Chung','กดเพื่อสั่นระฆังธรรม'],
  ['Bấm để Gõ Mõ Tích Công Đức','กดเพื่อเคาะไม้สวดมนต์สะสมบุญ'],
  ['Bấm để Xin Xăm / Gieo Quẻ','กดเพื่อเสี่ยงเซียมซี / เสี่ยงทาย'],
  ['Tự động Giả lập Người Xem: ĐANG BẬT','จำลองผู้ชมอัตโนมัติ: เปิดอยู่'],
  ['Tự động Giả lập Người Xem: TẮT','จำลองผู้ชมอัตโนมัติ: ปิด'],
  ['Tên người xem / Thí chủ...','ชื่อผู้ชม / ผู้ร่วมทำบุญ...'],
  ['Lời cầu nguyện...','คำอธิษฐาน...'],
  ['Bảng Điều Khiển JSON-RPC 2.0 — Chùa Linh Ứng TikTok Live','แผงควบคุม JSON-RPC 2.0 — วัดหลินอึ๋ง TikTok LIVE'],
  ['Chùa Linh Ứng Online — TikTok Live RPC (Đức Phật A Di Đà 9:16)','วัดหลินอึ๋งออนไลน์ — TikTok LIVE RPC (พระอมิตาภพุทธ 9:16)'],
  ['Đức Phật A Di Đà Chánh Điện','พระอมิตาภพุทธภายในพระวิหาร'],
  ['Thượng Thượng Cát','มหามงคลสูงสุด'],
  ['Thượng Cát','มงคลยิ่ง'],
  ['Trung Cát','มงคลปานกลาง'],
  ['Đại Cát','มหามงคล'],
  ['Nhật Xuất Đông Phương','ตะวันขึ้นทางทิศบูรพา'],
  ['Mặt Trời Mọc Phương Đông','พระอาทิตย์ขึ้นทางทิศตะวันออก'],
  ['Mọi sự mưu cầu','ทุกสิ่งที่มุ่งหวัง'],
  ['quà chưa rõ tên','ของขวัญไม่ระบุชื่อ'],
  ['Thí Chủ Hữu Duyên','ผู้มีบุญร่วมสร้างกุศล'],
  ['Thí Chủ Minh Tâm','ผู้มีจิตศรัทธา'],
  ['Thí chủ','ผู้ร่วมทำบุญ'],
  ['thí chủ','ผู้ร่วมทำบุญ'],
  ['Người xem','ผู้ชม'],
  ['Bình luận','ความคิดเห็น'],
  ['Thả tim','กดหัวใจ'],
  ['Tặng quà','ส่งของขวัญ'],
  ['Chia sẻ','แชร์'],
  ['Theo dõi','ติดตาม'],
  ['Kết Nối','เชื่อมต่อ'],
  ['Ngắt Kết Nối','ตัดการเชื่อมต่อ'],
  ['Kết Nối Live','เชื่อมต่อ LIVE'],
  ['Đọc thử Giọng Mai Chi','ทดสอบเสียงภาษาไทย'],
  ['Gửi Comment','ส่งความคิดเห็น'],
  ['Gửi Lệnh Tương Tác','ส่งคำสั่งโต้ตอบ'],
  ['Âm Thanh Chùa & Giọng Đọc Khấn','เสียงวัดและเสียงอ่านคำอธิษฐาน'],
  ['Bật Âm Thanh Chùa & Giọng Đọc','เปิดเสียงวัดและเสียงอ่าน'],
  ['Âm Thanh Chùa Đã Sẵn Sàng','✅ ระบบเสียงของวัดพร้อมใช้งานแล้ว'],
  ['Giọng Đọc ZeroTTS','ระบบเสียงอ่านภาษาไทย'],
  ['Giọng Đọc','เสียงอ่าน'],
  ['Nhạc Nền','เพลงพื้นหลัง'],
  ['Hiệu Ứng','เอฟเฟกต์'],
  ['Âm lượng Nhạc nền','ระดับเสียงเพลงพื้นหลัง'],
  ['Âm lượng Giọng đọc','ระดับเสียงอ่าน'],
  ['Âm lượng Hiệu ứng','ระดับเสียงเอฟเฟกต์'],
  ['Thắp 3 Nén Hương','ถวายธูป 3 ดอก'],
  ['Thả Đèn Hoa Đăng','ปล่อยโคมอธิษฐาน'],
  ['Thỉnh Chuông Chùa','สั่นระฆังวัด'],
  ['Thỉnh Đại Hồng Chung','สั่นระฆังธรรม'],
  ['Gõ Mõ','เคาะไม้สวดมนต์'],
  ['Xin Xăm / Gieo Quẻ','เสี่ยงเซียมซี / เสี่ยงทาย'],
  ['Dâng Hoa Sen Vàng','ถวายดอกบัวทอง'],
  ['Dâng hương cầu bình an','ถวายธูปขอพรให้สงบสุข'],
  ['Dâng hương','ถวายธูป'],
  ['Thắp hương','ถวายธูป'],
  ['Thắp Hương','ถวายธูป'],
  ['Thỉnh Chuông','สั่นระฆัง'],
  ['Xin Xăm','เสี่ยงเซียมซี'],
  ['Cầu phúc','ขอพร'],
  ['Thả hoa đăng','ปล่อยโคม'],
  ['Hoa sen','ดอกบัว'],
  ['NGHI LỄ','พิธีกรรม'],
  ['CÚNG DƯỜNG','ถวายเครื่องสักการะ'],
  ['SANCTUARY INTERACTION','กิจกรรมภายในวัด'],
  ['TẤM LÒNG THÀNH','ผู้มีจิตศรัทธา'],
  ['CHÙA LINH ỨNG','วัดหลินอึ๋ง'],
  ['CHÙA ONLINE','วัดออนไลน์'],
  ['ĐỨC PHẬT A DI ĐÀ','พระอมิตาภพุทธเจ้า'],
  ['ĐẠI HÙNG BẢO ĐIỆN','พระมหาวิหาร'],
  ['Tự động Giả lập Người Xem','จำลองผู้ชมอัตโนมัติ'],
  ['Kết Nối Phòng TikTok Live','เชื่อมต่อห้อง TikTok LIVE'],
  ['Phòng TikTok Live','ห้อง TikTok LIVE'],
  ['Trạng thái hệ thống','สถานะระบบ'],
  ['Nhật Ký Tương Tác Gần Nhất','บันทึกกิจกรรมล่าสุด'],
  ['Nhật Ký','บันทึก'],
  ['Công Đức','บุญกุศล'],
  ['Công đức','บุญกุศล'],
  ['Công Đức Vô Lượng','บุญกุศลไม่มีประมาณ'],
  ['Hương đã thắp:','จำนวนธูปที่ถวายแล้ว:'],
  ['Tổng Công Đức:','บุญสะสมทั้งหมด:'],
  ['mắt','ผู้ชม'],
  ['Mở','เปิด'],
  ['Đóng','ปิด'],
  ['Gửi','ส่ง'],
  ['Bật','เปิด'],
  ['Tắt','ปิด'],
  ['Đang tải','กำลังโหลด'],
  ['Không tìm thấy','ไม่พบ'],
  ['Lỗi kết nối','ข้อผิดพลาดในการเชื่อมต่อ'],
  ['Nam mô A Di Đà Phật','นะโม อมิตาภพุทธ'],
  ['Nam Mô A Di Đà Phật','นะโม อมิตาภพุทธ'],
  ['Việt Nam','ประเทศไทย'],
  ['Tiếng Việt','ภาษาไทย'],
  ['tiếng Việt','ภาษาไทย']
];
translations.push(...COMPLETE_THAI_TRANSLATIONS);


const LIVE_RUNTIME_TRANSLATIONS = [
 ['Đang kết nối @','กำลังเชื่อมต่อ @'],
 ['ĐANG BẬT','เปิดอยู่'],
 ['Dâng hương cầu an','ถวายธูปขอพรให้สงบสุข'],
 ['gõ mõ','เคาะไม้สวดมนต์'],
 ['thỉnh Đại Hồng Chung','สั่นระฆังธรรม'],
 ['gieo được Quẻ số','ได้รับเซียมซีหมายเลข'],
 ['tương tác','ร่วมกิจกรรม'],
 ['đang thành tâm xin quẻ...','กำลังตั้งจิตเสี่ยงเซียมซี...'],
 ['Đang xin xăm...','กำลังเสี่ยงเซียมซี...'],
 ['TỰ ĐỘNG GIẢ LẬP ĐÔNG NGƯỜI','จำลองผู้ชมจำนวนมากอัตโนมัติ'],
 ['nén nhang','ดอกธูป'],
 ['Tham gia nghi lễ','เข้าร่วมพิธี'],
 ['Cầu gia đạo bình an, tài lộc vượng phát','ขอให้ครอบครัวสงบสุขและการเงินรุ่งเรือง'],
 ['Cầu gia đình bình an, tài lộc hanh thông, vạn sự như ý','ขอให้ครอบครัวสงบสุข การเงินคล่องตัว และสมปรารถนาทุกประการ'],
 ['Nam mô A Di Đà Phật. Cảm tạ thí chủ','นะโม อมิตาภพุทธ ขออนุโมทนาบุญกับผู้ร่วมทำบุญ'],
 ['đã thành tâm thắp','ได้ตั้งใจถวาย'],
 ['nén hương thơm','ธูปหอม'],
 ['thỉnh Đại Hồng Chung cầu nguyện','สั่นระฆังธรรมเพื่ออธิษฐาน'],
 ['Công đức vô lượng! Cảm tạ thí chủ','บุญกุศลไม่มีประมาณ ขออนุโมทนาบุญกับ'],
 ['đã phát tâm dâng cúng','ได้ตั้งจิตถวาย'],
 ['tích thêm','เพิ่มพูน'],
 ['điểm công đức','แต้มบุญกุศล'],
 ['Nguyện cầu chư Phật gia hộ cho thí chủ vạn sự cát tường như ý.','ขอพระพุทธคุณคุ้มครองให้ผู้มีจิตศรัทธาพบแต่ความสุขความเจริญ'],
 ['Gia đạo, Tài lộc và Bình an','ครอบครัว โชคลาภ และความสงบสุข'],
 ['Xin xăm: Quẻ số','เสี่ยงเซียมซี: หมายเลข'],
 ['vừa gieo được','เพิ่งได้รับ'],
 ['Đại Lễ Hào Quang Vạn Trượng','พิธีมหามงคลแสงธรรมเจิดจรัส'],
 ['kính lễ Đức Phật A Di Đà','เพื่อสักการะพระอมิตาภพุทธ'],
 ['Chưa kết nối được ngay:','ยังไม่สามารถเชื่อมต่อได้ในขณะนี้:'],
 ['Khởi chạy worker với','เริ่มทำงานระบบเสียงด้วย'],
 ['Đã kết nối phòng','เชื่อมต่อห้องแล้ว'],
 ['Cảm tạ','ขออนุโมทนา'],
 ['Hạnh phúc','ความสุข'],
 ['Mạnh khỏe','สุขภาพแข็งแรง'],
 ['Cát tường','เป็นสิริมงคล'],
 ['Thành tâm','ตั้งจิต'],
 ['Tương tác','กิจกรรมโต้ตอบ'],
 ['Tương Tác','กิจกรรมโต้ตอบ'],
 ['Nghi Thức','พิธีกรรม'],
 ['Người Xem','ผู้ชม'],
 ['Bình Luận','ความคิดเห็น'],
 ['Màn Hình','หน้าจอ'],
 ['Đã ngắt','ยกเลิกแล้ว'],
 ['Không thể kết nối','ไม่สามารถเชื่อมต่อได้'],
 ['Vui lòng','กรุณา'],
 ['Mắt','ผู้ชม']
];
translations.push(...LIVE_RUNTIME_TRANSLATIONS);


const ADMIN_EXACT_TRANSLATIONS = [
 ['Con xin gieo quẻ cầu tài lộc đầu tháng ạ','ข้าพเจ้าขอเสี่ยงเซียมซีเพื่อขอพรด้านโชคลาภในช่วงต้นเดือน'],
 ['Đại Thí Chủ Minh Tâm','ผู้ร่วมทำบุญผู้มีจิตศรัทธา'],
 ['Từ khóa tự động nhận diện:','คำสำคัญที่ระบบตรวจจับอัตโนมัติ:'],
 ['thắp hương','ถวายธูป'],
 ['bái phật','กราบไหว้พระ'],
 ['cầu ...','คำอธิษฐาน / ขอพร'],
 ['xin xăm / gieo quẻ','เสี่ยงเซียมซี / เสี่ยงทาย'],
 ['thỉnh chuông','สั่นระฆัง'],
 ['gõ mõ','เคาะไม้สวดมนต์'],
 ['Tên người xem...','ชื่อผู้ชม...'],
 ['Nhập nội dung bình luận TikTok...','กรอกข้อความความคิดเห็น TikTok...'],
 ['Lời cầu nguyện...','คำอธิษฐาน...']
];
translations.push(...ADMIN_EXACT_TRANSLATIONS);


const GREETING_CLEANUP_TRANSLATIONS = [
  ['Nam mô A Di Đà Phật. Chùa Linh Ứng Online xin kính chào quý thí chủ thập phương.', 'นะโม อมิตาภพุทธ วัดหลินอึ๋งออนไลน์ขอต้อนรับผู้ร่วมทำบุญจากทั่วสารทิศ'],
  ['Nam Mô A Di Đà Phật. Chùa Linh Ứng Online xin kính chào quý thí chủ thập phương.', 'นะโม อมิตาภพุทธ วัดหลินอึ๋งออนไลน์ขอต้อนรับผู้ร่วมทำบุญจากทั่วสารทิศ'],
  ['Chùa Linh Ứng Online xin kính chào quý thí chủ thập phương.', 'วัดหลินอึ๋งออนไลน์ขอต้อนรับผู้ร่วมทำบุญจากทั่วสารทิศ'],
  ['xin kính chào quý', 'ขอต้อนรับ'],
  ['Xin kính chào quý', 'ขอต้อนรับ'],
  ['thập phương', 'จากทั่วสารทิศ'],
  ['Thập phương', 'จากทั่วสารทิศ']
];
translations.push(...GREETING_CLEANUP_TRANSLATIONS);


const GREETING_TOKEN_TRANSLATIONS = [
  ['xin kính chào quý', 'ขอต้อนรับ'],
  ['Xin kính chào quý', 'ขอต้อนรับ'],
  ['kính chào quý', 'ขอต้อนรับ'],
  ['Kính chào quý', 'ขอต้อนรับ'],
  ['xin kính chào', 'ขอต้อนรับ'],
  ['Xin kính chào', 'ขอต้อนรับ'],
  ['kính chào', 'ขอต้อนรับ'],
  ['Kính chào', 'ขอต้อนรับ'],
  ['quý thí chủ', 'ผู้ร่วมทำบุญ'],
  ['Quý thí chủ', 'ผู้ร่วมทำบุญ'],
  ['quý', 'ผู้มีจิตศรัทธา'],
  ['Quý', 'ผู้มีจิตศรัทธา'],
  ['thập phương', 'จากทั่วสารทิศ'],
  ['Thập phương', 'จากทั่วสารทิศ'],
  ['THẬP PHƯƠNG', 'จากทั่วสารทิศ']
];
translations.push(...GREETING_TOKEN_TRANSLATIONS);

translations.sort((a, b) => b[0].length - a[0].length);

function collectJsFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? collectJsFiles(full) : (entry.isFile() && entry.name.endsWith('.js') ? [path.relative(root, full).split(path.sep).join('/') ] : []);
  });
}
const filesToTranslate = ['public/index.html', 'public/admin.html', ...collectJsFiles(path.join(root, 'public/js'))];
for (const file of filesToTranslate) {
  let html = fs.existsSync(path.join(root, file)) ? read(file) : null;
  if (html === null) continue;
  html = html.replaceAll('lang="vi"', 'lang="th"');
  html = html.replaceAll('Be+Vietnam+Pro', 'Noto+Sans+Thai');
  html = html.replaceAll('Noto+Serif', 'Noto+Sans+Thai');
  html = html.replaceAll('Be Vietnam Pro', 'Noto Sans Thai');
  html = html.replaceAll('Noto Serif', 'Noto Sans Thai');
  html = html.replaceAll('maichi', 'th-TH-PremwadeeNeural');
  for (const [from, to] of translations) html = html.replaceAll(from, to);
  if (file === 'public/admin.html') {
    html = html.replace(
      '<input type="text" id="ttUser" placeholder="กรอกชื่อบัญชี TikTok ที่กำลัง LIVE" />',
      '<input type="text" id="ttUser" placeholder="กรอก @username หรือลิงก์แชร์ TikTok LIVE..." />'
    );
    html = html.replace(
      '<button class="btn gold" id="btnConn">Kết Nối Live</button>',
      '<button class="btn gold" id="btnConn">เชื่อมต่อ LIVE</button>'
    );
    html = html.replace(
      '<div class="row">\n          <input type="text" id="ttsDirectText"',
      '<div class="row">\n          <input type="text" id="ttRoomId" inputmode="numeric" placeholder="Room ID (ถ้ามี) เพื่อเชื่อมต่อโดยตรง" />\n        </div>\n        <div class="row">\n          <input type="text" id="ttsDirectText"'
    );
    html = html.replace(
      "const username = document.getElementById('ttUser').value.trim();\n      sendRpc('live.connect', { username });",
      "const username = document.getElementById('ttUser').value.trim();\n      const roomId = document.getElementById('ttRoomId').value.trim();\n      sendRpc('live.connect', { username, roomId });"
    );
  }

    html = html.replace(
      /document\.getElementById\('btnConn'\)\.onclick\s*=\s*\(\)\s*=>\s*\{[\s\S]*?\n\s*\};/,
      `document.getElementById('btnConn').onclick = async () => {
      const button = document.getElementById('btnConn');
      const output = document.getElementById('rpcOutput');
      const username = document.getElementById('ttUser').value.trim();
      const roomInput = document.getElementById('ttRoomId');
      const roomId = roomInput ? roomInput.value.trim() : '';
      if (!username && !roomId) {
        output.textContent = 'กรุณากรอก @Username หรือลิงก์แชร์ TikTok LIVE ก่อนเชื่อมต่อ';
        document.getElementById('ttUser').focus();
        return;
      }
      button.disabled = true;
      const oldLabel = button.textContent;
      button.textContent = 'กำลังเชื่อมต่อ TikTok LIVE...';
      output.textContent = 'กำลังส่งคำสั่งเชื่อมต่อ กรุณารอสักครู่...';
      try {
        const result = await sendRpc('live.connect', { username, roomId });
        output.textContent = JSON.stringify(result, null, 2);
      } catch (error) {
        output.textContent = 'เชื่อมต่อไม่สำเร็จ: ' + (error?.message || String(error));
      } finally {
        button.disabled = false;
        button.textContent = oldLabel;
      }
    };`
    );
    html = html.replace(
      `const res = await fetch('/rpc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();`,
      `const res = await fetch('/rpc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('HTTP ' + res.status + ' จาก /rpc');
      const data = await res.json();`
    );

  if (file === 'public/index.html') {
    html = html.replace(
      'value="Cầu cho gia đình bình an, tài lộc hanh thông, vạn sự như ý"',
      'value="ขอให้ครอบครัวสงบสุข การเงินคล่องตัว และสมปรารถนาทุกประการ"'
    );
    html = html.replace(
      'placeholder="Lời cầu nguyện..."',
      'placeholder="คำอธิษฐาน..."'
    );
  }
  html = html.replaceAll('zenfacts_vn', 'allaboutitscript');
  write(file, html);
}

let css = read('public/css/live.css').replaceAll('Be Vietnam Pro', 'Noto Sans Thai');
write('public/css/live.css', css);

let server = read('server.js');
server = server.replace(
  `async function connectTikTokLive(usernameOrUrl) {`,
  `async function resolveTikTokRoomId(rawInput, username) {
  const input = String(rawInput || '').trim();
  if (/^\\d{8,}$/.test(input)) return input;
  const cleanUser = String(username || input.replace(/^@/, '').split(/[/?#]/)[0]).trim();
  if (!cleanUser || /^https?:\\/\\//i.test(cleanUser)) return null;

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/json,application/xhtml+xml,*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.tiktok.com/@' + encodeURIComponent(cleanUser) + '/live',
    'Origin': 'https://www.tiktok.com'
  };
  const extractRoom = (value, depth = 0) => {
    if (!value || depth > 12) return '';
    if (typeof value === 'string') {
      const unescaped = value.replace(/\\\\u002F/g, '/').replace(/\\\\\\"/g, '"').replace(/\\\\\\\\/g, '\\\\');
      if (unescaped !== value) {
        const found = extractRoom(unescaped, depth + 1);
        if (found) return found;
      }
      return '';
    }
    if (Array.isArray(value)) {
      for (const item of value) {
        const found = extractRoom(item, depth + 1);
        if (found) return found;
      }
      return '';
    }
    if (typeof value === 'object') {
      for (const key of ['roomId', 'room_id', 'roomID', 'room_id_str']) {
        const candidate = value[key];
        if (candidate != null && /^\\d{8,}$/.test(String(candidate))) return String(candidate);
      }
      for (const key of ['liveRoom', 'live_room', 'user', 'data', 'userInfo', 'user_info', 'LiveRoom', '__DEFAULT_SCOPE__']) {
        if (value[key] != null) {
          const found = extractRoom(value[key], depth + 1);
          if (found) return found;
        }
      }
      for (const child of Object.values(value)) {
        if (child && typeof child === 'object') {
          const found = extractRoom(child, depth + 1);
          if (found) return found;
        }
      }
    }
    return '';
  };

  const apiUrls = [
    'https://www.tiktok.com/api-live/user/room/?uniqueId=' + encodeURIComponent(cleanUser) + '&sourceType=54',
    'https://m.tiktok.com/api-live/user/room/?uniqueId=' + encodeURIComponent(cleanUser) + '&sourceType=54'
  ];
  for (const apiUrl of apiUrls) {
    try {
      const response = await fetch(apiUrl, { headers, redirect: 'follow', signal: AbortSignal.timeout(10000) });
      const body = await response.text();
      try {
        const data = JSON.parse(body);
        const room = extractRoom(data?.data?.user) || extractRoom(data?.data?.liveRoom) || extractRoom(data);
        if (room) {
          console.log('[TikTok Room ID] Resolved via API-live: ' + room);
          return room;
        }
        console.warn('[TikTok Room ID API]', JSON.stringify({ host: new URL(apiUrl).host, status: response.status, message: data?.message || data?.status_msg || 'roomId not present' }));
      } catch (_) {
        console.warn('[TikTok Room ID API] Non-JSON response, HTTP ' + response.status);
      }
    } catch (err) {
      console.warn('[TikTok Room ID API]', err?.message || String(err));
    }
  }

  const pageUrls = [
    'https://www.tiktok.com/@' + encodeURIComponent(cleanUser) + '/live',
    'https://www.tiktok.com/@' + encodeURIComponent(cleanUser)
  ];
  for (const pageUrl of pageUrls) {
    try {
      const response = await fetch(pageUrl, { headers, redirect: 'follow', signal: AbortSignal.timeout(12000) });
      const html = await response.text();
      const finalUrl = response.url || pageUrl;
      const urlRoom = finalUrl.match(/\\/(?:live|room)\\/(\\d{8,})(?:[/?#]|$)/i);
      if (urlRoom) return urlRoom[1];

      const scriptPatterns = [
        /<script[^>]+id=["']SIGI_STATE["'][^>]*>([\\s\\S]*?)<\\/script>/i,
        /<script[^>]+id=["']__UNIVERSAL_DATA_FOR_REHYDRATION__["'][^>]*>([\\s\\S]*?)<\\/script>/i
      ];
      for (const pattern of scriptPatterns) {
        const match = html.match(pattern);
        if (match) {
          try {
            const room = extractRoom(JSON.parse(match[1]));
            if (room) {
              console.log('[TikTok Room ID] Resolved from embedded LIVE page data: ' + room);
              return room;
            }
          } catch (_) {}
        }
      }

      const source = html.replace(/\\\\\\"/g, '"').replace(/\\\\\\\\/g, '\\\\');
      const roomPatterns = [
        /["']roomId["']\\s*:\\s*["']?(\\d{8,})/i,
        /["']room_id["']\\s*:\\s*["']?(\\d{8,})/i,
        /["']roomID["']\\s*:\\s*["']?(\\d{8,})/i,
        /liveRoomUserInfo["'][\\s\\S]{0,2000}?["']roomId["']\\s*:\\s*["']?(\\d{8,})/i
      ];
      for (const pattern of roomPatterns) {
        const match = source.match(pattern);
        if (match) {
          console.log('[TikTok Room ID] Resolved from LIVE page HTML: ' + match[1]);
          return match[1];
        }
      }
      console.warn('[TikTok Room ID Page]', JSON.stringify({ status: response.status, finalUrl, bytes: html.length, foundUniversalData: html.includes('__UNIVERSAL_DATA_FOR_REHYDRATION__'), foundSigiState: html.includes('SIGI_STATE') }));
    } catch (err) {
      console.warn('[TikTok Room ID Page Resolve]', err?.message || String(err));
    }
  }
  return null;
}

async function connectTikTokLive(usernameOrUrl) {`
);
server = server.replace(
  `async function connectTikTokLive(usernameOrUrl) {
  const cleanUser = await resolveTikTokUsername(usernameOrUrl);`,
  `async function connectTikTokLive(usernameOrUrl, roomIdOverride = '') {
  const directRoomId = String(roomIdOverride || '').trim();
  if (directRoomId && !/^\\d+$/.test(directRoomId)) throw new Error('Room ID ต้องเป็นตัวเลขเท่านั้น');
  const autoRoomId = directRoomId || await resolveTikTokRoomId(usernameOrUrl, '');
  const cleanUser = autoRoomId
    ? (String(usernameOrUrl || '').trim().replace(/^@/, '').split(/[/?#]/)[0] || 'room_' + autoRoomId)
    : await resolveTikTokUsername(usernameOrUrl);
  if (autoRoomId) console.log('[TikTok Room ID] Automatically resolved room ' + autoRoomId + ' for ' + cleanUser);`
);
server = server.replace(
  /async function resolveTikTokUsername\(rawInput\) \{[\s\S]*?\n\}/,
  `async function resolveTikTokUsername(rawInput) {
  const input = String(rawInput || '').trim();
  if (!input) throw new Error('กรุณากรอก @username หรือลิงก์ TikTok LIVE');
  if (/^\\d{8,}$/.test(input)) return 'room_' + input;
  if (/^https?:\\/\\//i.test(input) || /(?:^|\\.)tiktok\\.com\\//i.test(input)) {
    const urlToFetch = /^https?:\\/\\//i.test(input) ? input : 'https://' + input;
    const directRoom = urlToFetch.match(/\\/(?:live|room)\\/(\\d{8,})(?:[/?#]|$)/i);
    if (directRoom) return 'room_' + directRoom[1];
    try {
      const resp = await fetch(urlToFetch, {
        redirect: 'follow',
        signal: AbortSignal.timeout(9000),
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36' }
      });
      const finalUrl = resp.url || urlToFetch;
      const userMatch = finalUrl.match(/tiktok\\.com\\/@([^/?#]+)/i);
      if (userMatch?.[1]) return userMatch[1];
      const roomMatch = finalUrl.match(/\\/(?:live|room)\\/(\\d{8,})(?:[/?#]|$)/i);
      if (roomMatch) return 'room_' + roomMatch[1];
    } catch (err) {
      console.warn('[TikTok URL Resolve Warning]', err?.message || String(err));
    }
    throw new Error('ไม่สามารถอ่านลิงก์ TikTok ได้ กรุณาใช้ลิงก์แชร์ LIVE หรือ @username');
  }
  return input.replace(/^@/, '').split(/[/?#]/)[0].trim();
}`
);
server = server.replace(
  'const roomState = await connection.connect();',
  'const roomState = await connection.connect(autoRoomId || undefined);'
);
server = server.replace(
  "return await connectTikTokLive(params.username);",
  "return await connectTikTokLive(params.username, params.roomId);"
);
server = server.replace(
  'const commentCooldownMap = new Map();',
  `function formatTikTokError(err) {
    const summarize = (item) => ({
      name: item?.name || 'Error',
      message: item?.message || String(item),
      routeId: item?.config?.routeId || item?.routeId || null,
      code: item?.code || null,
      statusCode: item?.response?.statusCode || item?.statusCode || null
    });
    const details = summarize(err);
    const requestErrs = err?.config?.requestErrs;
    if (Array.isArray(requestErrs)) details.requestErrs = requestErrs.map(summarize);
    else if (requestErrs) details.requestErrs = summarize(requestErrs);
    if (err?.cause) details.cause = summarize(err.cause);
    return JSON.stringify(details);
  }

  const commentCooldownMap = new Map();`
);
server = server.replace(
  "console.warn('[TikTok Live Warning]', state.tiktok.lastError);",
  "console.warn('[TikTok Live Warning]', formatTikTokError(err));"
);
server = server.replace(
  "const message = err?.message || 'Không thể kết nối phòng Live (kiểm tra tài khoản đang phát Live chưa)';",
  "console.error('[TikTok Room ID / Connect Diagnostics]', formatTikTokError(err));\n    const message = err?.message || 'Không thể kết nối phòng Live (kiểm tra tài khoản đang phát Live chưa)';"
);
for (const [from, to] of translations) server = server.replaceAll(from, to);
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

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
fs.copyFileSync(path.join(scriptDir, 'tts_worker.py'), path.join(root, 'tts_worker.py'));
console.log('ติดตั้งส่วนแปลภาษาไทยและระบบเสียงภาษาไทยแล้ว');
