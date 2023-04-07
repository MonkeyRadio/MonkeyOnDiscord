FROM node:latest as ts-compiler
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY ./src ./src
RUN npm run build

FROM node:latest
WORKDIR /app
COPY --from=ts-compiler /app/ ./
ENV NODE_ENV=production
RUN npm install
CMD [ "npm", "start" ]