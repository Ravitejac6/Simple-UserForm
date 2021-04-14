FROM node:14

# Create app directory
WORKDIR /ravi/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# For running a nestjs app we need to follow this step
RUN npm run build


EXPOSE 8080

# In the dist folder the main.js file will be there which runs the Nestjs App
CMD [ "node", "dist/main" ]