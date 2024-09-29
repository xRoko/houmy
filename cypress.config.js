const { defineConfig } = require("cypress");

module.exports = defineConfig({
  numTestsKeptInMemory: 1,

  e2e: {
    testIsolation: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
