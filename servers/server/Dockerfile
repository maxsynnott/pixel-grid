FROM node:14 as builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src
RUN npm ci && npm run build

FROM node:14
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./
RUN npm ci --only=production

CMD ["npm", "start"]