# ETAPA 1: Construção (Build)
# Usamos o Node para instalar dependências e gerar o site otimizado
FROM node:18-alpine as build

WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia todo o resto do projeto
COPY . .

# Gera a pasta 'dist' (o site pronto para produção)
RUN npm run build

# --------------------------------------------------------

# ETAPA 2: Servidor (Production)
# Usamos o Nginx, que é super leve, só para servir o HTML/JS
FROM nginx:alpine

# Copia a configuração do Nginx que criamos
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos do site gerados na Etapa 1 para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Roda o servidor
CMD ["nginx", "-g", "daemon off;"]