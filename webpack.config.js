const path = require('path');

module.exports = {
  entry: './src/index.js', // Your React app's entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Target JavaScript and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Presets for modern JS, JSX
          },
        },
      },
    ],
  },
};
