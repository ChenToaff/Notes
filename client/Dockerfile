# build environment
FROM node:16 

# Create app directory
WORKDIR /app

# Copy dependency definitions
COPY package.json .
COPY package-lock.json .

# Install dependecies
RUN npm ci

# Get all the code needed to run the app
COPY . .
RUN npm run build
RUN npm install -g serve
CMD serve -s build
