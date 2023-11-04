FROM node:16.0-slim 

ENV NODE_ENV=development

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y procps
RUN mkdir /app && chown node:node /app
USER node
WORKDIR /app

CMD ["yarn", "start:dev"]