const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    sourceMapFilename: '[name].[contenthash].map',
    chunkFilename: '[name].[contenthash].js'
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    hot: true,
    port: 8080,
    host: '0.0.0.0',
    open: true,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 500, // delay before reloading
      poll: 1000 // enable polling since fsevents are not supported in docker
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: "index.html",
      template: __dirname + "/public/index.html",
      favicon: __dirname + "/public/favicon.ico",
      manifest: __dirname + "/public/manifest.json",
      inject: 'body'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: false,
        default: false,
        defaultVendors: {
          chunks: "all",
          test: /node_modules/,
          name: "vendor",
          reuseExistingChunk: true
        }
      }
    }
  }
};
