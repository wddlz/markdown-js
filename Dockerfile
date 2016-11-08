FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install forever -g

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --silent

# Bundle app source
COPY . /usr/src/app

EXPOSE 9090
CMD [ "forever", "start", "webapp.js" ]
