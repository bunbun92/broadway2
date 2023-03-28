FROM node:18.12.1

RUN mkdir -p /app
WORKDIR /app
ADD . /app/

RUN rm package-lock.json || trues
RUN npm install

RUN npm install -g pm2
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "run", "start:prod"]