FROM ubuntu:latest
COPY . /app
WORKDIR /app

RUN rm -rf node_modules package-lock.json yarn.lock
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get update && apt-get install -y curl

# install nvm
ENV NVM_DIR /usr/local/nvm/versions/node/v4.2.3/bin
ENV NODE_VERSION 4.2.3

# Install nvm with node and npm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash \
    && . $NVM_DIR/nvm.sh
RUN nvm install $NODE_VERSION 
RUN nvm alias default $NODE_VERSION
RUN nvm use default

RUN yarn
CMD ["yarn", "build"]