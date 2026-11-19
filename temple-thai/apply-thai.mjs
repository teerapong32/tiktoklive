import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
translations.push(...EXTRA_TRANSLATIONS);

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
  html = html.replaceAll('zenfacts_vn', 'allaboutitscript');
  write(file, html);
}

let css = read('public/css/live.css').replaceAll('Be Vietnam Pro', 'Noto Sans Thai');
write('public/css/live.css', css);

let server = read('server.js');
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
