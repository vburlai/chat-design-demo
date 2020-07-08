# https://hub.docker.com/_/rabbitmq
FROM rabbitmq:3.8-management-alpine

RUN rabbitmqctl add_user '${MQ_USERNAME}' '${MQ_PASSWORD}'
