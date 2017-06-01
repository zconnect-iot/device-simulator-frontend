FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY yarn.lock /usr/src/app/
RUN yarn install --production

# Bundle app source
COPY . /usr/src/app

EXPOSE 9000
CMD node prod-server/index.js
