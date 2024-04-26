FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY src/contexts/hospital/package.json ./src/contexts/hospital/package.json
COPY src/contexts/shared/package.json ./src/contexts/shared/package.json
RUN npm ci --loglevel=error
COPY . .
RUN npm run build -w @ducen-services/shared
CMD ["npm", "run", "build", "-w", "@ducen-services/hospital"]
