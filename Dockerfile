FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
# RUN sleep 30 && npm run migration:docker:run

CMD [ "npm", "run", "start:dev" ]