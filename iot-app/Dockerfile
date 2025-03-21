# Base image olarak resmi Node.js LTS sürümünü kullanıyoruz
FROM node:18-alpine

# Çalışma dizinini oluştur ve içine gir
WORKDIR /app

# Package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Tüm kaynak kodlarını konteynere kopyala
COPY . .

# Portu belirle
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "run", "start"]
