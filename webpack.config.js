module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['./src/CanvasViewer.js']
  },
  output: {
    path: './dist',
    filename: 'angular-canvas-viewer.js',
    library: 'angular-canvas-viewer',
    libraryTarget: 'umd'
  },
  externals: {
    'angular': 'angular'
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
