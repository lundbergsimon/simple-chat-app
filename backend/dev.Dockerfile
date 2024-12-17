# Use lightweight Node.js image
FROM node:23-alpine

# Define arguments passed to the Dockerfile
ARG PORT

# Set working directory
WORKDIR /app

# Install production dependencies only
COPY package*.json .
RUN npm install

# Copy source code
COPY . .

# Expose WebSocket port
EXPOSE $PORT

# Start the Socket.IO server
CMD ["npm", "run", "dev"]
