FROM node:latest

WORKDIR /usr/src/app

COPY main.js .
COPY instructions.txt .

CMD ["node", "main.js"]

CMD ["node", "main.js"]
