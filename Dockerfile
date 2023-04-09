FROM node:18-slim

WORKDIR /app

RUN npm install -g typescript

COPY ./package.json ./tsconfig.json ./yarn.lock .

RUN yarn install

COPY ./src ./src

RUN yarn build

CMD node -r dotenv/config ./dist/server.js
