FROM node:alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .

RUN npm install -g yarn
RUN yarn

COPY . .
RUN yarn build

CMD ["node", "server.js"]