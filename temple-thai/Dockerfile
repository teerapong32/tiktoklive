FROM oven/bun:1

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 python3-venv python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY temple-source/ ./
COPY temple-thai/ /opt/temple-thai/

RUN bun install --frozen-lockfile \
    && python3 -m venv .venv \
    && .venv/bin/pip install --no-cache-dir edge-tts \
    && node /opt/temple-thai/apply-thai.mjs /app

ENV NODE_ENV=production
ENV PORT=10000
EXPOSE 10000

CMD ["bun", "start"]
