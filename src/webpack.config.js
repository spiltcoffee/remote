import { fileURLToPath } from "url";

import { VueLoaderPlugin } from "vue-loader";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WorkboxWebpackPlugin from "workbox-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import webpack from "webpack";

const development = process.env.NODE_ENV === "development";

export default {
  mode: development ? "development" : "production",
  entry: "./src/main.js",
  output: {
    clean: true,
    path: fileURLToPath(new URL("../dist", import.meta.url)),
    filename: "[contenthash].[name].js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(eot|woff|woff2|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 10000000,
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        tvName: process.env.TV_NAME,
      },
    }),
    new CopyWebpackPlugin({ patterns: [{ from: "src/public" }] }),
    new webpack.DefinePlugin({
      "process.env.TV_URL": JSON.stringify(process.env.TV_URL),
      "process.env.TV_PSK": JSON.stringify(process.env.TV_PSK),
      "process.env.TV_NAME": JSON.stringify(process.env.TV_NAME),
    }),
  ].filter(Boolean),
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  performance: {
    hints: false,
  },
};
