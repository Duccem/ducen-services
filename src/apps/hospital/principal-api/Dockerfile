FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY src/apps/helsa/principal-api/package.json ./src/apps/helsa/principal-api/package.json
COPY src/packages/ducen-core/package.json ./src/packages/ducen-core/package.json
COPY src/packages/ducen-ports-server/package.json ./src/packages/ducen-ports-server/package.json
COPY src/contexts/helsa/package.json ./src/contexts/helsa/package.json
COPY src/packages/eslint-config-ducen/package.json ./src/packages/eslint-config-ducen/package.json
COPY src/packages/tsconfig-ducen/package.json ./src/packages/tsconfig-ducen/package.json
RUN npm ci
COPY . .
RUN npm run build:back -w @ducen-services/shared
RUN npm run build -w @ducen-services/shared
RUN npm run build:back -w @ducen-services/hospital
EXPOSE 3001/tcp
CMD ["npm", "run", "build", "-w", "@helsa/principal-api"]
