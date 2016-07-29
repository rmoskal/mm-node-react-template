# Set the base image to Ubuntu
FROM    node:5.11.1

# File Author / Maintainer
MAINTAINER Robert Moskal

RUN npm install -g webpack

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# Define working directory
WORKDIR /src
ADD . /src

RUN npm run build

# Run app using nodemon
CMD ["node", "/src/start.js"]
