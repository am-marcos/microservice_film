FROM node:20.18.0-slim

# Définir le dossier de travail final pour l'application
WORKDIR /usr/node/app/api/auth-service

# Copier les fichiers package.json et package-lock.json
COPY ./api/auth-service/package*.json ./

# Installer les dépendances
RUN npm install

# Installer les dépendances globales
RUN npm install -g ts-node nodemon

# Copier tout le code source après l'installation des dépendances
COPY ./api/auth-service .

# Assurer les permissions correctes pour l'utilisateur `node`
USER root
RUN chown -R node:node /usr/node/app/api/auth-service
USER node

# Définir le fuseau horaire
ENV TZ=Europe/Paris

# Exposer le port 9001
EXPOSE 9001

# Lancer le serveur
CMD ["npm", "run", "dev"]