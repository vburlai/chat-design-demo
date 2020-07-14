# https://hub.docker.com/_/node
FROM node:12.18-alpine

RUN mkdir /usr/local/logger
COPY ./package.json ./package-lock.json /usr/local/logger/
COPY ./src /usr/local/logger/src
WORKDIR /usr/local/logger
RUN npm install

ENTRYPOINT [ "npm", "start" ]