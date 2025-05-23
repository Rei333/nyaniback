FROM node
WORKDIR /nyaniback
COPY . .
RUN npm install
# COPY . /nyaniback
RUN npm install mysql
EXPOSE 3000
CMD ["npm", "run", "start"]

# sudo docker build -t nyanimal .
# sudo docker run --rm -p 3333:3000 nyanimal
