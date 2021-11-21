const path = require("path");
const { defineConfig } = require("vite");
const mkcert = require("vite-plugin-mkcert").default;
const fs = require('fs');
const allHTML = fs
  .readdirSync(".")
  .filter((file) => path.extname(file) === ".html")
  .reduce((acc, file) => {
    acc[path.basename(file, ".html")] = path.resolve(__dirname, file);

    return acc;
  }, {});

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: allHTML,
    },
  },
  server: {
    https: true,
  },
  plugins: [mkcert()],
});
