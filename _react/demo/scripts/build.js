var webpack = require('webpack')
var WebpackConfig = require('../webpack.config')
WebpackConfig.entry = require('./getEntry');

webpack(WebpackConfig, function(err, stats) {
  if (err) {
    console.log('========== build error ===========');
  } else {
    console.log('========== build success ===========');
  }
})