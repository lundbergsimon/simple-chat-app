# Stage 1: Build the frontend
FROM node:23-alpine AS build

# Define arguments passed to the Dockerfile
ARG PORT

RUN echo $PORT

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build it
COPY . .

# Expose the specified port
EXPOSE 3003

# Start the development server in host mode
CMD ["npm", "run", "dev:host"]
