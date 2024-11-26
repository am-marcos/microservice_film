
FROM node:20.18.0-slim

# Créer le répertoire de travail unique
WORKDIR /usr/node/app/payment-service

# Copier uniquement les fichiers package.json pour installer les dépendances
COPY ./api/payment-service/package*.json ./


RUN npm install

COPY ./api/payment-service .


ENV TZ=Europe/Paris


EXPOSE 9005


USER node

# Commande pour démarrer le service en mode développement avec nodemon
CMD ["npm", "run", "dev"]
