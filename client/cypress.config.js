const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5000',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
});
