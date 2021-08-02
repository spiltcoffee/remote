FROM node:16-alpine AS build
RUN node -v
RUN yarn -v
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY src/ src/
RUN ls src/
RUN yarn build

FROM nginx:latest
ARG URL="unknown"
ENV TV_URL=$URL
ARG PSK="0000"
ENV TV_PSK=$PSK
ARG NAME="Sony TV"
ENV TV_NAME=$NAME
COPY --from=build /app/dist /usr/share/nginx/html
