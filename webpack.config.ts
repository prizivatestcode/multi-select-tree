import { join } from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';

const config: Configuration = {
  entry: join(__dirname, 'src', 'index.ts'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: 'bundle.[contenthash:5].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'ts-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, 'src', 'static', 'index.html'),
    }),

  ],
};

module.exports = config;
