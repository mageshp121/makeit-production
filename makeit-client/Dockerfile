# Use a Node.js base image
FROM node:19.0.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./


# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
# RUN npm run build


# Expose the port your application runs on
EXPOSE 5173

# Command to start your application
CMD ["npm", "run", "dev"]
