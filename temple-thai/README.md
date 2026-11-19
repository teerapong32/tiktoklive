# ติดตั้ง TikTok Live Temple ภาษาไทย

โปรเจกต์ต้นฉบับ: https://github.com/zane-tv/tiktok-live-temple-rpc
Repository หลัก: https://github.com/teerapong32/tiktoklive

## คุณสมบัติ
- ฉากวัดแนวตั้ง 9:16 สำหรับ TikTok LIVE / OBS
- รับกิจกรรม TikTok LIVE ผ่าน TikTok Live Connector
- ระบบจุดธูป สวดคำอธิษฐาน เสี่ยงเซียมซี กดหัวใจ แชร์ ติดตาม และของขวัญ
- แผง Admin และ JSON-RPC / WebSocket
- เปลี่ยนตัวกรองข้อความจากภาษาเวียดนามเป็น Unicode ทุกภาษา เพื่อให้รองรับชื่อและคอมเมนต์ภาษาไทย
- เปลี่ยน ZeroTTS ภาษาเวียดนามเป็น Microsoft Edge Neural TTS ภาษาไทย
- เสียงเริ่มต้น: th-TH-PremwadeeNeural และรองรับ th-TH-NiwatNeural

## Deploy บน Render
สร้าง Web Service จาก Repository นี้ โดยเลือก Blueprint จากไฟล์ `render.yaml`
หรือใช้ Docker:
- Dockerfile: `temple-thai/Dockerfile`
- Docker Context: `.`
- Health check: `/api/state`

Docker build จะติดตั้ง Bun, Python, edge-tts และรันสคริปต์แปลภาษาไทยให้อัตโนมัติ

## รันในเครื่อง
ต้อง clone พร้อม submodule:

```bash
git clone --recurse-submodules https://github.com/teerapong32/tiktoklive.git
cd tiktoklive
docker build -f temple-thai/Dockerfile -t tiktok-temple-thai .
docker run --rm -p 10000:10000 tiktok-temple-thai
```

## URL หลัง Deploy
- หน้า LIVE: `https://YOUR-RENDER-SERVICE.onrender.com/`
- OBS แนวตั้ง 9:16: `https://YOUR-RENDER-SERVICE.onrender.com/?obs=1`
- Admin: `https://YOUR-RENDER-SERVICE.onrender.com/admin`
- สถานะ: `https://YOUR-RENDER-SERVICE.onrender.com/api/state`

หมายเหตุ: แผน Free ของ Render อาจพักบริการเมื่อไม่มีการใช้งาน และอาจมีความหน่วงตอนเริ่มใหม่ เสียง Edge TTS ต้องใช้อินเทอร์เน็ต ส่วนข้อมูลที่เก็บใน filesystem ของแผน Free อาจไม่ถาวรเมื่อมีการ redeploy/restart จึงควรเพิ่ม persistent disk หากต้องเก็บสถิติระยะยาว
