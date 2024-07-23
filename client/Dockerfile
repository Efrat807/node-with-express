# שלב 1: בניית הפרויקט
FROM node:14-alpine AS builder
WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# שלב 2: הגשת הפרויקט
FROM nginx:alpine
COPY --from=builder /client/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
