FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production


FROM node:20 AS runner

WORKDIR /app


COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder app/types ./types
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD [ "npm", "run", "start" ]