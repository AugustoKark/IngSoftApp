# Dockerfile for Vue Frontend
# Use the Node.js LTS base image
FROM node:18-alpine as build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the application for production
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage

# Copy the build output to the Nginx HTML directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose the port Nginx will use
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]