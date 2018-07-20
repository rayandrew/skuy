const { defaultConfig, libraryName } = require('./default-config');

module.exports = {
  ...defaultConfig,
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
};
