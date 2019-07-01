FROM node:8-alpine
COPY main.js ./
COPY ./node_modules ./node_modules
COPY ./node-red ./node-red
COPY ./SB-Admin/dist ./SB-Admin/dist
EXPOSE 8000
CMD node main

