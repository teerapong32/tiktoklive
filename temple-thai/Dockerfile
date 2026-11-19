FROM oven/bun:1

RUN apt-get update \
    && apt-get install -y --no-install-recommends git python3 python3-venv python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Fetch the upstream Temple application explicitly; Render does not guarantee
# that Git submodules are initialized in every build environment.
RUN git clone --depth 1 https://github.com/zane-tv/tiktok-live-temple-rpc.git /tmp/temple-source \
    && cp -a /tmp/temple-source/. /app/ \
    && rm -rf /tmp/temple-source

COPY temple-thai/ /opt/temple-thai/

RUN bun install --frozen-lockfile \
    && python3 -m venv .venv \
    && .venv/bin/pip install --no-cache-dir edge-tts \
    && node /opt/temple-thai/apply-thai.mjs /app

ENV NODE_ENV=production
ENV PORT=10000
EXPOSE 10000

CMD ["bun", "start"]
