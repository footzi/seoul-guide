const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  const isProduction = env.production;

  return {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index'),
    target: 'web',
    output: {
      filename: `index.js?v${Date.now()}`,
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: 'pug-loader',
        },
        {
          test: /\.less$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'less-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.less'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/pages/home', 'index.pug'),
        filename: './index.html',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/pages/payment', 'index.pug'),
        filename: './payment.html',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/pages/confirmation', 'index.pug'),
        filename: './confirmation.html',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/pages/agreements', 'index.pug'),
        filename: './agreements.html',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/pages/privacy-policy', 'index.pug'),
        filename: './privacy-policy.html',
      }),
      new CopyPlugin({
        patterns: [{ from: './public/', to: './' }],
      }),
      new MiniCssExtractPlugin({
        filename: `index.css?v${Date.now()}`,
      }),
      new Dotenv(),
    ],
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'public'),
      },
      port: '3001',
      hot: true,
    },
    optimization: {
      minimize: true,
      minimizer: ['...', new CssMinimizerPlugin()],
    },
  };
};
