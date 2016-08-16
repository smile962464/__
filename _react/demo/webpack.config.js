var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// multiple extract instances
// var extractCSS = new ExtractTextPlugin('[name].css', { allChunks: true });
// var extractLESS = new ExtractTextPlugin('[name].less', { allChunks: true });

module.exports = {
  // devtool: 'inline-source-map',
  devtool: 'source-map',

  entry: [],

  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/dist/'
  },

  externals: {
    // Use external version of React
    "react": "React",
    "react-dom": "ReactDOM"
  },

  resolve: {
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    extensions: ['', '.web.js', '.js', '.json'],
  },

  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: 'babel',
        query: {
          plugins: [
            ["external-helpers"],
            ["transform-runtime", {
              polyfill: false,
            }],
            // ["antd", { "style": "css", "libraryName": "antd-mobile" }]
            ["antd", [
              { "style": "css", "libraryName": "antd" },
              { "style": "css", "libraryName": "antd-mobile" }
            ]]
          ],
          presets: [
            'es2015-loose',
            // 'es2015',
            'react'
          ]
        }
      },
      { test: /\.(jpg|png|svg)$/, loader: "url?limit=8192" }, //把不大于8kb的图片打包处理成Base64
      // { test: /\.css$/, loader: 'style!css' }, // 把css处理成内联style，动态插入到页面
      // { test: /\.less$/, loader: 'style!css!less' }, // loader 处理顺序：先less 后css 最后style
      // less-loader requires less as peer dependency
      { test: /\.less$/i, loader: ExtractTextPlugin.extract('style', 'css!less') },
      { test: /\.css$/i, loader: ExtractTextPlugin.extract('style', 'css') }
    ]
  },

  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.optimize.CommonsChunkPlugin({
      // minChunks: 2,
      name: 'shared',
      filename: 'shared.js'
    }),
    new ExtractTextPlugin('[name].css', { allChunks: true }),
  ]

}
