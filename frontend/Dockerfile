FROM node:alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .

RUN npm install -g yarn
RUN yarn

COPY . .
RUN yarn run build

CMD ["node", "server.js"]

# prod env
# FROM nginx:alpine
# COPY ./nginx/default.conf /etc/nginx/conf.default
# COPY --from=builder /app/bin /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]