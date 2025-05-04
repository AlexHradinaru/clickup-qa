const { defineConfig } = require("cypress");
const dotenvPlugin = require("cypress-dotenv");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://app.clickup.com/",
    viewportWidth: 1920,
    viewportHeight: 1080,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 0,
    setupNodeEvents(on, config) {
      config = dotenvPlugin(config);
      return config;
    },
  },
});
