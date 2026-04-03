const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'img', to: 'img' },
        { from: 'css', to: 'css' },
        { from: 'favicon.svg', to: 'favicon.svg' }, // Fixed name to match your HTML
        { from: 'site.webmanifest', to: 'site.webmanifest' },
        // Add any other files you need copied to dist
      ],
    }),
  ],
});
