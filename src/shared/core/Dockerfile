FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY src/contexts/shared/package.json ./src/contexts/shared/package.json
RUN npm ci --loglevel=error
COPY . .
CMD ["npm", "run", "build", "-w", "@ducen/shared"]
