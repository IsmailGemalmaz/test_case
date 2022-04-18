FROM node:16
WORKDIR /home
COPY . .
RUN npm install
CMD npm run start
EXPOSE 3000