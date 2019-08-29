FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

RUN mkdir /etc/nginx/static

COPY dist /etc/nginx/static/

COPY nginx.conf /etc/nginx/conf.d/static.conf