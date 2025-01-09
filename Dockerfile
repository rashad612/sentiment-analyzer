FROM node:22

WORKDIR /app
ARG GCP_AUTH_FILE_SRC
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]