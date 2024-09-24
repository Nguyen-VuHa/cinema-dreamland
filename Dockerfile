# Stage 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies (including devDependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only the production dependencies
COPY package*.json ./

RUN npm install --only=production

# Copy the built Next.js app from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy other necessary files
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Expose port 5000 (or any other port you want)
EXPOSE 5000

# Set environment variable
ENV NODE_ENV production

# Start the application
CMD ["npm", "start"]