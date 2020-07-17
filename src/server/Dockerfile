FROM node:14-alpine as builder
WORKDIR /
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./
RUN npm ci
COPY ./ ./
EXPOSE 3000
RUN npm run build
WORKDIR /dist
RUN node main.js

#FROM nginx:1.12-alpine
#COPY config/nginx.conf /etc/nginx/nginx.conf
#COPY config/vhost.conf /etc/nginx/conf.d/vhost.conf
#RUN ln -svf /dev/stdout /var/log/nginx/access.log && ln -svf /dev/stderr /var/log/nginx/error.log
#EXPOSE 80 443
#CMD ["nginx", "-g", "daemon off;"]