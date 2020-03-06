FROM node:10.13.0 as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .

RUN npm install --force -g yarn
RUN yarn

COPY . .
RUN yarn build

CMD ["node", "server.js"]