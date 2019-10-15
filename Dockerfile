FROM node:12 as build
WORKDIR /home/app
ADD ./package.json .
ADD ./yarn.lock .
RUN yarn
ADD . .
RUN yarn build

FROM nginx:1.15
COPY --from=build /home/app/build /usr/share/nginx/html
