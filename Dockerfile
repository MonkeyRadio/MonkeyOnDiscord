FROM node:latest as ts-compiler
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY ./src ./src
RUN rm -rf ./dist
RUN npm run build

FROM node:latest
LABEL maintainer nicojqn
WORKDIR /app
COPY --from=ts-compiler /app/ ./
ENV NODE_ENV=production
RUN npm install
ENTRYPOINT [ "npm", "start" ]
