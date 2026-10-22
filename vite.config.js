
const { defineConfig } = require("vite");

module.exports = defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/LookUp2/" : "/",

  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true
      }
    }
  }
});
