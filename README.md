# Live สายมู — GitHub + Vercel

โครงสร้าง
- `web/`      หน้าเว็บฉากไลฟ์ (ไฟล์ static) -> ขึ้น Vercel
- `backend/`  ตัวดึงคอมเมนต์/ของขวัญ/โปรไฟล์จาก TikTok (ต้องรันค้างตลอด) -> ห้ามขึ้น Vercel

## ส่วนที่ 1: ขึ้น Vercel (ใช้ได้เลย ไม่ต้องมี backend)
1. สร้าง repo ใหม่บน GitHub แล้วอัปโหลดทั้งโฟลเดอร์นี้ (Add file -> Upload files)
2. vercel.com -> Add New Project -> เลือก repo
3. ตั้ง Root Directory = web, Framework Preset = Other, ไม่ต้องมี Build Command -> Deploy
4. เปิดลิงก์ที่ได้บนมือถือ/คอม ใช้งานได้ทันที (พิมพ์คอมเมนต์เอง หรือโหมดออโต้)

## ส่วนที่ 2 (ไม่บังคับ): คอมเมนต์เข้าอัตโนมัติ
Vercel รัน backend ไม่ได้ (เป็นเซิร์ฟเวอร์เลส จึงเกิด 500 FUNCTION_INVOCATION_FAILED) ให้ใช้ที่รันค้างได้ เช่น Render
1. render.com -> New Web Service -> เลือก repo เดิม
2. Root Directory = backend, Build Command = npm install, Start Command = npm start
3. (แนะนำ) Environment: ALLOW_ORIGIN = ลิงก์ Vercel ของคุณ เช่น https://xxx.vercel.app
4. ได้ลิงก์ https://xxx.onrender.com -> วางในช่อง "ที่อยู่เซิร์ฟเวอร์คอมเมนต์" ตอนตั้งค่าหน้าเว็บ
แพ็กเกจฟรีของ Render จะหลับเมื่อไม่มีคนใช้ ครั้งแรกอาจรอ ~1 นาที ให้เปิดลิงก์ backend ค้างไว้ก่อนไลฟ์

หมายเหตุ: ตัวดึงข้อมูลเป็นไลบรารีไม่เป็นทางการ อาจหยุดทำงานเมื่อ TikTok เปลี่ยนระบบ
