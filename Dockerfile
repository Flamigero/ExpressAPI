FROM node:16-alpine

RUN npm install --global nodemon

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

RUN chmod +x wait-for.sh

EXPOSE 8080