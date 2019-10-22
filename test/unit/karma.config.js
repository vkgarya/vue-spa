var webpackConfig = require('../../build/webpack.test.config.js')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'], // Can include Chrome and anyother browsers
    frameworks: ['mocha', 'sinon-chai'],
    files: ['./index.js'],
    preprocessors: {
      './index.js':['webpack']
    },
    plugins: [
      'karma-mocha',
      'karma-sinon-chai',
      'karma-phantomjs-launcher',
      'karma-webpack'
    ],
    webpack: webpackConfig,
    WebpackMiddleware: {
      noInfo: true
    }
  })
}
