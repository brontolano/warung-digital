FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm install --legacy-peer-deps
COPY src ./src
RUN npx tsc

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]
