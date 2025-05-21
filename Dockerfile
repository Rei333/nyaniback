FROM node
EXPOSE 3000
# COPY . /nyaniback
WORKDIR /nyaniback
CMD ["npm", "run", "start"]