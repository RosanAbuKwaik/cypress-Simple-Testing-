const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://us.shein.com",
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 30000,
    responseTimeout: 30000,
    requestTimeout: 5000,
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    screenshotOnRunFailure: true,
    video: false,
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
  return config;
},
  },
});
