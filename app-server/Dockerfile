# https://hub.docker.com/_/node
FROM node:12.18

RUN mkdir /usr/local/app-server
COPY ./package.json ./package-lock.json /usr/local/app-server/
COPY ./src /usr/local/app-server/src
WORKDIR /usr/local/app-server
RUN npm install

# my server is listening on 8000
EXPOSE 8000
ENTRYPOINT [ "npm", "start" ]