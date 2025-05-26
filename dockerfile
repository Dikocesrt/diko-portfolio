# Gunakan base image Node.js
FROM node:18

# Set direktori kerja
WORKDIR /app

# Copy file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file ke dalam container
COPY . .

# Jalankan aplikasi
CMD ["npm", "start"]