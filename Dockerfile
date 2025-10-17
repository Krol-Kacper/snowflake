FROM node:trixie-slim

WORKDIR /app

COPY . /app

CMD npm install && npm run dev -- --host

EXPOSE 5173

