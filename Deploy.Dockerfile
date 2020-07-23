FROM nginx:1.18 as build
WORKDIR /source
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.18
COPY --from=build dist/SellNET /usr/share/nginx/html
COPY server.crt /etc/nginx/certs
EXPOSE 80:80
EXPOSE 443:443
