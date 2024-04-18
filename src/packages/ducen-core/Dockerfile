FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY src/contexts/shared/core/package.json ./src/contexts/shared/core/package.json
COPY src/packages/eslint-config-ducen/package.json src/packages/eslint-config-ducen/package.json
COPY src/packages/tsconfig/package.json src/packages/tsconfig/package.json
RUN npm ci --loglevel=error
COPY . .
CMD ["npm", "run", "build", "-w", "core"]
