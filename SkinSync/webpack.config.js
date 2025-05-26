const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Mode development untuk lingkungan pengembangan
  mode: "development",

  // Entry point - file JavaScript utama
  entry: "./src/index.js",

  // Output - lokasi hasil build
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // Bersihkan folder dist sebelum build baru
  },

  // Dev server untuk pengembangan
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true, // Buka browser secara otomatis
    hot: true, // Hot module replacement
    compress: true,
    historyApiFallback: true,
  },

  // Module loaders
  module: {
    rules: [
      // CSS loader
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // File loader untuk gambar
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: "Proyek Webpack",
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
};
