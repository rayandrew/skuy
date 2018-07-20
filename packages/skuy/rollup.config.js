import sourceMaps from 'rollup-plugin-sourcemaps';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import pkg from './package.json';

const globals = {
  'prop-types': 'PropTypes',
  'react-dom': 'ReactDOM',
  react: 'React',
};

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const babelOptions = (production) => {
  const result = {
    babelrc: false,
    presets: [['env', { modules: false }], 'stage-0', 'react'],
    plugins: [
      [
        'transform-runtime',
        {
          polyfill: false,
          regenerator: true,
        },
      ],
      [
        'transform-class-properties',
        {
          loose: true,
        },
      ],
      [
        'transform-object-rest-spread',
        {
          useBuiltIns: true,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            'react-native': ['react-native-web'],
          },
        },
      ],
      'add-module-exports',
    ],
  };

  if (production) {
    result.plugins.push('transform-react-remove-prop-types');
  }

  return result;
};

const defaultPlugin = [
  resolve({
    jsnext: true,
    main: true,
  }),
  commonjs(),
  sourceMaps(),
];

const bundle = (name) => ({
  input: `src/index.js`,
  output: [
    {
      file: `dist/${name}.es.js`,
      format: 'es',
      plugins: [babel(babelOptions(false)), ...defaultPlugin],
      globals,
    },
    {
      file: `dist/${name}.js`,
      format: 'umd',
      plugins: [babel(babelOptions(false)), ...defaultPlugin],
      globals,
    },
    {
      file: `dist/${name}.min.js`,
      format: 'umd',
      plugins: [
        babel(babelOptions(true)),
        ...defaultPlugin,
        uglify({}, minify),
      ],
      globals,
    },
  ],
  external,
});

export default [bundle('skuy')];
