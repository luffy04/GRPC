FROM node:14-buster-slim 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g pm2 --quiet

COPY . .

CMD ["pm2-runtime", "start", "server.js"]