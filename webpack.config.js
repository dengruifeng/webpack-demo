const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    app: "./src/index.tsx",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, ""),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        include: path.resolve(__dirname, "./src"),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"), //指定模板页面
      // filename: "index.html", //打包生成页面的名称，默认index.html
    }),
    !isProd && new webpack.HotModuleReplacementPlugin(), // 启用 HMR
  ],
  devServer: {
    host: "0.0.0.0",
    port: 9000,
    inline: true,
    open: true,
    hot: true,
    historyApiFallback: true,
    headers: {
      "cache-control": "no-cache",
      pragma: "no-cache",
    },
    proxy: {},
  },
};
