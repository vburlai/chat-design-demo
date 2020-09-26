# https://hub.docker.com/_/mysql
FROM mysql:8.0

COPY my-config.cfg /etc/mysql/conf.d

COPY 01-init.sql /docker-entrypoint-initdb.d