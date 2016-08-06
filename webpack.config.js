var webpack = require('webpack');

module.exports = {
  entry: {
    site: './source/javascripts/index.js'
  },

  resolve: {
    root: __dirname + '/source/javascripts',
  },

  output: {
    path: __dirname + '/.tmp/dist',
    filename: 'javascripts/[name].js',
  },
};

