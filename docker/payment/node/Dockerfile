FROM node:20.18.0-slim

RUN npm install -g ts-node nodemon

WORKDIR /usr/node/app/payment-service

COPY ./api/payment-service/package*.json .

RUN npm install

WORKDIR /usr/node/app/api/payment-service
COPY ./api/payment-service .

ENV TZ=Europe/Paris

EXPOSE 9005

USER node

CMD ["npm", "run", "dev"]