FROM node:20 AS development
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
# RUN pnpm
COPY . .
EXPOSE 3001
RUN yarn build
CMD [ "yarn", "start" ]