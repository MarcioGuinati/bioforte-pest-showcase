# Estágio de build
FROM node:20-alpine as builder

WORKDIR /app

# Copia os arquivos de dependência primeiro para aproveitar o cache do Docker
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Faz o build da aplicação Vite
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copia a configuração customizada do Nginx (necessária para React Router/SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos compilados da etapa de build
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
