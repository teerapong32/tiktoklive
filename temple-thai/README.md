# ส่วนเสริมภาษาไทยสำหรับ TikTok Live Temple RPC

โฟลเดอร์ `temple-source/` เป็น Git submodule ที่อ้างอิงโปรเจกต์ต้นฉบับ
[zane-tv/tiktok-live-temple-rpc](https://github.com/zane-tv/tiktok-live-temple-rpc)
โดยตรึงไว้ที่ commit `c967132b43d266d2d0c7d25e5b7f219bd6379a08`

## สิ่งที่ปรับเป็นภาษาไทย

- กำหนดภาษาเอกสารหน้า LIVE และ Admin เป็น `th`
- เปลี่ยนฟอนต์ UI เป็น Noto Sans Thai
- เปลี่ยนชื่อเสียงและสถานะจาก ZeroTTS / Mai Chi เป็นเสียงสังเคราะห์ภาษาไทย
- เปลี่ยน Worker ที่กรองข้อความเวียดนามและเรียก `normalize_vi_text` เป็น Thai TTS worker
- ใช้เสียงประสาทเทียมภาษาไทย `th-TH-PremwadeeNeural` (หญิง) และ `th-TH-NiwatNeural` (ชาย)
- คงโปรโตคอล JSON worker เดิม เพื่อให้ server เดิมส่งไฟล์เสียงผ่าน `/tts-cache` ได้

> หมายเหตุ: UI ต้นฉบับมีข้อความภาษาไทยอยู่แล้วเป็นส่วนใหญ่ จุดที่เป็นภาษาเวียดนามจริงและทำให้เสียงไทยใช้ไม่ได้คือ TTS worker ซึ่งเดิมกรองเฉพาะอักษรเวียดนามและเรียก normalize_vi_text

## ติดตั้งและเริ่มใช้งาน

ต้อง clone พร้อม submodule:

```bash
git clone --recurse-submodules https://github.com/teerapong32/tiktoklive.git
cd tiktoklive
node temple-thai/apply-thai.mjs
cd temple-source
npm install
python3 -m venv .venv
. .venv/bin/activate
pip install edge-tts
npm start
```

หาก clone repository ไปแล้ว ให้ดึง submodule ก่อน:

```bash
git submodule update --init --recursive
node temple-thai/apply-thai.mjs
```

เสียง Edge TTS ต้องเชื่อมต่ออินเทอร์เน็ตเพื่อสังเคราะห์เสียงและดาวน์โหลดเสียงครั้งแรก เสียงที่สร้างแล้วจะถูกเก็บไว้ใน `data/tts-cache`

## URL ภายในระบบ

- LIVE: `http://localhost:3000/`
- OBS แนวตั้ง 9:16: `http://localhost:3000/?obs=1`
- Admin: `http://localhost:3000/admin`

การเพิ่ม submodule และส่วนเสริมนี้ยังไม่เปลี่ยนค่า Root Directory หรือการ Deploy ของ Vercel/Render ที่ใช้งานอยู่ ต้องตั้งบริการให้ build จาก `temple-source` แยกต่างหากก่อนเปิดใช้งานจริง
