# שלב 1: בניית הפרויקט
FROM node:14-alpine AS builder
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# שלב 2: הפעלת הפרויקט
FROM node:14-alpine
WORKDIR /server
COPY --from=builder /server/dist ./dist
COPY --from=builder /server/package*.json ./
RUN npm install --only=production
EXPOSE 3000
CMD ["node", "dist/index.js"]
