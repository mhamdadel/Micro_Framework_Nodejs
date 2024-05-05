FROM alpine:3.19

ENV NODE_VERSION 22.0.0

WORKDIR /app

RUN addgroup -g 1000 node && \
    adduser -u 1000 -G node -s /bin/sh -D node && \
    apk add --no-cache \
        libstdc++ \
        curl \
        gnupg \
        tar \
        xz && \
    curl -fsSLO --compressed "https://unofficial-builds.nodejs.org/download/release/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64-musl.tar.xz" && \
    tar -xJf "node-v$NODE_VERSION-linux-x64-musl.tar.xz" -C /usr/local --strip-components=1 --no-same-owner && \
    rm "node-v$NODE_VERSION-linux-x64-musl.tar.xz" && \
    ln -s /usr/local/bin/node /usr/local/bin/nodejs && \
    echo "Node.js version:" && node --version && \
    echo "NPM version:" && npm --version

COPY docker-entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

COPY . /app

RUN npm install --only=prod 

EXPOSE 3000

CMD [ "npm", "start" ]
