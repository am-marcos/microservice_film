FROM node:20.18.0-slim

RUN npm install -g ts-node nodemon

WORKDIR /usr/node/app/catalog-service

COPY ./api/catalog-service/package*.json .

RUN npm install

WORKDIR /usr/node/app/api/catalog-service
COPY ./api/catalog-service .

ENV TZ=Europe/Paris

EXPOSE 9000

USER node

CMD ["npm", "run", "dev"]