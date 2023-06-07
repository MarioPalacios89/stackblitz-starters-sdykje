FROM nginx:1.24.0-alpine-slim
COPY ./dist /usr/share/nginx/html/
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
