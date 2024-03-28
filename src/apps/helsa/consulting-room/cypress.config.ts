import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: './test/**/*.cy.ts',
    baseUrl: 'http://localhost:3002',
    supportFile: false,
    testIsolation: false,
    video: false,
    downloadsFolder: './test/e2e/downloads',
  },
});
