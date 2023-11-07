FROM node:21.0-slim 

ENV NODE_ENV=development

RUN mkdir /app && chown node:node /app
USER node
WORKDIR /app

CMD ["yarn", "dev"]