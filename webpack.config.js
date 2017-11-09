const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader', 'prettier-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png',
      },
    ],
  },

  watch: true,
};
