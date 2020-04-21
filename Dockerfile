FROM node:latest AS node

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
RUN npm run build --prod --aot

FROM nginx:alpine
COPY --from=node /app/dist/ecommerceApp /usr/share/nginx/html
