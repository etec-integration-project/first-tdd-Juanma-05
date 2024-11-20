# Usar una imagen de Node para construir la aplicación
FROM node:20-alpine 

WORKDIR /app

COPY package.json .

RUN npm install
# Copiar el código fuente al contenedor
COPY . .

EXPOSE 3000

CMD ["npm", "start"]

