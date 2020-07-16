# Use DB-Primary container as base
FROM chat-design-demo_db-primary

# Replication will be executed after 01-init.sql from Primary DB
# https://hub.docker.com/_/mysql
COPY 02-replication.sql /docker-entrypoint-initdb.d