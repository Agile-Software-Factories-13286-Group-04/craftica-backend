FROM node:18

# Crea una carpeta de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando para iniciar tu app
CMD ["npm", "start"]