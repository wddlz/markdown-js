FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install forever -g

# Install redis
RUN wget http://download.redis.io/releases/redis-3.2.5.tar.gz
RUN tar xzf redis-3.2.5.tar.gz
RUN cd redis-3.2.5
RUN make

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 9090
CMD [ "forever", "start", "webapp.js" ]