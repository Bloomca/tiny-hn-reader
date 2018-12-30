const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    bundle: "./src/index.js",
    "service-worker": "./src/service-worker/index.js"
  },
  output: {
    // we will get the same names as keys in `entry` object
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  // I think we will have unminified version in production,
  // but it is a known tradeoff
  mode: isProduction ? "production" : "development",
  // dev mode is always in watch mode
  watch: !isProduction
};
