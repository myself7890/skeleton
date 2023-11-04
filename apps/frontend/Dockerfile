FROM node:20.9-slim

RUN apt-get update
RUN apt-get upgrade -y
RUN npm install -g http-server
RUN mkdir /app && chown node:node /app
USER node
WORKDIR /app

CMD [ "yarn", "serve" ]