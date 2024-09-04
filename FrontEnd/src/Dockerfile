FROM node:16.16-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i --force
COPY public /app/public
COPY . /app
RUN npm run build
CMD [ "node", "server" ]
