# Use the official Bun image as the base
FROM oven/bun:1

# Install OpenSSL (fix Prisma error)
RUN apt-get update -y && apt-get install -y openssl

# Set the working directory in the container
WORKDIR /app

# Copy package.json and bun.lockb (if exists)
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install

# Copy node_modules/.prisma directory
COPY node_modules/.prisma ./node_modules/.prisma

# Copy the entire project
COPY . .

# Expose the port the app runs on
EXPOSE 8101

# Command to run the application
CMD ["bun", "start"]