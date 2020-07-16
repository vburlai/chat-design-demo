# https://hub.docker.com/_/php
FROM php:7.3-apache

# Install memcached PHP extension
ADD https://raw.githubusercontent.com/mlocati/docker-php-extension-installer/master/install-php-extensions /usr/local/bin/

RUN chmod uga+x /usr/local/bin/install-php-extensions && sync && \
    install-php-extensions memcached mysqli >/dev/null

COPY src/ /var/www/html/
RUN echo "ServerName demo" >> /etc/apache2/apache2.conf
