# Use uma imagem base oficial do Node.js
FROM node:20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Defina o comando de inicialização
CMD ["npm", "dev"]
