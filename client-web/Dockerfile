FROM node:16-alpine as node
WORKDIR /app
COPY client-web/package*.json ./
RUN npm install
COPY client-web/. ./
RUN npm run build

FROM nginx:1.13 as prod
COPY --from=node app/build usr/share/nginx/html
COPY client-web/nginx.conf etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]