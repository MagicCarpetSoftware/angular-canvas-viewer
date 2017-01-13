module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['./src/CanvasViewer.js']
  },
  output: {
    path: './dist',
    filename: 'angular-canvas-viewer.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
