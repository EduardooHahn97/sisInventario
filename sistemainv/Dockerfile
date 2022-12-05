FROM node:18-alpine as build

COPY . /sistemainv
WORKDIR /sistemainv

RUN npm install --force
RUN npm run build --production

COPY . .



