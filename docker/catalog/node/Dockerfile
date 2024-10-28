FROM node:20.18.0-slim
WORKDIR /usr/node/app/auth-service

COPY ./api/auth-service/package*.json .

RUN npm install

WORKDIR /usr/node/app/api/auth-service
COPY ./api/auth-service .

ENV TZ=Europe/Paris

EXPOSE 9000

USER node

CMD ["npm", "run", "dev"]