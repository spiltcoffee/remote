const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = {
  transpileDependencies: ["vuetify"],
  outputDir: "../../www/html/remote",
  publicPath: "",
  configureWebpack: {
    plugins: [
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 100000,
      }),
    ],
  },
};
