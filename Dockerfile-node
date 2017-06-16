FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy src
COPY . /usr/src/app

# Install dependencies
RUN npm install

# Build
RUN npm run build

EXPOSE 9000
CMD node prod-server/index.js
