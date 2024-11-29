# Etapa 1: Construir a aplicação Next.js
FROM node:20 AS builder

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Construir a aplicação Next.js
RUN npm run build

# Etapa 2: Configurar Nginx para servir a aplicação
FROM nginx:alpine

# Copie os arquivos de build da aplicação Next.js para o diretório padrão do Nginx
COPY --from=builder /app/out /usr/share/nginx/html

# Copie o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponha a porta que o Nginx irá rodar
EXPOSE 80

# Defina o comando de inicialização do Nginx
CMD ["nginx", "-g", "daemon off;"]
