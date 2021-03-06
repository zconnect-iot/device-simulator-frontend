FROM nginx:mainline-alpine

# Put the files in a place
COPY build /www

# Put the config in the right place
COPY config/console.conf /etc/nginx/conf.d/console.conf
