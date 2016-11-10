# Take base image from node repo
FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --silent

# Bundle app & monitoring source
COPY . /usr/src/app

# Building the monitoring stuff
WORKDIR  /usr/src/app/monitoring
RUN npm install --silent
RUN chmod +x run_all.sh 

# Expose the webapp
EXPOSE 9090

# This should run both webapp & monitor
ENTRYPOINT ["./run_all.sh"] 
