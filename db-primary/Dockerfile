# https://hub.docker.com/_/mysql
FROM mysql:5.7

COPY my-config.cfg /etc/mysql/conf.d

COPY init.sql /docker-entrypoint-initdb.d