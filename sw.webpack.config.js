const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/sw/firebaseMessagingSw.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                isolatedModules: false,
                noEmit: false,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [new Dotenv()],
  output: {
    filename: 'firebase-messaging-sw.js',
    path: path.resolve(__dirname, 'public'),
  },
};
