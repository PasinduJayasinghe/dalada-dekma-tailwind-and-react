# Step 1: Build the React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source files and build
COPY . .
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine

# Copy built files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html


# Optional: Replace default Nginx config to support React Router
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]