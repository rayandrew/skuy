const path = require('path');
const glob = require('glob');

module.exports = {
  libraryName: 'skuy',
  defaultConfig: {
    context: __dirname,
    mode: 'production',
    entry: glob.sync('./src/**/*.js'),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve('./src'),
          exclude: /node_modules\//,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    resolve: {
      modules: ['node_modules', './src'],
      alias: {
        'react-native': 'react-native-web',
      },
      extensions: ['.js', '.jsx'],
    },
    devtool: 'none',
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      ReactDOM: {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
      'react-native': {
        root: 'react-native',
        commonjs2: 'react-native',
        commonjs: 'react-native',
        amd: 'react-native',
      },
      'react-native-web': {
        root: 'react-native-web',
        commonjs2: 'react-native-web',
        commonjs: 'react-native-web',
        amd: 'react-native-web',
      },
    },
  },
};
