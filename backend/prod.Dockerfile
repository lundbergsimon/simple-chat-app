# Use lightweight Node.js image
FROM node:23-alpine

# Set working directory
WORKDIR /usr/src/app

# Install production dependencies only
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose WebSocket port
EXPOSE 5000

# Start the Socket.IO server
CMD ["node", "server.js"]
