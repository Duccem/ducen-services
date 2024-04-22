FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY src/packages/ducen-ports-client/package.json ./src/packages/ducen-ports-client/package.json
COPY src/packages/ducen-eslint-config/package.json src/packages/ducen-eslint-config/package.json
COPY src/packages/ducen-tsconfig/package.json src/packages/ducen-tsconfig/package.json
RUN npm ci --loglevel=error
COPY . .
CMD ["npm", "run", "build", "-w", "@ducen/ports-client"]
