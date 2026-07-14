FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps 2>&1 | tail -5
COPY . .
RUN ls node_modules/.bin/ 2>/dev/null | head -10; echo "---"; npx --yes vite build 2>&1 | tail -10

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
