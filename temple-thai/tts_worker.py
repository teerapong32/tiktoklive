#!/usr/bin/env python3
"""Thai TTS worker using Microsoft Edge neural voices via edge-tts.

Protocol: one JSON request per stdin line; one JSON response per stdout line.
Audio files are cached under data/tts-cache and served from /tts-cache.
"""
import asyncio
import hashlib
import json
import re
import sys
import time
import unicodedata
from pathlib import Path

try:
    import edge_tts
except Exception as exc:
    sys.stdout.write(json.dumps({"type":"error","fatal":True,"error":f"ติดตั้ง edge-tts ไม่สำเร็จ: {exc}"}, ensure_ascii=False)+"\n")
    sys.stdout.flush()
    raise

CACHE_DIR = Path(__file__).resolve().parent / "data" / "tts-cache"
CACHE_DIR.mkdir(parents=True, exist_ok=True)
DEFAULT_VOICE = "th-TH-PremwadeeNeural"
VOICES = {
    "th-th-premwadeeneural": "th-TH-PremwadeeNeural",
    "th-th-niwatneural": "th-TH-NiwatNeural",
}
BRACKET_EMOTE_RE = re.compile(r"\\[[^\\]]{1,32}\\]")
MULTI_SPACE_RE = re.compile(r"\\s+")

def emit(payload):
    sys.stdout.write(json.dumps(payload, ensure_ascii=False) + "\\n")
    sys.stdout.flush()

def clean_text(raw):
    text = unicodedata.normalize("NFC", unicodedata.normalize("NFKC", str(raw or "")))
    text = BRACKET_EMOTE_RE.sub(" ", text)
    # Keep Thai, Latin, numbers, whitespace and ordinary punctuation; remove control/symbol spam.
    chars = []
    for ch in text:
        cat = unicodedata.category(ch)
        if ch.isspace() or cat[0] in ("L", "N") or ch in ".,!?-()'\\"":
            chars.append(ch)
    text = MULTI_SPACE_RE.sub(" ", "".join(chars)).strip(" .,!?-")
    if len(text) < 2:
        return ""
    return text[:350].rsplit(" ", 1)[0] if len(text) > 350 else text

async def synthesize(text, voice, output):
    communicate = edge_tts.Communicate(text=text, voice=voice)
    await communicate.save(str(output))

def main():
    emit({"type":"status","status":"loading","model":"Microsoft Edge Neural TTS (Thai)"})
    emit({"type":"ready","model":"Microsoft Edge Neural TTS (Thai)","voice":DEFAULT_VOICE,"voices":list(VOICES.values()),"sampleRate":24000,"loadSec":0})
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        req_id = None
        try:
            req = json.loads(line)
            req_id = req.get("id")
            text = clean_text(req.get("text"))
            requested = str(req.get("voice") or DEFAULT_VOICE).lower()
            voice = VOICES.get(requested, DEFAULT_VOICE)
            if not text:
                emit({"type":"result","id":req_id,"ok":False,"error":"ไม่มีข้อความภาษาไทยให้อ่าน"})
                continue
            key = hashlib.sha1(f"thai-edge-v1::{voice}::{text}".encode("utf-8")).hexdigest()[:20]
            filename = f"{key}.mp3"
            output = CACHE_DIR / filename
            if output.is_file() and output.stat().st_size > 200:
                emit({"type":"result","id":req_id,"ok":True,"cached":True,"voice":voice,"file":filename,"url":f"/tts-cache/{filename}","synthSec":0})
                continue
            started = time.time()
            asyncio.run(synthesize(text, voice, output))
            if not output.is_file() or output.stat().st_size <= 200:
                raise RuntimeError("สร้างไฟล์เสียงไม่สำเร็จ")
            emit({"type":"result","id":req_id,"ok":True,"cached":False,"voice":voice,"file":filename,"url":f"/tts-cache/{filename}","synthSec":round(time.time()-started,2)})
        except Exception as exc:
            emit({"type":"result","id":req_id,"ok":False,"error":str(exc)})

if __name__ == "__main__":
    main()
