
module.exports = {
  entry: './src/index.js',
  output: {
    filename: './bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'eslint-loader'],
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
