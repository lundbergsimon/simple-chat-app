# Stage 1: Build the frontend
FROM node:23-alpine AS builder

# Define arguments passed to the Dockerfile
ARG PORT
ARG FH_URL
ARG FH_PORT
ARG FC_PORT
ARG BH_URL
ARG BH_PORT

# Set environment variables
ENV VITE_FH_URL=$FH_URL
ENV VITE_FH_PORT=$FH_PORT
ENV VITE_FC_PORT=$FC_PORT
ENV VITE_BH_URL=$BH_URL
ENV VITE_BH_PORT=$BH_PORT

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build it
COPY . .
RUN npm run build

# Stage 2: Serve static files with Nginx
FROM nginx:alpine

# Copy the build output to Nginx's web directory
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
