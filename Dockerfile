FROM node:15.8.0

WORKDIR /usr/src

COPY package*.json ./

RUN npm ci --only=production

COPY . .

USER node

CMD [ "node", "app.js" ]