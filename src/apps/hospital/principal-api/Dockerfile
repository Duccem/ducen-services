FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY src/apps/hospital/principal-api/package.json ./src/apps/hospital/principal-api/package.json
COPY src/contexts/shared/package.json ./src/contexts/shared/package.json
COPY src/contexts/hospital/package.json ./src/contexts/hospital/package.json
RUN npm ci
COPY . .
RUN npm run build -w @ducen-services/shared
RUN npm run build -w @ducen-services/hospital
EXPOSE 3001/tcp
CMD ["npm", "run", "build", "-w", "@ducen-services/principal-api"]
