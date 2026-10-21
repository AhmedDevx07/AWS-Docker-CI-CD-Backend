FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install --omit=dev

USER node

CMD [ "npm", "start" ]

EXPOSE 3000