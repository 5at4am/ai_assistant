# Use official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy frontend source code
COPY ./src ./src
COPY ./public ./public
COPY ./tailwind.config.js ./
COPY ./postcss.config.js ./

# Build the frontend
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Serve the build folder
CMD ["serve", "-s", "build", "-l", "3000"]
