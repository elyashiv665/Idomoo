FROM node:latest
RUN mkdir -p /usr/src/
WORKDIR /usr/src/
COPY ./updateStatus/package.json /usr/src/
COPY ./updateStatus/updateStatus.js /usr/src/
COPY ./utils/ /usr/src/utils/
RUN npm install
CMD ["node", "updateStatus.js"]