import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: './test/**/*.cy.ts',
    baseUrl: 'http://localhost:3001',
    supportFile: false,
    testIsolation: false,
    video: false,
    downloadsFolder: './test/e2e/downloads',
  },
});
