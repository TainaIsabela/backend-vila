FROM node:18
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

COPY .env ./

COPY ./src/database/ /docker-entrypoint-initdb.d/

RUN npm run build

EXPOSE 3001
EXPOSE 5433

CMD ["npm", "run", "start:prod"]