
const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin');

const AI_DIR = path.resolve(__dirname, 'src')
const BUILD_DIR = path.resolve(__dirname, 'dist')

const config = {
  module: {
    rules: [
      {
        test: /.+test.vp.+/,
        use: [
          {
            loader: `file-loader`
          }
        ]
      }
    ]
  },
  entry: {
    main: path.join(AI_DIR, 'js/main.js')
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.join(AI_DIR, '/visp')
      }
    ])
  ],
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },
  optimization: {
    minimize: false
  }
}

module.exports = config
