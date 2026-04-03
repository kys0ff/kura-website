const path = require('path');

module.exports = {
  // Add both files here
  entry: {
    app: './ts/app.ts',
    latest: './ts/latest.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,        // Find all .ts files
        use: 'ts-loader',     // Use ts-loader to transpile them
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], // This allows you to import without extensions
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // [name] will automatically create 'app.js' and 'latest.js'
    filename: 'js/[name].js',
  },
};
