# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy your application code (including app.js and insertname.html) to the container
COPY . .

# Expose the port your app runs on (assuming it's 3000)
EXPOSE 3000

# Define the command to run your application
CMD [ "node", "app.js" ]

