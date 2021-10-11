const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const apiMocker = require('connect-api-mocker');

module.exports = {
  mode: process.env.NODE_ENV,
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
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: {
                  "border-radius-base": "5px",
                  "font-size-base": "12px",
                  "primary-color": "#145388"
                },
                javascriptEnabled: true
              }
            }
          }]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    host: "0.0.0.0",
    public: "localhost:8080",
    hot: true,
    inline: true,
    historyApiFallback: true,
    before: function(app) {
      app.use("/api", apiMocker("mocks/api"));
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.MOCK_API_BASE_URL': JSON.stringify(process.env.MOCK_API_BASE_URL),
      'process.env.MOCK_API_SECRET_KEY': JSON.stringify(process.env.MOCK_API_SECRET_KEY)
    }),
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
