FROM node:16.14.2 as react-build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-per-deeps

ENV NODE_OPTIONS=--max-old-space-size=4096

COPY . ./

RUN yarn build

FROM nginx:1.23.1
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]