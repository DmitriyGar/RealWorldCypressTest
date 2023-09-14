import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '7s5okt',
  viewportHeight: 1000,
  viewportWidth: 1280,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
  configFile: 'reporter-config.json'
  },
  retries: {
    runMode: 0,
    openMode: 0,
  },
  env: {
    apiUrl: 'http://localhost:3001',
    mobileViewportWidthBreakpoint: 414,
    coverage: false,
    codeCoverage: {
      url: 'http://localhost:3001/__coverage__',
    },
  },
  experimentalStudio: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts').default(on, config)
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/tests/**/*.{js,jsx,ts,tsx}',
  },
})
