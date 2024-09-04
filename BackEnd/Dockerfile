FROM node:14.17-alpine as builder
ARG NPM_TOKEN
RUN apk add git

WORKDIR /app
COPY package.json .
COPY .npmrc .
RUN npm i --production

FROM node:14.17-alpine
WORKDIR /app
COPY --from=builder /app .
COPY src/ /app/src
RUN ls
RUN rm .npmrc # Add this line if .npmrc is exists

CMD [ "node", "src/index.js" ]
