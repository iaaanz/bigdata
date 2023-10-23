FROM node:20

WORKDIR /home/node/app

RUN chown -R node:node /home/node/app

COPY --chown=node:node package.json .

RUN yarn install

COPY --chown=node:node . .

COPY ["package.json", "yarn.lock*", "./"]

USER node

COPY . .

EXPOSE 3010

CMD ["yarn", "start"]