FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY src/apps/helsa/consulting-room/package.json ./src/apps/helsa/consulting-room/package.json
COPY src/contexts/shared/core/package.json ./src/contexts/shared/core/package.json
COPY src/contexts/shared/adapters/client/package.json ./src/contexts/shared/adapters/client/package.json
COPY src/contexts/shared/ui/web/package.json ./src/contexts/shared/ui/web/package.json
COPY src/contexts/helsa/package.json ./src/contexts/helsa/package.json
COPY src/packages/eslint-config-ducen/package.json ./src/packages/eslint-config-ducen/package.json
COPY src/packages/tsconfig-ducen/package.json ./src/packages/tsconfig-ducen/package.json
RUN npm ci
COPY . .
RUN npm run build -w @shared/core
RUN npm run build -w @shared/adapters-client
RUN npm run build -w @shared/ui-web
RUN npm run build -w @helsa/modules
EXPOSE 3002
CMD ["npm", "run", "build", "-w", "@helsa/consulting-room"]
