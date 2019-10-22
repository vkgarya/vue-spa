const path = require("path")

const config = {
  entry: {
    app: path.resolve(__dirname, "../src/client-entry.js"),
    vendor: ['vue', 'vue-router', 'vuex', 'axios']
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /(\.js$)|(\.vue$)/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          css: 'css-loader',
          'scss': 'css-loader|sass-loader',
        }
      },
      {
        test: /\.js$/,//No need to put check for .vue file as this rule will run after vue-loader transpiled .vue file into .js
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: "assets/js/[name].js"
  }
};

module.exports = config;
