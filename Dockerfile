FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install forever -g

# Install app dependencies
COPY /home/ubuntu/markdown-js/package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY /home/ubuntu/markdown-js/ /usr/src/app

EXPOSE 9090
CMD [ "forever", "start", "webapp.js" ]