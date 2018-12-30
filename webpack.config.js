const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    bundle: "./src/index.js",
    "service-worker": "./src/service-worker/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  mode: isProduction ? "production" : "development",
  watch: !isProduction
};
