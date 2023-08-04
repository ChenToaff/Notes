# build environment
FROM node:16

WORKDIR /app

# Copy dependency definitions
COPY ./package.json /app
COPY ./package-lock.json /app

# Install dependecies
RUN npm ci

COPY . /app
CMD ["npm", "start"]

