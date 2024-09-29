const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5000',
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      // You can add your event listeners if needed
    },
  },
});
